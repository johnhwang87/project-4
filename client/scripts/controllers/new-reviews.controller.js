angular
  .module('Project4')
  .controller('NewReviewsCtrl', NewReviewsCtrl);

function NewReviewsCtrl($scope, $reactive, $state, NewReviews){
  $reactive(this).attach($scope);

  this.hideNewReviewsModal = hideNewReviewsModal;
  // this.newReview = newReview;

  this.subscribe('users');
  this.helpers({
    users() {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }
  });

  function hideNewReviewsModal() {
    NewReviews.hideModal();
  }

  function newReview(userId) {
    let reviews = Reviews.findOne({ userIds: { $all: [Meteor.userId(), userId] } });
console.log('hi')
      if (reviews) {
        return goToChat(chat)
      }
    Meteor.call('newReview', userId, goToChat);
  }

   function goToChat(reviewId) {
    hideNewReviewsModal();
    return $state.go('tab.chat', { reviewId: reviewId });
   }
}
