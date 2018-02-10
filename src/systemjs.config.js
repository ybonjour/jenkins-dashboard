SystemJS.config({
    map: {
        "jquery": "node_modules/jquery/dist/jquery.min.js",
        "plugin-babel": "node_modules/systemjs-plugin-babel/plugin-babel.js",
        "systemjs-babel-build": "node_modules/systemjs-plugin-babel/systemjs-babel-browser.js"
    },
    transpiler: "plugin-babel",
    packages: {
        "app": { defaultExtension: "js" }
    }
});