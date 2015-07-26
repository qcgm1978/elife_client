elife.controller('IndexSearchCtrl', ['$scope','$rootScope', 'API','$cookieStore', function ($scope,$rootScope, API,$cookieStore) {
  
  // 返回按钮
  elife_app.SetReturnBtn();
 //search_type='bank(银行关键字搜索)/store(商户优惠关键字搜索)' 
	$scope.showHistory=true;
	$scope.close_icon = true;
	$scope.searchValue="";
	$scope.search_type = 'bank';
	/*
	function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			$scope.test1 = '有相关对象';
			callback(WebViewJavascriptBridge);
		} else {
			$scope.test1 = '没有相关对象';
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge);
			}, false);
		}
	}
	connectWebViewJavascriptBridge(function (interface_) {
		$scope.testCall = function () {
			if (interface_.callHandler) {
				interface_.callHandler('testObjcCallback', '111111', function(response) {
					if (response) {
						window.document.write('asdljfalksdjfa');
					}
				});
			}
		};
	});*/


//点击回车，提交搜索
$scope.keypress = function($e){
if($e.keyCode == 13){
if($scope.searchHeaderValue){
	console.log(encodeURI($scope.searchHeaderValue));
window.location.hash = "/home/search_result/0/" + encodeURI($scope.searchHeaderValue);
}

// $scope.searchStore({'store_name':$scope.searchValue});
}
};
//优惠搜索点击回车，提交搜索
$scope.keypress1 = function($e){
if($e.keyCode == 13){
if($scope.searchHeaderValue){
window.location.hash = "/discount/search_result/0/" +  encodeURI($scope.searchHeaderValue) + '/' + $scope.search_type;
}
}
};



//获取热门
API.getHotSearch({}).then(function(data){
	console.log(data);
	$scope.hotKeywords = data.data;
	console.log("热门搜索"); 
	console.log(data);
  },function(data){
    console.error("热门搜索获取失败：" + data);
  });


    //首页历史记录
	$scope.history = API.getHomeSearchHistory();
	$scope.clearHistory = function(){
		API.clearHomeSearchHistroy();
		$scope.history = [];
	};

	//优惠历史记录
	$scope.history1 = API.getDiscountSearchHistory();
	$scope.clearHistory1 = function(){
		API.clearDiscountSearchHistroy();
		$scope.history1 = [];
	};

	// 关键词搜索商户
	$scope.searchStore = function () {
		var para = {

		};
		API.getStore(para).then(function(data) {
			console.log('_____________________');
			console.log(JSON.stringify(data));
			alert(JSON.stringify(data));
			console.log('_____________________');
		},function(data) {
			console.error('关键词搜索商户失败！');
		});
	};

	$scope.filterByOfferType = function(type){
		// console.log('???????????????????');
		// console.log(document.getElementsByClassName("offer_list_filter_category2"));
		if(type === 1){
			if (document.getElementsByClassName("offer_list_filter_category1")[0]) {
				document.getElementsByClassName("offer_list_filter_category1")[0].style.borderBottom =" 4px solid #cc0000";
				document.getElementsByClassName("offer_list_filter_category2")[0].style.borderBottom = "";
				document.getElementsByClassName("name1")[0].style.color ="#cc0000";
				document.getElementsByClassName("name2")[0].style.color ="#606060";
				$scope.search_type = 'bank';
			}

		} else{
			if (document.getElementsByClassName("offer_list_filter_category1")[0]) {

				document.getElementsByClassName("offer_list_filter_category2")[0].style.borderBottom = " 4px solid #cc0000";
				document.getElementsByClassName("offer_list_filter_category1")[0].style.borderBottom = "";
				document.getElementsByClassName("name2")[0].style.color = "#cc0000";
				document.getElementsByClassName("name1")[0].style.color = "#606060 ";
				$scope.search_type = 'store';
			}
		}
	};

   $scope.filterByOfferType(1);
}]);