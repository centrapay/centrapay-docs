import { createHash } from 'node:crypto';
import { createMermaidRenderer } from 'mermaid-isomorphic';

const themes = {
  light: {
    mainBkg: '#F8F8F8',
    actorBkg: '#F8F8F8',
    primaryColor: '#F8F8F8',
    primaryTextColor: '#232323',
    primaryBorderColor: '#D1D5DB',
    secondaryColor: '#F8F8F8',
    noteBkgColor: '#232323',
    noteTextColor: '#F8F8F8',
    labelBoxBkgColor: '#FFFFFF',
    clusterBkg: '#F8F8F8',
  },
  dark: {
    mainBkg: '#1F2937',
    actorBkg: '#1F2937',
    primaryColor: '#1F2937',
    primaryTextColor: '#F9FAFB',
    primaryBorderColor: '#374151',
    secondaryColor: '#1F2937',
    noteBkgColor: '#F9FAFB',
    noteTextColor: '#1F2937',
    labelBoxBkgColor: '#111827',
    clusterBkg: '#1F2937',
  },
};

const render = createMermaidRenderer();

async function renderTheme(code, theme, prefix) {
  const [result] = await render([code], {
    prefix: `${prefix}-${theme}`,
    mermaidConfig: {
      theme: 'base',
      themeVariables: themes[theme],
      sequence: { diagramMarginY: 50 },
    },
  });
  if (result.status === 'rejected') {
    throw result.reason;
  }
  return result.value;
}

export async function renderMermaid(code) {
  const prefix = 'mermaid-' + createHash('sha256').update(code).digest('hex').slice(0, 8);
  const [light, dark] = await Promise.all([
    renderTheme(code, 'light', prefix),
    renderTheme(code, 'dark', prefix),
  ]);
  return { light, dark };
}
