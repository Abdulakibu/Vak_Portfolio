function artDisp() {
  return {
    restrict: 'E',
    controller: 'artController as art',
    template: `
    	<div class="container col-s-12">
        <button id="left" class="btn" ng-click="left()"><i class="fa fa-angle-left" aria-hidden="false"></i></button>
        <span class="zoom" id="ex1">
              <img ng-src="{{image}}" id="imgPic"/>
        </span>
        <button id="right" class="btn" ng-click="right()"><i class="fa fa-angle-right" aria-hidden="false"></i></button>
    	</div>

    `
  }

}





angular
  .module('app')
  .directive('artDisp', artDisp)
