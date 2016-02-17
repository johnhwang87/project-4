angular
  .module('Project4')
  .controller('ReviewsCtrl', ReviewsCtrl);

  function ReviewsCtrl ($scope, $reactive, $state) {
    $reactive(this).attach($scope);
  }
