requirejs.config({
    'baseUrl': '/js',
    'paths': {
        'knockout': 'bower_components/knockout.js/knockout',
        'jquery': 'bower_components/jquery/jquery',
        'bootstrap': 'bower_components/bootstrap/dist/js/bootstrap',
        'underscore': 'bower_components/underscore/underscore',
        'ko.ninja': 'bower_components/ko.ninja/dist/ko.ninja.min',
        'postal': 'bower_components/postal.js/lib/postal'
    },
    'shim': {
        'underscore': {
            'exports': '_'
        }
    }
});