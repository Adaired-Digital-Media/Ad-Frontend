'use client';

import twemoji from 'twemoji';

export default function Flag({ emoji }: { emoji: string }) {
  return (
    <span
      dangerouslySetInnerHTML={{
        __html: twemoji.parse(emoji, {
          folder: 'svg',
          ext: '.svg',
        }),
      }}
      className="inline-flex h-6 w-5"
    />
  );
}
