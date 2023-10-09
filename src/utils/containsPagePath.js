export default function containsPagePath({ navigationItem, path }) {
  return navigationItem.children?.some(c => {
    if (c.children?.length) {
      return containsPagePath({ navigationItem: c, path });
    }
    return c.path === path;
  });
};
