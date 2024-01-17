import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';
import { writable, get } from 'svelte/store'

/* localStorage backed store, from https://stackoverflow.com/a/68785061 */
const localStore = <T>(key: string, initValue: T): Writable<T> => {
  const store = writable(initValue);
  if (!browser) return store;

  const storedValueStr = localStorage.getItem(key);
  try {
    if (storedValueStr != null) store.set(JSON.parse(storedValueStr));
  } catch (e) {
    // meh just reset it
    console.log(`Error parsing localStore value (it was ${storedValueStr}), resetting to initValue`);
    store.set(initValue);
    localStorage.setItem(key, JSON.stringify(initValue));
  }

  store.subscribe((val) => {
    if (val === null || val === undefined) {
      localStorage.removeItem(key)
    } else {
      localStorage.setItem(key, JSON.stringify(val))
    }
  })

  window.addEventListener('storage', () => {
    const storedValueStr = localStorage.getItem(key);
    if (storedValueStr == null) return;

    const localValue: T = JSON.parse(storedValueStr)
    if (localValue !== get(store)) store.set(localValue);
  });

  return store;
}

export default localStore