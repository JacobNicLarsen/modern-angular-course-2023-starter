import { Injectable } from '@angular/core';

type StorageKey = string;

@Injectable()
export class LocalStorageService {
  setItem<T = any>(key: StorageKey, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(error);
    }
  }

  getItem<T = any>(key: StorageKey): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) {
        return null;
      }
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  removeItem(key: StorageKey): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }
}
