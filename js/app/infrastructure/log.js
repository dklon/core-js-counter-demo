define([
    'core/app'
], function(app) {

    app.core.define('Log', function(sandbox) {
    
        function log(msg) {
            console.log(msg + ' [' + new Date().toString() + ']');
        };
    
        var module = {
        
            "!!Application.extend(log)": {
                notice: 'notice',
                error: 'error'
            },
        
            notice: function(msg) {
                // notify server
                log('Notice: ' + msg);
            },
            
            error: function(msg) {
                // notify server
                log('Error: ' + msg);
            }
        };
        
        return module;
    
    });

});