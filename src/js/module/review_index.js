elife.controller('ReviewIndexCtrl', ['$scope','$rootScope','$routeParams', '$http','$cookieStore', 'SharedState', 'API',function($scope,$rootScope,$routeParams,$http,$cookieStore, SharedState, API){
   // 显示哪条评论内容
   $scope.loading = true;
   $scope.mark = false;
   $scope.showText=-1; 
   // 显示哪个nav
   $scope.active_nav=-1;
   //初始化页面时不修改筛选为‘全部’
   $scope.init = true;
   //默认时间倒序
   $scope.time_sort = "desc";
   //默认显示时间倒序文本
   $scope.sortContent = "时间倒序";
   $scope.showModal=true;
   $scope.showModal=true;
   $scope.type = $routeParams.type == "Bank" ? "Bank" : $routeParams.type == "Store" ? "Store" : $routeParams.type == "StoreTxt" ? "StoreTxt" : "Group";
   $scope.id = $routeParams.id;
   if($scope.type === "StoreTxt" ) {
    $scope.stid = $routeParams.type;
   }
   
   // 判断显示哪个nav
    $scope.filterToggle = function(n){
    if(n === 0){
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

   // 判断显示哪个评论
   $scope.GetText = function(n){
    if($scope.showText==n){
      $scope.showText=-1;
    }
    else{
       $scope.showText=n;
    }
   };

//上拉刷新
  // 获取所有点评
  $scope.reviews = [];
  $scope.e_row = 0;
  $scope.page_size = 10;
  
  $scope.getAllComment = function (level, doDelete) {
   $scope.loading = true;
   $scope.mark = true;
    var para= {};
    para.s_row = $scope.e_row;
    para.e_row = para.s_row + $scope.page_size;
    $scope.e_row = para.e_row;
    para.cmtType = $scope.type;
    para.evaTargetCode = $scope.id;
    if($scope.type === "StoreTxt") {
      para.merserial_no = $scope.stid;
    }
    // console.log('??????????????????????/');
    // console.log(level);
    if (level) {
      para.level_sort = level;
      $scope.level = level;
      switch (level) {
        case 5:
          $scope.starFilter = '五星级';
          break;
        case 4:
          $scope.starFilter = '四星级';
          break;
        case 3:
          $scope.starFilter = '三星级';
          break;
        case 2:
          $scope.starFilter = '二星级';
          break; 
        case 1:
          $scope.starFilter = '一星级';
          break;   
        default:
          $scope.starFilter = '全部';
          break;
      }
    }else{
        if($scope.init){
          console.log('???????????????/');
          $scope.starFilter = '全部';
        }else{
          $scope.init = true;
        }
    }
    
    $scope.init = false;
     API.getComments(para).then(function(data){
       if(doDelete){
         $scope.reviews = data.review_list;
         if(!$scope.reviews || $scope.reviews.length === 0){
            $scope.loadingMore = false;
         }
       }else{
         var length1 = $scope.reviews.length;
        $scope.reviews = $scope.reviews.concat(data.review_list ? data.review_list : []);
        var length2 = $scope.reviews.length;
        if(length1 === length2){
            $scope.loadingMore = false;
         }
       }       
       if ((!$scope.reviews || $scope.reviews.length === 0)){
          // console.log('----------------------------');
          // console.log($scope.list);
           $scope.loading = false;
           $scope.mark = false;
          }
        else{
        for(var i=0; i<$scope.reviews.length; i++) {
            $scope.reviews[i].longEnough=$scope.reviews[i].review_content.length>65 ? true:false;
            $scope.reviews[i].content = $scope.reviews[i].review_content.substr(0, 65);
            $scope.reviews[i].more = $scope.reviews[i].review_content.substr(65, $scope.reviews[i].review_content.length);
      }
    $scope.loading = false;
    $scope.mark = false;
    // API.getComments(para).then(function(data){
    //   console.log('点评列表');
    //   console.log(data);
    //     if (data.count === "0") {
    //         return;
    //     }
    //   var review_list = data.review_list;
    //     console.log(data);
    //   for(var i=0; i<review_list.length; i++) {
    //       review_list[i].longEnough=review_list[i].review_content.length>65?true:false;
    //       review_list[i].content = review_list[i].review_content.substr(0, 65);
    //       review_list[i].more = review_list[i].review_content.substr(65, review_list[i].review_content.length);
    //   }

    //     $scope.reviews = $scope.reviews.concat(review_list);
    //     console.log(review_list);
    //     console.log($scope.reviews);
    //     $scope.s_row += data.review_list.length; 
        }
    },function(data){
      $scope.loading = false;
      $scope.mark = false;
      $scope.reviews = [];
      console.log('获取点评列表失败');
      $scope.toast("请检查网络状况");
    });
    // $http.post('http://192.168.2.47:8080/OFSTCUST/comment/getCommentsByCondition.action', para)
    // .success(function (data) {
    //   console.log('获取所有点评');
    //   if (data.res == '0') {
    //     $scope.commentCount = data.data.count;
    //     $scope.commentList = data.data;
    //     if ($scope.commentList.length === 0) {
    //       $rootScope.toast('暂无数据！');
    //     }
    //   }
    // })
    // .error(function (data) {
    //   console.error('获取所有点评失败，错误代码:'+data);
    // });
    $scope.filterToggle(0);
     }; 

  $scope.sortByTime = function(sType){
      var para= {};
      para.level_sort = $scope.level;
      para.s_row = 0;
      para.e_row = para.s_row + $scope.page_size;
      para.cmtType = $scope.type;
      if(sType == 1){
        $scope.time_sort = "desc";
        para.time_sort = "desc";
        $scope.sortContent = "时间倒序";
      }else{
        $scope.time_sort = "asc";
        para.time_sort = "asc";
        $scope.sortContent = "时间正序";
      }
      para.evaTargetCode = $scope.id;
      if($scope.type === "StoreTxt") {
       para.merserial_no = $scope.stid;
       }

      API.getComments(para).then(function(data){
        if (data.count === "0") {
            return;
        }
        $scope.reviews = data.review_list;
        for(var i=0; i<$scope.reviews.length; i++) {
            $scope.reviews[i].longEnough=$scope.reviews[i].review_content.length>65?true:false;
            $scope.reviews[i].content = $scope.reviews[i].review_content.substr(0, 65);
            $scope.reviews[i].more = $scope.reviews[i].review_content.substr(65, $scope.reviews[i].review_content.length);
      }

          $scope.filterToggle(0);
},function(data){
      console.log('获取点评列表失败');
      $scope.toast("请检查网络状况");
    });
    // $http.post('http://192.168.2.47:8080/OFSTCUST/comment/getCommentsByCondition.action', para)
    // .success(function (data) {
    //   console.log('获取所有点评');
    //   if (data.res == '0') {
    //     $scope.commentCount = data.data.count;
    //     $scope.commentList = data.data;
    //     if ($scope.commentList.length === 0) {
    //       $rootScope.toast('暂无数据！');
    //     }
    //   }
    // })
    // .error(function (data) {
    //   console.error('获取所有点评失败，错误代码:'+data);
    // });
    };

  $scope.getAllComment();
  
  $scope.doGetAllComment = function(type) {
    $scope.e_row = 0;
    $scope.s_row = $scope.e_row - $scope.page_size;
    $scope.getAllComment(type, 1);
  };

  $scope.sortBy = function(type, name){
    $scope.sortType = name;
    };


   $scope.showLoading = function(){
   $scope.mark = true;
   console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
  }; 
  
}]);

