angular.module("app", ['ngRoute', 'ngAnimate'])

.config(function($routeProvider){

	$routeProvider
	.when('/', {
		templateUrl : './home.html',
		controller : 'HomeCtrl'
	})
	.when('/new-meal', {
		templateUrl : './newMeal.html',
		controller : 'MealCtrl'
	})
	.when('/my-earnings', {
		templateUrl : './myEarnings.html',
		controller : 'EarningsCtrl'
	})
	.otherwise({
		redirectTo : '/'
	});
})

.run(function ($rootScope) {
    $rootScope.tipTotal = 0;
	$rootScope.mealCount = 0;
	$rootScope.avgTip = 0;
})

.run(function($rootScope, $location, $timeout) {
    $rootScope.$on('$routeChangeError', function() {
        $location.path("/");
    });
    $rootScope.$on('$routeChangeStart', function() {
        $rootScope.isLoading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function() {
      $timeout(function() {
        $rootScope.isLoading = false;
      }, 3000);
    });
})

.controller("HomeCtrl", function($scope) {
})

.controller("MealCtrl", function($scope, $rootScope) {
	$scope.mealPrice;
	$scope.taxRate;
	$scope.tipPer;
	$scope.subTotal = 0;
	$scope.thisTip = 0;
	$scope.thisTotal = 0;
	$scope.errorShow = false;

	$scope.submit = function() {
		$scope.errorShow = true;
		if ($scope.mealForm.$valid) {
			$scope.subTotal = $scope.mealPrice * $scope.taxRate/100 + $scope.mealPrice;
			$scope.thisTip = $scope.mealPrice * $scope.tipPer/100;
			$scope.thisTotal = $scope.subTotal + $scope.thisTip;
			$rootScope.tipTotal = $rootScope.tipTotal + $scope.thisTip;
			$rootScope.mealCount++;
			$rootScope.avgTip = $rootScope.tipTotal / $rootScope.mealCount;
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
		$rootScope.tipTotal = 0;
		$rootScope.avgTip = 0;
		$rootScope.mealCount = 0;
	};

});