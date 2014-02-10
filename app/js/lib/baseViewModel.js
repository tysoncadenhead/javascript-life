/*global define */

define([
    'underscore',
    'ko.ninja',
    'postal'
], function (_, ko, postal) {

    'use strict';

    /**
    * @class BaseViewModel
    */
    _.extend(ko.ViewModel.prototype, {

        _subscriptions: {},

        /**
        * @method unsubscribe
        * @param {String} topic
        */
        unsubscribe: function (topic) {
            this._subscriptions[topic].unsubscribe();
            delete this._subscriptions[topic];
        },

        /**
        * @method unsubscribeAll
        */
        unsubscribeAll: function () {
            _.each(this._subscriptions, function (callback, topic) {
                this.unsubscribe(topic);
            }, this);
        },

        /**
        * @method publish
        * @param {String} topic
        * @param {Object} data
        */
        publish: function (topic, data) {
            postal.publish({
                topic: topic,
                data: data
            });
        },

        /**
        * @method subscribe
        * @param {String} topic
        * @function {Function} callback
        */
        subscribe: function (topic, callback) {
            this._subscriptions[topic] = postal.subscribe({
                topic: topic,
                callback: callback.bind(this)
            });
        },

        /**
        * @method initialize    
        */
        initialize: function (options) {

            // We can pass in an object of methods to detect when an observable changes
            if (this.onChange) {
                _.each(this.onChange, function (callback, name) {
                    this[name].subscribe(callback.bind(this));
                }, this);
            }

            // We can add an object of postal subscriptions
            if (this.subscriptions) {
                _.each(this.subscriptions, function (callback, topic) {
                    this.subscribe(topic, callback);
                }, this);
            }

            // If there is a method called "init", we will automatically call it
            if (typeof this.init === 'function') {
                this.init(options);
            }
        }

    });

    return ko.ViewModel;

});