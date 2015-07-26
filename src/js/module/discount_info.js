elife.controller('DiscountInfoCtrl', ['$scope', '$http', '$cookieStore', '$routeParams', 'API', '$rootScope', function ($scope, $http, $cookieStore, $routeParams, API, $rootScope) {
    $scope.toast = $rootScope.toast;
    // 返回按钮
    elife_app.SetReturnBtn();
    $scope.id = $routeParams.id;
    $scope.isbank = $routeParams.bank;
    $scope.code = $routeParams.code;
    $scope.bankInfo = {};
    if ($scope.isbank === 'bank') {
        //银行优惠
        // 获取银行优惠详情
        API.getBankDiscountInfo({
            'bank_code': $scope.id
        }).then(function (data) {
            console.log("银行优惠详情");
            console.log(data);
            //var bankInfo = data.data;
            $scope.bankInfo = data.data;
            $scope.bankInfo.fav_status = $scope.bankInfo.fav_status || 0;
        }, function (data) {
            $scope.toast("请检查网络状况");
            console.error("银行优惠详情获取失败：" + data);
        });
        //获取银行附近适用门店
        // API.getDiscountStore({
        //   'group_code': $scope.id,
        //   'bank_code' : $scope.isbank
        // }).then(function(data){
        //   console.log("银行适用门店");
        //   console.log(data);
        //   $scope.bankStoreList = data.data;
        //   if($scope.bankStoreList){
        //     for(var i = 0; i < $scope.bankStoreList.length; i++){
        //       $scope.bankStoreList[i].discount_role =  API.resolveDiscountRole($scope.bankStoreList[i].servicesupportflag);
        //       var stars=[];
        //       for(var j=0;j<5;j++)
        //       {
        //         if (j+1<=$scope.bankStoreList[i].levels)
        //         {
        //           stars[j] = {"type":"full"};
        //         }else if(j - $scope.bankStoreList[i].levels < 0)
        //         {
        //           stars[j] = {"type":"half"};
        //         }else {
        //           stars[j] = {"type" : "gray"};
        //         }
        //       }
        //       $scope.bankStoreList[i].levels = stars;
        //     }
        //   }
        // }, function(data){
        //   $scope.toast("请检查网络状况");
        //    console.error("银行适用门店详情获取失败：" + data);
        // });
//获取银行适用门店
        API.getSuitStoreList({
            'pft_code': $scope.id,
            'type': 'BANK'
        }).then(function (data) {
            console.log('获取适用门店d');
            console.log(data);
            $scope.bankStoreList = API.getStoreData(data, $scope);
        }, function (data) {
            $scope.toast("请检查网络状况");
        });
        //获取网友点评
        API.getComments({
            's_row': 0,
            'e_row': 1,
            'cmtType': 'Bank',
            'evaTargetCode': $scope.id
        }).then(function (data) {
            console.log("点评列表");
            console.log(data);
            $scope.count = data.count;
            if ($scope.count > 0) {
                $scope.commentList = data.review_list[0];
                console.log($scope.commentList);
                $scope.commentList.longEnough = $scope.commentList.review_content.length > 65 ? true : false;
                $scope.commentList.content = $scope.commentList.review_content.substr(0, 65);
                $scope.commentList.more = $scope.commentList.review_content.substr(65, $scope.commentList.review_content.length);
                //设置展示的星级
                var stars = [];
                for (var j = 0; j < 5; j++) {
                    if (j + 1 <= $scope.commentList.level) {
                        stars[j] = {"type": "full"};
                    } else if (j - $scope.commentList.level < 0) {
                        stars[j] = {"type": "half"};
                    } else {
                        stars[j] = {"type": "gray"};
                    }
                }
                $scope.stars = stars;
                //设置展示的图片
                $scope.imagelist = $scope.commentList.review_image_list || [];
            }
        }, function (data) {
            $scope.toast("请检查网络状况");
            console.error("银行优惠点评列表获取失败：" + data);
        });
    } else {
        //商户优惠
        $scope.id = $routeParams.id;
        //获取商户优惠详情
        $scope.stid = $routeParams.stid;
        API.getBusinessDiscountInfo({
            'pft_code': $scope.code
        }).then(function (data) {
            console.log("商户优惠详情");
            console.log(data);
            $scope.businessInfo = data.data;
            $scope.businessInfo.fav_status = $scope.businessInfo.fav_status;
        //    todo test data
        //    $scope.businessInfo.pro_promotions_content='<a>link</a><br>break line';
        }, function (data) {
            $scope.toast("请检查网络状况");
            console.error("商户优惠详情获取失败：" + data);
        });
        if (API.isLogin()) {
        } else {
            console.log('未登录');
            $scope.businessInfo = {};
            $scope.businessInfo.fav_status = undefined;
        }
        // // 获取商户优惠附近适用门店
        // API.getDiscountStore({
        //   'group_code': 'Y012',
        //   'bank_code' : 'store'
        // }).then(function(data){
        //   console.log("商户优惠适用门店");
        //   console.log(data);
        //   $scope.businessStoreList = data.data;
        //   if(data){
        //     for(var i = 0; i < $scope.businessStoreList.length; i++){
        //       $scope.businessStoreList[i].discount_role =  API.resolveDiscountRole($scope.businessStoreList[i].servicesupportflag);
        //       var stars=[];
        //       for(var j=0;j<5;j++)
        //       {
        //         if (j+1<=$scope.businessStoreList[i].levels)
        //         {
        //         stars[j] = {"type":"full"};
        //         }else if(j - $scope.businessStoreList[i].levels < 0)
        //         {
        //           stars[j] = {"type":"half"};
        //         }else {
        //           stars[j] = {"type" : "gray"};
        //         }
        //       }
        //       $scope.businessStoreList[i].levels = stars;
        //     }
        //   }
        // }, function(data){
        //   $scope.toast("请检查网络状况");
        //   console.error("商户优惠适用门店详情获取失败：" + data);
        // });
//获取文本优惠适用门店
        API.getSuitStoreList({
            'pft_code': $scope.code,
            'type': 'STORE'
        }).then(function (data) {
            console.log('获取适用门店');
            console.log(data);
            $scope.businessStoreList = data;
            if (data) {
                console.log("sss");
                for (var i = 0; i < $scope.businessStoreList.length; i++) {
                    $scope.businessStoreList[i].discount_role = API.resolveDiscountRole($scope.businessStoreList[i].discount_role);
                    $scope.businessStoreList[i].new_discount_role = [];
                    for (var z = 0; z < $scope.businessStoreList[i].discount_role.length; z++) {
                        if ($scope.businessStoreList[i].discount_role[z] === ' icon_yi') {
                            $scope.businessStoreList[i].new_discount_role.push(' icon_yi');
                        }
                        if ($scope.businessStoreList[i].discount_role[z] === ' icon_fen') {
                            $scope.businessStoreList[i].new_discount_role.push(' icon_fen');
                        }
                        if ($scope.businessStoreList[i].discount_role[z] === ' icon_shan') {
                            $scope.businessStoreList[i].new_discount_role.push(' icon_shan');
                        }
                        if ($scope.businessStoreList[i].discount_role[z] === ' icon_ji') {
                            $scope.businessStoreList[i].new_discount_role.push(' icon_ji');
                        }
                    }
                    var stars = [];
                    for (var j = 0; j < 5; j++) {
                        if (j + 1 <= $scope.businessStoreList[i].levels) {
                            stars[j] = {"type": "full"};
                        } else if (j - $scope.businessStoreList[i].levels < 0) {
                            stars[j] = {"type": "half"};
                        } else {
                            stars[j] = {"type": "gray"};
                        }
                    }
                    $scope.businessStoreList[i].levels = stars;
                    $scope.businessStoreList[i].bottomContent = '';
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].district_name1 && $scope.businessStoreList[i].district_name1 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].district_name1;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].district_name2 && $scope.businessStoreList[i].district_name2 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].district_name2;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].district_name3 && $scope.businessStoreList[i].district_name3 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].district_name3;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    $scope.businessStoreList[i].bottomContent = $scope.businessStoreList[i].bottomContent.substring(0, $scope.businessStoreList[i].bottomContent.length - 1) + ' ';
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].small_name1 && $scope.businessStoreList[i].small_name1 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].small_name1;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].small_name2 && $scope.businessStoreList[i].small_name2 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].small_name2;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    if (($scope.businessStoreList[i].bottomContent.length <= 18) && $scope.businessStoreList[i].small_name3 && $scope.businessStoreList[i].small_name3 !== '') {
                        $scope.businessStoreList[i].bottomContent += $scope.businessStoreList[i].small_name3;
                        $scope.businessStoreList[i].bottomContent += '/';
                    }
                    $scope.businessStoreList[i].bottomContent = $scope.businessStoreList[i].bottomContent.substring(0, $scope.businessStoreList[i].bottomContent.length - 1);
                    $scope.businessStoreList[i].showdistance = $scope.businessStoreList[i].distance + $scope.businessStoreList[i].unit;
                }
            }
        }, function (data) {
            $scope.toast("请检查网络状况");
        });
        //网友点评
        API.getComments({
            's_row': 0,
            'e_row': 1,
            'cmtType': 'StoreTxt',
            'evaTargetCode': $scope.code
        }).then(function (data) {
            console.log("点评列表1");
            console.log(data);
            $scope.bcount = data.count;
            if ($scope.bcount === '0') {
                return;
            }
            $scope.businessList = data.review_list[0];
            console.log($scope.businessList);
            $scope.businessList.longEnough = $scope.businessList.review_content.length > 65 ? true : false;
            $scope.businessList.content = $scope.businessList.review_content.substr(0, 65);
            $scope.businessList.more = $scope.businessList.review_content.substr(65, $scope.businessList.review_content.length);
            //设置展示的星级
            var stars = [];
            for (var j = 0; j < 5; j++) {
                if (j + 1 <= $scope.businessList.level) {
                    stars[j] = {"type": "full"};
                } else if (j - $scope.businessList.level < 0) {
                    stars[j] = {"type": "half"};
                } else {
                    stars[j] = {"type": "gray"};
                }
            }
            $scope.stars = stars;
            //设置展示的图片
            $scope.imagelist = $scope.businessList.review_image_list || [];
        }, function (data) {
            $scope.toast("请检查网络状况");
            console.error("商户优惠点评列表获取失败：" + data);
        });
    }
    //收藏商户(文本)优惠
    $scope.addBusinessFavor = function () {
        console.log("收藏商户优惠");
        if ($scope.businessInfo.fav_status == "1") {
            //var code = $routeParams.id + "#1";
            API.deleteDiscountFavor({store_codes: $scope.code + "#1"}).then(function (data) {
                console.log(data);
                if (data.res === '0') {
                    $scope.businessInfo.fav_status = "0";
                    $scope.toast("删除收藏成功");
                }
                if (data.res === '1000002') {
                    $scope.businessInfo.fav_status = "0";
                    $scope.toast("删除收藏失败");
                }
            }, function (data) {
                $scope.toast("请检查网络状况");
            });
        } else {
            API.addBusinessTextFavor({'pft_code': $scope.code}).then(function (data) {
                console.log('收藏商户');
                console.log(data);
                if (data.res === "0") {
                    $scope.businessInfo.fav_status = "1";
                    $scope.toast("收藏成功");
                }
                if (data.res === "2000002") {
                    $scope.businessInfo.fav_status = "1";
                    $scope.toast("您已经收藏过");
                }
            }, function (data) {
                console.log('收藏商户失败');
                $scope.toast("请检查网络状况");
            });
            // API.addBankCountFavor({
            //   'pft_code' : $routeParams.id
            // }).then(function(data){
            //   console.log("收藏商会优惠详情");
            //   console.log(data.res);
            //   if(data.res === '0'){
            //      $rootScope.toast("收藏成功");
            //      $scope.businessInfo.fav_status = "1";
            //   }
            //   if(data.res ==='2000002'){
            //     console.log("您已经收藏过");
            //     $rootScope.toast("您已经收藏过");
            //     $scope.businessInfo.fav_status = "1";
            //   }
            // }, function(data){
            //   $scope.toast("请检查网络状况");
            //   console.error("银行优惠详情获取失败：" + data);
            // });
        }
    };
    // 收藏银行优惠
    $scope.addBankFavor = function () {
        console.log($scope.bankInfo);
        if ($scope.bankInfo.fav_status == "1") {
            //var code = $routeParams.id + "#2";
            API.deleteDiscountFavor({store_codes: $scope.id + "#2"}).then(function (data) {
                console.log(data);
                if (data.res === '0') {
                    $scope.bankInfo.fav_status = "0";
                    $scope.toast("删除收藏成功");
                }
                if (data.res === '2000002') {
                    $scope.bankInfo.fav_status = "0";
                    $scope.toast("您已成功删除收藏");
                }
            }, function (data) {
                $scope.toast("请检查网络状况");
            });
        } else {
            API.addBankCountFavor({
                'b_code': $routeParams.id
            }).then(function (data) {
                console.log("收藏银行优惠详情");
                console.log(data.res);
                if (data.res === '0') {
                    $scope.toast("收藏成功");
                    $scope.bankInfo.fav_status = '1';
                }
                if (data.res === '2000002') {
                    $scope.toast("您已经收藏过");
                    $scope.bankInfo.fav_status = '1';
                }
            }, function (data) {
                $scope.toast("请检查网络状况");
            });
        }
    };
}]);
elife.controller('DiscountStoreListCtrl', ['$scope', '$http', '$cookieStore', '$routeParams', 'API', '$rootScope', function ($scope, $http, $cookieStore, $routeParams, API, $rootScope) {
    $scope.toast = $rootScope.toast;
    // 返回按钮
    elife_app.SetReturnBtn();
    $scope.ptf_code = $routeParams.ptf_code;
    $scope.type = $routeParams.type;
    //获取文本优惠适用门店
    API.getSuitStoreList({
        'pft_code': $scope.ptf_code,
        'type': $scope.type
    }).then(function (data) {
        console.log('获取适用门店');
        console.log(data);
        $scope.businessStoreList = API.getStoreData(data, $scope);
    }, function (data) {
        $scope.toast("请检查网络状况");
    });
}]);
