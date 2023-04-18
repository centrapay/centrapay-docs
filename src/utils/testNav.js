import Page from './Page';

class NavGroup {
  constructor({ title, children }) {
    this.title = title;
    this.children = children;
  }

  static create({ nav, content }) {
    return new NavGroup({
      title: nav.title,
      children: content
    });
  }
}

class TestNav {
  constructor(props) {
    this.menu = props.menu;
    this.pathToActiveNav = props.pathToActiveNav;
  }

  static create({ nav = [], content = [] }) {
    return new TestNav({
      menu: {
        children: nav.map(n => NavGroup.create({ nav: n, content }))
      }
    });
  }
}

export default TestNav;
