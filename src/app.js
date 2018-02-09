requirejs.config({
    baseUrl: 'lib',
    paths: {
        app: '../app',
        jquery: 'jquery-3.3.1.min'
    }
});

requirejs(['app/main']);