angular
  .module('Project4')
  .controller('ProfileCtrl', ProfileCtrl);

function ProfileCtrl ($scope, $reactive, $state, $ionicPopup, $log, $ionicLoading) {
  $reactive(this).attach($scope);
  // defining Meteor user
  let user = Meteor.user();
  let name = user && user.profile ? user.profile.name : '';

  this.name = name;
  this.updateName = updateName;
  this.updatePicture = updatePicture;
  this.updateAge = updateAge;
  this.updateGender = updateGender;
  this.updateBio = updateBio;

  function updateBio () {
    if (_.isEmpty(this.bio)) return;

    Meteor.call('updateBio', this.bio, (err) => {
      if (err) return handleError(err);
      $state.go('tab.chats');
    });
  }

  function updateGender () {
    if (_.isEmpty(this.gender)) return;

    Meteor.call('updateGender', this.gender, (err) => {
      if (err) return handleError(err);
      $state.go('tab.chats');
    });
  }

  function updateAge () {
    if (_.isEmpty(this.age)) return;

    Meteor.call('updateAge', this.age, (err) => {
      if (err) return handleError(err);
      $state.go('tab.chats');
    });
  }

  // implementing controller methods that use camera-ui API to get image from device, and then run server method for updating the image
    function updatePicture () {
    MeteorCameraUI.getPicture({ width: 400, height: 400 }, function (err, data) {
     // what is this sorcery...
      if (err && err.error == 'cancel') {
        return;
      }

      if (err) {
        return handleError(err);
      }

      $ionicLoading.show({
        template: 'Updating picture...'
      });
      // calling data from the server method, receiving data back from server
      Meteor.call('updatePicture', data, (err) => {
        $ionicLoading.hide();
        handleError(err);
      });
    });
  }

  // function for updating user name, which is a server method. So, this must be added unto methods.js
  function updateName () {
    if (_.isEmpty(this.name)) return;

    Meteor.call('updateName', this.name, (err) => {
      if (err) return handleError(err);
      $state.go('tab.chats');
    });
  }

  function handleError (err) {
    $log.error('profile save error ', err);

    $ionicPopup.alert({
      title: err.reason || 'Save failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
