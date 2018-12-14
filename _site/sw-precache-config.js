module.exports = {
    navigateFallback: '/index.html',
    stripPrefix: '_site',
    root: '_site/',
    staticFileGlobs: [
        '_site/index.html',
        '_site/**/index.html',
        '_site/**/*.js',
        '_site/**/*.css',
        '_site/assets/**/*.svg',
        '_site/assets/**/*.png',
        '_site/assets/**/*.jpg'
    ]
};
