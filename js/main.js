require([
    'core/app',
    
    'app/infrastructure/ko',
    'app/infrastructure/ticker',
    'app/infrastructure/counter',
    'app/infrastructure/log',
    
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