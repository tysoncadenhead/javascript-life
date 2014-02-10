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
            * Fired when the rows observable changes
            * @event
            * @param {Int} number
            */
            'rows': function (number) {
                var rows = this.board.rows();
                this.generations([]);

                // Unsubscribe from all postal messages
                for (var i = 0; i < rows.length; i++) {
                    rows[i].unsubscribeAll();
                }

                this.publish('rows.update', parseInt(number, 10));
                if (typeof number === 'string') {
                    this.publish('cells.update', parseInt(this.cells(), 10));
                }
            },

            /**
            * Fired when the cells observable changes
            * @event
            * @param {Int} number
            */
            'cells': function (number) {
                var rows = this.board.rows();
                this.generations([]);

                // Unsubscribe from all postal messages
                for (var i = 0; i < rows.length; i++) {
                    for (var j = 0; j < rows[i].cells.length; j++) {
                        rows[i].cells[j].unsubscribeAll();
                    }
                }
                
                this.publish('cells.update', parseInt(number, 10));
            }
        },

        /**
        * Resets the board
        * @method reset
        */
        reset: function () {
            this.generations([]);
            this.publish('cells.reset');
        },

        /**
        * Randomly turn the cells on or off
        * @method random
        */
        random: function () {
            this.generations([]);
            this.publish('generation.random');
        },

        /**
        * Toggles the settings
        * @method settings
        */
        settings: function () {
            this.settingsVisible(!this.settingsVisible());
        },

        /**
        * Goes to the previous generation
        * @method previous
        */
        previous: function () {
            if (this.generations().length) {
                this.publish('generation.previous', _.last(this.generations()));
                this.generations.pop();
            }
        },

        /**
        * Goes to the next generation
        * @method next
        */
        next: function () {
            this.generations.push(this.board.toJSON());
            this.publish('generation.next', _.last(this.generations()));
        },

        /**
        * Stops the playing
        * @method stop
        */
        stop: function () {
            clearInterval(this.playing());
            this.playing(false);
        },

        /**
        * Starts the playing
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
        * Adds certain cells to be alive to start with based on an external array
        * @method initalConfig
        */
        initialConfig: function () {
            for (var i = 0; i < initialConfig.length; i++) {
                this.publish('cell.live', initialConfig[i]);
            }
        },

        /**
        * Initializes the game viewModel
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