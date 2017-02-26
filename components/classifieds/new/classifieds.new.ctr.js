(function() {
    'used strict';

    angular
        .module('ngClassifieds')
        .controller('newClassifiedsCtrl', function($state, $scope, classifiedsFactory, $timeout, $mdSidenav, $mdDialog) {
            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveClassified = saveClassified;


            vm.sidebarTitle = 'Add a Classifed';
            $timeout(function() {

                $mdSidenav('left').open();

            });


            $scope.$watch('sidenavOpen', function(sidenavOpen) {
                if (sidenavOpen === false) {
                    $mdSidenav('left')
                        .close()
                        .then(function() {
                            $state.go('classifieds');
                        });
                }

            });

            function closeSidebar() {
                vm.classified = {};
                $scope.sidenavOpen = false;
            }

            function saveClassified(classified) {
                if (classified) {

                    classified.contact = {
                        name: "John Doe",
                        phone: "(555) 555-5555",
                        email: "a@example.com"
                    }

                    $scope.$emit('newClassified', classified)
                    $scope.sidenavOpen = false;
                }
            }

        });
})();
