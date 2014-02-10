/*global define */

define([
    'underscore',
    'lib/baseViewModel',
    'viewModels/rowViewModel'
], function (_, ViewModel, RowViewModel) {

    'use strict';

    /**
    * @class BoardViewModel
    */
    return ViewModel.extend({

        observables: {
            rows: [],
            alive: function () {
                var count = 0;
                _.each(this.rows(), function (row) {
                    count += row.alive();
                });
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
            var rows = [];
            _.each(this.rows(), function (row) {
                rows.push(row.toJSON());
            });
            return {
                rows: rows
            };
        }

    });

});