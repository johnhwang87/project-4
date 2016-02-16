angular
  .module('Project4')
  .service('NewChat', NewChat);


  // $rootScope is a parent scope of all $scope and can be shared to all $scope
  function NewChat($rootScope, $ionicModal) {
    let templateUrl = 'client/templates/new-chat.html';

    this.showModal = showModal;
    this.hideModal = hideModal;


    // function for making the modal show
    function showModal () {
      this._scope = $rootScope.$new();

      $ionicModal.fromTemplateUrl(templateUrl, {
        scope: this._scope
      }).then((modal) => {
        this._modal = modal;
        modal.show();
      });
    }
    // function for hiding modal
    function hideModal () {
      this._scope.$destroy();
      this._modal.remove();
    }
  }
