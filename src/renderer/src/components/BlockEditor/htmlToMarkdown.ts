import TurndownService from 'turndown';
import { strikethrough } from 'turndown-plugin-gfm';

import { getFilenameFromUrl } from '@/utils/url';

/**
 * remark의 inverse를 활용해볼 것
 *
 * https://unifiedjs.com/learn/recipe/remark-html/#how-to-turn-html-into-markdown
 */

/**
 * FIXME: table에 대해 동작에 이상동작을 함
 *
 * table에 thead 혹은 th가 없기 때문
 * 이는 head없는 table을 markdown에서 허용치 않음에도
 * blockNote에서 head없는 table을 만들기 때문.
 * 이를 해결하기 위해선 thead를 허용하는 table spec을 만들어줄 필요가 있음
 * 급한 사안이 아니기 때문에 일단 table 사용을 막고, 이후 table을 직접 구현하던, 업데이트된 table을 이용하던 해야함
 *
 * 이후 turndown-plugin-gfm를 이용해 markdown 파싱을 할 것
 */

function underline(turndownService: TurndownService) {
  turndownService.addRule('underline', {
    filter: ['ins', 'u'],
    replacement: function (content: string) {
      return `<u>${content}</u>`;
    }
  });
}

function figure(turndownService: TurndownService) {
  turndownService.addRule('figure', {
    filter: ['figure'],
    replacement: function (content: string, node: HTMLElement) {
      const img = node.querySelector('img');
      const figcaption = node.querySelector('figcaption');

      if (img) {
        const filename = getFilenameFromUrl(img.src);

        return `<figure>
          <img src="./${filename}" alt="${filename}" />
          <figcaption>${figcaption ? figcaption.textContent : ''}</figcaption>
        </figure>`;
      }

      return content;
    }
  });
}

const turndownService = new TurndownService({
  headingStyle: 'atx',
  fence: '```',
  linkStyle: 'inlined',
  codeBlockStyle: 'fenced'
});

turndownService.use([strikethrough, underline, figure]);

turndownService.addRule('image', {
  filter: ['img'],
  replacement(_: never, node: HTMLImageElement) {
    const urlToImage = new URL(node.src);
    const filename = getFilenameFromUrl(node.src);

    if (urlToImage.protocol === 'media:') {
      // TODO: media 프로토콜 상수화하여 이용할 것
      return `![${filename}](./${filename})`;
    }

    return `![${filename}](${node.src})`;
  }
});

export function htmlToMarkdown(html: string) {
  return turndownService.turndown(html);
}
