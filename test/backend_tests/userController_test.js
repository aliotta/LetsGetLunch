'use strict';

var Promise         = require('bluebird');
var express         = require('express');
var request         = require('supertest');
var sinon           = require('sinon');
var expect          = require('chai').expect;
var app             = express();
var _               = require('lodash');
var UserController  = require('../../controllers/user');


describe('User Controller Unit', function() {
    var userController;
    var sandbox = sinon.sandbox.create();
    describe('getRandom', function() {
        var mockUser = {firstName: 'Robert', lastName: 'Redford', available: true};


        function testSize(size, available){
            var mockUserData = [];
            for (var i = 0; i < size; i++) {
                mockUserData.push(mockUser);
            };
    
            //restore so next loop through wont throw
            sandbox.restore();
            //stub out the db call
            sandbox.stub(app, "get", (getTarget) => {
                var returnValue = {};
                switch (getTarget) {
                    case 'knex':  
                        returnValue = function(){
                            return {select: function(){ return Promise.resolve(mockUserData) }};
                        }              
                    default:
                // do nothing
                }
                return returnValue
            });
            userController = new UserController(app);
            return userController.getRandom()
            .then(function(users){
                //check how many buckets we have
                if (!available) {
                    console.log("unavailable", available, users)

                    expect(users.length === 0 ).to.equal(true);
                }
                for (var i = 0; i < users.length; i++) {
                    expect(users.length).to.equal(Math.ceil(size/5))

                    //check that each bucket fits the size requirement
                    if(available){
                        console.log("available", available)
                        expect(users[i].length >= 3).to.equal(true);
                        expect(users[i].length <= 5).to.equal(true);
                    }
                    else {
                        throw new Error('how did we even get here');
                    }
                    
                };
            });
        }

        afterEach(function(){
            mockUser = {firstName: 'Robert', lastName: 'Redford', available: true};
        });

        it('getRandom returns groups of maximum size 5 and minimum size 3 when there are enough users for one group', function() {
            var promises = [];
            var sizesToTest = 5;
            //start test at 3 because this is the minimum user size to meet the size requirments
            for (var i = 3; i < sizesToTest; i++) {
                promises.push(testSize.bind(null, i, true));
            };
            return Promise.mapSeries(promises, function(promise){
                return promise();
            });
        });

        it('getRandom scrubs out unavailable users', function() {
            mockUser = {firstName: 'Robert', lastName: 'Redford', available: false};
            var promises = [];
            var sizesToTest = 40;
            //start test at 3 because this is the minimum user size to meet the size requirments
            for (var i = 3; i < sizesToTest; i++) {
                promises.push(testSize.bind(null, i, false));
            };
            return Promise.mapSeries(promises, function(promise){
                return promise();
            });
        });
    });
});
