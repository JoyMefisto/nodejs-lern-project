'use srtict';

const path = require('path');

module.exports = {
    version: process.env.APP_VERSION,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV,
    sessionSecret: 'Hamm3Jfe1UIweB9',
    paths: {
        views: path.resolve(__dirname, '..', 'views'),
        public: path.resolve(__dirname, '..', 'public'),
        favicon: path.resolve(__dirname, '..', 'public', 'favicon.png'),
        lib: path.resolve(__dirname, '..', 'node_modules')
    },
    mongodbUrl: 'mongodb://localhost:27017/game-tournaments'
};