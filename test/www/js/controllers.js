angular.module('starter.controllers', [])

// Controleur general de l'application
  .controller('mainController', ['$scope', 'ionicDatePicker',
    function ($scope, ionicDatePicker) {

    $scope.options = {
      start : "sunday",
      style: "modal",
      range: "day",
      today: "not_today",
      close: "do_not_close"
    };

    $scope.openDatePicker = function() {
      var ipObj1 = {
        callback: function (val) {  //Mandatory
          console.debug("callback called");
          if(val.start) {
            $scope.datepicker1 = new Date(val.start) + " - " + new Date(val.end);
          } else {
            $scope.datepicker1 = new Date(val);
          }
        },
        mondayFirst: $scope.options.start == "monday",          //Optional
        closeOnSelect: $scope.options.close == "close",       //Optional
        templateType: $scope.options.style,       //Optional
        selectMode: $scope.options.range, //Optional
        showTodayButton: $scope.options.today == "today", //Optional
        from: new Date(2012, 0, 1), //Optional
        to: new Date(2018, 11, 31) //Optional
      };

      ionicDatePicker.openDatePicker(ipObj1);
    };
    }]);
