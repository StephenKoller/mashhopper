'use strict';
/*jshint expr: true*/
/**
 * Module dependencies.
 */
var expect = require('expect.js'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

//Globals
var user, user2;

//The tests
describe('<Unit Test>', function() {
    describe('Model User:', function() {
        before(function(done) {
            user = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });
            user2 = new User({
                name: 'Full name',
                email: 'test@test.com',
                username: 'user',
                password: 'password'
            });

            done();
        });

        describe('Method Save', function() {
            it('should begin with no users', function(done) {
                User.find({}, function(err, users) {
                    expect(users).to.have.length(0);
                    done();
                });
            });

            it('should be able to save whithout problems', function(done) {
                user.save(done);
            });

            it('should fail to save an existing user again', function(done) {
                user.save();
                return user2.save(function(err) {
                    expect(err).to.exist;
                    done();
                });
            });

            it('should be able to show an error when try to save without name', function(done) {
                user.name = '';
                return user.save(function(err) {
                    expect(err).to.exist;
                    done();
                });
            });
        });

        after(function(done) {
//            User.remove().exec();
            done();
        });
    });
});
