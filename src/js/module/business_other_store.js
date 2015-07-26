elife.controller('OtherStoreInfoCtrl', ['$scope', '$http', '$cookieStore', '$routeParams', 'SharedState', 'API', '$rootScope', function ($scope, $http, $cookieStore, $routeParams, SharedState, API, $rootScope) {
    elife_app.SetReturnBtn();
    $scope.imgBaseUrl = $rootScope.imgBaseUrl;
    // console.log('???????????????');
    // console.log( $scope.imgBaseUrl);
    $scope.store_code = $routeParams.id;
    API.getOtherStores({'parent_store_code': $scope.store_code}).then(function (data) {
        console.log('其他商户');
        console.log(data);
        $scope.otherStores = data.data;
        if ($scope.otherStores) {
            for (var i = 0; i < $scope.otherStores.length; i++) {
                $scope.otherStores[i].discount_role = API.resolveDiscountRole($scope.otherStores[i].discount_role);
                var stars = [];
                for (var j = 0; j < 5; j++) {
                    if (j + 1 <= $scope.otherStores[i].levels) {
                        stars[j] = {"type": "full"};
                    } else if (j - $scope.otherStores[i].levels < 0) {
                        stars[j] = {"type": "half"};
                    } else {
                        stars[j] = {"type": "gray"};
                    }
                }
                $scope.otherStores[i].levels = stars;
                $scope.otherStores[i].bottomContent = '';
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].district_name1 && $scope.otherStores[i].district_name1 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].district_name1;
                    $scope.otherStores[i].bottomContent += '/';
                }
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].district_name2 && $scope.otherStores[i].district_name2 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].district_name2;
                    $scope.otherStores[i].bottomContent += '/';
                }
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].district_name3 && $scope.otherStores[i].district_name3 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].district_name3;
                    $scope.otherStores[i].bottomContent += '/';
                }
                $scope.otherStores[i].bottomContent = $scope.otherStores[i].bottomContent.substring(0, $scope.otherStores[i].bottomContent.length - 1) + ' / ';
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].small_name1 && $scope.otherStores[i].small_name1 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].small_name1;
                    $scope.otherStores[i].bottomContent += '/';
                }
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].small_name2 && $scope.otherStores[i].small_name2 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].small_name2;
                    $scope.otherStores[i].bottomContent += '/';
                }
                if (($scope.otherStores[i].bottomContent.length <= 18) && $scope.otherStores[i].small_name3 && $scope.otherStores[i].small_name3 !== '') {
                    $scope.otherStores[i].bottomContent += $scope.otherStores[i].small_name3;
                    $scope.otherStores[i].bottomContent += '/';
                }
                $scope.otherStores[i].bottomContent = $scope.otherStores[i].bottomContent.substring(0, $scope.otherStores[i].bottomContent.length - 1);
                $scope.otherStores[i].showdistance = $scope.otherStores[i].distance + $scope.otherStores[i].unit;
            }
        }
    }, function (data) {
        console.log('收藏商户失败');
        $scope.toast('请检查网络状况');
    });
}]);