angular
  .module('Project4')
  .service('NewReviews', NewReviews);

  function NewReviews($rootScope, $ionicModal) {
    let templateUrl = 'client/templates/new-reviews.html';

    this.showModal = showModal;
    this.hideModal = hideModal;

console.log('1234')
    function showModal () {
      this._scope = $rootScope.$new();

      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: this._scope
      }).then((modal) => {
        this._modal = modal;
        modal.show();
      });
    }
    function hideModal () {
      console.log('123')
      this._scope.$destroy();
      this._modal.remove();
    }
}


