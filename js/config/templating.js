define([
    'app/master_view'
], function(masterView) {

    var config = {
        renderView: function(viewName, viewModel) {
            masterView.render();
            $('#content').html($(
                "<div class='master-content' data-bind='template: \"" + viewName + "\"'></div>"
            ));
            var newItem = $('.master-content');
            ko.applyBindings(viewModel ? viewModel : {}, newItem[0]);
        },
    
        registerTemplate: function(name, tmpl) {
            tmpl.attr("id", name);
            $('html').append(tmpl);
            console.log("template " + name + " initialized");
        },
        
        initialize: function() {
            ko.underscoreTemplateEngine = function () { };
            
            ko.underscoreTemplateEngine.prototype = ko.utils.extend(new ko.templateEngine(), {
                renderTemplateSource: function (templateSource, bindingContext, options) {
                    // Precompile and cache the templates for efficiency
                    var precompiled = templateSource['data']('precompiled');
                    if (!precompiled) {
                        precompiled = _.template("<% with($data) { %> " + templateSource.text() + " <% } %>");
                        templateSource['data']('precompiled', precompiled);
                    }
                    
                    // bindingContext['$app'] = app;
                    
                    // Run the template and parse its output into an array of DOM elements
                    var renderedMarkup = precompiled(bindingContext).replace(/\s+/g, " ");
                    return ko.utils.parseHtmlFragment(renderedMarkup);
                },
                createJavaScriptEvaluatorBlock: function(script) {
                    return "<%= " + script + " %>";
                }
            });
            
            ko.setTemplateEngine(new ko.underscoreTemplateEngine());
        }
    };
    
    return config;

});