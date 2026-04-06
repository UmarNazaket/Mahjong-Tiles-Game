export const environment = {
    production: true,
    apiUrl: 'https://api.yourdomain.com/api',
    appName: 'Mahjong Tiles Game',
    version: '1.0.0',

    // Feature flags
    features: {
        enableAnalytics: true,
        enableLogging: false,
        enableNotifications: true
    },

    // Cache settings
    cache: {
        defaultTtl: 300000,
        maxAge: 3600000
    },

    // Security settings
    security: {
        tokenKey: 'auth_token',
        userKey: 'current_user',
        refreshTokenKey: 'refresh_token',
        tokenExpirationBuffer: 300000
    }
};
