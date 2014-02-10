/*global define, describe, before, beforeEach, afterEach, it, assert */

define([
    'squire',
    'sinon'
], function (Squire, sinon) {

    'use strict';

    var injector = new Squire(), Row;

    describe('The Row ViewModel', function () {

        before(function (done) {

            injector.mock({
                'viewModels/cellViewModel': sinon.stub().returns({
                    toJSON: sinon.stub().returns({}),
                    alive: sinon.stub().returns(false)
                })
            });

            injector.require([
                'viewModels/rowViewModel'
            ], function (RowViewModel) {
                Row = RowViewModel;
                done();
            });

        });

        beforeEach(function () {
            this.row = new Row();
        });

        afterEach(function () {
            this.row.unsubscribeAll();
        });

        describe('when there is a message published to update the number of items in the row', function () {
            it ('should update the number of cells', function () {
                this.row.publish('cells.update', 20);
                assert.equal(this.row.cells().length, 20);
            });
        });

        describe('when we convert the row to JSON', function () {
            it ('should return a valid JSON object', function () {
                this.row.publish('cells.update', 23);
                assert.equal(this.row.toJSON().cells.length, 23);
            });
            it ('should return the position of the row', function () {
                this.row.position(11);
                assert.equal(this.row.toJSON().position, 11);
            });
        });

    });

});