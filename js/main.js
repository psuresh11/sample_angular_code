var app = angular.module('abWebApp', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when("/", {templateUrl: "partials/home.html", controller: "PageCtrl"})
    .when("/aboutme", {templateUrl: "partials/about.html", controller: "PageCtrl"})
    .when("/interest", {templateUrl: "partials/interest.html", controller: "PageCtrl"})
    .when("/contact", {templateUrl: "partials/contact.html", controller: "PageCtrl"})
    .when("/blog", {templateUrl: "partials/blog.html", controller: "BlogCtrl"})
    .when("/blog/post", {templateUrl: "partials/blog_item.html", controller: "BlogCtrl"})
    .when("/404", {templateUrl: "partials/404.html", controller: "PageCtrl"})
    .otherwise({redirectTo: '/404'});
}]);


app.controller('HeaderCtrl', function($scope,$location) {
  $scope.isActive = function (viewLocation) {
    var active = (viewLocation === $location.path());
    return active;
  };
  $scope.username = "ABC";
});

app.controller('BlogCtrl', function (/* $scope, $location, $http */) {
  console.log("This is Blog Controller");
});

app.controller('PageCtrl', function (/* $scope, $location, $http */) {
  console.log("This is Page Controller");
});

app.controller('SliderCtrl', function($scope) {
  $scope.images = [
    { src: 'img1.png', title: 'Pic 1', titaldescription: 'Description title 1', description: 'Description 1'}, 
    { src: 'img2.jpg', title: 'Pic 2', titaldescription: 'Description title 2', description: 'Description 2'}, 
    { src: 'img3.jpg', title: 'Pic 3', titaldescription: 'Description title 3', description: 'Description 3'}, 
    { src: 'img4.png', title: 'Pic 4', titaldescription: 'Description title 4', description: 'Description 4'}, 
    { src: 'img5.png', title: 'Pic 5', titaldescription: 'Description title 5', description: 'Description 5'}
  ];
});

app.directive('slider', function ($timeout) {
  return {
    scope:{
      images: '='
    },
    link: function (scope, elem, attrs) {
      scope.currentIndex=0;
      scope.next=function(){
        scope.currentIndex<scope.images.length-1?scope.currentIndex++:scope.currentIndex=0;
      };
      scope.prev=function(){
        scope.currentIndex>0?scope.currentIndex--:scope.currentIndex=scope.images.length-1;
      };
      scope.$watch('currentIndex',function(){
        scope.images.forEach(function(image){
          image.visible=false;
        });
        scope.images[scope.currentIndex].visible=true;
      });
    
      var timer;
      var sliderFunc=function(){
        timer=$timeout(function(){
          scope.next();
          timer=$timeout(sliderFunc,5000);
        },5000);
      };
      sliderFunc();
      scope.$on('$destroy',function(){
        $timeout.cancel(timer);
      });
    },
  templateUrl:'templates/slider.html'
  }
});