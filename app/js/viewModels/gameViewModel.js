/*global define */

define([
    'underscore',
    'lib/baseViewModel',
    'viewModels/boardViewModel',
    'data/initialConfig'
], function (_, ViewModel, BoardViewModel, initialConfig) {

    'use strict';

    /**
    * @class GameViewModel
    */
    return ViewModel.extend({

        observables: {
            rows: 0,
            cells: 0,
            generations: [],
            playing: false,
            settingsVisible: false
        },

        onChange: {

            /**
            * @event
            * @param {Int} number
            */
            'rows': function (number) {
                this.generations([]);
                this.publish('rows.update', parseInt(number, 10));
                if (typeof number === 'string') {
                    this.publish('cells.update', parseInt(this.cells(), 10));
                }
            },

            /**
            * @event
            * @param {Int} number
            */
            'cells': function (number) {
                this.generations([]);
                this.publish('cells.update', parseInt(number, 10));
            }
        },

        /**
        * @method settings
        */
        settings: function () {
            this.settingsVisible(!this.settingsVisible());
        },

        /**
        * @method previous
        */
        previous: function () {
            if (this.generations().length) {
                this.publish('generation.previous', _.last(this.generations()));
                this.generations.pop();
            }
        },

        /**
        * @method next
        */
        next: function () {
            this.generations.push(this.board.toJSON());
            this.publish('generation.next', _.last(this.generations()));
        },

        /**
        * @method stop
        */
        stop: function () {
            clearInterval(this.playing());
            this.playing(false);
        },

        /**
        * @method play
        */
        play: function () {
            if (this.playing()) {
                this.stop();
            } else {
                this.playing(
                    setInterval(function () {
                        this.next();
                        if (!this.board.alive()) {
                            this.stop();
                        }
                    }.bind(this), 25)
                );
            }
        },

        /**
        * @method initalConfig
        */
        initialConfig: function () {
            for (var i = 0; i < initialConfig.length; i++) {
                this.publish('cell.live', initialConfig[i]);
            }
        },

        /**
        * @method init
        */
        init: function () {
            this.board = new BoardViewModel();
            this.rows(20);
            this.cells(40);
            this.initialConfig();
        }

    });

});