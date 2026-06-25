export default function toAgentMarkdown({ title, description, body }) {
  let markdown = `# ${title}\n\n`;

  if (description) {
    markdown += `> ${description}\n\n`;
  }

  markdown += body.trim();

  return markdown;
}
