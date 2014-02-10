/*global define */

define([
    'lib/baseViewModel',
    'viewModels/rowViewModel'
], function (ViewModel, RowViewModel) {

    'use strict';

    /**
    * @class BoardViewModel
    */
    return ViewModel.extend({

        observables: {

            rows: [],

            /**
            * Returns the number of cells in the rows that are alive
            * @ko.computed alive
            */
            alive: function () {
                var count = 0,
                    rows = this.rows();

                for (var i = 0; i < rows.length; i++) {
                    count += rows[i].alive();
                }
                return count;
            }

        },

        subscriptions: {

            /**
            * Published when we want to set the number of rows
            * @event
            * @param {Int} number
            */
            'rows.update': function (number) {
                var rows = [], i = 0;
                while (i < number) {
                    rows.push(new RowViewModel({
                        position: i
                    }));
                    i++;
                }
                this.rows(rows);
            }
        },

        /**
        * Converts the board to JSON
        * @method toJSON
        */
        toJSON: function () {
            var rows = [],
                rowsArr = this.rows();
            for (var i = 0; i < rowsArr.length; i++) {
                rows.push(rowsArr[i].toJSON());
            }
            return {
                rows: rows
            };
        }

    });

});