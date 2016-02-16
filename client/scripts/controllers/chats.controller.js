angular
  .module('Project4')
  .controller('ChatsCtrl', ChatsCtrl);

function ChatsCtrl ($scope, $reactive, NewChat) {
  $reactive(this).attach($scope);

  // adding variable for new chat modal
  this.showNewChatModal = showNewChatModal;
  this.remove = remove;

  this.helpers({
    data() {
      return Chats.find();
    }
  });
  // function for new chat, showing a modal that pops up with .showModal()
  function showNewChatModal() {
    NewChat.showModal();
  }

  function remove (chat) {
    Meteor.call('removeChat', chat._id);
  }
}
