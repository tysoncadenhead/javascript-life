/*global require */

require(['config'], function () {

    'use strict';

    require([
        'knockout',
        'viewModels/gameViewModel'
    ], function (ko, GameViewModel) {
        
        // Apply the knockout.js bindings to the game-of-life element
        ko.applyBindings(
            new GameViewModel(),
            document.getElementById('game-of-life')
        );

    });
});