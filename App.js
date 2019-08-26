var app;

function setupMiddleware() {
    app.use(Sample.getMiddleWare());
}

function App() {
    if (undefined === app) {
        // see https://github.com/coderofsalvation/Gexpress
        app = new Gexpress.App();
        setupMiddleware();
    }

    return app;
}

function doGet(request) { return App().doGet(request) }
function doPost(request) { return App().doPost(request) }

