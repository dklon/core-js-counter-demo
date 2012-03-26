define([
    'core/mediator',
    'core/router'
], function(mediator, router) {

    var _modules = {};
    
    var app = {
        initialize: function() {
            _.each(_modules, function(srcModule) {
                _.each(srcModule.extensions, function(ext, extName) {
                    _.each(_modules, function(tgtModule) {
                        var sandbox = tgtModule.sandbox;
                        
                        sandbox[extName] = {};

                        _.each(ext, function(value, field) {
                            if (typeof value == 'string') {
                                sandbox[extName][field] = function() {
                                    return srcModule.module[value].apply(srcModule.module, arguments);
                                };
                            } else {
                                sandbox[extName][field] = value;
                            }
                        });
                    });
                });
                
                _.each(srcModule.templates, function(tmpl, name) {
                    mediator.publish("Template.initialize", [name, tmpl]);
                });
            });
            
            _modules.Counter.sandbox.counter.get();
        
            mediator.publish("Application.initialize");
            router.start();
            mediator.publish("Application.ready");
        }
    };
    
    app.sandbox = function(name) {
        return {
            publish: function(event, args) {
                mediator.publish(event, args);
            },
            subscribe: function(event, handler) {
                mediator.subscribe(event, handler);
            }
        };
    };
    
    var extend = function(name, ext, module) {
        _extensions[name] = {
            ext: ext,
            module: module
        };
    };
    
    app.core = {
    
        define: function(name, ctor) {
        
            // TODO: name checks
            
            var sandbox = app.sandbox(name),
                module = ctor(sandbox);
            
            _.each(module, function(fn, fnName) {
                var regex = /^@((\w+)\.)?(\w+)$/,
                    match = regex.exec(fnName);
                    
                if (match) {
                    if (typeof fn == 'function') {
                        var eventScope = match[2],
                            eventName = match[3],
                            fullEventName = (eventScope ? eventScope : moduleName)
                                + "." + eventName;
                        
                        mediator.subscribe(fullEventName, module, fn);
                    } else {
                        // TODO: error
                    }
                }
            });
            
            var extensions = {},
                templates = {};
            
            _.each(module, function(drArg, dr) {
                var regex = /^!!(.*)\((.*)\)$/,
                    match = regex.exec(dr);
                    
                if (match) {
                    var drName = match[1],
                        drArgs = match[2].replace(/\s/g, '').split(',');
                    
                    if (drName == "Application.extend") {
                        extensions[drArgs[0]] = drArg;
                    } else if (drName == "Application.controller") {
                        _.each(drArg.routes, function(name, route) {
                            var callback = module[name];
                    
                            router.route(route, name, function() {
                                // app.context.start();
                                callback.apply(module, arguments);
                            });
                        });
                        
                        _.each(drArg.templates, function(tmpl, name) {
                            templates[name] = tmpl;
                        });
                    }
                }
            });

            module.publish = function(event, args) {
                mediator.publish(name + '.' + event, args);
            };
            
            module.ready = function() {
                mediator.publish(name + '.ready', [module]);
            };
            
            // TODO: directives
            
            _modules[name] = {
                module: module,
                sandbox: sandbox,
                extensions: extensions,
                templates: templates
            };
        
        }
    
    };
    
    return app;

});