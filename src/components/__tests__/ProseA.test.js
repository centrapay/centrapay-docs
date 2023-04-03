import {render, screen} from '@testing-library/vue';
import ProseA from '../ProseA.vue';

describe('render an API badge with link', () => {
  const invalidScenarios = [
    {
      name: 'external links',
      href: 'https://example.com',
    },
    {
      name: 'internal links',
      href: '/guides/test-guide',
    },
    {
      name: 'anchor links',
      href: '#test',
    },
  ];
  invalidScenarios.forEach(({ name, href }) => {
    test(`should not render an API badge for ${name}`, () => {
      render(ProseA, {
        props: { href },
      });

      expect(screen.queryByText('API')).toBeNull();
    });
  });

  it('should render an API badge for API links', () => {
    const href = 'https://docs.centrapay.com/api/test';

    render(ProseA, {
      props: { href },
    });
    expect(screen.getByText('API')).toBeTruthy();
  });
});

describe('open link in a new tab', () => {
  const validScenarios = [
    {
      name: 'external links',
      href: 'https://example.com',
    },
    {
      name: 'API links',
      scenario: 'https://docs.centrapay.com/api/test',
    },
  ];
  validScenarios.forEach(({ name, href }) => {
    it(`should open ${name} in a new tab`, () => {
      const { getByRole } = render(ProseA, {
        props: { href },
      });

      const anchorElement = getByRole('link');
      const targetAttribute = anchorElement.getAttribute('target');
      expect(targetAttribute).toBe('_blank');
    });
  });

  const invalidScenarios = [
    {
      name: 'internal links',
      href: '/guides/test-guide',
    },
    {
      name: 'anchor links',
      href: '#anchor',
    },
  ];
  invalidScenarios.forEach(({ name, href }) => {
    it(`should not open ${name} in a new tab`, () => {
      const { getByRole } = render(ProseA, {
        props: { href },
      });

      const anchorElement = getByRole('link');
      const targetAttribute = anchorElement.getAttribute('target');
      expect(targetAttribute).toBe('_self');
    });
  });
});

describe('render links with an external link icon', () => {
  const invalidScenarios = [
    {
      name: 'internal links',
      href: '/guides/test-guide',
    },
    {
      name: 'API links',
      href: 'https://docs.centrapay.com/api/test',
    },
    {
      name: 'anchor links',
      href: '#test',
    },
  ];
  invalidScenarios.forEach(({ name, href }) => {
    it(`should not render ${name} with an external link icon`, () => {
      const { queryByRole } = render(ProseA, {
        props: { href },
      });

      const externalLinkIcon = queryByRole('img');
      expect(externalLinkIcon).toBeNull();
    });
  });

  it('should render external links with an external link icon', () => {
    const href = 'https://example.com';

    const { getByRole } = render(ProseA, {
      props: { href },
    });

    const externalLinkIcon = getByRole('img');
    expect(externalLinkIcon).toBeTruthy();
  });
});
