//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function () {
    'use strict';

    angular.module('ionic-datepicker')
        .directive('ionicDatepicker', IonicDatepicker);

    IonicDatepicker.$inject = ['$ionicPopup', '$ionicModal', 'IonicDatepickerService'];

    function IonicDatepicker($ionicPopup, $ionicModal, IonicDatepickerService) {
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
                scope.showTodayButton = scope.inputObj.showTodayButton ? (scope.inputObj.showTodayButton) : 'true';
                scope.errorMsgLabel = scope.inputObj.errorMsgLabel ? (scope.inputObj.errorMsgLabel) : 'Please select a date.';
                scope.setButtonType = scope.inputObj.setButtonType ? (scope.inputObj.setButtonType) : 'button-stable cal-button';
                scope.todayButtonType = scope.inputObj.todayButtonType ? (scope.inputObj.todayButtonType) : 'button-stable cal-button';
                scope.closeButtonType = scope.inputObj.closeButtonType ? (scope.inputObj.closeButtonType) : 'button-stabl cal-buttone';
                scope.templateType = scope.inputObj.templateType ? (scope.inputObj.templateType) : 'popup';
                scope.modalHeaderColor = scope.inputObj.modalHeaderColor ? (scope.inputObj.modalHeaderColor) : 'bar-stable';
                scope.modalFooterColor = scope.inputObj.modalFooterColor ? (scope.inputObj.modalFooterColor) : 'bar-stable';
               scope.showClear = scope.inputObj.showClear ? (scope.inputObj.showClear) : false;
                scope.clearLabel = scope.inputObj.clearLabel ? (scope.inputObj.clearLabel) : 'Clear';
                scope.clearButtonType = scope.inputObj.clearButtonType ? (scope.inputObj.clearButtonType) : 'button-stable cal-button';
               scope.dateFormat = scope.inputObj.dateFormat ? (scope.inputObj.dateFormat) : 'dd-MM-yyyy';
                scope.closeOnSelect = scope.inputObj.closeOnSelect ? (scope.inputObj.closeOnSelect) : false;

                scope.enableDatesFrom = {
                    epoch: 0,
                    isSet: false
                };
                scope.enableDatesTo = {
                    epoch: 0,
                    isSet: false
                };

                // creating buttons
                var buttons = [];
                buttons.push({
                    text: scope.closeLabel,
                    type: scope.closeButtonType,
                    onTap: function (e) {
                        scope.inputObj.callback(undefined);
                    }
                });

                if (scope.showClear) {
                    buttons.push({
                        text: scope.clearLabel,
                        type: scope.clearButtonType,
                        onTap: function (e) {
                            dateCleared();
                        }
                    });
                };

                if (scope.showTodayButton == 'true') {
                    buttons.push({
                        text: scope.todayLabel,
                        type: scope.todayButtonType,
                        onTap: function (e) {
                            todaySelected();
                            //e.preventDefault();
                        }
                    });
                }

                if (!scope.closeOnSelect) {
                    buttons.push({
                        text: scope.setLabel,
                        type: scope.setButtonType,
                        onTap: function () {
                            dateSelected();
                        }
                    });
                }
                //Setting the from and to dates - Function used to enable/disable prv/future dates
                var setToFrom = function () {
                    scope.prevMonthDisable = false;
                    scope.nextMonthDisable = false;
                    if (scope.inputObj.from) {
                        scope.enableDatesFrom.isSet = true;
                        scope.enableDatesFrom.epoch = scope.inputObj.from.getTime();
                        if (scope.enableDatesFrom.epoch > scope.currentMonthFirstDayEpoch) {
                            scope.prevMonthDisable = true;
                    }
                    }

                    if (scope.inputObj.to) {
                        scope.enableDatesTo.isSet = true;
                        scope.enableDatesTo.epoch = scope.inputObj.to.getTime();
                        if (scope.enableDatesTo.epoch < scope.currentMonthLastDayEpoch) {
                            scope.nextMonthDisable = true;
                        }
                    }
                };

                setToFrom();

                //Setting the input date for the date picker
                if (scope.inputObj.inputDate) {
                    scope.ipDate = new Date(scope.inputObj.inputDate.getFullYear(), scope.inputObj.inputDate.getMonth(), scope.inputObj.inputDate.getDate());
                } else {
                    scope.ipDate = new Date();
                }
                scope.selectedDateFull = scope.ipDate;

                //Setting the months list. This is useful, if the component needs to use some other language.
                scope.monthsList = [];
                if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
                    scope.monthsList = scope.inputObj.monthList;
                } else {
                    scope.monthsList = IonicDatepickerService.monthsList;
                }
                if (scope.inputObj.weekDaysList && scope.inputObj.weekDaysList.length === 7) {
                    scope.weekNames = scope.inputObj.weekDaysList;
                } else {
                    scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                }
                scope.yearsList = IonicDatepickerService.getYearsList(scope.inputObj.from, scope.inputObj.to);

                //Setting whether to show Monday as the first day of the week or not.
                if (scope.inputObj.mondayFirst) {
                    scope.mondayFirst = true;
                } else {
                    scope.mondayFirst = false;
                }

                //Setting the disabled dates list.
                if (scope.inputObj.disabledDates && scope.inputObj.disabledDates.length === 0) {
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
                scope.today = {};

                if (scope.mondayFirst === true) {
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
                var checkDateIsDisabled = function (date) {
                    var epochLocal = date.getTime();
                    return ((scope.disabledDates.indexOf(epochLocal) > -1) || (scope.enableDatesFrom.isSet && scope.enableDatesFrom.epoch > epochLocal) || (scope.enableDatesTo.isSet && scope.enableDatesTo.epoch < epochLocal));
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

                    scope.currentMonthFirstDayEpoch = new Date(current_date.getFullYear(), current_date.getMonth(), firstDay).getTime();
                    scope.currentMonthLastDayEpoch = new Date(current_date.getFullYear(), current_date.getMonth(), lastDay).getTime();
                    setToFrom();
                    scope.dayList = [];

                    for (var i = firstDay; i <= lastDay; i++) {
                        var tempDate = new Date(current_date.getFullYear(), current_date.getMonth(), i);
                        var dateDisabled = checkDateIsDisabled(tempDate);
                        scope.dayList.push({
                            date: tempDate.getDate(),
                            month: tempDate.getMonth(),
                            year: tempDate.getFullYear(),
                            day: tempDate.getDay(),
                            dateString: tempDate.toString(),
                             dateDisabled: dateDisabled
                        });
                        if (tempDate.getDate() == current_date.getDate()) {
                            scope.dateSelected(scope.dayList[scope.dayList.length - 1]);
                        };
                    }

                    //To set Monday as the first day of the week.
                    var firstDayMonday = scope.dayList[0].day - scope.mondayFirst;
                    firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;



                    for (var j = 0; j < firstDayMonday; j++) {
                        scope.dayList.unshift({});
                    }

                    scope.rows = [0, 7, 14, 21, 28, 35];
                    scope.cols = [0, 1, 2, 3, 4, 5, 6];

                    scope.currentMonth = scope.monthsList[current_date.getMonth()];
                    scope.currentYear = current_date.getFullYear();
                    scope.currentMonthSelected = scope.currentMonth;
                    scope.currentYearSelected = scope.currentYear;

                    scope.numColumns = 7;
                    //scope.rows.length = 6;
                    //scope.cols.length = scope.numColumns;

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

                    scope.currentMonth = scope.monthsList[currentDate.getMonth()];
                    scope.currentYear = currentDate.getFullYear();

                    refreshDateList(currentDate);
                };

                scope.nextMonth = function () {
                    if (currentDate.getMonth() === 11) {
                        currentDate.setFullYear(currentDate.getFullYear());
                    }
                    currentDate.setDate(1);
                    currentDate.setMonth(currentDate.getMonth() + 1);
                    scope.currentMonth = scope.monthsList[currentDate.getMonth()];
                    scope.currentYear = currentDate.getFullYear();
                    refreshDateList(currentDate);
                };

                scope.date_selection = {
                    selected: false,
                    selectedDate: '',
                    submitted: false
                };
                scope.date_selection.selected = true;
                scope.date_selection.selectedDate = scope.ipDate;

                scope.dateSelected = function (date) {
                    if (!date || Object.keys(date).length === 0) return;
                    scope.selctedDateString = date.dateString;
                    scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
                    scope.date_selection.selected = true;
                    scope.date_selection.selectedDate = new Date(date.dateString);
                    scope.selectedDateFull = scope.date_selection.selectedDate;
                };

                var selectedInputDateObject = {
                    dateObj: scope.ipDate,
                    date: scope.ipDate.getDate(),
                    month: scope.ipDate.getMonth(),
                    year: scope.ipDate.getFullYear(),
                    day: scope.ipDate.getDay(),
                    dateString: scope.ipDate.toString(),
                    epochLocal: scope.ipDate.getTime(),
                    epochUTC: (scope.ipDate.getTime() + (scope.ipDate.getTimezoneOffset() * 60 * 1000))
                };
                scope.dateSelected(selectedInputDateObject);

                // Watch for selected date change
                scope.$watch('date_selection.selectedDate', function (newVal, oldVal) {
                    // Close modal/popup if date selected
                    if (scope.closeOnSelect) {

                        dateSelected();

                        if (scope.templateType.toLowerCase() === 'modal') {
                            scope.closeModal();
                        } else {
                            scope.popup.close();
                        }
                    }
                });

                //Called when the user clicks on any date.
                function dateCleared() {
                    scope.date_selection.submitted = true;
                    scope.selctedDateString = "";
                    scope.selctedDateStringCopy = "";
                    scope.date_selection.selected = false;
                    scope.date_selection.selectedDate = undefined;
                    scope.selectedDateFull = undefined;
                    scope.inputObj.inputDate = undefined;
                    scope.inputObj.callback(undefined);
                    // Please handle null/undefined condition in call back
                }
                //Called when the user clicks on any date.
                function dateSelected() {
                    scope.date_selection.submitted = true;
                    if (scope.date_selection.selected === true) {
                        // This will prevent setting disabled dates... although it closes popup
                        var outSideToFrom = false;
                        if (scope.inputObj.from && scope.inputObj.from > scope.date_selection.selectedDate) {
                            outSideToFrom = true;
                        };
                        if (scope.inputObj.to && scope.inputObj.to < scope.date_selection.selectedDate) {
                            outSideToFrom = true
                        };
                        if (outSideToFrom == true) {
                            scope.inputObj.callback(undefined);
                        } else {
                        scope.inputObj.callback(scope.date_selection.selectedDate);
                    }
                }
                }

                //Called when the user clicks on the 'Today' button
                function todaySelected() {
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
                    scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
                    scope.date_selection.selected = true;
                    scope.date_selection.selectedDate = new Date(todayObj.dateString);
                    dateSelected(); //Close popup after today selected...don't wait for set to be clicked
                    // scope.setIonicDatePickerDate();
                    //refreshDateList(new Date());
                }

                //Called when the user clicks on the 'Close' button of the modal
                scope.closeIonicDatePickerModal = function () {
                    scope.inputObj.callback(undefined);
                    scope.closeModal();
                };
                //Called when the user clicks on the 'Clear' button of the modal
                scope.clearIonicDatePickerModal = function () {
                    dateCleared();
                    scope.closeModal();
                };
                //Called when the user clicks on the 'Today' button of the modal
                scope.setIonicDatePickerTodayDate = function () {
                    //scope.inputObj.callback(undefined);
                    todaySelected();
                    scope.closeModal();
                };
                //Called when the user clicks on the Set' button of the modal
                scope.setIonicDatePickerDate = function () {
                    dateSelected();
                    scope.closeModal();
                };

                if (scope.templateType.toLowerCase() === 'modal') {
                //Getting the reference for the 'ionic-datepicker' modal.
                $ionicModal.fromTemplateUrl('ionic-datepicker-modal.html', {
                    scope: scope,
                    animation: 'slide-in-up'
                }).then(function (modal) {
                    scope.modal = modal;
                });
                scope.openModal = function () {
                    scope.modal.show();
                };

                scope.closeModal = function () {
                    scope.modal.hide();
                };

                }
                //Called when the user clicks on the button to invoke the 'ionic-datepicker'
                element.on("click", function () {
                    //This code is added to set passed date from datepickerObject
                    if (scope.inputObj.inputDate) {
                        refreshDateList(scope.inputObj.inputDate);
                    } else if (scope.date_selection.selectedDate) {
                        refreshDateList(scope.date_selection.selectedDate);
                    } else if (scope.ipDate) {
                        refreshDateList(angular.copy(scope.ipDate));
                    } else {
                        refreshDateList(new Date());
                    }
                    if (scope.templateType.toLowerCase() === 'modal') {
                        scope.openModal();
                    } else {
                        //Getting the reference for the 'ionic-datepicker' popup.
                        scope.popup = $ionicPopup.show({
                            templateUrl: 'ionic-datepicker-popup.html',
                            title: scope.titleLabel,
                            subTitle: '',
                            cssClass:'picker-body',
                            scope: scope,
                            buttons: buttons
                        });
                    }
                });
            }
        };
    }

})();