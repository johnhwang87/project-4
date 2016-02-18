angular
  .module('Project4')
  .controller('ReviewsCtrl', ReviewsCtrl);

  function ReviewsCtrl ($scope, $reactive, $state) {
    $reactive(this).attach($scope);

    // this.newReviews = newReviews;

    // this.subscribe('users');

    this.helpers({
      data() {
        return Reviews.find();
      }
    });

  }
