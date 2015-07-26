elife.controller('PayOrderCtrl',['$scope','$http', '$cookieStore', '$routeParams', 'API', '$rootScope', function ($scope,$http, $cookieStore,$routeParams, API, $rootScope){
	$scope.ec_code=null;
  $scope.ec_code=$rootScope.ec_code || 0;
  $scope.ec_price=$rootScope.ec_price || null;
  
   // 返回按钮
  elife_app.SetReturnBtn();
	
  console.log('SDDDDSSSSSS');
  $scope.order_id=$routeParams.order_id === 'undefined' ? '' : $routeParams.order_id;
  $scope.store_id=$routeParams.store_id;
  console.log($scope.order_id);
  console.log($scope.store_id);
  
   API.getEWMDetial({
    'order_id' : $scope.order_id
  }).then(function(data){
    console.log('获取订单详情成功！');
    console.log(data);
    $scope.list=data.data;
    console.log($scope.list);    
  },function(data){
    $scope.toast('请检查网络状况');
  });
  
  $scope.clearScope=function(){
    $rootScope.ec_code=null;
    $rootScope.ec_price=0;
    history.back();
  };
  //获取电子券
    API.getECoupon({}).then(function(data){
    console.log('我的电子券获取成功');
    console.log(data);
    var info = data.data;
    console.log(info);
    $scope.ECoupons = [];
    for (var i=0; i < info.length; i ++){
      $scope.ECoupons[i] = {
        "Ec_name" : info[i].ec_name,
        "Ec_code" : info[i].ec_code,
        "Ec_img" : info[i].ec_image_url,
        "Ec_type" : info[i].pft_type,
        "Ec_invalid" : info[i].invalid_status,
        "Effect_beginDate" : info[i].effect_beginDate.substr(0,10),
        "Effect_endDate" : info[i].effect_endDate.substr(0,10),
        "Effect_content" : info[i].effect_content,
        "Effect_state" : info[i].effect_state,
        "Effect_price" : info[i].effect_price
      };
    }
  }, function(data){
    console.log('我的电子券获取失败: ' + data);
    $scope.toast('请检查网络状况');
  });

  $scope.submitOrder = function () {

    var para = {
      't_k' : '10001',
      'c_no' : 'AA',
      'pay_amt' : $scope.total_money - $scope.ec_price,
      'total_amt' : $scope.total_money,
      'store_code' : $scope.store_id,
      'order_id' : $scope.order_id,
      'tran_way' : 3
    };

    if (para.total_amt - 0 === 0) {
      $rootScope.toast('请输入金额');
    }

    if (para.total_amt === undefined) {
      $rootScope.toast('请输入正确的金额');
    }

    API.addOrder(para).then(function (data) {
      console.log(data);
    },function (data) {
      console.error(data);
    });
  }; 
  }]);