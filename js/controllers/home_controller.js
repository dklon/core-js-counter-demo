define([
    'core/app',
    'text!templates/home.htm'
], function(app, homeTmpl) {

    app.core.define('HomeController', function(sandbox) {
    
        var viewModel = {
            count: ko.observable(0),

            paused: ko.observable(false),
            
            pause: function() {
                sandbox.counter.pause();
                this.paused(true);
            },
            
            resume: function() {
                sandbox.counter.resume();
                this.paused(false);
            }
        };
    
        var controller = {
        
            "!!Application.controller()": {

                routes: {
                    "":        "index"
                },
                
                templates: {
                    "home-tmpl": $(homeTmpl)
                }

            },
            
            "@Counter.changed": function(count) {
                viewModel.count(count);
            },
        
            index: function() {
                /*var viewModel = {
                    count: ko.observable(sandbox.counter.get()),
                    
                    state: ko.observable('paused'),

                    "@Counter.change": function(count) {
                        this.count(count);
                    },
                    
                    "@Ticker.start": function() {
                        this.state('counting');
                    },
                    
                    "@Ticker.pause": function() {
                        this.state('paused');
                    }
                };
                
                this.subscribe(viewModel);
                
                sandbox.ticker.start();*/

                // app.renderView('timer-tmpl');
                
                sandbox.tmpl.render('home-tmpl', viewModel);
            }            
        };
        
        return controller;
    
    });

});