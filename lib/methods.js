// Creating methods

Meteor.methods({
  // creates new message below
  newMessage (message) {
    if (! this.userId) {
      // adding validation, make sure userId exists
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to send message.');
    }
    message.timestamp = new Date();
    // adding the identity of the user to each message sent
    message.userId = this.userId;

    let messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  },
  // throws error message if login dont work
  updateName(name) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update name.');
    }
    // checking the username string, making sure it is there
    check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide username');
    }
    // Meteor sets user identity under this.userId. This can be checked to make sure that the user is logged in.
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  }
});
