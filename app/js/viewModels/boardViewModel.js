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