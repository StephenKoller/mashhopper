'use strict';

describe('MEAN controllers', function() {
    describe('IndexController', function() {
        // Load the controllers module
        beforeEach(module('mean'));

        var scope, IndexController;

        beforeEach(inject(function($controller, $rootScope) {
            scope = $rootScope.$new();

            IndexController = $controller('IndexController', {
                $scope: scope
            });
        }));

        it('should expose some global scope', function() {
            expect(scope.global).to.be.ok;
        });


        it('is going to be silly.', function() {
            expect("true").to.be.ok;
            expect(1).to.be.ok;
            expect(true).to.be.ok;
            expect({}).to.be.ok;
        });
    });
});