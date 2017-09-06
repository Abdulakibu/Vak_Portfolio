function artController($scope, $http, $location, $window, $timeout, $route) {

  var i = 1;
  $scope.limit = 8;
  $scope.loadBtn = true;
  var imgNum = Math.floor(Math.random()* 38 + 1);
  $scope.drawings = [];
  $scope.image = "drawings/" + imgNum + ".jpg";

  loadDrawings();


  //backward/forward buttons in image display
  $scope.left = function() {
    //stop zoom to allow img change
    $('#ex1').trigger('zoom.destroy');

    if(imgNum === 1) {
      imgNum = 39;
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

    if(imgNum === 38) {
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
    $scope.limit *= 2;
    if($scope.limit > 38) {
      $scope.loadBtn = false;
    }
  }


  //load all drawings in folder
  function loadDrawings() {
    while(i < 39) {
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

}



angular
  .module('app')
  .controller('artController', artController)
