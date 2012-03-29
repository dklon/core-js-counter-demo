define([
    'lib/user/templating_engine',
    'text!app/templates/master.htm'
], function(templatingEngine, masterTmpl) {

    var config = {
        engine: templatingEngine,
        defaultMaster: masterTmpl
    };
    
    return config;

});