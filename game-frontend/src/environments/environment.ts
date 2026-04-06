// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.

export const environment = {
    production: false,
    apiUrl: 'http://localhost:8000/api',
    appName: 'Mahjong Tiles Game',
    version: '1.0.0',

    // Feature flags
    features: {
        enableAnalytics: false,
        enableLogging: true,
        enableNotifications: true
    },

    // Cache settings
    cache: {
        defaultTtl: 300000, // 5 minutes in milliseconds
        maxAge: 3600000     // 1 hour in milliseconds
    },

    // Security settings
    security: {
        tokenKey: 'auth_token',
        userKey: 'current_user',
        refreshTokenKey: 'refresh_token',
        tokenExpirationBuffer: 300000 // 5 minutes buffer before token expires
    }
};
