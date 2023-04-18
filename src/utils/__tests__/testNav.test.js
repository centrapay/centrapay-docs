import TestNav from '../testNav';

describe('Navigation', () => {
  describe('create', () => {
    test('returns TestNav object', () => {
      expect(TestNav.create({})).toEqual({
        menu: undefined,
        pathToActiveNav: undefined,
      });
    });

    test('menu is empty when no content is empty', () => {
      expect(TestNav.create({ content: [] })).toEqual({
        menu: [],
        pathToActiveNav: undefined,
      });
    });
  });
});
