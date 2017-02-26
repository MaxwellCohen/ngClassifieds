(function() {
    'used strict';

    angular
        .module('ngClassifieds')
        .controller('editClassifiedsCtrl', function($state, $scope, classifiedsFactory, $timeout, $mdSidenav, $mdDialog) {
            var vm = this;

            vm.closeSidebar = closeSidebar;
            vm.saveEdit = saveEdit;
            vm.classified = $state.params.classified;

            vm.sidebarTitle = 'Edit Classifed';
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
                $scope.sidenavOpen = false;
            }

            function saveEdit() {
                $scope.sidenavOpen = false;
                $scope.$emit('editSaved', 'Edit Saved!');
            }

        });
})();
