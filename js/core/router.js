define([], function() {

    var router = new Backbone.Router();
    
    return {
        start: function() {
            Backbone.history.start();
        },
        route: function(route, name, callback) {
            router.route(route, name, callback);
        }
    };

});