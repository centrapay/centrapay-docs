import TestNav from '../testNav';

describe('Navigation', () => {
  describe('create', () => {
    test('returns TestNav object', () => {
      expect(TestNav.create({})).toEqual({
        menu: {
          children: []
        },
        pathToActiveNav: undefined,
      });
    });

    test('menu is empty when content is empty', () => {
      expect(TestNav.create({ content: [] })).toEqual({
        menu: {
          children: []
        },
        pathToActiveNav: undefined,
      });
    });

    test('API ', () => {
      expect(TestNav.create({
        nav: [
          {
            title: 'API',
          }
        ],
        content: []
      })).toEqual({
        menu: {
          children: [
            {
              title: 'API',
            }
          ]
        },
        pathToActiveNav: undefined,
      });
    });
  });
});
