function toKebabCase(string) {
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
  }

  static fromContent(content) {
    const { collection, slug, data: frontmatter } = content;
    return new Page({
      path: `/${collection}/${slug}`,
      title: frontmatter.title,
      nav: frontmatter.nav,
    });
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
