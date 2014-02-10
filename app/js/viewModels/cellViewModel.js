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
            row: 0
        },

        subscriptions: {

            /**
            * @event
            * @param {Object} data
            */
            'generation.previous': function (data) {
                this.alive(data.rows[this.row()].cells[this.position()].alive);
            },

            /**
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
            * @event
            * @param {Array} data
            */
            'cell.live': function (data) {
                if (data[0] === this.row() && data[1] === this.position()) {
                    this.alive(true);
                }
            }

        },

        /**
        * @method click
        */
        click: function () {
            this.alive(!this.alive());
        },

        /**
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
        * @method getNeighbors
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