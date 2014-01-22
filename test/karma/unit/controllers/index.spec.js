'use strict';

(function() {
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
                expect(scope.global).toBeTruthy();
            });

            it('should log to the console', function() {
                expect(1).toBe(3);
            });

            it('is going to be silly.', function(){
                expect('this').toBeTruthy();
            });
        });
    });
})();