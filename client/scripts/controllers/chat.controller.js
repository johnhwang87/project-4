angular
  .module('Project4')
  .controller('ChatCtrl', ChatCtrl);

function ChatCtrl ($scope, $reactive, $stateParams, $ionicScrollDelegate, $timeout, $ionicPopup, $log){
  $reactive(this).attach($scope);

  let chatId = $stateParams.chatId;
  let isIOS = ionic.Platform.isWebView() && ionic.Platform.isIOS();

  this.sendMessage = sendMessage;
  this.inputUp = inputUp;
  this.inputDown = inputDown;
  this.closeKeyboard = closeKeyboard;


// angular meteor helpers
  this.helpers({
    messages() {
      return Messages.find({ chatId: chatId });
    },
    // helper to fetch chatId
    data() {
      return Chats.findOne(chatId);
    },
  });

  // adding auto-scroll to the messages list to keep the view scrolled down when a new message arrives
  $scope.$watchCollection('chat.messages', (oldVal, newVal) => {
    let animate = oldVal.length !== newVal.length;
    $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
  });

// attempting video message...

// sending a message
  function sendMessage () {
    if (_.isEmpty(this.message)) return;
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
      this.keyboardHeight = 406;
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

    // cordova.plugins.Keyboard.close();
  }

}
