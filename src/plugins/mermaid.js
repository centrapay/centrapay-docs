import { visit } from 'unist-util-visit';

const escapeMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  '\'': '&#39;',
};

const escapeHtml = (str) => str.replace(/[&<>"']/g, c => escapeMap[c]);

export const mermaid = () => tree => {
  visit(tree, 'code', node => {
    if (node.lang !== 'mermaid') {
      return;
    }

    node.type = 'html';
    node.value = `
      <div class="mermaid my-8 rounded-lg border border-outline-opaque bg-surface-secondary" data-content="${node.value}" />
    `;
  });
};
