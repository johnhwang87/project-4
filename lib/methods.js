// Creating methods

// Adding sendMessage method to the server

Meteor.methods({
  // new message creation. adding check (package that validates data types and scheme), and using it in newMessage method.
  newMessage: function (message) {
    // magic here
    check(message, {
      text: String,
      chatId: String
    });
    message.timestamp = new Date();

    let messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });

    return messageId;
  }
})
