function artGall() {
  return {
    restrict: 'E',
    controller: 'artController as art',
    cursor: 'pointer',
    template: `
    <div
    class="col-lg-3 col-sm-6"
    ng-repeat="drawing in drawings | limitTo: limit">
      <div
      class="thumbnail" >

          <img
          ng-click="drawingClick($index)"
          id="{{$index}}"
          ng-src="{{drawing}}"
          class="hvr-grow">


      </div>
    </div>
    <button id="loadMore" onclick="this.blur();" class="btn btn-default" ng-if="loadBtn" ng-click="loadMore()">Load More!</button>

    `
  }

}





angular
  .module('app')
  .directive('artGall', artGall)
