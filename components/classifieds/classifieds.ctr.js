(function() {
    'use strict';
    angular
        .module('ngClassifieds')
        .controller('classifiedsCtrl', function($scope, $state, classifiedsFactory, $mdSidenav, $mdToast, $mdDialog) {
            var vm = this;

            vm.openSidebar = openSidebar;
            vm.closeSidebar = closeSidebar;
            vm.editClassified = editClassified;
            vm.deleteClassified = deleteClassified;
            vm.saveClassified = saveClassified;
            vm.saveEdit = saveEdit;
            vm.showSearchBar = false;
            vm.showFilters = false;
            vm.classifieds
            vm.categories
            vm.editing
            vm.classified

            classifiedsFactory.getClassifieds().then(function(classifieds) {
                vm.classifieds = classifieds.data;
                vm.categories = getCategories(vm.classifieds);
            });


            $scope.$on('newClassified', function(event, data) {
                data.id = vm.classifieds.length + 1;
                vm.classifieds.push(data);
                showToast('Classified Saved');
            });

            $scope.$on('editSaved', function(event, msg) {
                
                showToast(msg);
            });
            function openSidebar() {
                // open sidebar
                vm.sidebarTitle = 'Add a Classified';
                $state.go('classifieds.new');
            }

            function closeSidebar() {
                // close sidebar
                $mdSidenav('left').close();
            }

            function saveClassified(classified) {
                if (classified) {
                    classified.contact = contact;
                    vm.classifieds.push(classified);
                    vm.classified = {}
                    closeSidebar();
                    showToast('Classified saved!')
                }
            }

            function editClassified(classified) {
                                // open sidebar
                vm.sidebarTitle = 'Edit a Classified';
                $state.go('classifieds.edit', {
                    id: classified.id,
                    classified: classified
                });
            }

            function saveEdit() {
                vm.editing = false;
                vm.classified = {}
                closeSidebar();
                showToast('Edit saved!')
            }

            function deleteClassified(event, classified) {
                var confirm = $mdDialog.confirm()
                    .title('Are you sure you want to delete ' + classified.title + '?')
                    .ok('yes')
                    .cancel('No')
                    .targetEvent(event);
                $mdDialog.show(confirm).then(function() {
                    var index = vm.classifieds.indexOf(classified);
                    vm.classifieds.splice(index, 1);
                }, function() {

                });
            }

            function showToast(message) {
                $mdToast.show(
                    $mdToast.simple(message)
                    .position('top, right')
                    .hideDelay(3000));
            }

            function getCategories(classifieds) {
                var categories = [];
                angular.forEach(classifieds, function(item) {
                    angular.forEach(item.categories, function(data) {
                        categories.push(data);
                    })
                })
                return _.uniq(categories);
            }

        })
})();
