export class ArrayStorage {
  constructor(name) {
    this.name = name;
  }

  /** @type {string[]} */
  get items() {
    return JSON.parse(sessionStorage.getItem(this.name) || '[]');
  }

  update(newItems) {
    sessionStorage.setItem(this.name, JSON.stringify(newItems));
  }

  push(item) {
    if (!this.items.includes(item)) {
      this.update([...this.items, item]);
    }
  }

  remove(item) {
    this.update(this.items.filter(x => x !== item));
  }

  has(item) {
    return this.items.includes(item);
  }
}

export class NetError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
}
