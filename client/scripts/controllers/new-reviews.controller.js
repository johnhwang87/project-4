angular
  .module('Project4')
  .controller('NewReviewsCtrl', NewReviewsCtrl);

function NewReviewsCtrl($scope, $reactive, $state, NewReviews){
  $reactive(this).attach($scope);

  this.hideNewReviewsModal = hideNewReviewsModal;
  // this.newReview = newReview;

  this.subscribe('users');


  function hideNewReviewsModal() {
    console.log('WTF')
    NewReviews.hideModal();
  }

  function newReview() {
    // Meteor.call('newReviews', userId);
  }

}
