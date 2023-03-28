export enum LocalStorageKeys {
    // auth
    accessToken = 'lfac',

    // user
    defaultCity = 'lfdc'
    // development

}

export class LocalStorage {
    public static getItem(key: keyof typeof LocalStorageKeys) {
        return window.localStorage.getItem(LocalStorageKeys[key]);
    }

    public static setItem(key: keyof typeof LocalStorageKeys, value: string) {
        window.localStorage.setItem(LocalStorageKeys[key], value);
    }

    public static removeItem(key: keyof typeof LocalStorageKeys) {
        window.localStorage.removeItem(LocalStorageKeys[key]);
    }

    public static clear() {
        window.localStorage.clear();
    }
}