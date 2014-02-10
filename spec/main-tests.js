/* global mocha, require, requirejs */
require(['../app/js/config'], function () {

    requirejs.config({
        baseUrl: '../app/js',
        paths: {
            assert: 'bower_components/assert/assert',
            squire: 'bower_components/squire/src/Squire',
            sinon: '../../spec/lib/sinon'
        },
        shim: {
            'sinon': {
                'exports': 'sinon'
            }
        }
    });

    require([
        'underscore',
        'assert',
        'knockout'
    ], function (_, assert, ko) {

        mocha.setup('bdd');
        require([
            'specs.js'
        ], function () {
            mocha.run();
        });
    });

});
