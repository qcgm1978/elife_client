elife.controller('TradeListCtrl', ['$scope', '$http','$cookieStore','$rootScope', function($scope, $http,$cookieStore,$rootScope){
  
  $scope.date = "2015-03";  //初始化
  $scope.months = [
  {"num": 1}, {"num": 2}, {"num": 3}, {"num": 4},
  {"num": 5}, {"num": 6}, {"num": 7}, {"num": 8},
  {"num": 9}, {"num": 10}, {"num": 11}, {"num": 12}
  ];

  //页面载入时执行,通过token编号和渠道号查询custid，再根据custid和日期querydate查找该用户当月的交易列表
  $cookieStore.put('t_k','10001');
  var tokenid = $cookieStore.get('t_k');
  var channelid = ICBCUtil.getIMChannel();
  var listUrl = $rootScope.baseUrl + "/OFSTCUST/listTrade/receive.action";
  $http.post(listUrl, {"tokenid": tokenid, "channelid": channelid, "querydate": $scope.date})
  .success(function(response){
    if(response !== null && response !== undefined && response !== ''){
      $scope.items = response;
    }
    else{
      alert("未查到该用户在" + $scope.date + "的交易明细");
    }
  })
  .error(function(response){
    $rootScope.toast('请检查网络');
  }); 
    
  $scope.listReq = function(year, month){
    if(month < 10){
      $scope.date = year + "-0" + month;
      } 
    else{
      $scope.date = year + "-" + month;
      }
    
    //通过统一通行证编号custid和查询日期querydate请求当月交易列表
    var listUrl = $rootScope.baseUrl + "/OFSTCUST/listTrade/receive.action";
    $http.post(listUrl, {"custid": custid, "querydate": $scope.date})
    .success(function(response){
      if(response !== null && response !== undefined && response !== ''){
        $scope.items = response;
      }
      else{
        alert("未查到用户" + custid + "在" + $scope.date + "的交易明细");
      }
    })
    .error(function(response){
      $rootScope.toast('请检查网络');
    }); 
  };
    
}]);

elife.controller('TradeDetailCtrl', ['$scope', '$http', '$routeParams','$cookieStore','$rootScope', function($scope, $http, $routeParams,$cookieStore,$rootScope){
  
  var orderId = $routeParams.orderId;
  var shopId = $routeParams.shopId;
  
  $scope.orderId = $routeParams.orderId;
  $scope.shopId = $routeParams.shopId;
  $scope.transerialnum = $routeParams.transerialnum;
  
  //根据事件编号（唯一主键）通过dsr调主机接口查交易详情
  $scope.buttonflag = "0"; //标志变量，为0表示默认可退货
  var detailUrl = $rootScope.baseUrl + "/OFSTCUST/detailTrade/receive.action";
  $http.post(detailUrl, {"shopId": shopId, "orderId": orderId})
  .success(function(response){
    if(response !== null && response !== undefined && response !== ''){
      $scope.detail = response; //此时response已经是DOM对象，不用eval()函数解析
      $scope.buttonflag = response.bUTTONFLAG;
    }
    else{
      alert("未查到该笔交易的交易详情");
    }
  })
  .error(function(response){
    $rootScope.toast('请检查网络');
  });
  
  //根据特约商户编号shopId查询门店信息,langitude和latitude是通过电子地图获取的经纬度
  $cookieStore.put('longitudeLocal', '116.472296');
  $cookieStore.put('latitudeLocal', '39.994475');
  var longitude = $cookieStore.get('longitudeLocal');
  var latitude = $cookieStore.get('latitudeLocal');
  var storeUrl = $rootScope.baseUrl +"/OFSTCUST/storeInfo/receive.action";
  $http.post(storeUrl, {"shopId": shopId, "longitude": longitude, "latitude": latitude})
  .success(function(response){
    $scope.storeinfo = response;
    
    //控制逸、闪、分、积图标显示与否
    var flag = response.servicesupportflag;
    var flagArr = flag.split(""); //字符串转数组
    if(flagArr[0] === '0'){//逸贷
      document.getElementById("yi_div").style.visibility = "hidden";
    }
    if(flagArr[1] === '0'){//闪酷
      document.getElementById("shan_div").style.visibility = "hidden";
    }
    if(flagArr[2] === '0'){//积分
      document.getElementById("ji_div").style.visibility = "hidden";
    }
    if(flagArr[3] === '0'){//分期
      document.getElementById("fen_div").style.visibility = "hidden";
    }
    
    //控制星级的显示
    var level = parseFloat(response.starLevel); //字符串转浮点数
    var intLevel = parseInt(response.starLevel); //显示整颗星
    var decLevel = level - intLevel; //0.1~0.5显示半颗星，0.5~0.9显示整颗星
    $scope.starArray = new Array(intLevel);
    for(var i = 0; i < intLevel; i++){
      $scope.starArray[i] = i;
    }
  })
  .error(function(response){
    $rootScope.toast('请检查网络');
  });
  
  /*
   * 根据buttonflag的值判断点击“退货”按钮的事件
   * 0-非当日交易,待查退货登记表中是否已登记该订单号交易的记录及处理状态,可能处理路径:正常退货\退货待处理
   * 1-非银联当日交易,待查退货登记表中是否已登记该订单号交易的记录及处理状态,可能处理路径:全部退货\退货待处理
   * 2-银联当日交易,不能退货
   * 3-团购,不支持退货
   * 4-交易状态不正常,不能退货
   * 5-已全部退货,不能再次退货
   */
  // $scope.returnOrder = function(){
  //   if(buttonflag === "0" || buttonflag === "1"){
  //     $scope.returnpage = "#/personal/trade_returns";
  //   }
  //   else if(buttonflag === "2"){
  //     $scope.returnpage = "javascript:void(0)";
  //     alert("该交易属银联当日交易，不能退货");
  //   }
  //   else if(buttonflag === "3"){
  //     $scope.returnPage === "javascript:void(0)";
  //     alert("团购商品不能退货");
  //   }
  //   else if(buttonflag === "4"){
  //     $scope.returnPage == "javascript:void(0)";
  //     alert("该笔交易状态不正常，不能退货");
  //   }
  //   else if(buttonflag === "5"){
  //     $scope.returnPage == "javascript:void(0)";
  //     alert("该商品已全部退货，不能再次退货");
  //   }
  // };
  
}]);

elife.controller('TradeReturnCtrl', ['$scope', '$http', '$routeParams','$rootScope', function($scope, $http, $routeParams,$rootScope){

  var buttonflag = $routeParams.buttonflag;
  var orderId = $routeParams.orderId;
  var shopId = $routeParams.shopId;
  var ordersum = $routeParams.ordersum;
  var transerialnum = $routeParams.transerialnum;

  //$scope.transerialnum = transerialnum;
  
  //通过tokenid和channelid获取客户姓名和电话
  var tokenid = $cookieStore.get('t_k');
  var channelid = ICBCUtil.getIMChannel();
  var custUrl = $rootScope.baseUrl + "/OFSTCUST/custInfo/receive.action";
  $http.post(rejectUrl, 
      {"tokenid" : tokenid,
       "channelid" : channelid})
  .success(function(response){
    $scope.person = response.username;
    $scope.tele = response.phone; //需要做输入格式规范检查
  })
  .error(function(response){
    $rootScope.toast('请检查网络');
  });

  /*
   * 根据buttonflag的值判断点击“退货”按钮的事件
   * 0-非当日交易,待查退货登记表中是否已登记该订单号交易的记录及处理状态,可能处理路径:正常退货\退货待处理
   * 1-非银联当日交易,待查退货登记表中是否已登记该订单号交易的记录及处理状态,可能处理路径:全部退货\退货待处理
   */
  $scope.returnAmount = ordersum;
  
  if(buttonflag == "1"){
    $scope.inputflag = true;
  }
  
  $scope.returnSubmit = function(){
    var rejectUrl = $rootScope.baseUrl + "/OFSTCUST/rejectTrade/receive.action";
    $http.post(rejectUrl, 
        {"buttonflag" : buttonflag,
         "transerialnum" : transerialnum,
         "orderId" : orderId,
         "shopId" : shopId,
         "rejectSum" : $scope.returnAmount,
         "cust_Name" : $scope.person,
         "cust_PhoneNum" : $scope.tele,
         "rejectReason" : $scope.content})
    .success(function(response){
      alert("成功" + response);
    })
    .error(function(response){
      $rootScope.toast('请检查网络');
    });
    
    };
    
  //输入框输入字数检查
  $scope.check= function(){
    var len  = document.getElementById("trade_return_content").value.length;
    if(len>999){
      $scope.content = $scope.content.substring(0, 999);
      }
    };
    
}]);

elife.controller('TradeReturnSuccessCtrl', ['$scope', '$http', '$routeParams','$rootScope', function($scope, $http, $routeParams,$rootScope){
  $scope.transerialnum = $routeParams.transerialnum;
}]);