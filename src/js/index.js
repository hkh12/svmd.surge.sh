import { getDocs } from './db';
import fetchGitHub from './fetchGitHub';
import createDocData from './docData';
import { ArrayStorage, NetError } from './helpers';
import getLatestCommitHash from './latestCommitHash';

const storage = new ArrayStorage('accessedComponents');

async function getAFreshVersion(name) {
  const res = await fetchGitHub(`file:object(expression: "master:docs/components/${name}.md") {
    ...on Blob { markdown:text }
  }`);
  if (!res.ok) throw new NetError(res.statusText, res.status);
  const { file } = (await res.json()).data.repository;
  if (!file) throw new NetError('Not Found!', 404);

  const { markdown } = file;
  const hash = await getLatestCommitHash(name);
  return { hash, markdown };
}

async function loadDocFromDB(name) {
  const savedDoc = await (await getDocs()).get(name);
  if (savedDoc && savedDoc.hash) {
    if (storage.has(name)) return savedDoc;

    const savedHash = savedDoc.hash;
    const latestHash = await getLatestCommitHash(name);
    if (!latestHash) return savedDoc;
    return savedHash === latestHash ? savedDoc : null;
  }
  return null;
}

export default async function getDoc(componentName) {
  const saved = await loadDocFromDB(componentName);
  if (saved) {
    storage.push(componentName);
    return saved;
  }

  try {
    const { markdown, hash } = await getAFreshVersion(componentName);
    const doc = { ...createDocData(markdown), hash, component: componentName };
    await (await getDocs(true)).add(doc);
    storage.push(componentName);
    return doc;
  } catch (e) {
    throw e;
  }
}
