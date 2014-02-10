require.config({
    paths: {
        'underscore': '../bower_components/underscore/underscore',
        'knockout': '../bower_components/knockout.js/knockout'
    },
    shim: {
        'underscore': {
            exports: '_'
        }
    }
});

define([
    'underscore',
    'knockout',
    'ko.ninja.viewModel',
    'ko.ninja.model'
], function (_, ko, ViewModel, Model) {
    ko.ViewModel = ViewModel;
    ko.Model = Model;
    return ko;
});