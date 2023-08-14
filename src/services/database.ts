import { getDatabase, push, ref, update } from 'firebase/database';

export async function pushByRefDB(path: string, content: unknown) {
  const db = getDatabase();
  const updates: any = {};
  const key = push(ref(db, path)).key;
  updates[path + '/' + key] = content;
  await update(ref(db), updates);
  return key;
}

export async function updateByRefDB(path: string, content: unknown) {
  const db = getDatabase();
  const updates: any = {};
  updates[path] = content;
  update(ref(db), updates);
}
