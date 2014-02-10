/*global define, describe, before, beforeEach, afterEach, it, assert */

define([
    'squire',
    'sinon'
], function (Squire, sinon) {

    'use strict';

    var injector = new Squire(), Cell;

    describe('The Cell ViewModel', function () {

        before(function (done) {

            injector.mock({});

            injector.require([
                'viewModels/cellViewModel'
            ], function (CellViewModel) {
                Cell = CellViewModel;
                done();
            });

        });

        beforeEach(function () {
            var cells = [], rows = [];
            for (var i = 0; i < 10; i++) {
                cells = [];
                for (var j = 0; j < 10; j++) {
                    cells.push({
                        alive: false,
                        position: j,
                        row: i
                    });
                }
                rows.push({
                    position: i,
                    cells: cells
                });
            }
            this.rows = rows;
            this.cell = new Cell();
        });

        afterEach(function () {
            this.cell.unsubscribeAll();
        });

        describe('when a cell is clicked', function () {
            it ('should become alive if it is dead', function () {
                this.cell.alive(false);
                this.cell.click();
                assert.ok(this.cell.alive());
            });
            it ('should die if it is alive', function () {
                this.cell.alive(true);
                this.cell.click();
                assert.ok(!this.cell.alive());
            });
        });

        describe('when the JSON is requested from the cell', function () {
            it ('should return the alive state as a number', function () {
                this.cell.alive(false);
                assert.equal(this.cell.toJSON().alive, 0);
                this.cell.alive(true);
                assert.equal(this.cell.toJSON().alive, 1);
            });
            it ('should return the position of the cell', function () {
                this.cell.position(10);
                assert.equal(this.cell.toJSON().position, 10);
            });
        });

        describe('when we get the living neighbors', function () {
            it ('should return no neighbors if all of the neighbors are dead', function () {
                this.cell.position(3);
                this.cell.row(2);
                this.rows[this.cell.row()].cells[this.cell.position()].alive = true;
                assert.ok(!this.cell.getLivingNeighbors(this.rows));
            });
            it ('should return one neighbor if there is one to the left', function () {
                this.cell.position(3);
                this.cell.row(2);
                this.rows[this.cell.row()].cells[this.cell.position() - 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position()].alive = true;
                assert.ok(this.cell.getLivingNeighbors(this.rows));
            });
            it ('should return two neighbors if there is one to the left and one is to the right', function () {
                this.cell.position(3);
                this.cell.row(2);
                this.rows[this.cell.row()].cells[this.cell.position() - 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position() + 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position()].alive = true;
                assert.equal(this.cell.getLivingNeighbors(this.rows), 2);
            });
            it ('should return three neighbors if there is one to the left and one is to the right and one is on top', function () {
                this.cell.position(3);
                this.cell.row(2);
                this.rows[this.cell.row() - 1].cells[this.cell.position()].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position() - 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position() + 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position()].alive = true;
                assert.equal(this.cell.getLivingNeighbors(this.rows), 3);
            });
            it ('should return four neighbors if there is one to the left and one is to the right and one is on top and one is underneath', function () {
                this.cell.position(3);
                this.cell.row(2);
                this.rows[this.cell.row() - 1].cells[this.cell.position()].alive = true;
                this.rows[this.cell.row() + 1].cells[this.cell.position()].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position() - 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position() + 1].alive = true;
                this.rows[this.cell.row()].cells[this.cell.position()].alive = true;
                assert.equal(this.cell.getLivingNeighbors(this.rows), 4);
            });
        });

        describe('when the generation is incremented', function () {
            it ('should be set to false if there are no neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(0);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should be set to false if there is one neighbor', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(1);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should stay the same if there are two neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(2);
                this.cell.alive(false);
                this.cell.publish('generation.next', { rows: []});
                assert.ok(!this.cell.alive());
                this.cell.alive(true);
                this.cell.publish('generation.next', { rows: []});
                assert.ok(this.cell.alive());
            });
            it ('should be set to true if there three neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(3);
                this.cell.alive(false);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(this.cell.alive());
            });
            it ('should be set to false if there are four neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(4);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should be set to false if there are five neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(5);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should be set to false if there are six neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(6);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should be set to false if there are seven neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(7);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
            it ('should be set to false if there are eight neighbors', function () {
                this.cell.getLivingNeighbors = sinon.stub().returns(8);
                this.cell.alive(true);
                this.cell.publish('generation.next', {rows: []});
                assert.ok(!this.cell.alive());
            });
        });

    });

});