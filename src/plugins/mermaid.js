import { visit } from 'unist-util-visit';

export const mermaid = () => tree => {
  visit(tree, 'code', node => {
    if (node.lang !== 'mermaid') {
      return;
    }

    node.type = 'html';
    node.value = `
      <div class="mermaid mt-8 mb-8 rounded-lg border border-outline-opaque bg-surface-secondary" data-content="${node.value}">
        <p>Loading Diagram...</p>
      </div>
    `;
  });
};
