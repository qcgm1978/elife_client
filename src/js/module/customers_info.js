// 团购详情，团购添加页面js
elife.controller('CustomersInfoCtrl', ['$scope','$rootScope','SharedState', '$http', '$cookieStore', '$routeParams','API',function($scope, $rootScope, SharedState, $http, $cookieStore,$routeParams,API){
  // var customer_code = $routeParams.id;
  
  // $scope.id = $routeParams.id;
  $scope.code = $routeParams.code;
  $scope.price = $routeParams.price;
  $scope.gppCode = $routeParams.gppCode;
  // console.log('????????');
  console.log($scope.code);
  // 返回按钮
  elife_app.SetReturnBtn();

  $scope.num=1;
 // $scope.price=85;

if(!$routeParams.gppCode){
 //获取商户团购优惠详情
 API.getGppInfo({
   'group_code' :  $scope.code
 }).then(function(data){
   console.log('获取商户团购优惠详情');
   $scope.gppInfo = data.data[0];
 }, function(data){
    $scope.toast("请检查网络状况");
   console.error("获取商户团购优惠详情失败" + data);
 });

//获取适用门店
   API.getSuitStoreList({
    'pft_code' : $scope.code,
    'type' :  'GROUP'
   }).then(function(data){
    console.log('获取适用门店d');
    console.log(data);
    $scope.gppStoreList = data;
    if(data){
      console.log("sss");
        for(var i = 0; i < $scope.gppStoreList.length; i++){
          $scope.gppStoreList[i].discount_role =  API.resolveDiscountRole($scope.gppStoreList[i].discount_role);         
          $scope.gppStoreList[i].new_discount_role=[];
         for(var z=0;z<$scope.gppStoreList[i].discount_role.length;z++){
            if($scope.gppStoreList[i].discount_role[z]===' icon_yi'){
                  $scope.gppStoreList[i].new_discount_role.push(' icon_yi');
            }
             if($scope.gppStoreList[i].discount_role[z]===' icon_fen'){
                  $scope.gppStoreList[i].new_discount_role.push(' icon_fen');
            }
             if($scope.gppStoreList[i].discount_role[z]===' icon_shan'){
                  $scope.gppStoreList[i].new_discount_role.push(' icon_shan');
            }
             if($scope.gppStoreList[i].discount_role[z]===' icon_ji'){
                  $scope.gppStoreList[i].new_discount_role.push(' icon_ji');
            }
           
         }
          var stars=[];
          for(var j=0;j<5;j++)
          {
            if (j+1<=$scope.gppStoreList[i].levels)
            {
              stars[j] = {"type":"full"};
            }else if(j - $scope.gppStoreList[i].levels < 0)
            {
              stars[j] = {"type":"half"};
            }else {
              stars[j] = {"type" : "gray"};
            }
          }
          $scope.gppStoreList[i].levels = stars;
          // console.log('???????????????????????');
          // console.log(stars);
           $scope.gppStoreList[i].bottomContent = '';
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].district_name1 && $scope.gppStoreList[i].district_name1 !== ''){
        $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].district_name1;
        $scope.gppStoreList[i].bottomContent += '/';
      }
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].district_name2 && $scope.gppStoreList[i].district_name2 !==''){
         $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].district_name2;
        $scope.gppStoreList[i].bottomContent += '/';
      }
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].district_name3 && $scope.gppStoreList[i].district_name3 !==''){
         $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].district_name3;
        $scope.gppStoreList[i].bottomContent += '/';
      }
       $scope.gppStoreList[i].bottomContent= $scope.gppStoreList[i].bottomContent.substring(0, $scope.gppStoreList[i].bottomContent.length-1)+' ';
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].small_name1 && $scope.gppStoreList[i].small_name1 !==''){
        $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].small_name1;
         $scope.gppStoreList[i].bottomContent += '/';
      }
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].small_name2 && $scope.gppStoreList[i].small_name2 !==''){
        $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].small_name2;
         $scope.gppStoreList[i].bottomContent += '/';
      }
      if(($scope.gppStoreList[i].bottomContent.length <= 18) && $scope.gppStoreList[i].small_name3 && $scope.gppStoreList[i].small_name3 !==''){
        $scope.gppStoreList[i].bottomContent += $scope.gppStoreList[i].small_name3;
         $scope.gppStoreList[i].bottomContent += '/';
      }
       $scope.gppStoreList[i].bottomContent= $scope.gppStoreList[i].bottomContent.substring(0, $scope.gppStoreList[i].bottomContent.length-1);
       $scope.gppStoreList[i].showdistance=$scope.gppStoreList[i].distance+$scope.gppStoreList[i].unit;
      }     
      }
   },function(data){
     $scope.toast("请检查网络状况");
   });
   
    // //获取网友点评
    // API.getComments({
    //   's_row' : 0,
    //   'e_row' : 1,
    //   'cmtType' : 'Group',
    //   'evaTargetCode' : $scope.code
    // }).then(function(data){
    //   console.log("点评列表");
    //   console.log(data);
    //   $scope.count = data.count;
    //   if($scope.count > 0) {
    //     $scope.commentList = data.review_list[0];
    //      console.log($scope.commentList);
    //      $scope.commentList.longEnough=$scope.commentList.review_content.length>65?true:false;
    //      $scope.commentList.content = $scope.commentList.review_content.substr(0, 65);
    //      $scope.commentList.more = $scope.commentList.review_content.substr(65, $scope.commentList.review_content.length);
    //     //设置展示的星级
    //     var stars=[];
    //     for(var j=0;j<5;j++) {
    //       if (j+1 <= $scope.commentList.level) {
    //         stars[j] = {"type":"full"};
    //       }else if(j - $scope.commentList.level < 0) {
    //         stars[j] = {"type":"half"};
    //       }else {
    //         stars[j] = {"type" : "gray"};
    //       }
    //     }
    //     $scope.stars = stars;
    //     //设置展示的图片
    //     $scope.imagelist = $scope.commentList.review_image_list || [];
    //   }
    // },function(data){
    //   $scope.toast("请检查网络状况");
    //   console.error("银行优惠点评列表获取失败：" + data);
    // });   
   
 // 选择器方法
 $scope.Minus= function(){
    if($scope.num>=2){
       $scope.num=  $scope.num-1;
        
    }
  
  };
  $scope.Plus= function(){
    if($scope.num<=99){
       $scope.num = $scope.num+1;
      
    }
   
  };
  $scope.Total= function(){
    if(isNaN($scope.num)){
      return 0;
    }
    else{
         $scope.total = ($scope.num*$scope.price).toString();
         $scope.total =  "￥"+$scope.total +".00";
        return $scope.total;
    }
  };
   $scope.default= function(event){
    if(isNaN($scope.num)){
      $scope.num = 1;
    }
    event.target.value = $scope.num;
  };


  $scope.submitOrder= function(){
   if($scope.num === 1){
     location.href="#/discount/customers_succeeded";

   }
   else{
      SharedState.turnOn('submit_order_error_modal');
   }
  };
 
 if(!$routeParams.price){
  // API.getBusinessDiscountInfo({
  //   pft_code : customer_code
  // }).then(function(data){
  //   console.log(data);
  //   // $scope.busdisInfo = {
  //   //   fav_status : data.fav_status
  //   // };
  //   $scope.busdisInfo = data.data;
  //   $scope.busdisInfo.fav_status = $scope.busdisInfo.fav_status || 0;
  // },function(data){});
   
  //  // //获取团购适用门店
  //  // API.getSuitStoreList({
  //   //  'pft_code' : $scope.busdisInfo.code,
  //   //  'type' : 'GROUP'
  //  // }).then(function(data){
  //   //     console.log(data);
  //   //     $scope.suitStoreList = data.data[0];
  //   //   }, function(data){
  //   //     $scope.toast("请检查网络状况");
  //   //   });
   
   // 收藏团购
  $scope.addCustomerFavor = function(){
    console.log("收藏商户优惠");
    if($scope.gppInfo.fav_status == "1") {
      API.deleteDiscountFavor({store_codes : $scope.code + "#3"}).then(function(data){
        console.log(data);
        if(data.res === '0'){
          $scope.gppInfo.fav_status = "0";
          $scope.toast("删除收藏成功");
        }
        if(data.res === '2000002') {
          $scope.gppInfo.fav_status = "0";
          $scope.toast("您已成功删除收藏");
        }
      }, function(data){
        $scope.toast("请检查网络状况");
      });
    } else {
      API.addBankCountFavor({
        'Group_code' : $scope.code
      }).then(function(data){
        console.log("收藏商会优惠详情");
        console.log(data.res);
        if(data.res === '0'){
           $rootScope.toast("收藏成功");
           $scope.gppInfo.fav_status = "1";
        }
        if(data.res ==='2000002'){
          console.log("您已经收藏过");
          $rootScope.toast("您已经收藏过");
          $scope.gppInfo.fav_status = "1";
        }
      }, function(data){
        $scope.toast("请检查网络状况");
        console.error("银行优惠详情获取失败：" + data);
      });
    }

  //   $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action ',{
  // 't_k' : $rootScope.token,
  // 'c_no' : $cookieStore.get('c_no'),
  // 't_code' : '11'
  // })
  // .success(function (data) {
  //   if(data.res === 0){
  //     console.log("成功");
  //   }
  //   if(data.res === 1000002){
  //     console.log("失败");
  //   }
  //   if(data.res === 1000003){
  //     console.log("缺少参数");
  //   }

  // });
  };
 }
}else{
  API.getGppInfoDetail({
    'group_code': $scope.gppCode
  })
 .then(function(data){
   console.log('获取团购优惠详情更多成功');
   console.log(data);
   $scope.gppInfoDetail = data.data[0];
 },function(data){
   $scope.toast('请检查网络状况');
   console.error('获取团购优惠详情更多失败: ' + data);
 });
}
}]);