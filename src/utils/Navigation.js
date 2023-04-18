import Page from './Page';

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
          icon: 'Receipt',
          children: [
            { title: 'Centrapay Experiences', children: [] },
            { title: 'Digital Assets', children: [] },
            { title: 'App Integrations', children: [] },
            { title: 'Merchant Integrations', children: [] },
          ],
        },
        {
          title: 'Connections',
          to: '/connections',
          icon: 'Connections',
          children: [
            { title: 'Farmlands', to: '/connections/farmlands', children: [] },
          ],
        },
        {
          title: 'API',
          to: baseUrl + '/api',
          icon: 'Settings',
          children: [],
        },
      ]
    };
    const pathToActiveNav = {};
    const navigation = new Navigation({ menu, pathToActiveNav });

    const pages = content.map(c => Page.fromContent(c));

    const subHeadings = navigation.menu.children.map(c => c.children).flat().map(a => a.title);
    for (const subHeading of subHeadings) {
      pages
        .filter(a => a.nav.path.split('/')[1] === subHeading)
        .sort((a, b) => a.order - b.order)
        .forEach(page => navigation.insertPage({ page }));
    }

    const err = pages.filter(a => !subHeadings.includes(a.nav.path.split('/')[1]));
    if (err) {
      throw Error(
        `The following pages have invalid paths: ${err.map(i => i.title)}.
        If you are adding the page under a new subheading, ensure the subheading is included in the children list of the parent heading above.`
      );
    }

    // FIXME remove this block once each section header has a landing page
    subHeadings.forEach((subHeading) => {
      const category = navigation.findItem({ title: subHeading.title });
      if(category && !category.to) {
        category.to = category.children[0].to;
      }
    });

    return navigation;
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
