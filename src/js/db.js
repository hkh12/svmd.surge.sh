import { openDB } from 'idb';

export async function open() {
  return openDB('app', 1, {
    upgrade(db) {
      db.createObjectStore('docs', { keyPath: 'component' });
    }
  });
}

export const getDocs = async (writable = false) => {
  const db = await open(),
    tx = db.transaction(['docs'], writable ? 'readwrite' : 'readonly'),
    docs = tx.objectStore('docs');
  return docs;
};
