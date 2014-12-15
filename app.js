angular.module("app", [])
.controller("MainCtrl", function($scope) {
	$scope.mealPrice;
	$scope.taxRate;
	$scope.tipPer;
	$scope.subTotal = 0;
	$scope.thisTip = 0;
	$scope.thisTotal = 0;
	$scope.tipTotal = 0;
	$scope.avgTip = 0;
	$scope.mealCount = 0;
	$scope.errorShow = false;

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

	$scope.reset = function() {
		$scope.cancel();
		$scope.tipTotal = 0;
		$scope.avgTip = 0;
		$scope.mealCount = 0;
		delete $scope.subTotal;
		delete $scope.thisTip;
		delete $scope.thisTotal;
	};



	$scope.empty = function() {
		$scope.words.length = 0;
		$scope.showMad = false;
		$scope.myForm.$setPristine(true);
	};
});