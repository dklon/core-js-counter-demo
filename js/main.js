require([
    'core/app',
    
    'modules/infrastructure/ko',
    
    'modules/counter',
    'modules/ticker',
    'modules/log',
    
    'controllers/home_controller'
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