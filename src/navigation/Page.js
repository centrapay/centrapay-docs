function toKebabCase(string) {
  if (!string) { return string || ''; }
  return string
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
}

/**
 *  Encapsulates all the metadata of one of the Markdown
 *  pages in the /content folder, including the front matter.
 */
class Page {
  constructor(props) {
    this.title = props.title;
    this.nav = props.nav;
    this.path = props.path;
    this.headings = props.headings;
  }

  static fromContent(content) {
    const { collection, id, data: frontmatter, headings } = content;
    const routePath = collection === 'merchantServices' ? 'guides' : toKebabCase(collection);
    return new Page({
      path: `/${routePath}/${id}`,
      title: frontmatter.nav.title || frontmatter.title,
      nav: frontmatter.nav,
      headings,
    });
  }

  // Pages whose nav path is this page's path (e.g. `Integration Types/Point of Sale`) are listed
  // under this page in the sidebar.
  withChildPages({ content, parentPath }) {
    const path = [...parentPath, this.navTitle].join('/');
    const children = content.filter(c => c.data.nav.path === path)
      .map(Page.fromContent)
      .sort((a, b) => a.order - b.order);
    if (children.length) {
      this.children = children;
    }
    return this;
  }

  get to() {
    return this.path;
  }

  get fullNavPath() {
    return `${this.nav.path}/${this.navTitle}`;
  }

  get routePath() {
    return `/${toKebabCase(this.fullNavPath)}`;
  }

  get order() {
    return this.nav.order;
  }

  get navTitle() {
    return this.nav.title || this.title;
  }

  hasChildrenAtNavDepth(depth) {
    const split = this.fullNavPath.split('/');
    return split.length > depth;
  }

  titleAtNavDepth(depth) {
    const split = this.fullNavPath.split('/');
    return split[depth - 1];
  }

  pathAtNavDepth(depth) {
    const split = this.fullNavPath.split('/');
    const a = split.splice(0, depth);
    return `/${a.join('/').toLowerCase()}`;
  }
}

export default Page;
