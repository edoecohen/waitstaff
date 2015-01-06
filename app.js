angular.module("app", ['ngRoute'])

.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl : './home.html',
		controller : 'HomeCtrl'
	})
	.when('/new-meal', {
		templateUrl : './newMeal.html',
		controller : 'MealCtrl',
	})
	.when('/my-earnings', {
		templateUrl : './myEarnings.html',
		controller : 'EarningsCtrl',
	})
	.otherwise({
		redirectTo : '/'
	});
})

.controller("HomeCtrl", function($scope) {
})

.controller("MealCtrl", function($scope, $rootScope) {
	$rootScope.mealPrice;
	$rootScope.taxRate;
	$rootScope.tipPer;
	$rootScope.subTotal = 0;
	$rootScope.thisTip = 0;
	$rootScope.thisTotal = 0;
	$rootScope.tipTotal = 0;
	$rootScope.avgTip = 0;
	$rootScope.mealCount = 0;
	$rootScope.errorShow = false;

	$scope.submit = function() {
		$scope.errorShow = true;
		if ($scope.mealForm.$valid) {
			$scope.subTotal = $scope.mealPrice * $scope.taxRate/100 + $scope.mealPrice;
			$scope.thisTip = $scope.mealPrice * $scope.tipPer/100;
			$scope.thisTotal = $scope.subTotal + $scope.thisTip;
			$scope.tipTotal = $scope.tipTotal + $scope.thisTip;
			$scope.mealCount++;
			$scope.avgTip = $scope.tipTotal / $scope.mealCount;
			$scope.cancel();
		};
	};

	$scope.cancel = function() {
		delete $scope.mealPrice;
		delete $scope.taxRate;
		delete $scope.tipPer;
		$scope.errorShow = false;
	};
})

.controller("EarningsCtrl", function($scope, $rootScope) {

	$scope.reset = function() {
		$rootScope.cancel();
		$rootScope.tipTotal = 0;
		$rootScope.avgTip = 0;
		$rootScope.mealCount = 0;
		delete $rootScope.subTotal;
		delete $rootScope.thisTip;
		delete $rootScope.thisTotal;
	};

});