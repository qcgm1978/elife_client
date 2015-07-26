elife.controller('PhotoAddedCtrl',  [
    '$scope',
    '$location',
    '$anchorScroll',
    '$rootScope',
    '$http',
    '$routeParams',
    '$timeout',
    '$cookieStore',
    'API',
    'SharedState',
    function($scope, $location, $anchorScroll, $rootScope, $http, $routeParams, $timeout, $cookieStore, API, SharedState) {
        var KEY_PHOTO_ADDED_CACHE = "photoAddedCache";

        $scope.store_id = $routeParams.store_id;
        console.log($routeParams.store_id);
        console.log($scope.mark);

        //上传照片
        $scope.imgs = $cookieStore.get(KEY_PHOTO_ADDED_CACHE) || [];
        console.log($scope.imgs);
        $scope.getPhoto = function (para) {
            $timeout(function () {
                if (ICBCUtil.isElifeAndroid() || ICBCUtil.isAndroid()) {
                    // elife_app.GetNativeFunctionAndroid({'keyword':'getPhoto'});
                    elife_app.GetNativeFunctionAndroid({'keyword':'getPhoto','msg':para});
                } else if (ICBCUtil.isElifeIos()) {
                    ICBCUtil.nativeGetConfig({
                        'key': 'getPhoto',
                        'dataString': para,
                        'callBack': "GetPhotoCallback"
                    });
                } else {
                    GetPhotoCallback({"bid": "123456", "url": "xxx.jpg"});
                }
            },0);
        };

        obs._on('photoCallback',function () {
            // 返回null的时候
            if (!callbackPhoto) {
                return;
            }
            if (typeof callbackPhoto === "object") {
                data = callbackPhoto;
            } else if (typeof callbackPhoto === "string") {
                data = JSON.parse(callbackPhoto);
            }
            if (Array.isArray(data)) {
                console.log("adfasdf");
                $scope.imgs = $scope.imgs.concat(data);
            } else {
                $scope.imgs.push(data);
            }
            // alert(JSON.stringify($scope.imgs));
            $cookieStore.remove(KEY_PHOTO_ADDED_CACHE);
            $cookieStore.put(KEY_PHOTO_ADDED_CACHE, $scope.imgs);
            // $location.path("/review/photo_edit/" + $scope.store_id + "/" + data.bid + "/" + data.url);
            // reset global
            global = {};
        });


        $scope.goBack = function(){
             
            SharedState.turnOff('success_modal');
            $cookieStore.remove(KEY_PHOTO_ADDED_CACHE);
            history.back();
        };

        //点评时返回按钮操作
        $scope.back = function () {
           
            if(!$scope.isTyping){
                SharedState.turnOn('back_modal');
            }

        };
    
        //如果正在输入点评内容 不提交
        $scope.preSubmit = function(){
            if($scope.isTyping){
                return;
            }else{
                $scope.submitImage();
            }
        };
    
        $scope.submitImage = function () {
            if($scope.imgs.length === 0){
                $rootScope.toast('请上传照片');
                return;
            }
            var param = {};
            param.store_id = $scope.store_id;   
           // param.store_id = '20011000001';         
            param.aid = 'a';
            //这边的t_k、c_no仅作测试用，数据写死
            param.t_k = '10001';
            param.c_no = 'AA';
            var image_data = $scope.imgs.map(function(img) {
                console.log(img);
                var imgInfo = {};
                imgInfo.imgid = img.bid;
                //imgInfo.imgid = '200';
               //imgInfo.imgid = new Date().getMilliseconds()+"";
                imgInfo.desc = img.desc || '';
                imgInfo.type = img.type ? img.type.aid : '';
                return imgInfo;
            });
            param.image_data = JSON.stringify(image_data);
            console.log(param);
            API.saveAlbumImgs(param).then(function (data) {
                $cookieStore.remove(KEY_PHOTO_ADDED_CACHE);
                if (data.res === '0') {
                    SharedState.turnOn('success_modal');
                }
            },function (data) {
                alert('失败！\n' + JSON.stringify(data));
            });

            //上传
            // API.addImgs(param).then(function(data){
            //  console.log("上传成功");
            //  SharedState.turnOn('success_modal');
            // },function(data){
            //  console.error(data);
            // });
        };
    }
]);