import Page from './Page';

class NavGroup {
  constructor(props) {
    this.order = props.order,
    this.title = props.title;
    this.subTitle = props.subTitle;
    this.children = props.children;
    this.icon = props.icon;
    this.href = props.href;
  }

  static create({ nav, content, parentPath = [] }) {
    const path = [...parentPath, nav.title];
    const childNavGroups = nav.children?.map(n => NavGroup.create({
      nav: n,
      content,
      parentPath: path
    })) || [];
    const childPages = content.filter(c => c.data.nav.path === path.join('/'))
      .map(Page.fromContent)
      .sort((a, b) => a.nav.order - b.nav.order);

    return new NavGroup({
      title: nav.title,
      subTitle: nav.subTitle,
      icon: nav.icon,
      href: nav.href,
      order: nav.order || 0,
      children: [
        ...childPages,
        ...childNavGroups,
      ].sort((a, b) => a.order - b.order),
    });
  }
}

class Navigation {
  constructor(props) {
    this.items = props.items;
  }

  static create({ nav = [], content = [] }) {
    return new Navigation({
      items: nav.map(n => NavGroup.create({ nav: n, content })),
    });
  }
}

export default Navigation;
