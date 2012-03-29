require([
    'core/app',
    
    'config/routing',
    'config/templating',
    
    'app/modules/ticker_module',
    'app/modules/counter_module',
    
    'app/controllers/home_controller'
], function(app, routingConfig, templatingConfig) {

    app.initialize({
        routing: routingConfig,
        templating: templatingConfig
    });

});