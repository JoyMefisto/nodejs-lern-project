'use srtict';

const path = require('path');

module.exports = {
    version: process.env.APP_VERSION,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV,
    paths: {
        views: path.resolve(__dirname, '..', 'views'),
        public: path.resolve(__dirname, '..', 'public'),
        lib: path.resolve(__dirname, '..', 'node_modules')
    },
    mongodbUrl: 'mongodb://localhost:27017/game-tournaments'
};