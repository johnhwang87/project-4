angular
  .module('Project4')
  .config(config);

// routes below
function config($stateProvider, $urlRouterProvider){
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'client/templates/tabs.html',
      // limiting tab states using Meteor.user() and returns the user object only if user is logged in
      resolve: {
        user() {
          return Meteor.user();
        },
        // calling on the subscription in the client side
        chats() {
          return Meteor.subscribe('chats');
        }
      }
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
    })
    // route for loging
    .state('login', {
      url: '/login',
        templateUrl: 'client/templates/login.html',
        controller: 'LoginCtrl as logger'
    })
    // route for confirmation. Delete?
    .state('confirmation', {
      url: '/confirmation/:phone',
        templateUrl: 'client/templates/confirmation.html',
        controller: 'ConfirmationCtrl as confirmation'
    })
    // route for profile
    .state('profile', {
      url: '/profile',
        templateUrl: 'client/templates/profile.html',
        controller: 'ProfileCtrl as profile',
        // requirement for user to be logged in to see page
        resolve: {
          user() {
            return Meteor.user();
          }
        }
    })
    // adding review
    .state('tab.reviews', {
      url: '/reviews',
      views: {
        'tab-reviews': {
        templateUrl: 'client/templates/reviews.html',
        controller: 'ReviewsCtrl as reviews',
          }
        }
    })
    // adding logout feature
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'client/templates/settings.html',
          controller: 'SettingsCtrl as settings',
        }
      }
    });


    $urlRouterProvider.otherwise('login');
}
