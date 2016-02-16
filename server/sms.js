// SMS.twilio = {
//   ACCOUNT_SID: Meteor.settings.TWILIO.ACbfd2fae9a69aa2ec1dd9b17cceeca20e,
//   AUTH_TOKEN: Meteor.settings.TWILIO.a5655c01b3738917173ff9be260f93fc
// };

if (Meteor.isServer) {
// configuring to serverside to make this work
    if (Meteor.settings && Meteor.settings.ACCOUNTS_PHONE) {
      Accounts._options.adminPhoneNumbers = Meteor.settings.ACCOUNTS_PHONE.ADMIN_NUMBERS;
      Accounts._options.phoneVerificationMasterCode = Meteor.settings.ACCOUNTS_PHONE.MASTER_CODE;
    }
}
