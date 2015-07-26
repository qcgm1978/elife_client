elife.controller('AppOrderCtrl',['$scope','$rootScope', '$routeParams', '$http', '$cookieStore', 'API', 'SharedState', function ($scope,$rootScope, $routeParams, $http, $cookieStore, API, SharedState){
  // 返回按钮
  elife_app.SetReturnBtn();
  

  
  API.getOrders({
    'tran_way' : 'APP',
    'type' : 'PAID'
  }).then(function(data){
    console.log('我的订单获取成功');
    console.log(data);
    $scope.paidOrders = data;
  },function(data){
    console.log('我的订单获取失败: ' + data);
  });
  
  API.getOrders({
    'tran_way' : 'APP',
    'type' : 'UNPAID'
  }).then(function(data){
    console.log('我的订单获取成功');
    console.log(data);
    $scope.unpaidOrders = data;
  },function(data){
    console.log('我的订单获取失败: ' + data);
  }); 

}]);


elife.controller('ewmOrderCtrl',['$scope','$rootScope', '$routeParams', '$http', '$cookieStore', 'API', 'SharedState', function ($scope,$rootScope, $routeParams, $http, $cookieStore, API, SharedState){
  // 返回按钮
  elife_app.SetReturnBtn();
  
  
  API.getOrders({
    'tran_way' : 'QRCODE',
    'type' : 'PAID'
  }).then(function(data){
    console.log('我的订单获取成功');
    console.log(data);
    $scope.paidOrders = data;
  },function(data){
    console.log('我的订单获取失败: ' + data);
  });
  
  API.getOrders({
    'tran_way' : 'QRCODE',
    'type' : 'UNPAID'
  }).then(function(data){
    console.log('我的订单获取成功');
    console.log(data);
    $scope.unpaidOrders = data;
  },function(data){
    console.log('我的订单获取失败: ' + data);
  }); 

}]);


elife.controller('GppOrderCtrl',['$scope','$rootScope', '$routeParams', '$http', '$cookieStore', 'API', 'SharedState', function ($scope,$rootScope, $routeParams, $http, $cookieStore, API, SharedState){
  // 返回按钮
  elife_app.SetReturnBtn();
  //状态数据-后台只能传过来 1、2、4、6、10
  //$scope.status = ['未分配','已购买','已使用','已作废','已退货','已过期','过期已退款','退货锁定','使用锁定','过期退款锁定','购买锁定'];
  $scope.status = ['','待消费','已消费','','已退款','','过期已退款','','','','待付款'];
  //获取列表数据
  API.getGroupList({
  }).then(function(data){
    console.log(data);
    $scope.paidOrders = data.payList;
    for(var i=0; i<data.payList.length; i++) {
      if(data.payList[i].gpp_status === "1")
        data.payList[i].isRed = true;
      else
        data.payList[i].isRed = false;
      data.payList[i].s_date = data.payList[i].begin_time.split(" ")[0];
      data.payList[i].e_date = data.payList[i].end_time.split(" ")[0];
    }
    $scope.unpaidOrders = data.unPayList;
    for(var j=0; j<data.unPayList.length; j++) {
      if(data.unPayList[i].gpp_status === "10")
        data.unPayList[j].isRed = true;
      else
        data.unPayList[j].isRed = false;
      data.unPayList[j].s_date = data.unPayList[j].begin_time.split(" ")[0];
      data.unPayList[j].e_date = data.unPayList[j].end_time.split(" ")[0];
    }
  }, function(data){
    $scope.toast("请检查网络状况");
    console.error("我的团购列表获取失败：" + data);   
  });  
  // API.getOrders({
  //   'tran_way' : 'GROUP',
  //   'type' : 'PAID'
  // }).then(function(data){
  //   console.log('我的订单获取成功');
  //   console.log(data);
  //   $scope.paidOrders = data;
  // },function(data){
  //   console.log('我的订单获取失败: ' + data);
  // });
  
  // API.getOrders({
  //   'tran_way' : 'GROUP',
  //   'type' : 'UNPAID'
  // }).then(function(data){
  //   console.log('我的订单获取成功');
  //   console.log(data);
  //   $scope.unpaidOrders = data;
  // },function(data){
  //   console.log('我的订单获取失败: ' + data);
  // }); 

}]);

//useless
elife.controller('PersonalOrdersCtrl',['$scope','$rootScope', '$routeParams', '$http', '$cookieStore', 'API', 'SharedState', function ($scope,$rootScope, $routeParams, $http, $cookieStore, API, SharedState){
 
 }]);