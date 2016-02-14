angular
  .module('Project4')
  .controller('ChatCtrl', ChatCtrl);

function ChatCtrl ($scope, $reactive, $stateParams, ionicScrollDelegate, $timeout){
  $reactive(this).attach($scope);

  let chatId = $stateParams.chatId;
  let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  this.sendMessage = sendMessage;
  this.inputUp = inputUP;
  this.inputDown = inputDown;
  this.closeKeyboard = closeKeyboard;

// angular meteor helpers
  this.helpers({
    messages() {
      return Messages.find({ chatId: chatId});
    },
    data() {
      return Chats.findOne(chatId);
    }
  });
// sending a message
  function sendMessage () {
    if(_.isEmpty(this.message)) return;
    // calling the method on the serverside
    Meteor.call('newMessage', {
      text: this.message,
      type: 'text',
      chatId: chatId
    });

    delete this.message;
  }
// showing a keyboard that pops up.
  function inputUp () {
    if (isIOS) {
      this.keyboardHeight = 216;
    }

    $timeout(function (){
      $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);

    }, 300);
  }
  // hiding keyboard
  function inputDown() {
    if (isIOS) {
      this.keyboardHeight = 0;
    }
    $ionicScrollDelegate.$getByHandle('chatScroll').resize();
  }

  function closeKeyboard (){

  }

}
