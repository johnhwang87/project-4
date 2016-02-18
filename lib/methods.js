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
    // check(name, String);
    if (name.length === 0) {
      throw Meteor.Error('name-required', 'Must provide username');
    }
    // Meteor sets user identity under this.userId. This can be checked to make sure that the user is logged in.
    return Meteor.users.update(this.userId, { $set: { 'profile.name': name } });
  },
  updateAge(age) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update age.');
    }
    return Meteor.users.update(this.userId, { $set: { 'profile.age': age } });
  },
  updateGender(gender) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update gender.');
    }
    return Meteor.users.update(this.userId, { $set: { 'profile.gender': gender } });
  },
  updateBio(bio) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update bio.');
    }
    return Meteor.users.update(this.userId, { $set: { 'profile.bio': bio } });
  },
  // implementing the new chat function on the serverside


  newChat(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a chat!');
    }
//
    // check(otherId, String);

    let otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'Chat\'s user does not exist!');
    }

    let chat = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    let chatId = Chats.insert(chat);

    return chatId;
  },


  newReview(otherId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a review!');
    }
    let otherUser = Meteor.users.findOne(otherId);
    if (! otherUser) {
      throw new Meteor.Error('user-not-exists',
        'User does not exist!');
    }
    let review = {
      userIds: [this.userId, otherId],
      createdAt: new Date()
    };

    let reviewId = Reviews.insert(review);

    return reviewId;

  },







  // implementing removing Chats!
  removeChat(chatId) {
    if (!this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to create a chat!');
    }
    check(chatId, String);

    let chat = Chats.findOne(chatId);
    if (!chat || !_.include(chat.userIds, this.userId)) {
      throw new Meteor.Error('chat-not-exists',
        'Chat does not exist!');
    }

    Messages.remove({ chatId: chatId });

    return Chats.remove({ _id: chatId });
  },
  // adding server method to update the user's profile image, just like updating any other string field of user's profile
  updatePicture(data) {
    if (! this.userId) {
      throw new Meteor.Error('not-logged-in',
        'Must be logged in to update picture!');
    }

    // check(data, String)
    // return the data and setting the image
    return Meteor.users.update(this.userId, { $set: { 'profile.picture': data } });
  }
});
