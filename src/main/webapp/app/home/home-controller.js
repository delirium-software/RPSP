var app = angular.module('home');


app.controller('homeController', ['$scope', '$http', 'userService', function ($scope, $http, userService) {

    $scope.currentUser = {};
    $scope.welcomeData = {};

    $scope.getCurrentUser = function () {
        userService.getUserData().then(function (allData) {
            $scope.currentUser = allData.currentUser;
            $scope.welcomeData = allData.welcomeData;

        });

    };

    $scope.getCurrentUser();
}])


app.controller('vmStructureController', ['$scope', '$http', '$modal', '$translate', '$filter', '$timeout', 'vmStructureService', function ($scope, $http, $modal, $translate, $filter, $timeout, vmStructureService) {

    $scope.hiddengs = {};
    $scope.vmStructureData = {};
    $scope.vmGsAndCgFlatData = {};
    $scope.totalVms = {};
    $scope.protectedVms = {};
    $scope.finishedLoading = false;
    $scope.isCollapsed = false;
    function closeisCollapsed(){
        $scope.isCollapsed = false;
    }
    $scope.toggleRow = function (row) {
        if (row.type == 'gs') {
            for (cgInd in $scope.vmGsAndCgFlatData) {
                var cg = $scope.vmGsAndCgFlatData[cgInd];
                if (row.name == cg.parent) {
                    cg.hideRow = !cg.hideRow;
                }
            }
        }
        row.hideChildren = !row.hideChildren;
    }


    $scope.getVmStructureData = function () {
        vmStructureService.getVmStructureData().then(function (allData) {
                $scope.isAdmin=allData.isAdmin;
                $scope.backupActive = allData.backupActive;
                $scope.vmStructureData = allData.vmStructureData;
                $scope.vmGsAndCgFlatData = allData.vmGsAndCgFlatData;
                $scope.totalVms = allData.totalVms;
                $scope.protectedVms = allData.protectedVms;

                $scope.errorExpText = allData.errorExpText;
                $scope.errorExp = allData.errorExp;
            })
            .finally(function (res) {

                $scope.finishedLoading = true;
            });
    };

    $scope.getVmStructureData();

    $scope.openBackupAccessModal = openBackupAccessModal;

    function openBackupAccessModal(vm) {
        if (!vm.backupActive) {
            return;
        }
        var modalInstance = $modal.open({
            templateUrl: 'app/backup-access/backup-access.html',
            controller: 'BackupAccess',
            windowClass: 'backup-access-modal',
            resolve: {
                vmName: function () {
                    return vm.name;
                }
            }
        });

        modalInstance.result.then(function () {
            {
            }
        });
    }

    $scope.openImageAccessModal = function () {

        var isGroupSet = false;
        if ($scope.protectedSelectedIndex != -1) {
            var entityType = $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].type;
            if (entityType == 'gs') {
                isGroupSet = true;
            }
        }

        var modalInstance = {};

        if (isGroupSet == true) {
            modalInstance = $modal.open({
                templateUrl: 'app/image-access/group-set-image-access-modal.html',
                controller: 'groupSetImageAccessController',
                windowClass: 'image-access-modal'
            });
        }
        else {
            modalInstance = $modal.open({
                templateUrl: 'app/image-access/image-access-modal.html',
                controller: 'imageAccessController',
                windowClass: 'image-access-modal'
            });
        }

        modalInstance.result.then(function () {
            {
            }
        });
    };


    $scope.openRelevantProtectionModal = function (vmId, cgId) {
        var params = {};
        params.vmId = vmId;
        params.cgId = cgId;
        var modalInstance;

        if (cgId == 'new-section') {
            $scope.openCreateCgModal(vmId);
        } else {
            if (cgId !== undefined) {
                modalInstance = $modal.open({
                    templateUrl: 'app/protect/protect-modal.html',
                    controller: 'protectController',
                    windowClass: 'protect-modal',
                    resolve: {
                        modalParams: function () {
                            return params;
                        }
                    }
                });
            } else {
                modalInstance = $modal.open({
                    templateUrl: 'app/unprotect/unprotect-modal.html',
                    controller: 'unprotectController',
                    windowClass: 'protect-modal',
                    resolve: {
                        modalParams: function () {
                            return params;
                        }
                    }
                });
            }

            modalInstance.result.finally(function () {
                $scope.vmStructureData = vmStructureService.getCachedVmStructureData();
                $scope.vmGsAndCgFlatData = vmStructureService.getCachedVmGsAndCgFlatData();
                $scope.totalVms = vmStructureService.getCachedTotalVms();
                $scope.protectedVms = vmStructureService.getCachedProtectedVms();
            });
        }
    };
    
    $scope.openCreateCgModal = function (vmId) {
        var modalInstance = $modal.open({
            templateUrl: 'app/protect/protect-create-cg-modal.html',
            controller: 'protectCreateCgController',
            windowClass: 'create-cg-modal',
            resolve: {
                vmId: function () {
                    return vmId;
                }
            }
        });

        modalInstance.result.then(function () {
            {
            }
        });
    };


    $scope.openEditCgModal = function () {


        var modalInstance = {};


        modalInstance = $modal.open({
            templateUrl: 'app/edit-cg/edit-cg-modal.html',
            controller: 'editCgController',
            windowClass: 'edit-cg-modal'
        });

        modalInstance.result.then(function () {
            {
            }
        });
    };


    $scope.openBookmarksModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/bookmarks/bookmarks-modal.html',
            controller: 'bookmarksController',
            windowClass: 'bookmarks-modal'
        });

        modalInstance.result.then(function () {
            {
            }
        });
    };


    $scope.openFailoverModal = function () {
        var isGroupSet = false;
        if ($scope.protectedSelectedIndex != -1) {
            var entityType = $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].type;
            if (entityType == 'gs') {
                isGroupSet = true;
            }
        }

        var modalInstance = {};

        if (isGroupSet == true) {
            modalInstance = $modal.open({
                templateUrl: 'app/failover/group-set-failover-modal.html',
                controller: 'groupSetFailoverController',
                windowClass: 'image-access-modal'
            });
        }
        else {
            modalInstance = $modal.open({
                templateUrl: 'app/failover/failover-modal.html',
                controller: 'failoverController',
                windowClass: 'image-access-modal'
            });
        }


        modalInstance.result.then(function (result) {

        });
    };


    $scope.openRecoverModal = function () {

        var isGroupSet = false;
        if ($scope.protectedSelectedIndex != -1) {
            var entityType = $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].type;
            if (entityType == 'gs') {
                isGroupSet = true;
            }
        }

        var modalInstance = {};

        if (isGroupSet == true) {
            modalInstance = $modal.open({
                templateUrl: 'app/recover/group-set-recover-modal.html',
                controller: 'groupSetRecoverController',
                windowClass: 'image-access-modal'
            });
        }
        else {
            modalInstance = $modal.open({
                templateUrl: 'app/recover/recover-modal.html',
                controller: 'recoverController',
                windowClass: 'image-access-modal'
            });
        }

        modalInstance.result.then(function (result) {
        });
    };

    $scope.openAuditLogModal = function () {
        var modalInstance = $modal.open({
            templateUrl: 'app/audit/audit.html',
            controller: 'auditController',
            windowClass: 'auditlog-modal'
        });

        modalInstance.result.then(function () {
            {
            }
        });
    };


    //$scope.refreshMainScreen = function () {
    //    vmStructureService.getVmStructureData().then(function (allData) {
    //        $scope.backupActive = allData.backupActive;
    //        $scope.vmStructureData = allData.vmStructureData;
    //        $scope.vmGsAndCgFlatData = allData.vmGsAndCgFlatData;
    //        $scope.totalVms = allData.totalVms;
    //        $scope.protectedVms = allData.protectedVms;
    //    })
    //};


    $scope.protectedSelectedIndex = -1;
    $scope.unprotectedSelectedIndex = -1;

    $scope.toggleSelect = function (ind, isProtected) {

        var prevSelectedIndex = vmStructureService.getProtectedSelectedIndex();
        if (ind == prevSelectedIndex
            && ind != -1 && $scope.vmGsAndCgFlatData[ind].id == 'new-section') {
            return;
        }
        else {
            vmStructureService.toggleSelect(ind, isProtected);
            $scope.protectedSelectedIndex = vmStructureService.getProtectedSelectedIndex();
            $scope.unprotectedSelectedIndex = vmStructureService.getUnprotectedSelectedIndex();
        }

    };

    $scope.isLastName = function (value) {
        if(value === 'New ...'){
            return 'btn btn-primary';
        }
    };
    $scope.handleDoubleClick = function (ind, isProtected) {
        $scope.protectedSelectedIndex = vmStructureService.getProtectedSelectedIndex();
        $scope.unprotectedSelectedIndex = vmStructureService.getUnprotectedSelectedIndex();

        if ($scope.protectedSelectedIndex != -1 && $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].id == 'new-section') {
            $scope.openCreateCgModal()
        }
    };


    $scope.isActionApplicable = function () {
        var res;
        if ($scope.protectedSelectedIndex != -1) {
            var entityType = $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].type;
            var strictMode = $scope.vmGsAndCgFlatData[$scope.protectedSelectedIndex].strictMode;
            if (entityType == 'cg' || (entityType == 'gs' && strictMode == true)) {
                res = true;
            }
        }
        else {
            res = false;
        }
        return res;
    };


    $scope.getImageAccessIndicator = function (status) {
        var res = status;
        if (status != null && status !== undefined) {

            var $translate = $filter('translate');

            if (status == 'Enabled') {
                res = $translate('HOME.DR_TEST_ENABLED_MSG');
            }
            else if (status == 'Enabling') {
                res = $translate('HOME.DR_TEST_ENABLING_MSG');
            }
            else {
                res = $translate('HOME.DR_TEST_DISABLED_MSG');
            }
        }
        return res;
    };


    $scope.getReplicationStateIndicator = function (status, initCompletionPortion) {
        var res = status;
        if (status != null && status !== undefined) {

            var $translate = $filter('translate');

            if (status == 'Initializing') {
                res = $translate('HOME.TRANSFER_INIT_MSG');
                res += (' (' + initCompletionPortion + '%' + ')');
            }
            else if (status == 'Active') {
                res = $translate('HOME.TRANSFER_ACTIVE_MSG');
            }
            else if (status == 'Stand by') {
                res = $translate('HOME.TRANSFER_STAND_BY_MSG');
            }
            else if (status == 'Ready') {
                res = $translate('HOME.TRANSFER_READY_MSG');
            }
            else if (status == 'Paused') {
                res = $translate('HOME.TRANSFER_PAUSED_MSG');
            }
            else if (status == 'Paused by system') {
                res = $translate('HOME.TRANSFER_PAUSED_BY_SYSTEM_MSG');
            }
            else if (status == 'Error') {
                res = $translate('HOME.TRANSFER_ERROR_MSG');
            }
            else {
                res = $translate('HOME.TRANSFER_UNKNOWN_MSG');
            }
        }
        return res;
    };
    $scope.whatStatusIs = function (status, initCompletionPortion) {
        var res = status;
        if (status != null && status !== undefined) {



            if (status == 'Initializing') {
                res = 'label-warning';

            }
            else if (status == 'Active') {
                res = 'label-success';
            }
            else if (status == 'Stand by') {
                res = 'label-warning';
            }
            else if (status == 'Ready') {
                res = 'label-primary';
            }
            else if (status == 'Paused') {
                res = 'label-warning';
            }
            else if (status == 'Paused by system') {
                res = 'label-warning';
            }
            else if (status == 'Error') {
                res = 'label-danger';
            }
            else {
                res = 'label-danger';
            }
        }
        return res;
    };

    $scope.getState = function (status) {
        var res = status;
        if (status != null && status !== undefined) {

            var $translate = $filter('translate');

            if (status == 'Enabled') {
                res = $translate('HOME.STATE_ENABLED_MSG');
            }
            else {
                res = $translate('HOME.STATE_DISABLED_MSG');
            }
        }
        return res;
    };

    $scope.closeisCollapsed = closeisCollapsed;
}]);

app.directive('appHeader', function() {
    return {
        templateUrl: 'app/home/header.html'
    };
});
app.directive('actionMenu', function() {
    return {
        templateUrl: 'app/home/actionmenu.html'
    };
});

