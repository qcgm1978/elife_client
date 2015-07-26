elife.controller('PersonalInfoCtrl', ['$rootScope','SharedState','$scope','$http','$cookieStore' ,'API', function ($rootScope,SharedState,$scope,$http,$cookieStore,API) {
  // 返回按钮
  elife_app.SetReturnBtn();
  $scope.getGender = function () {
    return $scope.personalInfo.gender === '男' ? 0 : 1;
  };
  $scope.SetGender = function(i){
    console.log($scope.getGender());
    if (i == $scope.getGender()) {
      return false;
    }
    var param = {
      't_k' : $rootScope.token,
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'sex',
      'n_sex' : i
    };
    API.changePersonalInfo(param).then(function (data) {

      if (data.res == '0') {
        if (i===0) {
          $scope.personalInfo.gender="男";
        }
        else{
          $scope.personalInfo.gender="女"; 
        }
      }
    }, function(data){
      $scope.toast("请检查网络状况");
    });
  };

  // || 2015.5.4 ||
//获取用户信息
  API.getUserInfo({}).then(function(data){
    var info = data.data;
    console.log("个人信息");
    console.log(info);
    $scope.personalInfo = {
      nickname : info.nickName,
      gender : (info.sex == '0' ? '男' : '女'),
      phone : info.phone,
      address : info.address,
    };
    $scope.personalInfo.headuri =  $rootScope.imgBaseUrl+info.headuri;
  
  },function(data){
     console.log("个人信息获取失败");
    $scope.toast("个人信息获取失败，请检查网络状况");
   }
  );



  // // 获取用户相关信息
  // $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/findCuMoreById.action',{
  //   't_k' : $rootScope.token,
  //   'c_no' : $cookieStore.get('c_no')
  // })
  // .success(function (data) {
  // var info = data.data;
  // console.log(data);
  //   $scope.personalInfo = {
  //   nickname : info.nickName,
  //   gender : (info.sex == '0' ? '男' : '女'),
  //   phone : info.phone,
  //   address : info.address,
  //   headuri : info.headuri
  //   };
  //   $scope.new_nickname = info.nickName;
  //   $scope.imageTmp = $scope.personalInfo.headuri;
  //   $scope.defaultImg = 'http://127.0.0.1:8080/dist/images/avatar.png';
  //   $scope.personalInfo.headuri = $scope.defaultImg;
  //   $http.get('$scope.personalInfo.headuri').success(function(data){
  //   $scope.personalInfo.headuri = imageTmp;
  // });
  // });

  // 获取用户相关信息
  // API.getUserInfo().then(function(data){
  //   var info = data;
  //   console.log(info);
  //   $scope.personalInfo = {
  //   nickname : info.nickName,
  //   gender : (info.sex == '0' ? '男' : '女'),
  //   phone : info.phone,
  //   address : info.address,
  //   headuri : info.headuri
  //   };
  //   $scope.new_nickname = info.nickName;
  // },function(data){
  //   $scope.toast('请检查网络设置');
  //   console.log(data);
  // });

  // 修改昵称
  $scope.doSubmitNickname = function () {
    $scope.nickname_error_reg = /[^\u4E00-\u9FA5\w\b_]{1}/;
    $scope.nickName_error = 0;
    if ($scope.new_nickname === '' || $scope.new_nickname === undefined) {
      $scope.nickName_error = 1;
      $scope.postmsg = '昵称不允许为空！';
      $rootScope.Ui.turnOn('modify_success_modal');
      return false;
    }
    if ($scope.nickname_error_reg.test($scope.new_nickname)){
      $scope.nickName_error = 1;
      $rootScope.toast("昵称格式错误，昵称只能使用24个字符以内的字母，数字，中文，下划线");
      return false;
    }
    if($scope.new_nickname.length > 24){
      $scope.nickName_error = 1;
      $rootScope.toast("昵称修改失败，昵称长度不符合");
      return false;
    }
    
    $rootScope.toast("正在修改昵称...");
    API.changePersonalInfo({
      't_k' : $rootScope.token,
      'c_no' : $cookieStore.get('c_no'),
      'req_type' : 'nick',
      'n_nikename' : $scope.new_nickname
    }).then(function(data){
      history.back();
    },function(data){
      $rootScope.toast("昵称修改失败，请检查网络状况");
    });
    // $http.post('http://223.223.177.38:8082/OFSTCUST/cuinfo/updateCuinfo.action',{
    //   't_k' : $rootScope.token,
    //   'c_no' : $cookieStore.get('c_no'),
    //   'req_type' : 'nick',
    //   'n_nikename' : $scope.new_nickname
    // })
    // .success(function (data) {
    //   console.log(data);
    //   var msg = '';
    //   switch (data.res) {
    //     case '0' :
    //     msg = '修改成功';
    //     break;
    //     default :
    //     msg = '修改失败';
    //   }
    //   $scope.postmsg = msg;
    //   $rootScope.Ui.turnOn('modify_success_modal');
    // });
  };

  //清空昵称
  $scope.doDeleteNickname = function(){
    $scope.new_nickname = '';
    $("#newName").attr("placeholder","请输入您新的昵称");
  };

  $scope.backToPersonalInfo = function () {
    if ($scope.new_nickname === '' || $scope.new_nickname === undefined || $scope.nickName_error == 1) {
      $rootScope.Ui.turnOff('modify_success_modal');
    } else {
      $rootScope.Ui.turnOff('modify_success_modal');
      history.back();
    }
  };


// app交互
$scope.GetPhoto = function(){
  // 调用相册
  if(ICBCUtil.isElifeAndroid()){
      // elif_app.GetLocationAndroid();
       elife_app.GetNativeFunction({'keyword':'getPhoto'});
     }
  if(ICBCUtil.isElifeIos()){
      //调用地理位置
    ICBCUtil.nativeGetConfig({
      'key' : 'getPhoto',
     'callBack' : GetPhotoIos
    });
  }

};
$scope.GetCamera = function(){
  // 调用相机

  if(ICBCUtil.isElifeAndroid()){
      // elif_app.GetLocationAndroid();
       elife_app.GetNativeFunction({'keyword':'getCamera'});
     }
  if(ICBCUtil.isElifeIos()){
      //调用地理位置
    ICBCUtil.nativeGetConfig({
      'key' : 'getCamera',
     'callBack' : GetCameraIos
    });
  }
  
};

$scope.$watch('num1', function(newVal, oldVal){
  newVal = newVal + "";
  console.log(newVal);
  console.log(oldVal);
  if(!newVal) {return;}
  console.log("--");
  var validate_mobile = /^(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
  if(newVal.length > 11) {
    $rootScope.toast("输入的手机号格式有误，请重新输入");
    $scope.num1 = oldVal;
  }
  if(newVal.length === 11){
    if(!validate_mobile.test(newVal)){
      $rootScope.toast("输入的手机号已达11位啦！");
    }
  }
});
// 退出登陆
$scope.logout = function () {
  $timeout(function() {
    API.doLogout();
  },0);
}; 

}]);