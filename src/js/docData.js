import marked from 'marked';

/** @param {string} markdown */
export default function createDocData(markdown) {
  const lines = markdown.split('\n');
  const title = lines[0].slice(2),
    [mdcDocs, demo] = lines.slice(1, 3).map(line => line.match(/\((https:\/\/.+)\)/i)[1]),
    restOfMarkdown = lines.slice(3);
  return {
    // markdown: restOfMarkdown,
    title,
    mdcDocs,
    demo,
    html: marked(restOfMarkdown.join('\n'))
  };
}
