angular
  .module('Project4')
  .filter('chatName', chatName);

// changed logic of username display to get the user information by its id
function chatName() {
  return function (chat) {
    if (! chat) return;

    let otherId = _.without(chat.userIds, Meteor.userId())[0];
    let otherUser = Meteor.users.findOne(otherId);
    let hasName = otherUser && otherUser.profile && otherUser.profile.name;

    return hasName ? otherUser.profile.name : chat.name || 'Nameless One';
  }
}
