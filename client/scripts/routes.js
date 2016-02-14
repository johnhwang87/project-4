angular
  .module('Project4')
  .config(config);

// routes below
function config($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html'
    })
    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          // Connect the chats view to the ChatsCtrl
          templateUrl: 'client/templates/chats.html',
          controller: 'ChatsCtrl as chats'
        }
      }
    })
    // Route for Single Chat
    .state('tab.chat', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'client/templates/chat.html',
          // name to call in show pages
          controller: 'ChatCtrl as chat'
        }
      }
    });

    $urlRouterProvider.otherwise('tab/chats');
}
