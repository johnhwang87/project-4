angular
  .module('Project4')
  .controller('NewReviewsCtrl', NewReviewsCtrl);

function NewReviewsCtrl($scope, $reactive, $state, $stateParams, NewReviews){
  $reactive(this).attach($scope);

  let chatId = $stateParams.chatId;
  this.hideNewReviewsModal = hideNewReviewsModal;
  this.sendReview = sendReview;

  this.subscribe('users');
  this.helpers({
    data() {
      return Chats.findOne(chatId);
    }
  });
// console.log(users)
  function hideNewReviewsModal() {
    NewReviews.hideModal();
  }
// console.log(user._id)
  function sendReview() {
    // if (_.isEmpty(this.review)) return;
    //   console.log(this.review)
      // if (reviews) {
      //   return goToChat(reviews._id)
      // }
      console.log(this.review)
    Meteor.call('newReview', {
      text: this.review,
      type: 'text',
      chatId: chatId

  });
    console.log(this.review);
    delete this.review;
    console.log("hi")
}

   // function goToChat(chatId) {
   //  hideNewReviewsModal();
   //  return $state.go('tab.chat', { chatId: chatId });
   // }
}
