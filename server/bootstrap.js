// server file, initialization code

Meteor.startup(function () {
  if (Reviews.find().count() !== 0) return;


    // Accounts.createUserWithPhone({
    //   phone: '+9099999999',
    //   profile: {
    //     name: 'McFlooze'
    //   }
    // });

    // Accounts.createUserWithPhone({
    //   phone: '+9099999998',
    //   profile: {
    //     name: 'Fisher of Cats'
    //   }
    // });

    // Accounts.createUserWithPhone({
    //   phone: '+909999997',
    //   profile: {
    //     name: 'Johnsasaurus Rex',
    // }
    // });
});
