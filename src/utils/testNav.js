import Page from './Page';

class TestNav {
  constructor(props) {
    this.menu = props.menu;
    this.pathToActiveNav = props.pathToActiveNav;
  }

  static create({ nav = [], content = [] }) {
    return new TestNav({
      menu: {
        children: nav
      }
    });
  }
}

export default TestNav;
