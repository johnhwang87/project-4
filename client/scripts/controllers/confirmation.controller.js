angular
  .module('Project4')
  .controller('ConfirmationCtrl', ConfirmationCtrl);


function ConfirmationCtrl($scope, $reactive, $state, $ionicPopup, $log) {
  $reactive(this).attach($scope);

  this.phone = $state.params.phone;
  this.confirm = confirm;

  // adding confirmation for the pin. if accepted, leads to profile page
  function confirm() {
    // Accounts.phoneVerificationMasterCode('1234');
    if (_.isEmpty(this.code)) return;
    Accounts.verifyPhone(this.phone, this.code, function (err) {
      if (err) return handleError(err);
      $state.go('profile');
    });
  }
//  give out error if verification fails
  function handleError(err) {
    $log.error('Verification error ', err);

    $ionicPopup.alert({
      title: err.reason || 'Verification failed',
      template: 'Please try again',
      okType: 'button-positive button-clear'
    });
  }
}
