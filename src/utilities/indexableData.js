/** Uses BFS to find all the HTML section elements */
function findAllHtmlSections(root) {
  const sections = [];
  const queue = [root];
  while (queue.length) {
    const node = queue.shift();
    if (node.tag === 'section') {
      sections.push(node);
    }
    queue.push(...node.children ?? []);
  }
  return sections;
}

function htmlObjToText(obj) {
  let txt = '';
  for (const child of obj?.children ?? []) {
    if (child.type === 'text') {
      txt += child.value;
    }
  }

  return txt;
}

export default async function findIndexableData() {
  const data = [];
  const pages = await queryContent().find();

  // Extract frontmatter
  pages.forEach(page => data.push({
    href: page._path,
    title: page.title,
    description: page.description,
    path: `${page.nav.path}${page.nav.title ? `/${page.nav.title}` : ''}`.split('/')
  }));

  // Extract sections
  pages.forEach(page => findAllHtmlSections(page.body)
    .forEach(section => {
      const paragraph = section.children.find(child => child.tag === 'p');
      const heading = section.children.find(child => /(h1|h2|h3|h4|h5|h6)/.test(child.tag));

      data.push({
        title: htmlObjToText(heading),
        description: htmlObjToText(paragraph),
        href: `${page._path}#${heading.props.id}`,
        path: `${page.nav.path}${page.nav.title ? `/${page.nav.title}` : ''}`.split('/')
      });
    })
  );

  return data;
}
