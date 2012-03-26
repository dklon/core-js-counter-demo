define([], function() {

    var router = new Backbone.Router();
    
    router.route("test/:id", "test", function(id) { alert("test: " + id); });
    
    return {
        start: function() {
            Backbone.history.start();
        },
        route: function(route, name, callback) {
            router.route(route, name, callback);
        }
    };

});