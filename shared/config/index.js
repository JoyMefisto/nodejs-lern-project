'use srtict';

const path = require('path');
const ROOT_PATH = path.resolve(__dirname, '..', '..');

module.exports = {
    version: process.env.APP_VERSION,
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV,
    sessionSecret: 'Hamm3Jfe1UIweB9',
    paths: {
        views: path.join(ROOT_PATH, 'main', 'views'),
        public: path.join(ROOT_PATH, 'shared', 'public'),
        favicon: path.join(ROOT_PATH, 'shared', 'public', 'favicon.png'),
        lib: path.join(ROOT_PATH, 'node_modules')
    },
    mongodbUrl: 'mongodb://localhost:27017/game-tournaments'
};