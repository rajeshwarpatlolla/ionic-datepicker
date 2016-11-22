angular.module('starter')

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'app/templates/tabs.html'
      })
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'app/templates/tab-home.html',
            controller: 'HomeCtrl'
          }
        }
      })
      .state('tab.list', {
        url: '/list',
        views: {
          'tab-list': {
            templateUrl: 'app/templates/tab-list.html',
            controller: 'ListCtrl'
          }
        }
      })
      .state('tab.contact', {
        url: '/contact',
        views: {
          'tab-contact': {
            templateUrl: 'app/templates/tab-contact.html',
            controller: 'ContactCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/home');

  });
