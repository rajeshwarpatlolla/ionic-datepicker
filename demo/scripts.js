angular.module('starter', [
  'ionic',
  'ionic-datepicker',
  'starter.controllers'
]);

angular.module('starter')

  .config(function ($ionicConfigProvider, ionicDatePickerProvider) {

    var datePickerObj = {
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      mondayFirst: false,
      inputDate: new Date(),
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: true,
      dateFormat: 'dd MMM yyyy',
      closeOnSelect: false,
      disableWeekdays: [6],
      from: new Date(2015, 8, 1),
      to: new Date(2016, 1, 10)
    };

    ionicDatePickerProvider.configDatePicker(datePickerObj);

    $ionicConfigProvider.tabs.position('bottom');

  });

angular.module('starter')

	.run(function ($ionicPlatform) {
		$ionicPlatform.ready(function () {
		  // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
		  // for form inputs)
		  if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
		    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
		    cordova.plugins.Keyboard.disableScroll(true);

		  }
		  if (window.StatusBar) {
		    // org.apache.cordova.statusbar required
		    StatusBar.styleDefault();
		  }
		});
	});

angular.module('starter')

  .config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('tab', {
        url: '/tab',
        abstract: true,
        templateUrl: 'tabs.html'
      })
      .state('tab.home', {
        url: '/home',
        views: {
          'tab-home': {
            templateUrl: 'datepicker.html',
            controller: 'HomeCtrl'
          }
        }
      });

    $urlRouterProvider.otherwise('/tab/home');

  });

angular.module('starter.controllers', [])

  .controller('HomeCtrl', function ($scope, ionicDatePicker) {

    $scope.selectedDate1;
    $scope.selectedDate2;

    $scope.openDatePickerOne = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker popup is : ' + val, new Date(val));
          $scope.selectedDate1 = new Date(val);
        },
        disabledDates: [
          new Date(2016, 2, 16),
          new Date(2015, 3, 16),
          new Date(2015, 4, 16),
          new Date(2015, 5, 16),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-16-2016"),
          new Date(1439676000000)
        ],
        from: new Date(2016, 6, 1),
        to: new Date(2017, 1, 10),
        inputDate: new Date(),
        mondayFirst: true,
        disableWeekdays: [0],
        closeOnSelect: false,
        templateType: 'popup'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    };

    $scope.openDatePickerTwo = function (val) {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.log('Return value from the datepicker modal is : ' + val, new Date(val));
          $scope.selectedDate2 = new Date(val);
        },
        disabledDates: [
          new Date(1437719836326),
          new Date(2016, 1, 25),
          new Date(2015, 7, 10),
          new Date('Wednesday, August 12, 2015'),
          new Date("08-14-2015"),
          new Date(1439676000000),
          new Date(1456511400000)
        ],
        from: new Date(2016, 6, 1),
        to: new Date(2017, 1, 10),
        inputDate: new Date(),
        mondayFirst: true,
        showTodayButton: false,
        closeOnSelect: false,
        templateType: 'modal'
      };
      ionicDatePicker.openDatePicker(ipObj1);
    }
  });

