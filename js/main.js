require([
    'core/app',
    
    'app/infrastructure/ko_module',
    'app/infrastructure/ticker_module',
    'app/infrastructure/counter_module',
    'app/infrastructure/logger_module',
    
    'app/controllers/home_controller'
], function(app) {

    app.initialize({
        permissions: {
            '*Controller': [
                'TemplateModule'
            ],
            'HomeController': [
                'Ticker'
            ]
        }
    });

});