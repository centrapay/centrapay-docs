import Page from '../Page';

describe('Page', () => {
  describe('fromContent', () => {
    it('should return page when passed content', () => {
      const content = {
        collection: 'guides',
        slug: 'farmlands-pos-guide',
        data: {
          title: 'Farmlands POS Integration Guide',
          nav: {
            order: 1,
            title: 'Override',
            path: 'Farmlands',
          },
        },
      };
      const result = Page.fromContent(content);
      expect(result).toEqual({
        path: '/guides/farmlands-pos-guide',
        title: 'Farmlands POS Integration Guide',
        nav: {
          order: 1,
          title: 'Override',
          path: 'Farmlands',
        }
      });
    });
  });

  const page = Page.fromContent({
    data: {
      title: 'Farmlands POS Integration Guide',
      nav: {
        path: 'References/Farmlands',
        title: 'Override',
      },
    },
  });
  for(let i = 1; i < 4; i++) {
    describe('hasChildrenAtNavDepth', () => {
      const expected = i === 3 ? false : true;
      it(`should return ${expected} when the page has children at nav depth ${i}`, () => {
        const result = page.hasChildrenAtNavDepth(i);
        expect(result).toEqual(expected);
      });
    });

    describe('titleAtNavDepth', () => {
      const expected = {
        1: 'References',
        2: 'Farmlands',
        3: 'Override',
      };
      it(`should return ${expected[i]} when passed nav depth ${i}`, () => {
        const result = page.titleAtNavDepth(i);
        expect(result).toEqual(expected[i]);
      });
    });

    describe('pathAtNavDepth', () => {
      const expected = {
        1: '/references',
        2: '/references/farmlands',
        3: '/references/farmlands/override'
      };
      it(`should return ${expected[i]} when passed nav depth ${i}`, () => {
        const result = page.pathAtNavDepth(i);
        expect(result).toEqual(expected[i]);
      });
    });
  };
});
