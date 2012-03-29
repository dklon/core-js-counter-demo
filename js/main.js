require([
    'core/app',
    
    'config/routing',
    'config/templating',
    
    'app/infrastructure/ticker_module',
    'app/infrastructure/counter_module',
    
    'app/controllers/home_controller'
], function(app, routingConfig, templatingConfig) {

    app.initialize({
        routing: routingConfig,
        templating: templatingConfig
    });

});