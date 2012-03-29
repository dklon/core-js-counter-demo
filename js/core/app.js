define([
    'core/mediator'
], function(mediator) {

    var _modules = {};
    
    var _routingEngine,
        _templatingEngine;
    
    var app = {
        initialize: function(config) {
        
            if (config.templating) {
                _templatingEngine = config.templating.engine;
                
                app.tmpl = {
                    renderView: _templatingEngine.renderView
                };
                
                if (config.templating.defaultMaster) {
                    _templatingEngine.registerMaster('default', config.templating.defaultMaster);
                }
                
                _templatingEngine.initialize();
            }
            
            if (config.routing) {
                _routingEngine = config.routing.engine;
                
                _routingEngine.initialize();
            }
            
/*            if (config.logging) {
                var log = {};
                
                _.each(config.logging.severityLevels, function(_, severityLevel) {
                    log[severityLevel] = function(message) {
                        var timestamp = new Date(),
                            formattedMessage = config.logging.formatMessage(message, severityLevel, timestamp);
                        
                        config.logging.log(message, severityLevel, timestamp, formattedMessage);
                        console.log(formattedMessage);
                    };
                });
            
                if (config.logging.initialize) {
                    config.logging.initialize();
                }
                
                app.log = log;
            }*/
        
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
                    _templatingEngine.registerTemplate(name, tmpl);
                    // mediator.publish("Template.initialize", [name, tmpl]);
                });
                
                _.each(srcModule.routes, function(route) {
                    _routingEngine.route(route.route, route.name, function() {
                        // app.context.start();
                        route.callback.apply(srcModule, arguments);
                    });
                });
            });
            
            mediator.publish("Application.initialize");
            
            if (_routingEngine) {
                _routingEngine.start();
            }
            
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
            },
            bindSubscriptions: function(obj) {
                _.each(obj, function(fn, fnName) {
                    var regex = /^@((\w+)\.)?(\w+)$/,
                        match = regex.exec(fnName);
                        
                    if (match) {
                        if (typeof fn == 'function') {
                            var eventScope = match[2],
                                eventName = match[3],
                                fullEventName = (eventScope ? eventScope : name)
                                    + "." + eventName;
                            
                            mediator.subscribe(fullEventName, obj, fn);
                        } else {
                            // TODO: error
                        }
                    }
                });
                
                obj.publish = function(event, args) {
                    var fullEventName = /.*\..*$/.exec(event)
                        ? event
                        : name + '.' + event;

                    mediator.publish(fullEventName, args);
                };
                
                return obj;
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
            
            sandbox.bindSubscriptions(module);
            
            var extensions = {},
                templates = {},
                routes = [];
            
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
                            
                            routes.push({ name: name, route: route, callback: callback });
                    
                        });
                        
                        _.each(drArg.templates, function(tmpl, name) {
                            templates[name] = tmpl;
                        });
                    }
                }
            });

            module.ready = function() {
                mediator.publish(name + '.ready', [module]);
            };
            
            // TODO: directives
            
            _modules[name] = {
                module: module,
                sandbox: sandbox,
                extensions: extensions,
                templates: templates,
                routes: routes
            };
        
        }
    
    };
    
    return app;

});