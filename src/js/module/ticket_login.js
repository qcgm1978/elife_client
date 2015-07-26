elife.controller('TicketLoginCtrl', ['$scope','$http','$routeParams', 'API', '$cookieStore', function ($scope, $http, $routeParams, API, $cookieStore) {
	$scope.ticket = $routeParams.ticket;
	$scope.prefixUrl = location.href.match(/.*(?=\/ticket)/);
	$scope.originUrl = $scope.prefixUrl + '/home/index';
	var channel = ICBCUtil.getIMChannel();
	console.log(channel);
	$cookieStore.put('c_no',channel);
	API.loginByTicket({
		'ticket' : $scope.ticket
	}).then(function (data) {
		//TODO 请求成功的处理 设置cookie和location.href
		console.log(data);
		if (data.res === '0') {
			$cookieStore.put('t_k',data.tokenNo);
			window.location.href = data.url;
		} else {
			console.error('获取token失败！'+data.res);
		}
	},function (data) {
		//TODO 请求失败的处理 未定
	});
}]);