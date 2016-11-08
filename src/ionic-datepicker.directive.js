angular.module('ionic-datepicker.directive', [])

  .directive('datePicker', ['ionicDatePicker', 'IonicDatepickerService', function (ionicDatePicker, IonicDatepickerService) {
    var $scope = null;

    var config = {
      todayLabel: 'Today',
      inputDate: new Date(),
      mondayFirst: true,
      weeksList: ["S", "M", "T", "W", "T", "F", "S"],
      monthsList: ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"],
      showTodayButton: false,
      disableWeekdays: [],
      events: []
    };

    var configDatePicker = function (inputObj) {
      angular.extend(config, inputObj);
    };

    // Setting up the initial object
    function setInitialObj(ipObj) {
      $scope.mainObj = angular.copy(ipObj);
      $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();
      $scope.data.selctedDateEpoch = $scope.selctedDateEpoch;

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

    //Reset the hours, minutes, seconds and milli seconds
    function resetHMSM(currentDate) {
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);
      return currentDate;
    }

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

    function getEvent(index, eventsTimestamps, eventsContent) {
      eventsTimestamps = eventsTimestamps.splice(index, 1);
      var event = eventsContent[index];
      eventsContent = eventsContent.splice(index, 1);
      return event;
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
      $scope.eventList = [];

      var tempDate, disabled;
      $scope.firstDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), firstDay)).getTime();
      $scope.lastDayEpoch = resetHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth(), lastDay)).getTime();

      $scope.eventList = [];
      var hasEvents = false;
      var eventsTimestamps = [];
      var eventsContent = [];

      if ($scope.mainObj.events != null && $scope.mainObj.events.length > 0) {

        hasEvents = true;
        for (var i = 0; i < $scope.mainObj.events.length; i++) {
          var exists = false;
          var event = $scope.mainObj.events[i];

          eventsTimestamps.push(parseInt(event.date.getFullYear() + "" + event.date.getMonth() + "" + event.date.getDate()));
          eventsContent.push(event);

          for (var j = 0; j < $scope.eventList.length; j++) {
            if ($scope.eventList[j].type === event.type) {
              exists = true;
              break;
            }
          }

          if (exists) {
            continue;
          }

          $scope.eventList.push(event);

        }

      }

      for (var i = firstDay; i <= lastDay; i++) {
        tempDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), i);
        disabled = (tempDate.getTime() < $scope.fromDate) || (tempDate.getTime() > $scope.toDate) || $scope.mainObj.disableWeekdays.indexOf(tempDate.getDay()) >= 0;
        var _events = [];

        if (hasEvents) {
          var dateLong = parseInt(tempDate.getFullYear() + "" + tempDate.getMonth() + "" + tempDate.getDate());
          var index = -1;
          do {
            index = eventsTimestamps.indexOf(dateLong);
            if (index > -1) {
              var _event = getEvent(index, eventsTimestamps, eventsContent);
              if (_event.disabled) {
                disabled = true;
              }
              _events.push(_event);
            }
          } while (index > -1);
        }

        var dayList = {
          date: tempDate.getDate(),
          month: tempDate.getMonth(),
          year: tempDate.getFullYear(),
          day: tempDate.getDay(),
          epoch: tempDate.getTime(),
          disabled: disabled,
          eventList: _events
        };

        $scope.dayList.push(dayList);
      }

      //To set Monday as the first day of the week.
      var firstDayMonday = $scope.dayList[0].day - $scope.mainObj.mondayFirst;
      firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

      for (var j = 0; j < firstDayMonday; j++) {
        $scope.dayList.unshift({});
      }

      $scope.rows = [0, 7, 14, 21, 28, 35];
      $scope.cols = [0, 1, 2, 3, 4, 5, 6];

      $scope.hasValue = [];

      $scope.data.currentMonth = $scope.mainObj.monthsList[currentDate.getMonth()];
      $scope.data.currentYear = currentDate.getFullYear();
      $scope.data.currentMonthSelected = angular.copy($scope.data.currentMonth);
      $scope.currentYearSelected = angular.copy($scope.data.currentYear);
      $scope.numColumns = 7;

      for (var i = 0; i < $scope.rows.length; i++) {
        var hasValue = false;
        for (var j = 0; j < $scope.cols.length; j++) {
          var index = $scope.rows[i] + $scope.cols[j];
          if ($scope.dayList[index] !== undefined) {
            hasValue = true;
            break;
          }
        }
        $scope.hasValue.push(hasValue);
      }
    };

    function openDatePicker(ipObj) {
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
    };

    function link(scope, element, attrs) {

      $scope = scope;

      if (!scope.data) {
        scope.data = {};
      }

      configDatePicker(scope.data);

      scope.data.setEvents = function (events) {
        $scope.mainObj.events = events;
        refreshDateList($scope.currentDate);

        for (var i = 0; i < $scope.dayList.length; i++) {
          if ($scope.selctedDateEpoch === $scope.dayList[i].epoch) {
            scope.data.selectedEvents = $scope.dayList[i].eventList;
            break;
          }
        }
      };

      $scope.today = resetHMSM(new Date()).getTime();
      $scope.disabledDates = [];

      //Previous month
      scope.data.prevMonth = function () {
        if ($scope.currentDate.getMonth() === 1) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      };

      //Next month
      scope.data.nextMonth = function () {
        if ($scope.currentDate.getMonth() === 11) {
          $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
        }
        $scope.currentDate.setDate(1);
        $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
        $scope.data.currentMonth = $scope.mainObj.monthsList[$scope.currentDate.getMonth()];
        $scope.data.currentYear = $scope.currentDate.getFullYear();
        refreshDateList($scope.currentDate);
      };

      scope.data.selctedDateEpoch = $scope.selctedDateEpoch;

      //Date selected
      scope.dateSelected = function (selectedDate) {

        if (!selectedDate || Object.keys(selectedDate).length === 0) return;
        $scope.selctedDateEpoch = selectedDate.epoch;
        $scope.data.selctedDateEpoch = selectedDate.epoch;
        $scope.data.selectedEvents = selectedDate.eventList;

        if ($scope.data.dayChanged) {
          $scope.data.dayChanged($scope.selctedDateEpoch);
        }

        $scope.mainObj.callback($scope.selctedDateEpoch);
      };

      //Set today as date for the modal
      $scope.setIonicDatePickerTodayDate = function () {
        var today = new Date();
        refreshDateList(new Date());
        $scope.selctedDateEpoch = resetHMSM(today).getTime();
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

      //Month changed
      $scope.monthChanged = function (month) {
        var monthNumber = $scope.monthsList.indexOf(month);
        $scope.currentDate.setMonth(monthNumber);
        refreshDateList($scope.currentDate);
      };

      //Year changed
      $scope.yearChanged = function (year) {
        $scope.currentDate.setFullYear(year);
        refreshDateList($scope.currentDate);
      };

      openDatePicker(scope.data);
    };

    return {
      restrict: 'E',
      replace: true,
      scope: {
        data: '='
      },
      templateUrl: 'ionic-datepicker-inline.html',
      link: link
    }
  }]);
