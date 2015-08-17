//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function(){
  'use strict';

  angular.module('ionic-datepicker')
    .directive('ionicDatepicker',IonicDatepicker);

  IonicDatepicker.$inject = ['$ionicPopup', 'DatepickerService'];
  function IonicDatepicker($ionicPopup, DatepickerService){
    return {
      restrict: 'AE',
      replace: true,
      scope: {
        inputObj: "=inputObj"
      },
      link: function (scope, element, attrs) {

        scope.currentMonth = '';
        scope.currentYear = '';
        scope.disabledDates = [];

        //Setting the title, today, close and set strings for the date picker
        scope.titleLabel = scope.inputObj.titleLabel ? (scope.inputObj.titleLabel) : 'Select Date';
        scope.todayLabel = scope.inputObj.todayLabel ? (scope.inputObj.todayLabel) : 'Today';
        scope.closeLabel = scope.inputObj.closeLabel ? (scope.inputObj.closeLabel) : 'Close';
        scope.setLabel = scope.inputObj.setLabel ? (scope.inputObj.setLabel) : 'Set';
        scope.errorMsgLabel = scope.inputObj.errorMsgLabel ? (scope.inputObj.errorMsgLabel) : 'Please select a date.';
        scope.setButtonType = scope.inputObj.setButtonType ? (scope.inputObj.setButtonType) : 'button-positive';

        scope.enableDatesFrom = {epoch: 0, isSet: false};
        scope.enableDatesTo = {epoch: 0, isSet: false};

        //Setting the from and to dates
        if (scope.inputObj.from) {
          scope.enableDatesFrom.isSet = true;
          scope.enableDatesFrom.epoch = scope.inputObj.from.getTime();
        }

        if (scope.inputObj.to) {
          scope.enableDatesTo.isSet = true;
          scope.enableDatesTo.epoch = scope.inputObj.to.getTime();
        }

        //Setting the input date for the date picker
        if (scope.inputObj.inputDate) {
          scope.ipDate = scope.inputObj.inputDate;
        } else {
          scope.ipDate = new Date();
        }
        scope.selectedDateFull = scope.ipDate;

        //Setting the months list. This is useful, if the component needs to use some other language.
        var monthsList = [];
        if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
          monthsList = scope.inputObj.monthList;
        } else {
          monthsList = DatepickerService.monthsList;
        }
        scope.monthsList = monthsList;
        scope.yearsList = DatepickerService.yearsList;

        //Setting whether to show Monday as the first day of the week or not.
        if (scope.inputObj.mondayFirst) {
          scope.mondayFirst = true;
        } else {
          scope.mondayFirst = false;
        }

        //Setting the disabled dates list.
        if (scope.inputObj.disabledDates && scope.inputObj.disabledDates.length == 0) {
          scope.disabledDates = [];
        } else {
          angular.forEach(scope.inputObj.disabledDates, function (val, key) {
            val.setHours(0);
            val.setMinutes(0);
            val.setSeconds(0);
            val.setMilliseconds(0);

            scope.disabledDates.push(val.getTime());
          });
        }

        var currentDate = angular.copy(scope.ipDate);
        currentDate.setHours(0);
        currentDate.setMinutes(0);
        currentDate.setSeconds(0);
        currentDate.setMilliseconds(0);

        scope.selctedDateString = currentDate.toString();
        scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
        scope.today = {};

        if (scope.mondayFirst == true) {
          var lastWeekDay = scope.weekNames.shift();
          scope.weekNames.push(lastWeekDay);
        }

        var tempTodayObj = new Date();
        var tempToday = new Date(tempTodayObj.getFullYear(), tempTodayObj.getMonth(), tempTodayObj.getDate());

        scope.today = {
          dateObj: tempTodayObj,
          date: tempToday.getDate(),
          month: tempToday.getMonth(),
          year: tempToday.getFullYear(),
          day: tempToday.getDay(),
          dateString: tempToday.toString(),
          epochLocal: tempToday.getTime(),
          epochUTC: (tempToday.getTime() + (tempToday.getTimezoneOffset() * 60 * 1000))
        };

        var refreshDateList = function (current_date) {
          current_date.setHours(0);
          current_date.setMinutes(0);
          current_date.setSeconds(0);
          current_date.setMilliseconds(0);

          scope.selctedDateString = (new Date(current_date)).toString();
          currentDate = angular.copy(current_date);

          var firstDay = new Date(current_date.getFullYear(), current_date.getMonth(), 1).getDate();
          var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();

          scope.dayList = [];

          for (var i = firstDay; i <= lastDay; i++) {
            var tempDate = new Date(current_date.getFullYear(), current_date.getMonth(), i);
            scope.dayList.push({
              date: tempDate.getDate(),
              month: tempDate.getMonth(),
              year: tempDate.getFullYear(),
              day: tempDate.getDay(),
              dateString: tempDate.toString(),
              epochLocal: tempDate.getTime(),
              epochUTC: (tempDate.getTime() + (tempDate.getTimezoneOffset() * 60 * 1000))
            });
          }

          //To set Monday as the first day of the week.
          var firstDayMonday = scope.dayList[0].day - scope.mondayFirst;

          scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;
          scope.currentMonthLastDayEpoch = scope.dayList[scope.dayList.length - 1].epochLocal;

          for (var j = 0; j < firstDayMonday; j++) {
            scope.dayList.unshift({});
          }

          scope.rows = [];
          scope.cols = [];

          scope.currentMonth = monthsList[current_date.getMonth()];
          scope.currentYear = current_date.getFullYear();
          scope.currentMonthSelected = scope.currentMonth;
          scope.currentYearSelected = scope.currentYear;

          scope.numColumns = 7;
          scope.rows.length = 6;
          scope.cols.length = scope.numColumns;
        };

        scope.monthChanged = function (month) {
          var monthNumber = scope.monthsList.indexOf(month);
          currentDate.setMonth(monthNumber);
          refreshDateList(currentDate);
        };

        scope.yearChanged = function (year) {
          currentDate.setFullYear(year);
          refreshDateList(currentDate);
        };

        scope.prevMonth = function () {
          if (currentDate.getMonth() === 1) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() - 1);

          scope.currentMonth = monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();

          refreshDateList(currentDate);
        };

        scope.nextMonth = function () {
          if (currentDate.getMonth() === 11) {
            currentDate.setFullYear(currentDate.getFullYear());
          }
          currentDate.setMonth(currentDate.getMonth() + 1);
          scope.currentMonth = monthsList[currentDate.getMonth()];
          scope.currentYear = currentDate.getFullYear();
          refreshDateList(currentDate);
        };

        scope.date_selection = {selected: false, selectedDate: '', submitted: false};
        scope.date_selection.selected = true;
        scope.date_selection.selectedDate = scope.ipDate;

        scope.dateSelected = function (date) {
          scope.selctedDateString = date.dateString;
          scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
          scope.date_selection.selected = true;
          scope.date_selection.selectedDate = new Date(date.dateString);
          scope.selectedDateFull = scope.date_selection.selectedDate;
        };

        element.on("click", function () {
          if (!scope.ipDate) {
            var defaultDate = new Date();
            refreshDateList(defaultDate);
          } else {
            refreshDateList(angular.copy(scope.ipDate));
          }

          $ionicPopup.show({
            templateUrl: 'lib/ionic-datepicker/src/date-picker-modal.html',
            title: scope.titleLabel,
            subTitle: '',
            scope: scope,
            buttons: [
              {
                text: scope.closeLabel,
                onTap: function (e) {
                  scope.inputObj.callback(undefined);
                }
              },
              {
                text: scope.todayLabel,
                onTap: function (e) {

                  var today = new Date();
                  today.setHours(0);
                  today.setMinutes(0);
                  today.setSeconds(0);
                  today.setMilliseconds(0);

                  var tempEpoch = new Date(today.getFullYear(), today.getMonth(), today.getDate());
                  var todayObj = {
                    date: today.getDate(),
                    month: today.getMonth(),
                    year: today.getFullYear(),
                    day: today.getDay(),
                    dateString: today.toString(),
                    epochLocal: tempEpoch.getTime(),
                    epochUTC: (tempEpoch.getTime() + (tempEpoch.getTimezoneOffset() * 60 * 1000))
                  };

                  scope.selctedDateString = todayObj.dateString;
                  scope.date_selection.selected = true;
                  scope.date_selection.selectedDate = new Date(todayObj.dateString);
                  refreshDateList(new Date());
                  e.preventDefault();
                }
              },
              {
                text: scope.setLabel,
                type: scope.setButtonType,
                onTap: function (e) {
                  scope.date_selection.submitted = true;

                  if (scope.date_selection.selected === true) {
                    scope.inputObj.callback(scope.date_selection.selectedDate);
                  } else {
                    e.preventDefault();
                  }
                }
              }
            ]
          });
        });
      }
    };
  }

})();