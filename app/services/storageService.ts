
const isWeb = typeof window !== "undefined";
const memoryStore: Record<string, string> = {};

export const StorageKeys = {
  USERS: "users",
  CURRENT_USER: "currentUser",
  EXPENSES: "expenses",
  APP_VERSION: "appVersion",
};

class StorageService {
  private async handleError(error: any, operation: string) {
    console.error(`Storage Error [${operation}]:`, error);
    return null;
  }

  private getStorage() {
    return isWeb && typeof localStorage !== "undefined" ? localStorage : null;
  }

  // Generic get
  async getItem<T>(key: string): Promise<T | null> {
    try {
      const storage = this.getStorage();
      let data: string | null = null;

      if (storage) {
        data = storage.getItem(key);
      } else {
        data = memoryStore[key] || null;
      }

      return data ? (JSON.parse(data) as T) : null;
    } catch (error) {
      return this.handleError(error, "getItem");
    }
  }

  // Generic set
  async setItem<T>(key: string, value: T): Promise<boolean> {
    try {
      const stringValue = JSON.stringify(value);
      const storage = this.getStorage();

      if (storage) {
        storage.setItem(key, stringValue);
      } else {
        memoryStore[key] = stringValue;
      }
      return true;
    } catch (error) {
      this.handleError(error, "setItem");
      return false;
    }
  }

  // Generic remove
  async removeItem(key: string): Promise<boolean> {
    try {
      const storage = this.getStorage();

      if (storage) {
        storage.removeItem(key);
      } else {
        delete memoryStore[key];
      }
      return true;
    } catch (error) {
      this.handleError(error, "removeItem");
      return false;
    }
  }

  // Clear all
  async clearAll(): Promise<boolean> {
    try {
      const storage = this.getStorage();

      if (storage) {
        storage.clear();
      } else {
        Object.keys(memoryStore).forEach((key) => delete memoryStore[key]);
      }
      return true;
    } catch (error) {
      this.handleError(error, "clearAll");
      return false;
    }
  }

  // Get multiple items
  async multiGet(keys: string[]): Promise<Record<string, any>> {
    try {
      const data: Record<string, any> = {};
      const storage = this.getStorage();

      if (storage) {
        keys.forEach((key) => {
          const value = storage.getItem(key);
          data[key] = value ? JSON.parse(value) : null;
        });
      } else {
        keys.forEach((key) => {
          const value = memoryStore[key];
          data[key] = value ? JSON.parse(value) : null;
        });
      }
      return data;
    } catch (error) {
      this.handleError(error, "multiGet");
      return {};
    }
  }

  // Set multiple items
  async multiSet(items: Record<string, any>): Promise<boolean> {
    try {
      const storage = this.getStorage();

      if (storage) {
        Object.entries(items).forEach(([key, value]) => {
          storage.setItem(key, JSON.stringify(value));
        });
      } else {
        Object.entries(items).forEach(([key, value]) => {
          memoryStore[key] = JSON.stringify(value);
        });
      }
      return true;
    } catch (error) {
      this.handleError(error, "multiSet");
      return false;
    }
  }
}

export default new StorageService();
