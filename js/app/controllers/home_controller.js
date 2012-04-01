define([
    'core/app',
    'app/viewmodels/counter',
    'text!app/templates/home.htm',
    'text!app/templates/master.htm',
    'text!app/templates/header.htm'
], function(app, Counter, homeTmpl, masterTmpl, headerTmpl) {

    app.core.define('HomeController', function(sandbox) {
    
        var controller = {
        
            "!!Application.controller()": {

                routes: {
                    "":        "index"
                },
                
                templates: {
                    "home-tmpl": $(homeTmpl),
                    "master": $(masterTmpl),
                    "header": $(headerTmpl)
                }
            },
            
            "@Application.initialize": function() {
                this.ready();
            },
            
            index: function() {
                var counter = new Counter();                
                sandbox.bindSubscriptions(counter);
                
                app.tmpl.renderPage({ content: { name: 'home-tmpl', data: counter } });
                
                //app.tmpl.renderView('home-tmpl', counter);
            }            
        };
        
        return controller;
    
    });

});