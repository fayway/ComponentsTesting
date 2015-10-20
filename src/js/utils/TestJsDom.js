define([], function () {

    window.onModulesLoaded();

    return {
        sayHello: function (callback) {
            console.log('Hello from TestJsDom of RequireJS');
            if (callback) {
                callback();
            }
        }
    }
})