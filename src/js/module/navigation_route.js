elife.controller('NavigationRouteCtrl', [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$cookieStore',
    'API',
    function ($scope, $rootScope, $routeParams, $cookieStore, API) {
        $scope.navigationType = "walking";
        var origin = $routeParams.origin;
        $scope.origin = origin;
        var getOrigin = function () {
            $scope.toast("无法定位，请允许GPS定位");
        };
        API.doGPSLocation(getOrigin);
        obs._on('positionCallback', function () {
            $timeout(function () {
                if (callbackPosition) {
                    $scope.origin = callbackPosition;
                    //$scope.origin='西二旗'
                }
            }, 0);
        });
        // var originPoint = new BMap.Point($cookieStore.get('longitude'),$cookieStore.get('latitude'));
        var destination = $routeParams.destination;
        var destStoreName = $routeParams.destStoreName;
        var destLongitude = $routeParams.destLongitude;
        var destLatitude = $routeParams.destLatitude;
        try {
            var destinationPoint = new BMap.Point(destLongitude, destLatitude);
        } catch (e) {
        }
        // $scope.origin = originPoint;
        // destination = destinationPoint;
        // API.geocoder({
        //     'address' : $scope.origin,
        //     'city' : $cookieStore.get('city_name')
        // }).then(function (data) {
        //     console.log(data);
        // },function (data) {
        // });
        console.log("起点: " + $scope.origin);
        console.log("终点: " + destination);
        console.log("终点商店: " + destStoreName);
        console.log("终点坐标: (" + destLongitude + ", " + destLatitude + ")");
        // 复杂的自定义覆盖物
        function ComplexCustomOverlay(point, title, address) {
            this._point = point;
            this._title = title;
            this._address = address;
        }

        ComplexCustomOverlay.prototype = new BMap.Overlay();
        ComplexCustomOverlay.prototype.initialize = function (map) {
            this._map = map;
            var div = this._div = document.createElement("div");
            div.style.position = "absolute";
            div.style.zIndex = BMap.Overlay.getZIndex(this._point.lat);
            div.style.backgroundColor = "rgba(0, 0, 0, .6)";
            div.style.color = "white";
            div.style.width = "220px";
            div.style.padding = "4px 6px";
            div.style.borderRadius = "4px";
            div.style.lineHeight = "22px";
            div.style.whiteSpace = "nowrap";
            div.style.MozUserSelect = "none";
            div.style.fontSize = "12px";
            var title = document.createElement("div");
            var address = document.createElement("div");
            title.style.fontSize = "14px";
            title.style.fontWeight = 600;
            address.style.overflow = "hidden";
            address.style.textOverflow = "ellipsis";
            div.appendChild(title);
            div.appendChild(address);
            title.appendChild(document.createTextNode(this._title));
            address.appendChild(document.createTextNode(this._address));
            // var arrow = this._arrow = document.createElement("div");
            // arrow.style.background = "url(http://map.baidu.com/fwmap/upload/r/map/fwmap/static/house/images/label.png) no-repeat";
            // arrow.style.position = "absolute";
            // arrow.style.width = "10px";
            // arrow.style.height = "24px";
            // arrow.style.top = "22px";
            // arrow.style.left = "10px";
            // arrow.style.overflow = "hidden";
            //div.appendChild(arrow);
            map.getPanes().labelPane.appendChild(div);
            return div;
        };
        ComplexCustomOverlay.prototype.draw = function () {
            var map = this._map;
            var pixel = map.pointToOverlayPixel(this._point);
            this._div.style.left = pixel.x - 12 + "px";
            this._div.style.top = pixel.y - 88 + "px";
        };
        var map = null;
        var storeInfoOverlay = new ComplexCustomOverlay(new BMap.Point(destLongitude, destLatitude), destStoreName, destination);
        $scope.getWalkingRoute = function () {
            $scope.initializeMap();
            map.clearOverlays();
            var walking = new BMap.WalkingRoute(map, {renderOptions: {map: map, autoViewport: true}});
            walking.search($scope.origin, destination);
            map.addOverlay(storeInfoOverlay);
        };
        $scope.getDrivingRoute = function () {
            $scope.initializeMap();
            map.clearOverlays();
            // var storeInfoOverlay = new ComplexCustomOverlay(new BMap.Point(destLongitude, destLatitude), destStoreName, destination);
            var driving = new BMap.DrivingRoute(map, {
                renderOptions: {map: map, autoViewport: true}, policy: BMAP_DRIVING_POLICY_LEAST_TIME
            });
            driving.search($scope.origin, destinationPoint);
            map.addOverlay(storeInfoOverlay);
        };
        $scope.getBusRoute = function () {
            $scope.initializeMap();
            //var routePolicy = [BMAP_TRANSIT_POLICY_LEAST_TIME,BMAP_TRANSIT_POLICY_LEAST_TRANSFER,BMAP_TRANSIT_POLICY_LEAST_WALKING,BMAP_TRANSIT_POLICY_AVOID_SUBWAYS];
            map.clearOverlays();
            // var storeInfoOverlay = new ComplexCustomOverlay(new BMap.Point(destLongitude, destLatitude), destStoreName, destination);
            var transit = new BMap.TransitRoute(map, {
                renderOptions: {map: map},
                policy: 0
            });
            transit.setPolicy(BMAP_TRANSIT_POLICY_LEAST_TIME);
            transit.search($scope.origin, destinationPoint);
            map.addOverlay(storeInfoOverlay);
        };
        $scope.changeNavigationType = function (type) {
            if (type === $scope.navigationType) {
                return;
            }
            $scope.navigationType = type;
            if (type === "walking") {
                $scope.getWalkingRoute();
            } else if (type === "driving") {
                $scope.getDrivingRoute();
            } else if (type === "bus") {
                $scope.getBusRoute();
            }
        };
        $scope.initializeMap = function () {
            if (map === null) {
                map = new BMap.Map("navigationRoute");
            }
        };
        try {
            $scope.getWalkingRoute();
        } catch (e) {
        }
    }
]);

