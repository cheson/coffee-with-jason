/**
 * Define StatesController for the states component of CS142 project #4
 * problem #2.  The model data for this view (the states) is available
 * at window.cs142models.statesModel().
 */

 //whats below is javascript syntax right?
 //

cs142App.controller('StatesController', ['$scope', function($scope) {

   // Replace this with the code for CS142 Project #4, Problem #2
   // console.log('window.cs142models.statesModel()', window.cs142models.statesModel());
   $scope.search = '';
   $scope.stateList = window.cs142models.statesModel();

}]);
