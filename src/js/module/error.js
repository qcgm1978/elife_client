elife.controller('ErrorCtrl', ['$scope','$rootScope', '$routeParams', '$cookieStore' , '$http', 'API', 'SharedState',  function ($scope,$rootScope, $routeParams, $cookieStore, $http, API, SharedState) {
 
  elife_app.SetReturnBtn();
   
    $scope.id = $routeParams.id;
    $scope.district_name=$cookieStore.get('DISTRICT_NAME');
    $scope.small_code=$cookieStore.get('SMALL_CODE');
    $scope.small_name=$cookieStore.get('SMALL_NAME');
    console.log('SE');
    console.log($rootScope.store_name );
   
  $scope.setStoreName = function () {
     $cookieStore.put('STORE_NEW_NAME',$scope.busiInfo.store_name);
     $cookieStore.put('STORE_NEW_ADDRESS',$scope.busiInfo.store_address);
     $cookieStore.put('STORE_NEW_TEL',$scope.busiInfo.tel_phone1);
  };
    $scope.clearErrHistory = function () {
    $cookieStore.remove('DISTRICT_NAME');
    $cookieStore.remove('DISTRICT_CODE');
    $cookieStore.remove('SMALL_CODE');
    $cookieStore.remove('SMALL_NAME');
    $cookieStore.remove('STORE_NEW_NAME');
    $cookieStore.remove('STORE_NEW_ADDRESS');
    $cookieStore.remove('STORE_NEW_TEL');
    history.back();
   };
    
    // 商户详情 2015-05-10 1  2:29:56
API.getBusinessInfo({
  'store_code' : $scope.id
}).then(function(data){
  console.log('商户详情');
  console.log(data);
   var info = data;
    $scope.head_code=data.parent_store_code;
    
    $scope.busiInfo = {
      "average_price" : info.average_price,
      "store_code" : info.store_code,
      "store_name" : $cookieStore.get('STORE_NEW_NAME') || info.store_name,
      "image_url" : info.image_url,
      "image_name" : info.image_name,
      "store_address" : info.store_address || $cookieStore.get('STORE_NEW_ADDRESS'),
       'busihours' : info.busihours,
       "levels" : info.levels,
       "large_flag":info.large_flag,
     // "distance" : info.distance / 1000,
     // "small_type" : info.small_type,
      "people_consumption" : info.people_consumption,
      "sentiment_count" : info.sentiment_count,
      "praise_count" : info.praise_count,
      "view_count" : info.view_count,
      "tel_phone1" : info.tel_phone1 || $cookieStore.get('STORE_NEW_TEL'),
      "tel_phone2" : info.tel_phone2,
      "tel_phone3" : info.tel_phone3,
      // "start_time" : info.start_time,
      // "end_time" : info.end_time,
        "longitude": info.longitude,
        "latitude": info.latitude,
      "is_wifi" : info.is_wifi == "0" ? "_gray" : "",
      "is_free" : info.is_free == "0" ? "_gray" : "",
      "is_credit_card" : info.is_credit_card == "0" ? "_gray" : "",
      "fav_status": info.fav_status || 0
    };
    // $scope.busiInfo.store_name=$cookieStore.get('ERROR_STORE_NAME') || data.store_name;
    // $scope.busiInfo.store_address=$cookieStore.get('ERROR_STORE_ADDRESS') || data.store_name;
    // $scope.busiInfo.tel_phone1=$cookieStore.get('ERROR_STORE_TEL') || data.store_name;
   },
function(data){
console.log('商户详情获取失败');
$scope.toast("请检查网络状况1");
});


 // $cookieStore.put('ERROR_STORE_NAME',$scope.busiInfo.store_name);
  //  $cookieStore.put('ERROR_STORE_ADDRESS',$scope.busiInfo.store_address);
  //  $cookieStore.put('ERROR_STORE_TEL',$scope.busiInfo.tel_phone1);
   
  //  $scope.name=$cookieStore.get('SMALL_CODE');
  //  console.log('修改啦！');
  //  console.log($scope.name);
   
   //报错
    
    $scope.errorReport = function(type){
        $scope.toast('正在提交报错信息...');
        var para = {
          'error_type' : type,
          'store_code': $scope.id,
          'head_code': $scope.head_code,
          't_k': '10001',
          'c_no': 'AA'
        };
        //para.latitude=$cookieStore.get('latitude'),
        //para.longitude=$cookieStore.get('longitude')
       switch (type) {
           case '2':
            // para.error_meg = 
             break;
           case '08':
               // para.store_name= $scope.busiInfo.store_name;
               // para.store_address= $scope.busiInfo.store_address;
               // para.tel_phone1= $scope.busiInfo.tel_phone1;
               // para.district_name= $scope.district_name;
               // para.small_name=$scope.small_name;
               para.error_meg="store_name:"+$scope.busiInfo.store_name+","+"store_address:"+$scope.busiInfo.store_address+","+"tel_phone1:"+$scope.busiInfo.tel_phone1+","+"district_name:"+$scope.district_name+","+"small_name:"+$scope.small_name;
             break;
           case '10':
             para.error_meg = $scope.content;
             break;
           default:
             para.error_meg = null;
             break;
       }
       API.reportError(para).then(function(data){
        SharedState.turnOn('success_modal');   
        console.log('提交成功');
        console.log(data);
       },function(data){
        console.log('请检查网络');
        console.log(data);
       });  
    };
      
      


    //获取修改后的信息
    // $scope.busiInfo.store_name;
    // $scope.busiInfo.store_address;
    // $scope.busiInfo.tel_phone1;
    // $scope.district_name;
    // $scope.small_name;
    // console.log('获取页面信息');
    // console.log($scope.busiInfo.store_name);
    // console.log($scope.busiInfo.store_address);
    // console.log($scope.busiInfo.tel_phone1);
    // console.log($scope.district_name);
    // console.log($scope.small_name);
       
//       //TODO 商户详情 2015-05-10 12:29:56 
//       $http.post($rootScope.baseUrl + '/OFSTCUST/cuinfo/findCuMoreById.action ',{
//           't_k' : $rootScope.token,
//           'c_no' : $cookieStore.get('c_no'),
//           'store_code' : $scope.id,
//           'city_code' : ''
//       })
//       .success(function (data) {
//           data={
//               "res" : 0,
//               "data" :
//               {
//                   "store_code": "102030411111",
//                   "store_name": "商户名称",
//                   "image_url": "http://",
//                   "image_name": "test",
//                   "address": "海淀区",
//                   "dcmt_level": "5",
//                   "distance": "700",
//                   "small_type": "川菜/家常菜",
//                   "people_consumption": "200",
//                   "praise_count":"3",
//                   "sentiment_count":"2000",
//                   "view_count":"11111",
//                   "tel_phone":"010-999999",
//                   "is_yd":"1",
//                   "is_fq":"0",
//                   "is_jf":"1",
//                   "is_sk":"0",
//                   "is_gh":"0", 
//                   "is_tu":"0",
//                   "is_cx":"0",
//                   "is_ka":"0",
//                   "is_free":"1",
//                   "is_wifi":"0",
//                   "is_credit_card":"1",
//                   "start_time":"09:00",
//                   "end_time":"22:00"

//               }
//           };
//           var info = data.data;
//           $scope.busiInfo = {
//               "store_code" : info.store_code,
//               "store_name" : info.store_name,
//               "address" : info.address,
//               "small_type" : info.small_type,
//               "people_consumption" : info.people_consumption,
//               "sentiment_count" : info.sentiment_count,
//               "praise_count" : info.praise_count,
//               "view_count" : info.view_count,
//               "tel_phone" : info.tel_phone
//  };
//  console.log($scope.busiInfo);
// });

// //商户其他报错
// $scope.otherErrorReport = function(type){
//   // 跳转到商户首页
//   window.location.href="#/business/index/102030411111";  

// };


}]);