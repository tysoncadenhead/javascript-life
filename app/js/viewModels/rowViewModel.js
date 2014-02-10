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

            /**
            * Returns the number of cells in the row that are alive
            * @ko.computed alive
            */
            alive: function () {
                var count = 0,
                    cells = this.cells();

                for (var i = 0; i < cells.length; i++) {
                    if (cells[i].alive()) {
                        count++;
                    }
                }
                return count;
            }
        },

        subscriptions: {

            /**
            * Fired when the number of cells changes
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
        * Converts the row to JSON format
        * @method toJSON
        */
        toJSON: function () {
            var cells = [],
                cellsArr = this.cells();
            for (var i = 0; i < cellsArr.length; i++) {
                cells.push(cellsArr[i].toJSON());
            }
            return {
                position: this.position(),
                cells: cells
            };
        }

    });

});