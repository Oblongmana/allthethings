angular.module('app').controller('itemCreate', function ($scope, itemMainSrv, itemGetSrv, itemPostSrv, itemPutSrv, itemDeleteSrv, locationsListSrv, trackByGetSrv, userListSrv, settingsSrv) {
    // »»»»»»»»»»»»»»»»»»»║  TESTS 
    $scope.itemCreateTest = 'itemCreate controller is connected and operational'
    $scope.itemGetSrvTest = itemGetSrv.itemGetSrvTest
    $scope.itemPostSrvTest = itemPostSrv.itemPostSrvTest
    $scope.itemPutSrvTest = itemPutSrv.itemPutSrvTest
    $scope.itemDeleteSrvTest = itemDeleteSrv.itemDeleteSrvTest
    $scope.itemMainSrvTest = itemMainSrv.itemMainSrvTest

    // »»»»»»»»»»»»»»»»»»»║  VARIABLES
    $scope.itemCreateObj = { has_package: false, has_multiPiece: false, is_consumable: false }
    const itemsObj = $scope.itemCreateObj
    $scope.repItem = 'replink'
    $scope.userId = {}
    // get current user
    $scope.currentUser = () => itemMainSrv.getCurrentUser().then(response => {
        $scope.thisUser = response.data.first_name
        $scope.itemCreateObj.owner_id = response.data.id
        $scope.userId.id = response.data.id
    })
    $scope.currentUser()
    // .................... original package checkbox
    $scope.originalPackaging = () => $scope.itemCreateObj.has_package = $scope.packageStatus

    // .................... multiple piece checkbox
    $scope.multiplePieces = () => $scope.itemCreateObj.has_multiPiece = $scope.multiPiece

    // .................... consumable checkbox
    $scope.isConsumable = () => $scope.itemCreateObj.is_consumable = $scope.consumable

    // .................... sets sentimental value
    $scope.rating = 1;
    $scope.rateFunction = (rating) => $scope.itemCreateObj.sentimental_rating = rating

    // .................... sets max data allowed
    // <input id="datefield" type='date' max='2000-13-13'></input>
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById("datefield").setAttribute("max", today);


    // »»»»»»»»»»»»»»»»»»»║  GET LOCATION LIST
    $scope.getLocations = () => locationsListSrv.getLocationsList().then(response => $scope.locations = response.data)
    $scope.getLocations()

    // .................... get custom list of locations
    $scope.getLocations = () => locationsListSrv.getLocationsCustomList().then(response => $scope.gridOptions.data = response.data)
    $scope.getLocations()

    // .................... get default location
    $scope.getDefaultLoc = () => settingsSrv.getDefaultLocation().then(response => {
        $scope.loc = response.data[0].description;
        $scope.locid = response.data[0].id;
        $scope.defaultLocation = $scope.loc
        $scope.itemCreateObj.location_id = $scope.locid
    })
    $scope.getDefaultLoc()

    // »»»»»»»»»»»»»»»»»»»║ GET A LIST OF ALL TRACKBYS
    $scope.gettrackbys = () => trackByGetSrv.getTrackByList().then(response => $scope.trackbys = response.data)
    $scope.gettrackbys()

    // »»»»»»»»»»»»»»»»»»»║ GET USERS LIST
    $scope.getUsers = () => userListSrv.getCustomUserList().then(response => $scope.users = response.data)
    $scope.getUsers()

    // .................... columns and data
    $scope.gridOptions = {
        enableRowSelection: true
        , enableRowHeaderSelection: true
        , multiSelect: true
        , enableSelectAll: true
        , enableFiltering: true
        , columnDefs: [
            { name: 'id', enableCellEdit: false, width: 75 }
            , { name: 'loc_desc', displayName: 'Description' }
            , { name: 'loc_class_name', displayName: 'Classification', enableCellEdit: false }
            , { name: 'loc_class_desc', displayName: 'Class Desc.', enableCellEdit: false }
            , { name: 'loc_container', displayName: 'Container', enableCellEdit: false }
        ]
        , onRegisterApi: (gridApi) => {
            gridApi.selection.on.rowSelectionChanged($scope, function (row) {
                $scope.selected = row.isSelected
                $scope.rowId = row.uid
                $scope.rowObj = row.entity
            })
        }
    }

$scope.locationId = () => $scope.itemCreateObj.location_id = $scope.locationOption.id

    // »»»»»»»»»»»»»»»»»»»║  CREATE ITEMS
    $scope.createItem = () => {
        let loggedInUser = $scope.itemCreateObj.owner_id
        if (loggedInUser !== $scope.userId.id) { $scope.itemCreateObj.owner_id = $scope.userId.id }

        console.log(itemsObj)//this is the object that will be sent to the server

    }
})