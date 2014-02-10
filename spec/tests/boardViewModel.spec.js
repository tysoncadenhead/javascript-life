/*global define, describe, before, beforeEach, afterEach, it, assert */

define([
    'squire',
    'sinon'
], function (Squire, sinon) {

    'use strict';

    var injector = new Squire(), Board;

    describe('The Board ViewModel', function () {

        before(function (done) {

            injector.mock({
                'viewModels/rowViewModel': sinon.stub().returns({
                    toJSON: sinon.stub().returns({}),
                    alive: sinon.stub().returns(true)
                })
            });

            injector.require([
                'viewModels/boardViewModel'
            ], function (BoardViewModel) {
                Board = BoardViewModel;
                done();
            });

        });

        beforeEach(function () {
            this.board = new Board();
        });

        afterEach(function () {
            this.board.unsubscribeAll();
        });

        describe('when there is a message published to update the number of rows on the board', function () {
            it ('should update the number of rows', function () {
                this.board.publish('rows.update', 22);
                assert.equal(this.board.rows().length, 22);
            });
        });

        describe('when we convert the board to JSON', function () {
            it ('should return a valid JSON object', function () {
                this.board.publish('rows.update', 23);
                assert.equal(this.board.toJSON().rows.length, 23);
            });
        });

    });

});