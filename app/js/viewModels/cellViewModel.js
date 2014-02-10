/*global define */

define([
    'lib/baseViewModel'
], function (ViewModel) {

    'use strict';

    /**
    * @class CellViewModel
    */
    return ViewModel.extend({


        observables: {
            alive: false,
            position: 0,
            row: 0,
            hasLived: false
        },

        subscriptions: {

            /**
            * Resets the cells to be dead and never alive
            * @event
            */
            'cells.reset': function () {
                this.hasLived(false);
                this.alive(false);
            },

            /**
            * Randomly makes the cell alive or dead. There is a one in four chance it will be alive
            * @event
            */
            'generation.random': function () {
                var number = Math.floor(Math.random() * 6) + 1;
                this.hasLived(false);
                this.alive((number === 4));
            },

            /**
            * Published when we want to see a previous generation
            * @event
            * @param {Object} data
            */
            'generation.previous': function (data) {
                this.alive(data.rows[this.row()].cells[this.position()].alive);
            },

            /**
            * Published when we want to see the next generation
            * @event
            * @param {Object} data
            */
            'generation.next': function (data) {
                switch(this.getLivingNeighbors(data.rows)) {
                    case 2:
                        break;
                    case 3:
                        this.alive(true);
                        break;
                    default:
                        this.alive(false);
                        break;
                }
            },

            /**
            * Published from the game to set certain cells as live before there is any user input
            * @event
            * @param {Array} data
            */
            'cell.live': function (data) {
                if (data[0] === this.row() && data[1] === this.position()) {
                    this.alive(true);
                }
            }

        },

        onChange: {

            /**
            * When the alive state changes, if it is set to true, we can determine that the cell has lived at one time
            * @event
            */
            'alive': function (alive) {
                if (alive) {
                    this.hasLived(true);
                }
            }
        },

        /**
        * Toggle the alive observable boolean
        * @method click
        */
        click: function () {
            this.alive(!this.alive());
        },

        /**
        * Converts the cell to JSON for easier saving and publishing
        * @method toJSON
        */
        toJSON: function () {
            return {
                alive: !!this.alive(),
                position: this.position(),
                row: this.row()
            };
        },

        /**
        * Returns the number of neighbors to the cell
        * @method getNeighbors
        * @param {Array} rows
        */
        getLivingNeighbors: function (rows) {

            if (!rows[this.row()]) {
                return;
            }

            var livingCount = 0,
                neighbors = [
                    rows[this.row()].cells[this.position() - 1],
                    rows[this.row()].cells[this.position() + 1]
                ];

            // Get the cell on top of this cell
            if (rows[this.row() - 1]) {
                neighbors.push(rows[this.row() - 1].cells[this.position()]);
                neighbors.push(rows[this.row() - 1].cells[this.position() - 1]);
                neighbors.push(rows[this.row() - 1].cells[this.position() + 1]);
            }

            // Get the cell beneath this cell
            if (rows[this.row() + 1]) {
                neighbors.push(rows[this.row() + 1].cells[this.position()]);
                neighbors.push(rows[this.row() + 1].cells[this.position() - 1]);
                neighbors.push(rows[this.row() + 1].cells[this.position() + 1]);
            }

            // Loop over the neighbors and increment the living count
            for (var i = 0; i < neighbors.length; i++) {
                if (neighbors[i] && neighbors[i].alive) {
                    livingCount++;
                }
            }
            return livingCount;
        }

    });

});