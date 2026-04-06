import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StorageService {
    private readonly platformId = inject(PLATFORM_ID);
    private readonly isBrowser = isPlatformBrowser(this.platformId);

    /**
     * Get item from storage
     */
    get<T>(key: string): T | null {
        if (!this.isBrowser) return null;

        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch {
            return null;
        }
    }

    /**
     * Set item in storage
     */
    set<T>(key: string, value: T): void {
        if (!this.isBrowser) return;

        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Storage error:', error);
        }
    }

    /**
     * Remove item from storage
     */
    remove(key: string): void {
        if (!this.isBrowser) return;
        localStorage.removeItem(key);
    }

    /**
     * Clear all storage
     */
    clear(): void {
        if (!this.isBrowser) return;
        localStorage.clear();
    }

    /**
     * Get token from storage
     */
    getToken(): string | null {
        return this.get<string>(environment.security.tokenKey);
    }

    /**
     * Set token in storage
     */
    setToken(token: string): void {
        this.set(environment.security.tokenKey, token);
    }

    /**
     * Get refresh token from storage
     */
    getRefreshToken(): string | null {
        return this.get<string>(environment.security.refreshTokenKey);
    }

    /**
     * Set refresh token in storage
     */
    setRefreshToken(token: string): void {
        this.set(environment.security.refreshTokenKey, token);
    }

    /**
     * Remove all tokens
     */
    removeTokens(): void {
        this.remove(environment.security.tokenKey);
        this.remove(environment.security.refreshTokenKey);
    }
}
