
elife.controller('DiscountCommentCtrl', ['$scope','$rootScope','$http','$routeParams','$cookieStore','SharedState','$timeout','API','$location','$anchorScroll', function($scope,$rootScope,$http,$routeParams,$cookieStore,SharedState,$timeout,API,$location,$anchorScroll) {
  

	// // 返回按钮
   // elife_app.SetReturnBtn();
   $scope.isTyping = false;
   $scope.globalStar = 0;
   $scope.tasteStar = 0;
   $scope.environmentStar = 0;
   $scope.serviceStar = 0;
   $scope.id = $routeParams.id;
   $scope.type = $routeParams.stid == "Group" ? "Group" : $routeParams.stid == "Bank" ? "Bank" : "StoreTxt";
   
   $scope.onCommentFocus = function() {
		$scope.isTyping = true;
		setTimeout(function() {
			$location.hash('');
			$anchorScroll();
			}, 200);};
   
   if($scope.type == "StoreTxt") {
	$scope.stid = $routeParams.stid;
   }
   $scope.hideAvg = true;
   // 评价描述
   $scope.des = ['差', '不满意', '一般', '满意', '非常满意'];
   //点评是返回
   $scope.goBack = function (data) {
		SharedState.turnOff('success_modal');
		history.back();
	};
	//点评时返回按钮操作
	$scope.back = function () {
		console.log($scope.isTyping);
		if(!$scope.isTyping){
			SharedState.turnOn('back_modal');
		}
			
	};
	//如果正在输入点评内容 不提交
	$scope.preSubmit = function(){
		if($scope.isTyping){
			return;
		}else{
			if (!API.isLogin()) {
				$timeout(function() {
					API.doLogin();
				},0);
				return;
			}
			$scope.submitComment();
		}
	};

   $scope.submitComment = function () {
	var param = {
		evaTargetCode : $scope.id,
		cmtType : $scope.type
	};
	if($scope.type === "StoreTxt") {
		param.merserial_no = $scope.stid;
	}
	if($scope.globalStar === 0){
		$rootScope.toast('请评价总体印象');
		return;
	}
	if (!$scope.comment) {
		$rootScope.toast('请填写评价信息!');
		return;
	}
	$scope.allowShow = false;
	param.dcmt_level = $scope.globalStar;
	param.dcmt_content = $scope.comment;
	param.imagelist = $scope.imgs;
	console.log(param);
	API.addComment(param).then(function(data){
		console.log("点评成功");
		SharedState.turnOn('success_modal');
	},function(data){
		console.error(data);
	});
   };
   
   $scope.$watch('comment', function(newVal, oldVal){
		if(newVal && newVal.length>500) {
			$scope.comment = oldVal;
			$rootScope.toast('您的评价长度不能超过500');
		}
	});
   $scope.goBack = function (data) {
	SharedState.turnOff('success_modal');
	history.back();
	};
/*	获取到评论类型之后进行不同的显示
	large_flag==food-美食
	large_flag==hotal-酒店
	large_flag==other-银行
**/
	//初始化显示条件
	$scope.tastShow=true;$scope.enShow=true;$scope.serShow=true;
	$scope.large_flag="other";
	if($scope.large_flag==="other"){
		$scope.tastShow=false;$scope.enShow=false;$scope.serShow=false;
	}else if($scope.large_flag==="hotal"){
		$scope.tastShow=false;
	}
	// var callbackPhoto = '11';
	$scope.getPhoto = function (para) {
		// $scope.imgs.push({"bid":"123","url":"xxx.jpg"});

		$timeout(function() {

			var photoList;
			console.log('正在调用系统相机！');
			if (ICBCUtil.isElifeAndroid() || ICBCUtil.isAndroid()) {
				elife_app.GetNativeFunctionAndroid({'keyword':'getPhoto','msg':para});
			}
			if (ICBCUtil.isElifeIos()||ICBCUtil.isIPhone()) {
				ICBCUtil.nativeGetConfig({
					'key' : 'getPhoto',
					'callBack' : "GetPhotoCallback"
				});
			}
			// test
			// GetPhotoCallback([{"url":"xxx.jpg"},{"url":"yyy.jpg"}]);

		},0);
	};
	console.log(Observe);

	
	obs._on('photoCallback',function () {
		$timeout(function () {
			$scope.imgList = callbackPhoto;
			console.log($scope.imgList);
		},0);
	});

}]);