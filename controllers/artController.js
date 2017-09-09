app.controller('artController', ['$scope', '$http', '$location', '$window', '$timeout', '$route', function ($scope, $http, $location, $window, $timeout, $route) {

  var i = 1;
  $scope.limit = 8;
  $scope.loadBtn = true;
  var imgNum = Math.floor(Math.random()* 50);
  $scope.drawings = [];
  $scope.image = "drawings/" + imgNum + ".jpg";

  loadDrawings();

  //backward/forward buttons in image display
  $scope.left = function() {
    //stop zoom to allow img change
    $('#ex1').trigger('zoom.destroy');

    if(imgNum === 1) {
      imgNum = 50;
    }

    //start zoom to use new img src
    $(document).ready(function(){
      $('#ex1').zoom();
    });

    imgNum--;
    $scope.image = "drawings/" + imgNum + ".jpg";
  }


  $scope.right = function() {
    //stop zoom to allow img change
    $('#ex1').trigger('zoom.destroy');

    if(imgNum === 49) {
      imgNum = 0;
    }
    //start zoom to use new img src
    $(document).ready(function(){
      $('#ex1').zoom();
    });

    imgNum++;
    $scope.image = "drawings/" + imgNum + ".jpg";
  }


  //thumbnail click changes displayed image and scrolls to top
  $scope.drawingClick = function(index) {
    //stop zoom so that img src can change
    $('#ex1').trigger('zoom.destroy');

    //restart zoom to use new img
    $(document).ready(function(){
      $('#ex1').zoom();
    });

    //arrays start at 0, but img names start at 1
    imgNum = index + 1;
    $scope.image = "drawings/" + (index+1) + ".jpg";
    $window.scrollTo(0, 0);
  }


  //"load more" btn
  $scope.loadMore = function() {
    $scope.limit += 8;
    if($scope.limit > $scope.drawings.length) {
      $scope.loadBtn = false;
    }
  }


  //load all drawings in folder
  function loadDrawings() {
    while(i < 50) {
      drawing = "drawings/" + i + ".jpg";
      i++;
      $scope.drawings.push(drawing);
    }
  }


  //navbar uncollapse upon clicking elsewhere
  $(document).click(function (event) {
      var clickover = $(event.target);
      var $navbar = $(".navbar-collapse");
      var _opened = $navbar.hasClass("in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
          $navbar.collapse('hide');
      }
  });


  //zoom on image display hover
  $(document).ready(function(){
    $('#ex1').zoom();
  });

  //retrieve json data for home page resume
  $http.get('views/data/aboutMe.json').then(function(data) {
    $scope.vakdata = data.data;
  })

}]);


app.controller('vidController', ['$scope', '$window', '$sce', function ($scope, $window, $sce) {

  $scope.files = [];

  $scope.vid = [
      {title: "No Gracias Señor", id: "1-HpXcO9NdU", desc: "ddfgdfsggfd"},
      {title: "You're Ridiculous", id: "dD70N6K1RSU", desc: "gffsdgfds"},
      {title: "Swimmies & Bevs", id: "F8zwg6kXL2E", desc: "hfgjhgfj"},
      {title: "Phoebe & Gio", id: "5RO2iG0Fuqo", desc: "rtyutjghf"},
      {title: "Georgia Dance Party", id: "ZbV-fY7e4rA", desc: "gfhjghfjty"}
    ];

  $scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.vid[0].id + "?rel=0");

  for(var i = 0; i < 5; i++) {
    $scope.files[i] = {
      title: $scope.vid[i].title,
      url: "http://img.youtube.com/vi/" + $scope.vid[i].id + "/0.jpg",
      desc: $scope.vid[i].desc
    }
  }



  $scope.changeVid = function(index) {
    $scope.url = $sce.trustAsResourceUrl($scope.vid.introVid + $scope.vid[index].id + $scope.vid.endVid);
    $window.scrollTo(0, 0);
  }

}])




app.controller('contactController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    //contact-form submit success
    $scope.submitMsg = function() {
      $location.path('contact-success');
      //redirect to home page
      $timeout(function() {
        $location.path('home');
      }, 2000);
    }
  }])
