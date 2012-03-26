define([
    'core/app'
], function(app) {

    app.core.define('Counter', function(sandbox) {
    
        var count = 0;
        
        var module = {
        
            // directives
            
            "!!Application.extend(counter)": {
                inc: 'inc',
                get: 'get',
                pause: 'pause',
                resume: 'resume'
            },
            
            
            // subscriptions
            
            "@Application.initialize": function() {
                this.ready();
            },
            
            "@Counter.reset": function() {
                counter = 0;
            },
            
            "@Ticker.tick": function() {
                this.inc();
            },
            
            
            // implementation
            
            inc: function() {
                ++count;
                this.publish('changed', [count]);
            },
            
            get: function() {
                return count;
            },
            
            pause: function() {
                sandbox.ticker.stop();
            },
            
            resume: function() {
                sandbox.ticker.start();
            }
        };
        
        return module;
    
    });

});