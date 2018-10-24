import { Injectable } from '@angular/core';

const STORAGE_PREFIX = 'stephen-walcher-todos-';

@Injectable()
export class LocalStorageService {
    constructor() {}

    // Pull the application's state from localStorage
    // State is stored usting the "stephen-walcher-todos-*" storage prefix
    static loadInitialState() {
        // Loop through all localStorage items
        return Object.keys(localStorage).reduce((state: any, storageKey) => {
            // If the label for the localStorage item matches our prefix...
            if (storageKey.includes(STORAGE_PREFIX)) {
                const stateKeys = storageKey
                    .replace(STORAGE_PREFIX, '')
                    .toLowerCase()
                    .split('.')
                    .map(key =>
                        key.split('-')
                            .map((token, index) =>
                                index === 0 ? token : token.charAt(0).toUpperCase() + token.slice(1)
                            )
                            .join('')
                    );

                let currentStateRef = state;

                stateKeys.forEach((key, index) => {
                    if (index === stateKeys.length - 1) {
                        currentStateRef[key] = JSON.parse(
                            localStorage.getItem(storageKey)
                        );

                        return;
                    }

                    currentStateRef[key] = currentStateRef[key] || {};
                    currentStateRef = currentStateRef[key];
                });
            }

            return state;
        }, {});
    }

    // Set new localStorage items
    setItem(key: string, value: any) {
        localStorage.setItem(`${STORAGE_PREFIX}${key}`, JSON.stringify(value));
    }

    // Get items from localStorage based on the provided `key`
    getItem(key: string) {
        return JSON.parse(localStorage.getItem(`${STORAGE_PREFIX}${key}`));
    }

    // Delete items from localStorage based on the provided `key`
    removeItem(key: string) {
        localStorage.removeItem(`${STORAGE_PREFIX}${key}`);
    }

    // Tests that localStorage exists, can be written to, and read from.
    testLocalStorage() {
        const testValue = 'testValue';
        const testKey = 'testKey';
        let retrievedValue: string;
        const errorMessage = 'localStorage did not return expected value';

        this.setItem(testKey, testValue);
        retrievedValue = this.getItem(testKey);
        this.removeItem(testKey);

        if (retrievedValue !== testValue) {
            throw new Error(errorMessage);
        }
    }
}
