// server file, initialization code

Meteor.startup(function () {
  if (Reviews.find().count() !== 0) return;

  Reviews.remove({});

  let reviews = [
    {
      text: "worst date ever. Peed in pants. gg"
    }



  ];
  reviews.forEach((r) => {
    Reviews.insert(r);
  });
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
