define([], function() {
    
    var Counter = function() {
        this.count = ko.observable(0);
        this.paused = ko.observable(false);
    };
    
    Counter.prototype.pause = function() {
        sandbox.counter.pause();
        this.paused(true);
    };
        
    Counter.prototype.resume = function() {
        sandbox.counter.resume();
        this.paused(false);
    };
    
    return Counter;
});