define([
    'core/app'
], function(app) {

    app.core.define('Ticker', function(sandbox) {
    
        var tick = function() {
            module.publish("tick");
        }, interval = null;
    
        var module = {
        
            "@Application.initialize": function() {
                this.start();            
                this.ready();
            },
            
            "@Ticker.start": function() {
                this.start();
            },
            
            "@Ticker.stop": function() {
                this.stop();
            },
            
            start: function() {
                // app.log.notice('Starting ticker');
                
                if (interval == null) {
                    interval = setInterval(tick, 1000);
                } else {
                    // app.log.notice('Ticker has already started');
                }
            },
            
            stop: function() {
                // app.log.notice('Stopping ticker');

                if (interval != null) {
                    clearInterval(interval);
                    interval = null;
                } else {
                    // app.log.notice('Ticker is already stopped');
                }
            }
        };
        
        return module;
    
    });

});