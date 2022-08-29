export class LocalCache {
    constructor(namespace, storage) {
        this._namespace = `${namespace}`;
        console.log(this._namespace);
        this._storage = storage || window.localStorage;
    }

    get(key) {
        const value = this._storage.getItem(this._getNamespaceKey(key));
        return value ? JSON.parse(value) : null;
    }

    getAll() {
        const items = [];
        const keys = Object.keys(this._storage).filter((k) =>
            k.startsWith(this._namespace)
        );
        for (const k of keys) {
        const v = this._storage.getItem(k);

        if (v) {
            // TODO: this mess up history order sometimes, figure out a better way to store history
            const item = JSON.parse(v);
            items.push(item);
        }
        }
        return items;
    }

    clear() {
        const keys = Object.keys(this._storage).filter((k) =>
        k.startsWith(this._namespace)
        );
        for (const k of keys) {
        this._storage.removeItem(k);
        }
    }

    set(key, value) {
        this._storage.setItem(this._getNamespaceKey(key), JSON.stringify(value));
    }

    remove(key) {
        this._storage.removeItem(this._getNamespaceKey(key));
    }

    _getNamespaceKey(key) {
        return `${this._namespace}:${key}`;
    }
}