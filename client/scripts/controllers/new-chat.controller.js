angular
  .module('Project4')
  .controller('NewChatCtrl', NewChatCtrl);

function NewChatCtrl($scope, $reactive, $state, NewChat) {
  $reactive(this).attach($scope);

  this.hideNewChatModal = hideNewChatModal;
  this.newChat = newChat;

  // must subscribe to get Users data to the client side
  this.subscribe('users');

  this.helpers({
    users() {
      return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
    }
  });
    function hideNewChatModal() {
      NewChat.hideModal();
    }

     function newChat(userId) {
      // let chat = Chats.findOne({ type: 'chat', userIds: { $all: [Meteor.userId(), userId] } });
      let chat = Chats.findOne({ userIds: { $all: [Meteor.userId(), userId] } });
      if (chat) {
        return goToChat(chat._id);
      }
      Meteor.call('newChat', userId, goToChat);
     }

     function goToChat(chatId) {
      hideNewChatModal();
      return $state.go('tab.chat', { chatId: chatId });
     }

}
