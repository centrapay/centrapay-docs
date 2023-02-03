import Page from './Page';

let navigation;

class Navigation {
  constructor(props) {
    this.menu = props.menu;
    this.pathToActiveNav = props.pathToActiveNav;
  }

  static create({ baseUrl, content }) {
    const menu = {
      children: [
        {
          title: 'Reference',
          to: '/reference',
          icon: 'receipt',
          children: [],
        },
        {
          title: 'Connections',
          to: '/connections',
          icon: 'connections',
          children: [],
        },
        {
          title: 'API',
          to: baseUrl + '/api',
          icon: 'settings',
          children: [],
        },
      ]
    };
    const pathToActiveNav = {};
    navigation = new Navigation({ menu, pathToActiveNav });
    const pages = content
      .map(c => Page.fromContent(c))
      .sort((a, b) => a.order - b.order);
    pages.forEach(page => navigation.insertPage({ page }));

    // FIXME remove this block once merchant integrations has a landing page
    const merchantIntegrations = navigation.findItem({ title: 'Merchant Integrations' });
    if(merchantIntegrations) {
      merchantIntegrations.to = merchantIntegrations.children[0].to;
    }
  }

  static getMenu() {
    return navigation.menu;
  }

  static getCurrentNavPath(path) {
    const pathToActiveNav = navigation.pathToActiveNav;
    const strippedPath = path.endsWith('/') ? path.slice(0, -1) : path;
    return pathToActiveNav[strippedPath] || strippedPath;
  }

  insertPage({ page, navigationItem = this.menu, depth = 1 }) {
    const hasChildren = page.hasChildrenAtNavDepth(depth);
    const titleAtDepth = page.titleAtNavDepth(depth);
    let item = this.findItem({ item: navigationItem, title: titleAtDepth });
    if(!item) {
      item = {
        title: hasChildren ? titleAtDepth : page.navTitle,
        to: hasChildren ? page.pathAtNavDepth(depth) : page.path,
        children: [],
      };
      navigationItem.children.push(item);
    }
    if(!hasChildren) {
      return;
    }
    this.insertPage({ page, navigationItem: item, depth: depth + 1 });
    this.pathToActiveNav[page.path] = page.routePath;
  }

  findItem({ item = this.menu, title }) {
    if (item.title === title) {
      return item;
    }
    for (let i = 0; i < item.children?.length; i++) {
      let result = this.findItem({ item: item.children[i], title });
      if (result != null) {
        return result;
      }
    }
    return;
  };
}

export default Navigation;
