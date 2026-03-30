export interface ContentBlock {
  type: 'paragraph' | 'list';
  content: string | string[];
}

/**
 * Parses text content into structured blocks, detecting bullet lists.
 * Splits by double newlines, then detects if a block contains bullet points.
 * Bullet lines must start with • or - and the block must contain at least one bullet.
 */
export function parseContentBlocks(text: string): ContentBlock[] {
  const blocks = text.split('\n\n');

  return blocks.map((block) => {
    const lines = block.split('\n');
    const isBulletList =
      lines.every(
        (line) =>
          line.trim() === '' ||
          line.trim().startsWith('•') ||
          line.trim().startsWith('-')
      ) &&
      lines.some(
        (line) =>
          line.trim().startsWith('•') || line.trim().startsWith('-')
      );

    if (isBulletList) {
      const items = lines
        .map((line) => line.trim().replace(/^[•\-]\s*/, ''))
        .filter((line) => line.length > 0);

      return { type: 'list', content: items };
    }

    return { type: 'paragraph', content: block };
  });
}
