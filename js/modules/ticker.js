define([
    'core/app'
], function(app) {

    app.core.define('Ticker', function(sandbox) {
    
        var tick = function() {
            module.publish("tick");
        }, interval = null;
    
        var module = {
        
            "!!Application.extend(ticker)": {
                start: 'start',
                stop: 'stop'
            },
        
            "@Application.initialize": function() {
                this.start();
            
                this.ready();
            },
            
            start: function() {
                sandbox.log.notice('Starting ticker');
                
                if (interval == null) {
                    interval = setInterval(tick, 1000);
                } else {
                    sandbox.log.notice('Ticker has already started');
                }
            },
            
            stop: function() {
                sandbox.log.notice('Stopping ticker');

                if (interval != null) {
                    clearInterval(interval);
                    interval = null;
                } else {
                    sandbox.log.notice('Ticker is already stopped');
                }
            }
        };
        
        return module;
    
    });

});