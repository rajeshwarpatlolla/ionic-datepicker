angular.module('ionic-datepicker.provider', [])

  .provider('ionicDatePicker', function () {

    var config = {
      titleLabel: null,
      setLabel: 'Set',
      todayLabel: 'Today',
      closeLabel: 'Close',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      templateType: 'popup',
      showTodayButton: false,
      closeOnSelect: false,
      disableWeekdays: []
    };

    this.configDatePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    this.$get = ['$rootScope', '$ionicPopup', '$ionicModal', 'IonicDatepickerService', function ($rootScope, $ionicPopup, $ionicModal, IonicDatepickerService) {

      var provider = {};

      var $scope = $rootScope.$new();
      $scope.today = resetHMSM(new Date()).getTime();
      $scope.disabledDates = [];
      $scope.data = {};

      //Reset the hours, minutes, seconds and milli seconds
      function resetHMSM(currentDate) {
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);
        return currentDate;
      }

      //Previous month
      $scope.prevMonth = function () {
        var fromDateTmp = new Date($scope.fromDate);
        if ($scope.currentDate.getFullYear() <= fromDateTmp.getFullYear() &&
              $scope.currentDate.getMonth() <= fromDateTmp.getMonth()) return;
        var selectedDate = new Date($scope.selctedDateEpoch);
         var newDay = getAcceptableDay(selectedDate.getDate(),
             selectedDate.getMonth() - 1,
             selectedDate.getFullYear() - (selectedDate.getMonth() == 0 ? 1 : 0));
        $scope.currentDate = resetHMSM(new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() - 1, newDay));
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
        changeDaySelected();
      };

      //Next month
      $scope.nextMonth = function () {
        var toDateTmp = new Date($scope.toDate);
        if ($scope.currentDate.getFullYear() >= toDateTmp.getFullYear() &&
              $scope.currentDate.getMonth() >= toDateTmp.getMonth()) return;
        var selectedDate = new Date($scope.selctedDateEpoch);
        var newDay = getAcceptableDay(selectedDate.getDate(),
            selectedDate.getMonth() + 1,
            selectedDate.getFullYear() + (selectedDate.getMonth() == 11 ? 1 : 0));
        $scope.currentDate = resetHMSM(new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth() + 1, newDay));
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
        changeDaySelected();
      };

        //Get the acceptable day
        var getAcceptableDay = function(currentDay, newMonth, newYear) {
            var nbDaysInMonth = new Date(newYear, newMonth+1, 0).getDate();
            if(currentDay > nbDaysInMonth) {
                currentDay = nbDaysInMonth;
            }
            return currentDay;
        };

        var changeDaySelected = function() {
        $scope.selctedDateEpoch = resetHMSM(new Date($scope.currentDate.getFullYear(), $scope.currentDate.getMonth(), $scope.currentDate.getDate())).getTime();
      };

      //Date selected
      $scope.dateSelected = function (selectedDate) {
        if (!selectedDate || Object.keys(selectedDate).length === 0) return;
        $scope.selctedDateEpoch = selectedDate.epoch;
        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          if ($scope.mainObj.templateType.toLowerCase() == 'popup') {
            $scope.popup.close();
          } else {
            closeModal();
          }
        }
      };

      //Set today as date for the modal
      $scope.setIonicDatePickerTodayDate = function () {
        refreshDateList(new Date());
        $scope.selctedDateEpoch = resetHMSM(new Date()).getTime();
        if ($scope.mainObj.closeOnSelect) {
          $scope.mainObj.callback($scope.selctedDateEpoch);
          closeModal();
        }
      };

      //Set date for the modal
      $scope.setIonicDatePickerDate = function () {
        $scope.mainObj.callback($scope.selctedDateEpoch);
        closeModal();
      };

      //Setting the disabled dates list.
      function setDisabledDates(mainObj) {
        if (!mainObj.disabledDates || mainObj.disabledDates.length === 0) {
          $scope.disabledDates = [];
        } else {
          $scope.disabledDates = [];
          angular.forEach(mainObj.disabledDates, function (val, key) {
            val = resetHMSM(new Date(val));
            $scope.disabledDates.push(val.getTime());
          });
        }
      }

      //Refresh the list of the dates of a month
      function refreshDateList(currentDate) {
        currentDate = resetHMSM(currentDate);
        $scope.currentDate = angular.copy(currentDate);

        var firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDate();
        var lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

        $scope.monthsList = [];
        if ($scope.mainObj.monthsList && $scope.mainObj.monthsList.length === 12) {
          $scope.monthsList = $scope.mainObj.monthsList;
        } else {
          $scope.monthsList = IonicDatepickerService.monthsList;
        }

        $scope.yearsList = IonicDatepickerService.getYearsList($scope.mainObj.from, $scope.mainObj.to);

        $scope.dayList = [];

        var tempDate, disabled;
        $scope.firstDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
        $scope.lastDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();

        for (var i = firstDay; i <= lastDay; i++) {
          tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
          disabled = (tempDate.getTime() < $scope.fromDate) || (tempDate.getTime() > $scope.toDate) || $scope.mainObj.disableWeekdays.indexOf(tempDate.getDay()) >= 0;

          $scope.dayList.push({
            date: tempDate.getDate(),
            month: tempDate.getMonth(),
            year: tempDate.getFullYear(),
            day: tempDate.getDay(),
            epoch: tempDate.getTime(),
            disabled: disabled
          });
        }

        //To set Monday as the first day of the week.
        var firstDayMonday = $scope.dayList[0].day - $scope.mainObj.mondayFirst;
        firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

        for (var j = 0; j < firstDayMonday; j++) {
          $scope.dayList.unshift({});
        }

        $scope.rows = [0, 7, 14, 21, 28, 35];
        $scope.cols = [0, 1, 2, 3, 4, 5, 6];

        $scope.data.currentMonth = $scope.mainObj.monthsList[currentDate.getMonth()];
        $scope.data.currentYear = currentDate.getFullYear();
        $scope.data.currentMonthSelected = angular.copy($scope.data.currentMonth);
        $scope.currentYearSelected = angular.copy($scope.data.currentYear);
        $scope.numColumns = 7;
      }

      //Month changed
      $scope.monthChanged = function (month) {
        var monthNumber = $scope.monthsList.indexOf(month);
        var selectedDate = new Date($scope.selctedDateEpoch);
        var newDay = getAcceptableDay(selectedDate.getDate(),
            monthNumber,
            selectedDate.getFullYear());
        $scope.currentDate = resetHMSM(new Date($scope.currentDate.getFullYear(), monthNumber, newDay));
        refreshDateList($scope.currentDate);
        changeDaySelected();
      };

      //Year changed
      $scope.yearChanged = function (year) {
        var selectedDate = new Date($scope.selctedDateEpoch);
        var newDay = getAcceptableDay(selectedDate.getDate(),
            selectedDate.getMonth(),
            year);
        $scope.currentDate = resetHMSM(new Date(year, $scope.currentDate.getMonth(), newDay));
        refreshDateList($scope.currentDate);
        changeDaySelected();
      };

      //Setting up the initial object
      function setInitialObj(ipObj) {
        $scope.mainObj = angular.copy(ipObj);
        $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();

        if ($scope.mainObj.weeksList && $scope.mainObj.weeksList.length === 7) {
          $scope.weeksList = $scope.mainObj.weeksList;
        } else {
          $scope.weeksList = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        }
        if ($scope.mainObj.mondayFirst) {
          $scope.weeksList.push($scope.mainObj.weeksList.shift());
        }
        $scope.disableWeekdays = $scope.mainObj.disableWeekdays;

        refreshDateList($scope.mainObj.inputDate);
        setDisabledDates($scope.mainObj);
      }

      $ionicModal.fromTemplateUrl('ionic-datepicker-modal.html', {
        scope: $scope,
        animation: 'slide-in-up'
      }).then(function (modal) {
        $scope.modal = modal;
      });

      $scope.$on('$destroy', function () {
        $scope.modal.remove();
      });

      function openModal() {
        $scope.modal.show();
      }

      function closeModal() {
        $scope.modal.hide();
      }

      $scope.closeIonicDatePickerModal = function () {
        closeModal();
      };

      //Open datepicker popup
      provider.openDatePicker = function (ipObj) {
        var buttons = [];
        delete $scope.fromDate;
        delete $scope.toDate;

        $scope.mainObj = angular.extend({}, config, ipObj);
        if ($scope.mainObj.from) {
          $scope.fromDate = resetHMSM(new Date($scope.mainObj.from)).getTime();
        }
        if ($scope.mainObj.to) {
          $scope.toDate = resetHMSM(new Date($scope.mainObj.to)).getTime();
        }

        if (ipObj.disableWeekdays && config.disableWeekdays) {
          $scope.mainObj.disableWeekdays = ipObj.disableWeekdays.concat(config.disableWeekdays);
        }
        setInitialObj($scope.mainObj);

        if (!$scope.mainObj.closeOnSelect) {
          buttons = [{
            text: $scope.mainObj.setLabel,
            type: 'button_set',
            onTap: function (e) {
              $scope.mainObj.callback($scope.selctedDateEpoch);
            }
          }];
        }

        if ($scope.mainObj.showTodayButton) {
          buttons.push({
            text: $scope.mainObj.todayLabel,
            type: 'button_today',
            onTap: function (e) {
              var today = new Date();
              refreshDateList(new Date());
              $scope.selctedDateEpoch = resetHMSM(today).getTime();
              if (!$scope.mainObj.closeOnSelect) {
                e.preventDefault();
              }
            }
          });
        }

        buttons.push({
          text: $scope.mainObj.closeLabel,
          type: 'button_close',
          onTap: function (e) {
            console.log('ionic-datepicker popup closed.');
          }
        });

        if ($scope.mainObj.templateType.toLowerCase() == 'popup') {
          $scope.popup = $ionicPopup.show({
            templateUrl: 'ionic-datepicker-popup.html',
            scope: $scope,
            cssClass: 'ionic_datepicker_popup',
            buttons: buttons
          });
        } else {
          openModal();
        }
      };

      return provider;

    }];

  });
