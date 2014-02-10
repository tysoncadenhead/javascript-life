/*global define, describe, before, beforeEach, afterEach, it, assert */

define([
    'squire',
    'sinon'
], function (Squire, sinon) {

    'use strict';

    var injector = new Squire(), Game;

    describe('The Game ViewModel', function () {

        this.timeout(5000);

        before(function (done) {

            injector.mock({
                'viewModels/boardViewModel': sinon.stub().returns({
                    toJSON: sinon.stub().returns({})
                }),
                'data/initialConfig': sinon.stub().returns([])
            });

            injector.require([
                'viewModels/gameViewModel'
            ], function (GameViewModel) {
                Game = GameViewModel;
                done();
            });

        });

        beforeEach(function () {
            this.game = new Game();
        });

        afterEach(function () {
            this.game.unsubscribeAll();
        });

        describe('when the number of rows are updated', function () {
            it ('should publish a message to let us know the rows have changed', function (done) {
                this.game.subscribe('rows.update', function (number) {
                    assert.equal(number, 41);
                    done();
                });
                this.game.rows(41);
            });
        });

        describe('when the number of cells are updated', function () {
            it ('should publish a message to let us know the cells have changed', function (done) {
                this.game.subscribe('cells.update', function (number) {
                    assert.equal(number, 31);
                    done();
                });
                this.game.cells(31);
            });
        });

        describe('when the next button is clicked', function () {
            it ('should publish a message to let the cells know to go to the next generation', function (done) {
                this.game.subscribe('generation.next', function (generation) {
                    assert.equal(typeof generation, 'object');
                    done();
                });
                this.game.next();
            });
        });

        describe('when the previous button is clicked', function () {
            it ('should publish a message to let the cells know to go to the previous generation', function (done) {
                this.game.next();
                this.game.next();
                this.game.subscribe('generation.previous', function (generation) {
                    assert.equal(typeof generation, 'object');
                    done();
                });
                this.game.previous();
            });
        });

    });

});