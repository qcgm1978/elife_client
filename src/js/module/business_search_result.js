elife.controller('BusinessSearchResultCtrl',[
    '$scope',
    '$rootScope',
    'SharedState',
    '$routeParams',
    '$cookieStore',
    '$http',
    'API',
    function($scope, $rootScope, SharedState, $routeParams, $cookieStore, $http, API) {
        var KEY_STORE_FILTER_DISTRICT = "storeDistrict";
        var KEY_STORE_FILTER_CITY_DISTRICT = "storeCityDistrict";
        var KEY_STORE_FILTER_MODE = "storeFilterMode";
        var KEY_STORE_ORDER_NAME = "storeOrderName";
        var KEY_STORE_ORDER_KEY = "storeOrderKey";
        var KEY_STORE_FILTER_DISTANCE = "storeFilterDistance";
        var KEY_STORE_FILTER_TYPE = "storeFilterType";
        var KEY_STORE_FILTER_BIG_TYPE = "storeFIlterBigType";

        var currentMode = $cookieStore.get(KEY_STORE_FILTER_MODE);
        var currentStoreDistrict = $cookieStore.get(KEY_STORE_FILTER_DISTRICT);
        var currentStoreCityDIstrict = $cookieStore.get(KEY_STORE_FILTER_CITY_DISTRICT);
        var currentStoreOrderName = $cookieStore.get(KEY_STORE_ORDER_NAME);
        var currentStoreOrderKey = $cookieStore.get(KEY_STORE_ORDER_KEY);
        var currentStoreFilterDistance = $cookieStore.get(KEY_STORE_FILTER_DISTANCE);
        // var currentStoreFilterDistrict = $cookieStore.get(KEY_STORE_FILTER_DISTRICT);
        var currentStoreFilterType = $cookieStore.get(KEY_STORE_FILTER_TYPE);
        var currentStoreFilterBigType = $cookieStore.get(KEY_STORE_FILTER_BIG_TYPE);

        if (currentStoreOrderKey && currentStoreOrderName) {
            $scope.order_key = currentStoreOrderKey;
            $scope.order_name = currentStoreOrderName;
        }
        if (currentStoreFilterDistance) {
            console.log(currentStoreFilterDistance);
            $scope.currentDistance = currentStoreFilterDistance;
            $scope.currentDistanceTitle = currentStoreFilterDistance + "米";
        } 
        if (currentStoreCityDIstrict) {
            $scope.currentCityDistrict = currentStoreCityDIstrict;
        }
        if (currentStoreDistrict) {
            $scope.currentDistrict = currentStoreDistrict;
        }
        if (currentStoreFilterType) {
            $scope.currentSmallType = currentStoreFilterType;
        }
        if(currentStoreFilterBigType){
            $scope.currentLargeType = currentStoreFilterBigType;
        }

        var pageSize = 10;

        $scope.isMapModel = false;
        if (currentMode === "map") {
            $scope.mapFilter = true;
            $scope.isMapModel = true;
            $scope.currentMapPage = -1;
        }

        $scope.districtId = $routeParams.id || '';
        $scope.keyword = '';
        if($scope.districtId !== '0'){
            $scope.currentDistrict = {'community_code': $scope.districtId, 'community_name': $routeParams.keyword};
            //$scope.keyword = null;
        }
        // $scope.currentDistnce = {};
        // $scope.currentSmallType = {};
        elife_app.SetReturnBtn();
         
         
        $scope.loading = true;
        $scope.mark = false;
        $scope.isEmpty = false;


        // 列表排序选项开关
        $scope.sideTab2 = 0;
        $scope.selectType = function(type){
            $scope.currentType = type;
        };
        $scope.filterToggle = function(n){
            if(n ===0){
              SharedState.turnOff('listFilter');
            }else{
              var index = SharedState.get('listFilterIndex') || 0;
              if(n === index){
                SharedState.toggle('listFilter');
              }else{
                SharedState.set({listFilterIndex:n});
                SharedState.turnOn('listFilter');
              }
            }
        };

        // (商区)距离
        $scope.filterByDistance = function(distance){
            $scope.currentDistance = distance;
            $scope.currentDistanceTitle = distance + "米";
            $scope.currentDistrict = null;
            $scope.currentCityDistrict = null;
            $cookieStore.remove(KEY_STORE_FILTER_CITY_DISTRICT);
            $cookieStore.remove(KEY_STORE_FILTER_DISTRICT);
            $cookieStore.remove(KEY_STORE_FILTER_DISTANCE);

            $cookieStore.put(KEY_STORE_FILTER_DISTANCE, distance);
            console.log(distance);
            $scope.getList(0);
            $scope.filterToggle(0);
        };
  
        // 商区
        $scope.filterByDistrict = function(district){
          if(district.community_name){
            console.log(district);
            $scope.currentDistrict = district;
            $scope.currentCityDistrict = null;
            $cookieStore.remove(KEY_STORE_FILTER_DISTRICT);
            $cookieStore.remove(KEY_STORE_FILTER_CITY_DISTRICT);
            $cookieStore.put(KEY_STORE_FILTER_DISTRICT, district);
          }
          else{
            console.log('sss');
            console.log(district);
           
           
           var newCurrentCityDistrict={district_name:district.district_name,district_code:district.district_code};
            console.log('sss1');
            console.log(newCurrentCityDistrict);
            $scope.currentCityDistrict = newCurrentCityDistrict;
            console.log($scope.currentCityDistrict);
            $scope.currentDistrict = null;
              
            $cookieStore.remove(KEY_STORE_FILTER_CITY_DISTRICT);
            $cookieStore.remove(KEY_STORE_FILTER_DISTRICT);
            $cookieStore.put(KEY_STORE_FILTER_CITY_DISTRICT, newCurrentCityDistrict);                     
          }
            $scope.currentDistanceTitle = null;
            $cookieStore.remove(KEY_STORE_FILTER_DISTANCE);
            $scope.getList(0);
            $scope.filterToggle(0);
            console.log($scope);
        };
        
        //类别
        $scope.filterByType = function(sType){
          if(sType.small_name){
            console.log(sType);
            $scope.currentSmallType = sType;
            $scope.currentLargeType = null;
            $cookieStore.remove(KEY_STORE_FILTER_TYPE);
            $cookieStore.remove(KEY_STORE_FILTER_BIG_TYPE);
            $cookieStore.put(KEY_STORE_FILTER_TYPE, sType);
          }
          else{
            console.log(sType);
            $scope.currentLargeType = sType;
            $scope.currentSmallType = null;
            $cookieStore.remove(KEY_STORE_FILTER_BIG_TYPE);
            $cookieStore.remove(KEY_STORE_FILTER_TYPE);
            $cookieStore.put(KEY_STORE_FILTER_BIG_TYPE, sType);
          }
          $scope.getList(0);
          $scope.filterToggle(0);
        }; 
  
        // // 类别
        // $scope.filterByType = function(sType){
        //     $scope.currentType = sType;
        //     $cookieStore.remove(KEY_STORE_FILTER_TYPE);
        //     $cookieStore.put(KEY_STORE_FILTER_TYPE, sType);
        //     $scope.getList(0);
        //     $scope.filterToggle(0);
        // };
  
        // 排序
        $scope.filterByRank = function(rType, rName){
            $scope.order_name = rName;
            $scope.order_key = rType;
            $cookieStore.remove(KEY_STORE_ORDER_KEY);
            $cookieStore.remove(KEY_STORE_ORDER_NAME);
            $cookieStore.put(KEY_STORE_ORDER_KEY, $scope.order_key);
            $cookieStore.put(KEY_STORE_ORDER_NAME, $scope.order_name);

            $scope.getList(0);
            $scope.filterToggle(0);
        };      

        // var longitude = 121.506191;
        // var latitude = 31.245554;

        //var map;

        var initializeMap = function() {
            map = new BMap.Map("map");
            // map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);
            map.centerAndZoom(new BMap.Point($cookieStore.get('longitude'), $cookieStore.get('latitude')), 11);
        };

        $scope.refreshMapContent = function(stores) {//TODO 添加覆盖
            stores.forEach(function(store) {
                console.log(store);
                var point = new BMap.Point(store.longitude, store.latitude);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            });
        };

        $scope.storeFilter = function(icbc, discount, mapFilter){
            console.log(mapFilter);
            if (mapFilter){
                //地图筛选
                $scope.mapFilter = true;
                // $cookieStore.put(KEY_STORE_FILTER_MODE, "map");
                $scope.updateMap();
            } else{
                $scope.mapFilter = false;
                $cookieStore.remove(KEY_STORE_FILTER_MODE);
                 //TODO
                $scope.discount_role = undefined;
                if  (icbc&&!discount){
                    $scope.discount_role = "10000111000000000000";
                } else if(!icbc&&discount){
                    $scope.discount_role = "01110000000000000000";
                } else if(icbc&&discount){
                    $scope.discount_role = "11110111000000000000";
                }
                $scope.avg_price = document.getElementById('minValue').innerHTML + ',' + document.getElementById('maxValue').innerHTML;
                $scope.getList(0);
            }
            // $cookieStore.put('storeFilterMode','');
        };

        API.getAllDistrict({}).then(function(data){
            $scope.hotCitys = data.top_list;
            $scope.citys = data.data;
            // for (var i = 0; i < $scope.citys.length; i++) {
            //     //first = {'districtCode': $scope.citys.length[i].}
            // }

            // //修改全部商区的显示 2015-05-15
            // if ($scope.districtId != '0') {
            //     $scope.currentDistrict.district_name = $scope.keyword;
            //     $scope.keyword = '';
            //     $scope.currentDistrict.community_name = $scope.districtId;
            //     $scope.currentDistrict.district_code = $scope.districtId;
            // }
        }, function(data){
            console.error("商区获取失败：" + data);
            $scope.toast('请检查网络设置');
        });


        API.getAllType({}).then(function(data){
            $scope.allTypes = data;
            $scope.currentType = data[0];

            var len = data.length;
            var i = 0;
            while(i < len){
                $scope.small_industry_list = data[i].small_industry_list;
                var j = $scope.small_industry_list.length;
                while(j--){
                    if($scope.small_industry_list[j].small_name == $scope.keyword){
                        $scope.currentSmallType.small_name = $scope.keyword;
                    }
                }
                i++;
            }
        }, function(data){
            console.error("全部分类获取失败：" + data);
        });

        // $scope.getList = function(firstTime){
        //     if(!firstTime){
        //         $scope.districtId = 0;
        //     }
        //     if ($scope.list.length % pageSize !== 0) {
        //         return;
        //     }
        //     $scope.isEmpty = false;
        //     $scope.loading = true;
        //     var para = {};
        //     para.s_row = 0;//$scope.list.length;
        //     para.e_row = 20;//para.s_row + pageSize;
        //     para.order_key = $scope.order_key;
        //     para.discount = $scope.discount_role;
        //     para.avg_price = $scope.avg_price;

        //     if ($scope.districtId != '0'){
        //         para.district_code = $scope.districtId;
        //         para.longitudeLocal = $cookieStore.get('longitude');
        //         para.latitudeLocal = $cookieStore.get('latitude');
        //     } else {
        //         para.store_name = $scope.keyword;
        //         //'longitude' : $cookieStore.get('longitude'),
        //         //'latitude' : $cookieStore.get('latitude'),
        //         if ($scope.currentDistance){
        //             para.query_distance = $scope.currentDistance.distance;
        //         } else if ($scope.currentDistrict) {
        //             para.district_code = $scope.currentDistrict.districtCode;
        //         }
        //         if($scope.currentSmallType.small_code){
        //             para.small_code = $scope.currentSmallType.small_code;
        //         }
        //         if ($scope.currentType) {
        //             para.small_code = $scope.currentType.small_code;
        //         }
        //         // if($scope.currentSmallDistance.distance){
        //         //   para.distance = $scope.currentSmallDistance.distance;
        //         // }
        //     }

    $scope.loadingMore = true;
    $scope.list = [];
    $scope.e_row = 0;
    $scope.page_size = 10; 
          
    $scope.getList = function(firstTime){
    $scope.loading = true;
    if(!firstTime){
      $scope.districtId = 0;
    }
    $scope.isEmpty = false;
    var para = {};
    if($scope.mark === false){
        $scope.list = [];
        $scope.e_row = 0;
    }
    para.s_row = $scope.e_row;
    para.e_row = para.s_row + $scope.page_size;
    $scope.e_row = para.e_row;
    // if($scope.districtId !== 0){
    //   // para = {
    //     // 'order_key' : $scope.order_key,
    //     // 'district_code' : $scope.districtId,
    //     // 'longitudeLocal' : $cookieStore.get('longitude'),
    //     // 'latitudeLocal' : $cookieStore.get('latitude'),
    //     // 's_row' : '1',
    //     // 'e_row' : '10', //TODO
    //     // 'discount' :  $scope.discount_role,
    //     // // 'avg_price' : $scope.avg_price
    //   // };
    // }else{
    //   para = {
    //    'order_key' : $scope.order_key,
    //   'keyword': $scope.keyword,
    //   // 't_k' : $rootScope.token,
    //   // 'c_no' : $cookieStore.get('c_no'),
    //   // 'city_code' : $cookieStore.get('city_code'),
    //   //'longitude' : $cookieStore.get('longitude'),
    //   //'latitude' : $cookieStore.get('latitude'),
    //   's_row' : '1',
    //   'e_row' : '10', //TODO
    //   'discount' :  $scope.discount_role,
    //   'avg_price' : $scope.avg_price
    // };
//    para.t_k = $rootScope.token;
//    para.c_no = $cookieStore.get('c_no');

//    para.s_row = $scope.sRow || 1;
//   para.e_row = $scope.eRow || 10;
    
//    para.bs_row = $scope.bsRow || 1;
//    para.be_row = $scope.beRow || 10;
//    if($scope.currentType){
//      para.large_code = $scope.currentType.big_code ;
//    }

    
    if($scope.keyword){
      para.keyword = $scope.keyword;
    }
    if($scope.currentDistance){
        para.query_distance = $scope.currentDistance;
    }
    if($scope.currentCityDistrict){
      para.city_district_code = $scope.currentCityDistrict.district_code;
    }
    if($scope.currentDistrict){
      para.district_code =  $scope.currentDistrict.community_code;
    }
    if($scope.currentLargeType){
      para.large_code = $scope.currentLargeType.large_code;
    }
    if($scope.currentSmallType){
      para.small_code = $scope.currentSmallType.small_code;
    }
    if($scope.order_key){
      para.order_key = $scope.order_key;
    }
    // }
    console.log("搜索参数");
    console.log(para);

    API.getStore(para).then(function(data){
        console.log("搜索结果:");
        console.log(data);
        var length1 = $scope.list.length;
        $scope.list = $scope.list.concat(data ? data : []);
        var length2 = $scope.list.length;
        // console.log('###########################################');
        // console.log(length1);
        // console.log(length2);
        // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
        if(length1 === length2){
            $scope.loadingMore = false;
        } 
        $scope.mapStartIndex = 0;
        $scope.mapEndIndex = pageSize;
        $scope.mapCurrentPage = 0;
        if ((!$scope.list || $scope.list.length === 0)){
            // console.log('----------------------------');
            // console.log($scope.list);
            $scope.isEmpty = true;
            $scope.loading = false;
            $scope.mark = false;
        } 
        else{
        for (var i = 0; i < $scope.list.length; i++) {
            var stars = [];
            for(var j=0;j<5;j++) {
                if (j+1<=$scope.list[i].levels) {
                    stars[j] = {"type":"full"};
                } else if(j - $scope.list[i].levels < 0) {
                    stars[j] = {"type":"half"};
                }else {
                    stars[j] = {"type" : "gray"};
                }
            }
            $scope.list[i].stars = stars;
            // $scope.list[i].distance /= 1000;
            // $scope.list[i].distance = $scope.list[i].distance.toFixed(1);
            $scope.list[i].icons = API.resolveDiscountRole($scope.list[i].discount_role);
            $scope.list[i].new_icons=[];
            for(var z=0;z<$scope.list[i].icons.length;z++){
                if($scope.list[i].icons[z]===' icon_yi'){
                    $scope.list[i].new_icons.push(' icon_yi');
                }
                if($scope.list[i].icons[z]===' icon_fen'){
                    $scope.list[i].new_icons.push(' icon_fen');
                }
                if($scope.list[i].icons[z]===' icon_shan'){
                    $scope.list[i].new_icons.push(' icon_shan');
                }
                if($scope.list[i].icons[z]===' icon_ji'){
                    $scope.list[i].new_icons.push(' icon_ji');
                }
            }
            console.log($scope.list[i].new_icons);
            // console.log('????????????/');
            // console.log($scope.list[i].icons);
            $scope.list[i].showdistance=$scope.list[i].distance+$scope.list[i].unit;
            $scope.list[i].bottomContent = '';
            if($scope.list[i].district_name1 && $scope.list[i].district_name1 !== ''){
                $scope.list[i].bottomContent += $scope.list[i].district_name1;
                $scope.list[i].bottomContent += '/';
            }
            if($scope.list[i].district_name2 && $scope.list[i].district_name2 !==''){
                $scope.list[i].bottomContent += $scope.list[i].district_name2;
                $scope.list[i].bottomContent += '/';
            }
            if($scope.list[i].district_name3 && $scope.list[i].district_name3 !==''){
                $scope.list[i].bottomContent += $scope.list[i].district_name3;
                $scope.list[i].bottomContent += '/';
            }
            $scope.list[i].bottomContent= $scope.list[i].bottomContent.substring(0, $scope.list[i].bottomContent.length-1)+' ';
            if($scope.list[i].small_name1 && $scope.list[i].small_name1 !==''){
                $scope.list[i].bottomContent += $scope.list[i].small_name1;
                $scope.list[i].bottomContent += '/';
            }
            if($scope.list[i].small_name2 && $scope.list[i].small_name2 !==''){
                $scope.list[i].bottomContent += $scope.list[i].small_name2;
                $scope.list[i].bottomContent += '/';
            }
            if($scope.list[i].small_name3 && $scope.list[i].small_name3 !==''){
                $scope.list[i].bottomContent += $scope.list[i].small_name3;
                $scope.list[i].bottomContent += '/';
            }
            $scope.list[i].bottomContent= $scope.list[i].bottomContent.substring(0, $scope.list[i].bottomContent.length-1);
        }
        console.log($scope.list);
        if ($scope.mapFilter) {
            $scope.updateMap();
        }
        $scope.loading = false;
        $scope.mark = false;
        }
    }, function(data){
        $scope.isEmpty = true;
        $scope.toast('请检查网络状况');
        $scope.list = [];
        $scope.loading = false;
        $scope.mark = false;
    });

            //保存搜索记录
            API.addHomeSearchHistory($scope.keyword);
        };

        // 获取列表
        $scope.getList(1);

        //点击回车，提交搜索,homepage
        $scope.keypress = function($e){
            if($e.keyCode == 13 && $scope.keyword.trim() !== ''){
                console.log("进行搜索");
                $scope.getList(0);
            }
        };

        var map = null;
        // 更新地图
        $scope.updateMap = function() {
            if (map === null) {
                map = new BMap.Map("map");
            }
            map.clearOverlays();
            console.log("haha");
            // 创建地图实例
            var point = new BMap.Point($cookieStore.get('longitude'), $cookieStore.get('latitude'));  // 创建点坐标
            map.centerAndZoom(point, 12);
            $scope.list.slice($scope.mapStartIndex, $scope.mapEndIndex).forEach(function(store) {
                console.log(store.longitude + ' ' + store.latitude);
                var point = new BMap.Point(store.longitude, store.latitude);
                var marker = new BMap.Marker(point);
                map.addOverlay(marker);
            });
        };

        $scope.mapPreviousPage = function() {
            if ($scope.mapCurrentPage > 0) {
                $scope.mapCurrentPage--;
                $scope.updateIndex();
            }
        };

        $scope.mapNextPage = function() {
            console.log("hello");
            var page = Math.floor($scope.list.length / pageSize);
            if ($scope.list.length % pageSize !== 0) {
                page = page + 1;
            }
            console.log(page);
            if ($scope.mapCurrentPage < page) {
                $scope.mapCurrentPage++;
                $scope.updateIndex();
            }
        };

        $scope.updateIndex = function() {
            $scope.mapStartIndex = $scope.mapCurrentPage * pageSize;
            $scope.mapEndIndex = $scope.mapStartIndex + pageSize;
            this.updateMap();
        };


        $scope.showLoading = function(){
          $scope.mark = true;
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        };

        $scope.removeAllCookies = function () {
            $cookieStore.remove(KEY_STORE_FILTER_MODE); 
            $cookieStore.remove(KEY_STORE_FILTER_DISTANCE); 
            $cookieStore.remove(KEY_STORE_FILTER_DISTRICT); 
            $cookieStore.remove(KEY_STORE_FILTER_CITY_DISTRICT); 
            $cookieStore.remove(KEY_STORE_FILTER_TYPE); 
            $cookieStore.remove(KEY_STORE_FILTER_BIG_TYPE); 
            $cookieStore.remove(KEY_STORE_ORDER_KEY);
            $cookieStore.remove(KEY_STORE_ORDER_NAME);
            obs._fire('returnBack');
            history.back();
        };

}]);