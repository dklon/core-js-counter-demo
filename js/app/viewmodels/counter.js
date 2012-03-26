define([], function() {
    
    var Counter = function(sandbox) {
        this._sandbox = sandbox;
        
        this.count = ko.observable(0);
        this.paused = ko.observable(false);
        
        this["@Counter.changed"] = function(count) {
            this.count(count);
        };
    };
    
    Counter.prototype.pause = function() {
        this._sandbox.counter.pause();
        this.paused(true);
    };
        
    Counter.prototype.resume = function() {
        this._sandbox.counter.resume();
        this.paused(false);
    };

    return Counter;
});