angular
  .module('Project4')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($scope, $reactive, $state) {
  // scope magic
  $reactive(this).attach($scope);

  this.logout = logout;
  // function to logg out the user.
  function logout() {
    Meteor.logout((err) => {
      if (!err) return;
      $state.go('/login');
    });
  }
}
