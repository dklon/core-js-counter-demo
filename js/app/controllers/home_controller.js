define([
    'core/app',
    'app/viewmodels/counter',
    'text!app/templates/home.htm'
], function(app, Counter, homeTmpl) {

    app.core.define('HomeController', function(sandbox) {
    
        var controller = {
        
            "!!Application.controller()": {

                routes: {
                    "":        "index"
                },
                
                templates: {
                    "home-tmpl": $(homeTmpl)
                }

            },
            
            index: function() {
                var counter = new Counter();                
                sandbox.bindSubscriptions(counter);
                app.tmpl.renderView('home-tmpl', counter);
            }            
        };
        
        return controller;
    
    });

});