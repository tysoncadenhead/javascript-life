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