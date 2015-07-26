var elife = angular.module('elife', [
    'ngRoute',
    'ngCookies',
    'mobile-angular-ui',
    'mobile-angular-ui.core.fastclick',
    //'at.multirange-slider',
    'ui.slider',
    'angular-carousel',
    'mobile-angular-ui.core.outerClick',
    'mobileInfiniteScroll',
    'angularLazyImg'
])
    .factory('_serarchCity', ['$http', '$timeout', '$cookieStore', '$rootScope', function ($http, $timeout, $cookieStore, $rootScope) {
        console.log('cached');
        return $http({
            method: 'post',
            url: $rootScope.baseUrl + '/OFSTCUST/area/search.action',
            data: {
                't_k': $rootScope.token,
                'c_no': $cookieStore.get('c_no'),
                'country_code': 'CN',
                'keyword': ''
            },
            cache: true
        });
    }])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|http|ftp|mailto|javascript|tel):/);
    }])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home/index', {
            templateUrl: 'views/home/index.html',
            controller: 'IndexCtrl'
        })
            .when('/home/search', {
                templateUrl: 'views/home/search.html',
                controller: 'IndexSearchCtrl'
            })
            .when('/discount/search', {
                templateUrl: 'views/discount/search.html',
                controller: 'IndexSearchCtrl'
            })
            .when('/discount/search_result/', {
                templateUrl: 'views/discount/offer_search_result.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/discount/gpp_search_result/', {
                templateUrl: 'views/discount/gpp_offer_search_result.html',
                controller: 'GppOfferSearchResultCtrl'
            })
            .when('/discount/search_result/:id/:keyword/:searchType', {
                templateUrl: 'views/discount/offer_search_result.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/discount/category/:largeCode/:smallCode', {
                templateUrl: 'views/discount/offer_search_result.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/discount/category/:largeCode/:largeName/:smallCode/:smallName', {
                templateUrl: 'views/discount/offer_search_result.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/home/search_result/:id/:keyword', {
                templateUrl: 'views/home/business_search_result.html',
                controller: 'BusinessSearchResultCtrl'
            })
            .when('/home/search_no_result', {
                templateUrl: 'views/home/business_no_result.html',
                controller: 'BusinessSearchResultCtrl'
            })
            .when('/discount/index', {
                templateUrl: elife.isElifeAndroid ? 'views/discount/index_android.html' : 'views/discount/index_normal.html',
                controller: 'IndexDiscountCtrl'
            })
            .when('/discount/nearby_offer', {
                templateUrl: 'views/discount/nearby_offer_list.html',
                controller: 'NearbyOfferListCtrl'
            })
            .when('/locator', {
                templateUrl: 'views/home/locator.html',
                controller: 'LocatorCtrl'
            })
            .when('/choose_locator', {
                templateUrl: 'views/home/choose_locator.html',
                controller: 'LocatorCtrl'
            })
            .when('/business/index/:id', {
                templateUrl: 'views/home/business_info.html',
                controller: 'BusinessInfoCtrl'
            })
            .when('/business/recommend', {
                templateUrl: 'views/home/business_recommend.html',
                controller: 'businessRecommendCtrl'
            })
            .when('/business/special_offer', {
                templateUrl: 'views/home/special_offer.html',
                controller: 'specialOfferCtrl'
            })
            .when('/discount/card_offer/:id/:bank', {
                templateUrl: 'views/discount/card_offer_info.html',
                controller: 'DiscountInfoCtrl'
            })
            .when('/discount/bank_offer/:id', {
                templateUrl: 'views/discount/bank_offer_info.html',
                controller: 'DiscountInfoCtrl'
            })
            .when('/discount/card_list', {
                templateUrl: 'views/discount/card_offer_list.html',
                controller: 'CardOfferListCtrl'
            })
            .when('/discount/business_offer/:id/:stid', {
                templateUrl: 'views/discount/business_offer_info.html',
                controller: 'DiscountInfoCtrl'
            })
            .when('/discount/business_offer/:id/:code/:stid', {
                templateUrl: 'views/discount/business_offer_info.html',
                controller: 'DiscountInfoCtrl'
            })
            .when('/business/other_store/:id', {
                templateUrl: 'views/home/other_store.html',
                controller: 'OtherStoreInfoCtrl'
            })
            .when('/business/business_available_store/:ptf_code/:type', {
                templateUrl: 'views/home/business_available_store.html',
                controller: 'DiscountStoreListCtrl'
            })
            .when('/business/bank_available_store/:ptf_code/:type', {
                templateUrl: 'views/home/bank_available_store.html',
                controller: 'DiscountStoreListCtrl'
            })
            .when('/business/store_available_store/:ptf_code/:type', {
                templateUrl: 'views/home/store_available_store.html',
                controller: 'DiscountStoreListCtrl'
            })
            .when('/business_district', {
                templateUrl: 'views/home/business_district.html',
                controller: 'BusinessDistrictInfoCtrl'
            })
            .when('/error/other/:id', {
                templateUrl: 'views/error/other_error.html',
                controller: 'ErrorCtrl'
            })
            .when('/review/album', {
                templateUrl: 'views/home/review_album.html',
                controller: 'ReviewAlbumCtrl'
            })
            .when('/review/album_noup', {
                templateUrl: 'views/home/review_album_noupload.html',
                controller: 'ReviewAlbumCtrl'
            })
            .when('/business/album/:id', {
                templateUrl: 'views/home/business_album.html',
                controller: 'ReviewAlbumCtrl'
            })
            .when('/error/business/:id', {
                templateUrl: 'views/error/business_error.html',
                controller: 'ErrorCtrl'
            })
            .when('/error/district/:id', {
                templateUrl: 'views/error/district_error.html',
                controller: 'ErrorCtrl'
            })
            .when('/business/detail/:id', {
                templateUrl: 'views/home/business_detail.html',
                controller: 'BusinessDetailCtrl'
            })
            .when('/review/index/:id/:type', {
                templateUrl: 'views/home/review_index.html',
                controller: 'ReviewIndexCtrl'
            })
            .when('/review/photo_added/:store_id', {
                templateUrl: 'views/home/review_photo_added.html',
                controller: 'PhotoAddedCtrl'
            })
            .when('/review/photo_added/:store_id/:mark', {
                templateUrl: 'views/home/review_photo_added.html',
                controller: 'PhotoAddedCtrl'
            })
            .when('/review/photo_edit/:store_id/:image_id/:image_url', {
                templateUrl: 'views/home/review_photo_edit.html',
                controller: 'PhotoEditCtrl'
            })
            .when('/review/comment/:id/:type', {
                templateUrl: 'views/home/review_comment.html',
                controller: 'ReviewCommentCtrl'
            })
            .when('/review/comment_personal/:id/:type', {
                templateUrl: 'views/home/review_comment_personal.html',
                controller: 'ReviewCommentCtrl'
            })
            .when('/discount/comment/:id/:stid', {
                templateUrl: 'views/home/review_comment.html',
                controller: 'DiscountCommentCtrl'
            })
            .when('/home/yidai_business/:name', {
                templateUrl: 'views/home/yidai_business.html',
                controller: 'YidaiBusinessCtrl'
            })
            .when('/home/shanku_business/:name', {
                templateUrl: 'views/home/shanku_business.html',
                controller: 'ShankuBusinessCtrl'
            })
            .when('/home/category/:id/:name', {
                templateUrl: 'views/home/food.html',
                controller: 'CategoryResultCtrl'
            })
            .when('/home/food', {
                templateUrl: 'views/home/food_selected.html',
                controller: 'CategoryResultCtrl'
            })
            .when('/discount/discount_food/:type/:code', {
                templateUrl: 'views/discount/discount_food.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/discount/discount_food', {
                templateUrl: 'views/discount/discount_food.html',
                controller: 'OfferSearchResultCtrl'
            })
            .when('/home/categories', {
                templateUrl: 'views/home/categories.html',
                controller: 'HomeCategoriesCtrl'
            })
            .when('/home/guess_u_like_list', {
                templateUrl: 'views/home/guess_u_like_list.html',
                controller: 'GuessULikeListCtrl'
            })
            .when('/discount/categories', {
                templateUrl: 'views/discount/discount_categories.html',
                controller: 'HomeCategoriesCtrl'
            })
            .when('/discount/category/:id/:largeName', {
                templateUrl: 'views/discount/discount_category.html',
                controller: 'DiscountCategoryCtrl'
            })
            .when('/discount/customers/:code', {
                templateUrl: 'views/discount/customers_info.html',
                controller: 'CustomersInfoCtrl'
            })
            .when('/discount/customers_more/:gppCode', {
                templateUrl: 'views/discount/customers_more_info.html',
                controller: 'CustomersInfoCtrl'
            })
            .when('/discount/customers_add_order/:code/:price', {
                templateUrl: 'views/discount/customers_add_order.html',
                controller: 'CustomersInfoCtrl'
            })
            .when('/discount/customers_succeeded', {
                templateUrl: 'views/discount/customers_succeeded.html',
                controller: 'CustomersInfoCtrl'
            })
            .when('/district_list', {
                templateUrl: 'views/error/district_list.html',
                controller: 'DistrictListCtrl'
            })
            .when('/test', {
                templateUrl: 'views/home/test.html',
                controller: 'TestCtrl'
            })
            .when('/personal/index', {
                templateUrl: 'views/personal/personal.html',
                controller: 'PersonalCtrl'
            })
            .when('/personal/my_favorites', {
                templateUrl: 'views/personal/my_favorites.html',
                controller: 'MyFavoritesCtrl'
            })
            // .when('/personal/my_customers',{
            //   templateUrl:'views/personal/my_customers.html',
            //   controller:'MyCustomersCtrl'
            // })
            .when('/personal/send_customers', {
                templateUrl: 'views/personal/send_customers.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/my_comment', {
                templateUrl: 'views/personal/my_comment.html',
                controller: 'MyCommentCtrl'
            })
            .when('/personal/my_comment/:id/:a/:b/:c', {
                templateUrl: 'views/personal/my_comment_detail.html',
                controller: 'MyCommentDetailCtrl'
            })
            .when('/personal/customers_drawback', {
                templateUrl: 'views/personal/customers_drawback.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/customers_drawback_info', {
                templateUrl: 'views/personal/customers_drawback_info.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/my_customers_info/:gppActId/:gppCode/:gppStatus', {
                templateUrl: 'views/personal/my_customers_info.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/my_customers_info_drawback', {
                templateUrl: 'views/personal/my_customers_info_drawback.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/my_customers_info_unpaid', {
                templateUrl: 'views/personal/my_customers_info_unpaid.html',
                controller: 'MyCustomersCtrl'
            })
            .when('/personal/pay_e_coupon', {
                templateUrl: 'views/personal/pay_e_coupon.html',
                controller: 'ECouponCtrl'
            })
            .when('/personal/e_coupon', {
                templateUrl: 'views/personal/e_coupon.html',
                controller: 'ECouponCtrl'
            })
            .when('/personal/e_coupon_intro', {
                templateUrl: 'views/personal/e_coupon_intro.html',
                controller: 'ECouponCtrl'
            })
            .when('/personal/e_coupon_blank', {
                templateUrl: 'views/personal/e_coupon_blank.html',
                controller: 'ECouponCtrl'
            })
            .when('/personal/e_coupon_business_list/:code', {
                templateUrl: 'views/personal/e_coupon_business_list.html',
                controller: 'ECouponCtrl'
            })
            .when('/personal/e_coupon_business_blank', {
                templateUrl: 'views/personal/e_coupon_business_blank.html',
                controller: 'ECouponCtrl'
            })
            //个人信息
            .when('/personal/personal_info', {
                templateUrl: 'views/personal/personal_info.html',
                controller: 'PersonalInfoCtrl'
            })
            .when('/personal/personal_change_nickname', {
                templateUrl: 'views/personal/personal_change_nickname.html',
                controller: 'PersonalInfoCtrl'
            })
            .when('/personal/personal_change_nickname', {
                templateUrl: 'views/personal/personal_change_nickname.html',
                controller: 'PersonalInfoCtrl'
            })
            .when('/personal/personal_change_nickname', {
                templateUrl: 'views/personal/personal_change_nickname.html',
                controller: 'PersonalInfoCtrl'
            })
            .when('/personal/personal_change_tel', {
                templateUrl: 'views/personal/personal_change_tel.html',
                controller: 'PersonalInfoCtrl'
            })
            .when('/personal/personal_change_passwd', {
                templateUrl: 'views/personal/personal_change_passwd.html',
                controller: 'PersonalInfoCtrl'
            })
            //我的交易明细
            .when('/personal/trade',{   //获得该用户该日期下的交易列表
                templateUrl:'views/personal/trade_list.html',
                controller:'TradeListCtrl'
              })
              .when('/personal/trade_detail/:transerialnum/:orderId/:shopId',{  //通过orderId和shopId获得该笔交易详情,通过特约商户编号获取门店信息
                templateUrl:'views/personal/trade_detail.html',
                controller:'TradeDetailCtrl'
              })
              .when('/personal/trade_returns/:buttonflag/:transerialnum/:orderId/:shopId/:ordersum',{   //通过buttonflag控制退货页面逻辑
                templateUrl:'views/personal/trade_returns.html',
                controller:'TradeReturnCtrl'
              })
              .when('/personal/trade_returns_success/:transerialnum',{
                templateUrl:'views/personal/trade_returns_success.html',
                controller:'TradeReturnSuccessCtrl'//退货成功页
              })
            // 更多模块
            .when('/more/index', {
                templateUrl: 'views/more/index.html',
                controller: 'PersonalCtrl'
            })
            .when('/more/feedback', {
                templateUrl: 'views/more/feedback.html',
                controller: 'PersonalCtrl'
            })
            .when('/more/help', {
                templateUrl: 'views/more/help.html',
                controller: 'PersonalCtrl'
            })
            .when('/error/district_list', {
                templateUrl: 'views/error/district_list.html',
                controller: 'DistrictListCtrl'
            })
            //测试
            .when('/error/district_list/:id/:name/:address/:tel', {
                templateUrl: 'views/error/district_list.html',
                controller: 'DistrictListCtrl'
            })
            .when('/error/categories', {
                templateUrl: 'views/error/categories.html',
                controller: 'HomeCategoriesCtrl'
            })
            .when('/personal/orders', {
                templateUrl: 'views/personal/orders.html',
                controller: 'PersonalOrdersCtrl'
            })
            .when('/personal/my_customers', {
                templateUrl: 'views/personal/my_customers.html',
                controller: 'GppOrderCtrl'
            })
            .when('/personal/app_orders', {
                templateUrl: 'views/personal/app_orders.html',
                controller: 'AppOrderCtrl'
            })
            .when('/personal/ewm_orders', {
                templateUrl: 'views/personal/ewm_orders.html',
                controller: 'ewmOrderCtrl'
            })
            //app未支付支付
            //用户输入金额
            .when('/personal/pay_orders/:store_id/:order_id', {
                templateUrl: 'views/personal/pay_orders.html',
                controller: 'PayOrderCtrl'
            })
            //直接显示金额
            .when('/personal/pay_orders_info/:store_id/:order_id', {
                templateUrl: 'views/personal/pay_orders_info.html',
                controller: 'PayOrderCtrl'
            })
            //二维码已支付详情
            .when('/personal/order_detail/:store_id/:order_id', {
                templateUrl: 'views/personal/order_detail.html',
                controller: 'OrderDetailCtrl'
            })
            .when('/home/jifen_business/:name', {
                templateUrl: 'views/home/jifen_business.html',
                controller: 'JifenBusinessCtrl'
            })
            .when('/ticket/:ticket', {
                templateUrl: 'views/auth/index.html',
                controller: 'TicketLoginCtrl'
            })
            .when('/navigation/location/:destination/:destStoreName/:destLongitude/:destLatitude', {
                templateUrl: 'views/navigation/navigation_location.html',
                controller: 'NavigationLocationCtrl'
            })
            .when('/navigation/route/:origin/:destination/:destStoreName/:destLongitude/:destLatitude', {
                templateUrl: 'views/navigation/navigation_route.html',
                controller: 'NavigationRouteCtrl'
            })
            //天天抽奖
            // .when('/draw/check_draw',{
            //   templateUrl:'views/draw/check_draw.html',
            //   controller:'CheckDrawCtrl'
            // })
            // .when('/draw/win_draw',{
            //   templateUrl:'views/draw/win_draw.html',
            //   controller:'WinDrawCtrl'
            // })
            // .when('/draw/want_draw',{
            //   templateUrl:'views/draw/want_draw.html',
            //   controller:'WantDrawCtrl'
            // })
            // .when('/draw/already_draw',{
            //   templateUrl:'views/draw/already_draw.html',
            //   controller:'AlreadyDrawCtrl'
            // })
            .when('/draw/drawinfo/:id', {
                templateUrl: 'views/draw/draw_info.html',
                controller: 'DrawInfoCtrl'
            })
            .when('/draw/winnerlist/:id', {
                templateUrl: 'views/draw/list_draw.html',
                controller: 'ListDrawCtrl'
            })
            .when('/draw/mydraw', {
                templateUrl: 'views/draw/my_draw.html',
                controller: 'MyDrawCtrl'
            })
            .when('/draw/drawlist', {
                templateUrl: 'views/draw/everyday_draw.html',
                controller: 'EverydayDrawCtrl'
            })
            //e生活客户端扫一扫功能fix
            .when('/scan', {
                templateUrl: 'views/fix/scan_fix.html',
                controller: 'ScanFixCtrl'
            })
            .when('/reload', {
                templateUrl: 'views/fix/reload_fix.html',
                controller: 'ReloadFixCtrl'
            });
    }])
    /* ||2015.5.4|| */
    .config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.headers.put['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        $httpProvider.defaults.transformRequest = [function (data) {
            /**
             * The workhorse; converts an object to x-www-form-urlencoded serialization.
             * @param {Object} obj
             * @return {String}
             */
            var param = function (obj) {
                var query = '';
                var name, value, fullSubName, subName, subValue, innerObj, i;
                for (name in obj) {
                    value = obj[name];
                    if (value instanceof Array) {
                        for (i = 0; i < value.length; ++i) {
                            subValue = value[i];
                            fullSubName = name + '[' + i + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value instanceof Object) {
                        for (subName in value) {
                            subValue = value[subName];
                            fullSubName = name + '[' + subName + ']';
                            innerObj = {};
                            innerObj[fullSubName] = subValue;
                            query += param(innerObj) + '&';
                        }
                    } else if (value !== undefined && value !== null) {
                        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
                    }
                }
                return query.length ? query.substr(0, query.length - 1) : query;
            };
            return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
        }];
    }]).
//2015-07-02 lazy load config
    config(['lazyImgConfigProvider', function (lazyImgConfigProvider) {
        scrollable = document.querySelector('#scrollable');
        lazyImgConfigProvider.setOptions({
            offset: 100, // how early you want to load image (default = 100)
            errorClass: 'error', // in case of loading image failure what class should be added (default = null)
            successClass: 'success', // in case of loading image success what class should be added (default = null)
            onError: function (image) {
            }, // function fired on loading error
            onSuccess: function (image) {
            }, // function fired on loading success
            container: angular.element(scrollable) // if scrollable container is not $window then provide it here
        });
    }])
    /* ||2015.5.4|| */
    .controller('MainController', ['$rootScope', '$cookieStore', '$scope', '$timeout', 'API', function ($rootScope, $cookieStore, $scope, $timeout, API) {
        // 全局变量存储
        $rootScope.imgBaseUrl = "http://115.28.109.25/elife/dist";
        // Needed for the loading screen
        $rootScope.$on('$routeChangeStart', function () {
            $rootScope.loading = true;
        });
        // 首先获取地理位置
        // 如果获取不到经纬度和城市名称将无法进行下一步
        // if (!$cookieStore.get('lat') || !$cookieStore.get('lng') || $cookieStore.get('city_name')) {
        //     // TODO 获取经纬度，跳转到城市选择页面
        //     location.hash = '/locator';
        // } else {
        //     $rootScope.cityName = $cookieStore.get('city_name');
        // }
        global = {};
        // obs._on('getCityCodeSuccess',function() {
        //     $rootScope.location = 
        // });
        obs._on('networkInfoCallback', function () {
            $timeout(function () {
                $rootScope.hasWifi = elife_app.networkInfo.user_select + elife_app.networkInfo.is_wifi;
            }, 0);
        });
        obs._on('loginSuccess', function () {
            // localStorage.setItem('t_k',elife_app.token);
            // alert(localStorage.getItem('t_k'));
            // alert('进入登陆成功回调方法！');
            $rootScope.token = elife_app.token;
            // location.hash = '/reload';
            // location.reload();
        });
        obs._on('loginFailed', function () {
            $rootScope.token = undefined;
        });
        // if (localStorage.getItem('t_k')) {
        $timeout(function () {
            if (ICBCUtil.isElifeAndroid()) {
                elife_app.GetNativeFunctionAndroid({'keyword': 'getToken', 'showLoginFlag': '0'});
            } else if (ICBCUtil.isElifeIos()) {
                ICBCUtil.nativeGetConfig({
                    'key': 'getToken',
                    'callBack': "GetTokenCallbackIos"
                });
            }
        }, 0);
        // } else {
        // $rootScope.token = undefined;
        // }
        // 获取渠道号码
        var c_no = ICBCUtil.getIMChannel();
        if (c_no) $cookieStore.put('c_no', c_no);
        // // 如果是非首次登陆，则每次加载都先从app获取token
        // 临时写入，以便调试使用
        if (!$cookieStore.get('city_code')) {
            $cookieStore.put('city_code', '110100');
        }
        // 获取城市编码city_code
        $timeout(function () {
            if (ICBCUtil.isElifeAndroid()) {
                elife_app.GetNativeFunctionAndroid({'keyword': 'getCityCode'});
            } else if (ICBCUtil.isElifeIos()) {
                ICBCUtil.nativeGetConfig({
                    'key': 'getCityCode',
                    'callBack': "GetCityCodeCallbackIos"
                });
            }
        }, 0);
        // 比较城市代码
        $rootScope.$on('$routeChangeSuccess', function () {
            // 每次路由改变都要判断wifi
            $timeout(function () {
                if (ICBCUtil.isElifeAndroid()) {
                    //获取网络情况 共两位 第一位为是否选择“仅wifi显示图片” 第二位为是否处于wifi环境
                    elife_app.GetNativeFunctionAndroid({'keyword': 'getNetworkStatus'});
                } else if (ICBCUtil.isElifeIos()) {
                    ICBCUtil.nativeGetConfig({
                        'key': 'getNetworkStatus',
                        'callBack': "GetNetworkStatusCallback"
                    });
                } else {
                    $rootScope.hasWifi = "01";
                }
            }, 0);
            $rootScope.loading = false;
        });
        $rootScope.toast = function (content, duration) {
            duration = duration || 3000;
            $scope.toastShow = true;
            $scope.toastContent = content;
            if (this._timer) {
                $timeout.cancel(this._timer);
            }
            this._timer = $timeout(function () {
                $scope.toastShow = false;
            }, duration);
        };
        $rootScope.parseImageUrl = function (url) {
            if ($rootScope.hasWifi == "10") {
                return "images/e生活缺省图.png";
            } else {
                if (/^http/.test(url)) {
                    return url;
                } else {
                    return $rootScope.imgBaseUrl + url;
                }
            }
        };
        $scope.toastShow = false;
        $scope.toastContent = '';
        $rootScope.validateLogin = function (fn) {
            if (!API.isLogin()) {
                API.doLogin();
            } else {
                fn();
            }
        };
    }])
    .directive('pageTitle', [function () {
        return {
            restrict: 'A',
            compile: function (elem, attrs) {
                var title = attrs.pageTitle;
                return function (scope, elem) {
                    document.title = title;
                };
            }
        };
    }
    ])
    .directive('fallbackSrc', function () {
        var fallbackSrc = {
            link: function postLink(scope, iElement, iAttrs) {
                iElement.bind('error', function () {
                    angular.element(this).attr("src", iAttrs.fallbackSrc);
                });
            }
        };
        return fallbackSrc;
    })
    .run(['$rootScope', '$location', function ($rootScope, $location) {
        $rootScope.$on('$routeChangeSuccess', function (evt, current, previous) {
            console.log('route have already changed');
            $rootScope.removeAllCookies();
            //console.table(evt.currentScope);
            //if(removeAllCookies instanceof Function){
            //    removeAllCookies();
            //}
        });
    }]);
elife.filter('to_trusted', ['$sce', function ($sce) {
    return function (text) {
        return $sce.trustAsHtml(text);
    };
}]);
var _ = angular.element;
elife.isElifeAndroid = ICBCUtil.isElifeAndroid();