export class LocalStorageService<T> {

    public save(key: string, object: T): void {
        localStorage.setItem(key, JSON.stringify(object));
    }

    public load(key: string): T | null {
        const data: string | null = localStorage.getItem(key);
        if(!!data) return JSON.parse(data);
        return null;
    }

    public remove(key: string): void {
        localStorage.removeItem(key);
    }

    public clear(): void {
        localStorage.clear();
    }

}