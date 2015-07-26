elife.controller('MyFavoritesCtrl',['$scope', '$http', '$cookieStore', 'SharedState', 'API', '$rootScope', function($scope,$http, $cookieStore, SharedState, API, $rootScope){
  
  // 返回按钮
  elife_app.SetReturnBtn();

  //是否点击顶部商户删除
  $scope.favor_delete = false;
  $scope.discount_delete = false;

  //商户选择
  $scope.favor_select = [];
  //优惠选择
  $scope.discount_select = [];
  
  $scope.typetop = null; 

  //是否点击底部删除按钮
  $scope.delete_btn = false;
  console.log("商户、优惠");
  console.log($rootScope.showDelete);
  $rootScope.showDelete = $rootScope.showDelete === false ? $rootScope.showDelete: true;
  console.log($rootScope.showDelete);
  $scope.imgBaseUrl = $rootScope.imgBaseUrl;

  for(var i=0;i<5;i++){
   $scope.favor_select[i]= false;
   $scope.discount_select[i]= false;
 }
  //列表排序选项开关
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
  //获取地区及类别列表
  
  
  // API.getFavCityList({
  // }).then(function(data){
  //   $scope.cityList = data.districtlist;
  //   console.log('获取地区列表成功');
  //   console.log($scope.cityList);
  //   $scope.typeList = data.industrylist;
  //   console.log('获取类别列表成功');
  //   console.log($scope.typeList);    
  // },function(data){
  //   $scope.toast("请检查网络状况");
  //   console.error("银行优惠详情获取失败：" + data);   
  // });
  
  
   $http.post($scope.baseUrl + '/OFSTCUST/cusinfoFav/showCity.action',
   {
   't_k' : $rootScope.token,
   'c_no' : $cookieStore.get('c_no')
   }).success(function (result) {
    console.log('result');
    console.log(result);
     $scope.cityList=result.data.districtlist;
     $scope.tempCityName=result.data.industrylist[0].city_name;
     $scope.citytop = result.data.industrylist[0].city_name;
     $scope.industryList=result.data.industrylist;
     $scope.tempName=result.data.industrylist[0].large_name;
     //$scope.typetop = result.data.industrylist[0].large_name;
     console.log($scope.industryList);
   });
   // $scope.showSub = function(e){console.log(e);$scope.ui=e+1;$scope.subList=$scope.cityList[e-1].list;};
   $scope.sideTabToggle1 = function (n,name,code) {
    $scope.tempName=name;
    $scope.tempCode=code;
    $scope.stype = name;
    SharedState.set({sideTab1:n+1});
   };
   $scope.sideTabToggle2 = function (n,name,code) {
    $scope.tempCityName = name;
    $scope.tempCityCode = code;
    SharedState.set({sideTab2:n+1});

   };
   // 按底部删除商户按钮方法
   $scope.openModal = function(){
    if($rootScope.showDelete){
      if(!angular.element(document.getElementsByClassName("delete_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }
    else{
      if(!angular.element(document.getElementsByClassName("delete_discount_item")).length){
        SharedState.turnOn('favor_del_error_modal');
      }
      else{
        SharedState.turnOn('favor_del_modal');
      }
    }


  };
  
  //取消按钮
  $scope.deleteFavorCancel = function(){
    $scope.favor_delete = false;
  };

  $scope.deleteDiscountCancel = function(){
    $scope.discount_delete = false;
  };


  // 弹窗删除按钮方法
  $scope.delete= function(){
    if($rootScope.showDelete){
        console.log('删除商户收藏');
        var delete_ele = document.getElementsByClassName("delete_item");
        var para = "";
        for(var i = 0; i<delete_ele.length; i++ ){
          para = para + delete_ele[i].getAttribute("id")+',';
        }
        console.log(para);
        API.deleteBusinessFavor({
          store_codes : para

        }).then(function(data){
        console.log(data);
        if(data.res ==="0"){
          $scope.toast("删除成功");
          angular.element(document.getElementsByClassName("delete_item")).remove();
        }
       
      }, function(data){
        console.log('商户ICBC失败');
        $scope.toast("请检查网络状况");
      });
          
    }
    else{
      angular.element(document.getElementsByClassName("delete_discount_item")).remove();
    }
  };


  // 按顶部删除商户按钮初始化
  $scope.deleteFavorIni= function(){
   $scope.favor_delete = true;
   for(i=0;i<5;i++){
     $scope.favor_select[i]= false;
   }
 };


    // 按顶部删除优惠按钮初始化
    $scope.deleteDiscountIni= function(){
      $scope.discount_delete = true;
      for(i=0;i<5;i++){
       $scope.discount_select[i]= false;
     }
   };

     //删除优惠收藏
   $scope.paramArry=[];
    $scope.doPush= function(code,type,flag){
        var param={
          "code":code,
          "type":type
        };
      if(flag){
        $scope.paramArry.push(param);
      }else{
        for(var i=0;i<$scope.paramArry.length;i++){
          if($scope.paramArry[i].code===param.code){
            $scope.paramArry.splice(i,1);
          }
        }
      }
      console.log($scope.paramArry);
   };
  $scope.deleteAction=function(store_codes){
    $http.post($scope.baseUrl + '/OFSTCUST/disFav/deleteMyFavorite.action',
     {
     't_k' : $rootScope.token,
     'c_no' : $cookieStore.get('c_no'),
     'store_codes':store_codes
     }).success(function (result) {
       console.log(result.res);
       if(result.res=="0"){
        $scope.paramArry = [];
        $scope.favor_select = [];
        $scope.discount_delete=false;
        $scope.getFavDiscount();
        console.log("删除成功...");
       }
     });
  };
  $scope.del = function(){
    if($scope.temp === "1") {
      $scope.doDelete1();
    } else if($scope.temp === "2") {
      $scope.doDelete();
    }
  };
  $scope.preDelete = function(no){
    $scope.temp = no;
    if(no === "1") {
      console.log($scope.paramArry1);
      if($scope.paramArry1 && $scope.paramArry1.length > 0){
        SharedState.turnOn('favor_del_modal');
      }else{
        SharedState.turnOn('favor_del_error_modal');
      }
    } else {
      if($scope.paramArry && $scope.paramArry.length > 0){
        SharedState.turnOn('favor_del_modal');
      }else{
        SharedState.turnOn('favor_del_error_modal');
      }
    }
    
  };
  $scope.doDelete= function(){
    $scope.storeCode="";
    if($scope.paramArry.length<1){
      $scope.toast("您尚未选中要删除的对象!");
      return;
    }else if($scope.paramArry.length==1){
      $scope.storeCode=$scope.paramArry[0].code+"#"+$scope.paramArry[0].type;
    }else{
      var paramStr="";
      for(var i=0;i<$scope.paramArry.length;i++){
        var paramString=$scope.paramArry[i].code+"#"+$scope.paramArry[i].type+",";
        //console.log(paramString);
        paramStr=paramString+paramStr;
        //console.log(paramStr);
      }
      $scope.storeCode=paramStr.substring(0,paramStr.length-1);  
    }
    console.log($scope.storeCode);
    $scope.deleteAction($scope.storeCode);
  };
//删除商户收藏
   $scope.paramArry1=[];
    $scope.doPush1= function(code,flag){
        var param={
          "code":code
        };
      if(flag){
        $scope.paramArry1.push(param);
      }else{
        for(var i=0;i<$scope.paramArry1.length;i++){
          if($scope.paramArry1[i].code===param.code){
            $scope.paramArry1.splice(i,1);
          }
        }
      }
      console.log($scope.paramArry1);
   };
  $scope.deleteAction1=function(store_codes){
    $http.post($scope.baseUrl + '/OFSTCUST/storeFav/deleteMyFavorite.action',
     {
     't_k' : $rootScope.token,
     'c_no' : $cookieStore.get('c_no'),
     'store_codes':store_codes
     }).success(function (result) {
       console.log(result.res);
       if(result.res=="0"){
        $scope.paramArry1 = [];
        $scope.favor_select = [];
        $scope.discount_delete=false;
        $scope.getFavBusiness();
        console.log("删除成功...");
       }
     });
  };
  $scope.doDelete1= function(){
    $scope.storeCode="";
    if($scope.paramArry1.length<1){   
      $scope.toast("您尚未选中要删除的对象!");
      return;
    }else if($scope.paramArry1.length==1){      
      $scope.favor_delete = false;
      $scope.storeCode=$scope.paramArry1[0].code;
    }else{
        $scope.favor_delete = false;
      var paramStr="";
      for(var i=0;i<$scope.paramArry1.length;i++){
        var paramString=$scope.paramArry1[i].code+",";
        //console.log(paramString);
        paramStr=paramString+paramStr;
        //console.log(paramStr);
      }
      $scope.storeCode=paramStr.substring(0,paramStr.length-1);      
    }
    console.log($scope.storeCode);
    $scope.deleteAction1($scope.storeCode);
  };
   $scope.getFavBusiness = function(keyword){


      //2015-05-09
  //TODO 
  // 获取商户收藏
  var para = {
    // small_code : '01003',
    // district_code : 'a6d80d6bd2c34c438f371f23a81cce0b',
    s_row : 0,
    e_row : 5,
    keyword : keyword || ''
  };
   API.getBusinessFavor(para).then(function(data){
    console.log('收藏商户列表');
    console.log(data);
      $scope.FavBusinesses = data;
      $scope.isShow = false;
     if(data){
       if(data.length > 0){
         $scope.isShow = true;
       }
      for(var i = 0; i < $scope.FavBusinesses.length; i++){
        $scope.FavBusinesses[i].discount_role =  API.resolveDiscountRole($scope.FavBusinesses[i].discount_role);
         $scope.FavBusinesses[i].new_discount_role=[];
         for(var z=0;z<$scope.FavBusinesses[i].discount_role.length;z++){
            if($scope.FavBusinesses[i].discount_role[z]===' icon_yi'){
                  $scope.FavBusinesses[i].new_discount_role.push(' icon_yi');
            }
             if($scope.FavBusinesses[i].discount_role[z]===' icon_fen'){
                  $scope.FavBusinesses[i].new_discount_role.push(' icon_fen');
            }
             if($scope.FavBusinesses[i].discount_role[z]===' icon_shan'){
                  $scope.FavBusinesses[i].new_discount_role.push(' icon_shan');
            }
             if($scope.FavBusinesses[i].discount_role[z]===' icon_ji'){
                  $scope.FavBusinesses[i].new_discount_role.push(' icon_ji');
            }
           
         }
        var stars=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=$scope.FavBusinesses[i].level)
        {
          stars[j] = {"type":"full"};
        }else if(j - $scope.FavBusinesses[i].level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
      $scope.FavBusinesses[i].level = stars;
       $scope.FavBusinesses[i].bottomContent = '';

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].business_name1 && $scope.FavBusinesses[i].business_name1 !== ''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].business_name1;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].business_name2 && $scope.FavBusinesses[i].business_name2 !==''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].business_name2;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].business_name3 && $scope.FavBusinesses[i].business_name3 !==''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].business_name3;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        $scope.FavBusinesses[i].bottomContent= $scope.FavBusinesses[i].bottomContent.substring(0, $scope.FavBusinesses[i].bottomContent.length-1)+' ';

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].small_name1 && $scope.FavBusinesses[i].small_name1 !==''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].small_name1;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].small_name2 && $scope.FavBusinesses[i].small_name2 !==''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].small_name2;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        if(($scope.FavBusinesses[i].bottomContent.length <= 18) && $scope.FavBusinesses[i].small_name3 && $scope.FavBusinesses[i].small_name3 !==''){
          $scope.FavBusinesses[i].bottomContent += $scope.FavBusinesses[i].small_name3;
          $scope.FavBusinesses[i].bottomContent += '/';
        }

        $scope.FavBusinesses[i].bottomContent= $scope.FavBusinesses[i].bottomContent.substring(0, $scope.FavBusinesses[i].bottomContent.length-1);
        $scope.FavBusinesses[i].showdistance=$scope.FavBusinesses[i].distance+$scope.FavBusinesses[i].unit;
      
      }
    }
    

  
  }, function(data){
    console.log('获取收藏商户失败');
    $scope.toast("请检查网络状况");
  });

};

$scope.getFavBusinessByConditions = function(keyword){
      //2015-05-09
  //TODO 
  // 通过级联条件获取商户收藏
  $http.post($scope.baseUrl + '/OFSTCUST/cuinfo/findCuMoreById.action',{
    't_k' : $rootScope.token,
    'c_no' : $cookieStore.get('c_no'),
    'small_code' : '',
    'district_code' : '',
    'sort_code' : ''
  })
  .success(function (data) {
    var info = data;
    $scope.isShow = false;
    if(data){
      if(data.length > 0){
        $scope.isShow = true;
      }
    for (var i=0;i<info.length;i++)
    {
      var stars=[];
      var icon_flags=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=info[i].dcmt_level)
        {
          stars[j] = {"type":"full"};
        }else if(j - info[i].dcmt_level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
        icon_flags[0] = info[i].is_yd == "0" ? "none" : "yi";
        icon_flags[1] = info[i].is_fq == "0" ? "none" : "fen";
        icon_flags[2] = info[i].is_jf == "0" ? "none" : "ji";
        icon_flags[3] = info[i].is_sk == "0" ? "none" : "shan";
        icon_flags[4] = info[i].is_gh == "0" ? "none" : "gong";
        icon_flags[5] = info[i].is_tu == "0" ? "none" : "tuan";
        icon_flags[6] = info[i].is_cx == "0" ? "none" : "cu";
        icon_flags[7] = info[i].is_ka == "0" ? "none" : "ka";
      }
      info[i].stars = stars;
      info[i].flags = icon_flags;
    }
  }

    console.log(info);
    // $scope.FavBusinesses = info;
  });
};

$scope.getFavDiscount = function(){console.log("优惠收藏");
	$rootScope.showDelete=false;
      //2015-05-10
  //TODO 
  // 获取优惠收藏
  $http.post($scope.baseUrl + '/OFSTCUST/disFav/SelectFdis.action',{
    't_k' : $rootScope.token,
    'c_no' : $cookieStore.get('c_no'),
  })
  .success(function (result) {
    $scope.disList=result.data;
    $scope.isShow = false;
    if($scope.disList){
      if($scope.disList.length > 0){
        $scope.isShow = true;
      }
          for(var i=0, length = result.data.length; i<length; i++){
      $scope.disList[i].favorite_url = result.data[i].favorite_type ==='2'?'discount':'customers';
    }
    $scope.noThing=$scope.disList.length===0?true:false;
    $scope.noThingTemp = true;
    console.log($scope.disList);
    }

  });
};
$scope.getStore = function(){
  $rootScope.showDelete=true;
};
if(!$rootScope.showDelete){
  $scope.getFavDiscount();
}
$scope.getFavBusiness('');

$scope.backToMy = function(){
  $rootScope.showDelete=true;
  history.back();
};

  var lastOrderKey = '';
  var lastSmallCode = '';
  var lastLargeCode = '';
  var lastDistrictCode = '';

  // 条件搜索
  $scope.searchMyFavorite = function (para) {
    SharedState.set({listFilter:false});
    console.log(para);
    lastOrderKey = para.order_key || lastOrderKey;
    lastLargeCode = para.large_code || lastLargeCode;
    lastSmallCode = para.small_code || lastSmallCode;
    lastDistrictCode = para.district_code || lastDistrictCode;

    var basePara = {
      't_k' : $rootScope.token,
      'c_no' : $cookieStore.get('c_no'),
      's_row' : 0,
      'e_row' : 5,
      'order_key' : lastOrderKey || 1,
      'small_code' : lastSmallCode || '',
      'large_code' : lastLargeCode || '',
      'district_code' : lastDistrictCode || ''
    };
    //'district_code' : district_code,
    //'keyword' : $scope.inputKeyword || ''
    var param = angular.extend(basePara,para);
    console.log('basePara.........');
    console.log(basePara);
    $http.post($scope.baseUrl + '/OFSTCUST/storeFav/selectMyFavorite.action',param)
    .success(function (data) {
      console.log(data);
      $scope.FavBusinesses = null;
      $scope.FavBusinesses = data.data;
      if(data.data){
      for(var i = 0; i < $scope.FavBusinesses.length; i++){
        $scope.FavBusinesses[i].discount_role =  API.resolveDiscountRole($scope.FavBusinesses[i].discount_role);

        var stars=[];
      for(var j=0;j<5;j++)
      {
        if (j+1<=$scope.FavBusinesses[i].level)
        {
          stars[j] = {"type":"full"};
        }else if(j - $scope.FavBusinesses[i].level < 0)
        {
          stars[j] = {"type":"half"};
        }else {
          stars[j] = {"type" : "gray"};
        }
      }
      $scope.FavBusinesses[i].level = stars;
      }
    }
    })
    .error(function (data) {
      console.error('搜索失败！');
    });
  };



  $scope.doSearch = function (value) {
    $scope.searchMyFavorite({'keyword':value});
    return false;
  };

  $scope.setType = function (tp){
    $scope.typetop = tp;
  };
  $scope.setCity = function (city){
    $scope.citytop = city;
  };
  $scope.setSort = function (sort){
    $scope.sorttop = sort;
  };
}]);