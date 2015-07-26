elife.controller('ScanFixCtrl', ['$scope','$timeout','API','$rootScope', function($scope,$timeout,API,$rootScope){
	global={};
	obs._on('ScanCallback',function () {
		var rxp = /^(elife:\*\$\*)\w+/;
		if (!rxp.test(elife_app.scanResult)) {
			$rootScope.toast('二维码错误');
			return false;
		}
		$timeout(function () {
			console.log('扫一扫，进入回调方法');
			$scope.scanResult = elife_app.scanResult;
			API.decryptQrcode({
				t_k : '10001',
				c_no : 'AA',
				qrcode : elife_app.scanResult
			}).then(function (data) {
				location.hash = '/personal/pay_orders/';
				console.log(data);
			},function (data) {
				console.error(data);
			});
			// API.scan 发送加密字符串
			// 接收解密字符串（有一下两种情况）
			// 成功或者失败给端上返回标志
			// 1.成功解密（又分以下两种）
			//		1).如果是支付，先将订单信息传到待付款的页面，先显示提示框，并在待付款的页唤起app。
			//		2).如果是商户详情，跳转到商户详情页面。
			// 2.解密失败，直接弹出提示框。
			$scope.testData = $scope.scanResult;
			if (ICBCUtil.isElifeAndroid()) {
				// 暂时写死url，因为后台的解密暂时未实现
				elife_app.GetNativeFunctionAndroid({'keyword':'scanResultPage','url':'#/business/index/zzh'});
			} else {

			}
		},0);
	});

	// 模拟触发扫描结果 
	elife_app.scanResult = 'elife:*$*484ffe67e34f96a9cd58901620adfe69d2d859a4997350f6a6c1181e41fb317daa873fe10469e175f795d952feaff295c307d22078e18f11060cf7c5cd25f08f6bd168aaf64c29114302640e9fd76519';
	obs._fire('ScanCallback');
}]);