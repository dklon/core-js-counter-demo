define([
    'text!app/templates/master.htm'
], function(masterTmpl) {

    var config = {
        module: 'Templates',
        defaultMaster: { name: 'master', template: $(masterTmpl) },
        defaultSection: 'content',
        defaultBindings: {
            header: { name: 'header', data: { foo: 'bar' } }
        }
    };
    
    return config;

});