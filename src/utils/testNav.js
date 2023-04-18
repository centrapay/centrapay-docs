import Page from './Page';

class TestNav {
  constructor(props) {
    this.menu = props.menu;
    this.pathToActiveNav = props.pathToActiveNav;
  }

  static create({ baseUrl, content }) {
    return new TestNav({});
  }
}

export default TestNav;
