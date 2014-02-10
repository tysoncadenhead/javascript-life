/* global mocha, require, requirejs */
require(['../app/js/config'], function () {

    'use strict';

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
        'assert'
    ], function () {

        mocha.setup('bdd');
        require([
            'specs.js'
        ], function () {
            mocha.run();
        });
    });

});
