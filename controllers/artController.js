//controller for art gallery and navbar
app.controller('artController', ['$scope', '$http', '$location', '$window', '$timeout', '$route', function ($scope, $http, $location, $window, $timeout, $route) {
  var screenWidth = window.innerWidth;
  var i = 1;
  //initially only load 8 thumbnails in art gall
  $scope.limit = 8;
  //display load button by default
  $scope.loadBtn = true;
  //select random number for img to be displayed on page load
  var imgNum = Math.floor(Math.random() * 49);
  //empty array, gets loaded with drawing file URLs
  $scope.drawings = [];
  $scope.drawingsM = [];
  //select img to be displayed based off random number earlier

  //fill drawings array with all URLs
  loadDrawings();
  $scope.image = $scope.drawings[imgNum+1]

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
      if (window.innerWidth < 700){
        $scope.image = $scope.drawingsM[imgNum-1]
      } else {
        $scope.image = $scope.drawings[imgNum-1]
      }
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
      if (window.innerWidth < 700){
        $scope.image = $scope.drawings[imgNum-1]
      } else {
        $scope.image = $scope.drawings[imgNum-1]
      }
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
      if (window.innerWidth < 700){
        $scope.image = $scope.drawings[imgNum-1]
      } else {
        $scope.image = $scope.drawings[imgNum-1]
      }
      $window.scrollTo(0, 0);
  }


  //"load more" button
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
          drawingM = "drawings/Mobile/" + i + ".jpg";
          i++;
          $scope.drawings.push(drawing);
          $scope.drawingsM.push(drawingM);
      }
  }


  //zoom on image display hover
  $(document).ready(function(){
      $('#ex1').zoom();
  });


  //navbar uncollapse upon clicking elsewhere
  $(document).click(function (event) {
      var clickover = $(event.target);
      var $navbar = $(".navbar-collapse");
      var _opened = $navbar.hasClass("in");
      if (_opened === true && !clickover.hasClass("navbar-toggle")) {
          $navbar.collapse('hide');
      }
  });


  //retrieve json data for home page resume
  $http.get('views/data/aboutMe.json').then(function(data) {
      $scope.vakdata = data.data;
  })

}]);


app.controller('vidController', ['$scope', '$window', '$sce', function ($scope, $window, $sce) {
  //empty array that gets loaded with all links for video gallery
  $scope.files = [];
  //array of objects for each video, containing title, youtube ID, and caption
  $scope.vid = [
      {
        title: "No Gracias Señor",
        id: "1-HpXcO9NdU",
        cap: "Adventures in Peru"},
      {
        title: "You're Ridiculous",
        id: "dD70N6K1RSU",
        cap: "Celebrating our first year in a long-distance relationship"},
      {
        title: "Swimmies & Bevs",
        id: "F8zwg6kXL2E",
        cap: "Adventures in the Outer Banks"},
      {
        title: "Phoebe & Gio",
        id: "5RO2iG0Fuqo",
        cap: "Compilation of Phoebe & Gio's dance parties"},
      {
        title: "Georgia Dance Party",
        id: "ZbV-fY7e4rA",
        cap: "Adventures in Georgia."}
    ];
  //set initialvideo on page load
  $scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.vid[0].id + "?rel=0");
  //loop through vid array of objects, creating a full URL and loading them into files array
  for(var i = 0; i < 5; i++) {
    $scope.files[i] = {
      title: $scope.vid[i].title,
      url: "http://img.youtube.com/vi/" + $scope.vid[i].id + "/0.jpg",
      cap: $scope.vid[i].cap
    }
  }
  //clicking on thumbnail changes embed video to selected
  $scope.changeVid = function(index) {
    $scope.url = $sce.trustAsResourceUrl("https://www.youtube.com/embed/" + $scope.vid[index].id + "?rel=0");
    $window.scrollTo(0, 0);
  }
}])


//contact controller
app.controller('contactController', ['$scope', '$location', '$timeout', function ($scope, $location, $timeout) {
    //contact-form submit success
    $scope.submitMsg = function() {
      $location.path('contact-success');
      //redirect to home page adter 2 sec
      $timeout(function() {
        $location.path('home');
      }, 2000);
    }
  }])
