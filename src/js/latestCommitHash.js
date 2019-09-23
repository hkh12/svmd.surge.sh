import fetch from './fetchGitHub';

/** @returns {Promise<string>} */
export default async function getLatestCommitHash(component) {
  try {
    const res = await fetch(`object(expression: "master") {
      ...on Commit {
        history(path: "docs/components/${component}.md", first: 1) {
          edges { node { oid } }
        }
      }
    }`);
    if (!res.ok) return '';
    return (await res.json()).data.repository.object.history.edges[0].node.oid;
  } catch (_) {
    return '';
  }
}
