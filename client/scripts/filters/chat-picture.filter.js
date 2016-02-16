angular
  .module('Project4')
  .filter('chatPicture', chatPicture);

// changed logic of chatpicture display to get from the user id
function chatPicture () {
  return function (chat) {
    if (!chat) return;

    let otherId = _.without(chat.userIds, Meteor.userId())[0];
    let otherUser = Meteor.users.findOne(otherId);
    let hasPicture = otherUser && otherUser.profile && otherUser.profile.picture;

    return hasPicture ? otherUser.profile.picture : chat.picture || '/default.png';
  }
}
