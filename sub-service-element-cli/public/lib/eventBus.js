(function (root) {
    if (root.eventBus) return;
    root.eventBus = new Vue();
})(window)