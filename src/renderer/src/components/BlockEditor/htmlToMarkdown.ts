import TurndownService from 'turndown';

const turndownService = new TurndownService({
  headingStyle: 'atx',
  fence: '```',
  linkStyle: 'inlined',
  codeBlockStyle: 'fenced'
});

export function htmlToMarkdown(html: string) {
  return turndownService.turndown(html);
}
