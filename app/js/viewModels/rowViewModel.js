/*global define */

define([
    'underscore',
    'lib/baseViewModel',
    'viewModels/cellViewModel'
], function (_, ViewModel, CellViewModel) {

    'use strict';

    /**
    * @class RowViewModel
    */
    return ViewModel.extend({

        observables: {
            cells: [],
            position: 0,
            alive: function () {
                var count = 0;
                _.each(this.cells(), function (cell) {
                    if (cell.alive()) {
                        count++;
                    }
                });
                return count;
            }
        },

        subscriptions: {

            /**
            * @event
            */
            'cells.update': function (number) {
                var cells = [], i = 0;
                while (i < number) {
                    cells.push(new CellViewModel({
                        position: i,
                        row: this.position()
                    }));
                    i++;
                }
                this.cells(cells);
            }
        },

        /**
        * @method toJSON
        */
        toJSON: function () {
            var cells = [];
            _.each(this.cells(), function (cell) {
                cells.push(cell.toJSON());
            });
            return {
                position: this.position(),
                cells: cells
            };
        }

    });

});