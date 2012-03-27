require([
    'core/app',
    
    'config/logging',
    'config/templating',
    
    'app/infrastructure/ko_module',
    'app/infrastructure/ticker_module',
    'app/infrastructure/counter_module',
    'app/infrastructure/logger_module',
    
    'app/controllers/home_controller'
], function(app, loggingConfig, templatingConfig) {

    app.initialize({
        logging: loggingConfig,
        templating: templatingConfig
    });

});