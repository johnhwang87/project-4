Meteor.publish('users', function () {
  // defining what query we want to send our clients
  return Meteor.users.find({}, { fields: { profile: 1 } });
});

// send each client only the chats and messages he is apart of
// Messages from those chats need to be added to publication, and
// need to make a joined collections publication. reywood:publish-composite
// with the package, can add messages and chats that are related to the user
Meteor.publishComposite('chats', function () {
  if (! this.userId) return;

  return {
    find() {
      return Chats.find({ userIds: this.userId });
    },
    children: [
      {
        find(chat) {
          return Messages.find({ chatId: chat._id });
        }
      },
      {
        find(chat) {
          let query = { _id: { $in: chat.userIds } };
          let options = { fields: { profile: 1 } };

          return Meteor.users.find(query, options);
        }
      }
    ]
  };
});
