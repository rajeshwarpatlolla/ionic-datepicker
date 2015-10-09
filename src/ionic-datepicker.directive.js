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
                //Setting the title, today, close and set strings for the date picker
                scope.titleLabel = scope.inputObj.titleLabel || 'Select Date';
                scope.subTitleLabel = scope.inputObj.subTitleLabel || '';
                scope.todayLabel = scope.inputObj.todayLabel || 'Today';
                scope.closeLabel = scope.inputObj.closeLabel || 'Close';
                scope.setLabel = scope.inputObj.setLabel || 'Set';
                scope.errorMsgLabel = scope.inputObj.errorMsgLabel || 'Please select a date.';
                scope.setButtonType = scope.inputObj.setButtonType || 'button-positive';
                scope.todayButtonType = scope.inputObj.todayButtonType || 'button-stable';
                scope.closeButtonType = scope.inputObj.closeButtonType || 'button-stable';
                scope.templateType = scope.inputObj.templateType || 'modal';
                scope.modalHeaderColor = scope.inputObj.modalHeaderColor || 'bar-stable';
                scope.modalFooterColor = scope.inputObj.modalFooterColor || 'bar-stable';

                //From and to dates are set to the provided values with a fallback to the min/max years which were prior to
                // this change returned by the default IonicDatepickerService.yearList.
                scope.enableDatesFrom = {
                    epoch: (scope.inputObj.from || new Date('January 1, 1900')).getTime()
                };
                scope.enableDatesFrom.epochDate = clearHMSM(new Date(scope.enableDatesFrom.epoch));

                scope.enableDatesTo = {
                    epoch: (scope.inputObj.to || new Date('December 31, 2100')).getTime()
                };
                scope.enableDatesTo.epochDate = clearHMSM(new Date(scope.enableDatesTo.epoch));

                //Setting the months list. This is useful, if the component needs to use some other language.
                if (scope.inputObj.monthList && scope.inputObj.monthList.length === 12) {
                    scope.fullMonthsList = scope.monthsList = scope.inputObj.monthList;
                } else {
                    scope.fullMonthsList = scope.monthsList = IonicDatepickerService.monthsList;
                }
                if (scope.inputObj.weekDaysList && scope.inputObj.weekDaysList.length === 7) {
                    scope.weekNames = scope.inputObj.weekDaysList;
                } else {
                    scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
                }
                //Setting the yearsList
                scope.yearsList = IonicDatepickerService.yearsList(scope.enableDatesFrom, scope.enableDatesTo);

                //Want to reverse the years in the select list? We do it here...
                scope.reverseTheYears = !!scope.inputObj.reverseTheYears;
                if (scope.reverseTheYears) {
                    scope.yearsList = scope.yearsList.slice().reverse();
                }

                //Setting whether to show Monday as the first day of the week or not.
                scope.mondayFirst = !!scope.inputObj.mondayFirst;

                //Setting the disabled dates list.
                scope.disabledDates = [];
                if (angular.isArray(scope.inputObj.disabledDates) && scope.inputObj.disabledDates.length > 0) {
                    angular.forEach(scope.inputObj.disabledDates, function (val) {
                        val = clearHMSM(val);
                        scope.disabledDates.push(val.getTime());
                    });
                }

                //Setting whether to show the Today button, defaults to true;
                scope.showTodayButton = angular.isDefined(scope.inputObj.showTodayButton) ? !!scope.inputObj.showTodayButton : true;

                //Setting the input date for the date picker
                if (scope.inputObj.inputDate) {
                    scope.ipDate = scope.inputObj.inputDate;
                } else {
                    scope.ipDate = new Date();
                }

                // Check whether the input date falls in range of the defined From and To dates
                if (scope.ipDate.getTime() < scope.enableDatesFrom.epoch) {
                    scope.ipDate = new Date(scope.enableDatesFrom.epoch); //input date earlier than allowed, set it to minimum allowed.
                } else if (scope.ipDate.getTime() > scope.enableDatesTo.epoch) {
                    scope.ipDate = new Date(scope.enableDatesTo.epoch); //input date later than allowed, set it to allowed maximum.
                }
                scope.selectedDateFull = scope.ipDate;

                var currentDate = clearHMSM(angular.copy(scope.ipDate));

                scope.selctedDateString = currentDate.toString();
                // set selctedDateStringCopy so the Initial/Input date gets visually selected in the day list as well
                scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);

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

                var refreshDateList = function (current_date) {

                    current_date = clearHMSM(current_date);
                    var lastDay = new Date(current_date.getFullYear(), current_date.getMonth() + 1, 0).getDate();

                    scope.dayList = [];

                    for (var i = 1; i <= lastDay; i++) {
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
                    firstDayMonday = (firstDayMonday < 0) ? 6 : firstDayMonday;

                    scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;
                    scope.currentMonthLastDayEpoch = scope.dayList[scope.dayList.length - 1].epochLocal;

                    for (var j = 0; j < firstDayMonday; j++) {
                        scope.dayList.unshift({});
                    }

                    scope.rows = [];
                    scope.cols = [];

                    scope.selctedDateString = current_date.toString();
                    scope.currentMonth = scope.fullMonthsList[current_date.getMonth()];
                    // scope.currentYear has to be a String value at this point and may not be numeric. This is because ngRepeat needs
                    // the model value to be in the list of values it iterates over. When no corresponding value is found, ngRepeat adds an
                    // empty option to the select, like so: <option value="? number: {{currentYear}}?"></option>. Which we offcourse do not want!
                    // As a number it supposedly cannot find the value in the array, when converted to a string, it does...
                    scope.currentYear = String(current_date.getFullYear());
                    scope.currentMonthSelected = scope.currentMonth;
                    scope.currentYearSelected = scope.currentYear;

                    scope.monthsList = buildMonthList(current_date);

                    scope.numColumns = 7;
                    scope.rows.length = 6;
                    scope.cols.length = scope.numColumns;

                    currentDate = clearHMSM(angular.copy(current_date));
                };

                scope.monthChanged = function (month) {
                    var monthNumber = scope.fullMonthsList.indexOf(month);
                    if (monthNumber < currentDate.getMonth()) { //moving backwards so check From Date.
                        var prevDate = clearHMSM(new Date(currentDate));
                        prevDate.setDate(1);
                        prevDate.setMonth(monthNumber);
                        if (earlierDateIsOk(prevDate)) {
                            refreshDateList(prevDate);
                        }
                        else {
                            refreshDateList(scope.enableDatesFrom.epochDate); // Since date transition is not allowed, reset the Dropdowns to first allowed date
                        }
                    } else { //it's not smaller, and because it changed, it must be bigger... so check the To date
                        // new Date with a 0 for the days will translate into the last day of the previous month. So add 1 month more than requested
                        // with day 0 and we end up with the last day of the desired month ;)
                        var nextDate = clearHMSM(new Date(currentDate.getFullYear(), monthNumber + 1, 0));
                        if (laterDateIsOk(nextDate)) {
                            refreshDateList(nextDate);
                        } else {
                            // Since date transition to a date outside the max range is not allowed, move to the last allowed month
                            refreshDateList(scope.enableDatesTo.epochDate);
                        }
                    }
                };

                scope.yearChanged = function (year) {
                    if (year < currentDate.getFullYear()) {
                        var prevDate = clearHMSM(new Date(currentDate));
                        prevDate.setDate(1);
                        prevDate.setFullYear(year);
                        if (earlierDateIsOk(prevDate)) {
                            refreshDateList(prevDate);
                        }
                        else {
                            refreshDateList(scope.enableDatesFrom.epochDate); // Since date transition is not allowed, reset the Dropdowns to the first allowed date
                        }
                    } else { //it's not smaller, and because it changed, it must be bigger... so check the To date
                        // new Date with a 0 for the days will translate into the last day of the previous month. So add 1 month more than requested
                        // with day 0 and we end up with the last day of the desired month ;)
                        var nextDate = clearHMSM(new Date(year, currentDate.getMonth() + 1, 0));
                        if (laterDateIsOk(nextDate)) {
                            refreshDateList(nextDate);
                        } else {
                            // Since date transition to a date outside the max range is not allowed, move to the last allowed month
                            refreshDateList(scope.enableDatesTo.epochDate);
                        }
                    }
                };

                scope.prevMonth = function () {
                    var prevDate = clearHMSM(new Date(currentDate));
                    prevDate.setDate(1);
                    prevDate.setMonth(prevDate.getMonth() - 1);
                    if (earlierDateIsOk(prevDate)) {
                        refreshDateList(prevDate);
                    }
                };

                scope.nextMonth = function () {
                    // new Date with a 0 for the days will translate into the last day of the previous month. So add 2 months with day 0 and we end up with the last day of the next month ;)
                    var nextDate = clearHMSM(new Date(currentDate.getFullYear(), currentDate.getMonth() + 2, 0));
                    if (laterDateIsOk(nextDate)) {
                        refreshDateList(nextDate);
                    }
                };

                scope.date_selection = {selected: true, selectedDate: scope.ipDate, submitted: false};

                scope.dateSelected = function (date) {
                    if (!date) return;
                    scope.selctedDateString = date.dateString;
                    scope.selctedDateStringCopy = angular.copy(scope.selctedDateString);
                    scope.date_selection.selected = true;
                    scope.date_selection.selectedDate = new Date(date.dateString);
                    scope.selectedDateFull = scope.date_selection.selectedDate;
                };

                //Called when the user clicks on any date.
                function dateSelected() {
                    scope.date_selection.submitted = true;
                    if (scope.date_selection.selected === true) {
                        scope.inputObj.callback(scope.date_selection.selectedDate);
                    }
                }

                function clearHMSM(inputDate) {
                    inputDate.setHours(0);
                    inputDate.setMinutes(0);
                    inputDate.setSeconds(0);
                    inputDate.setMilliseconds(0);
                    return inputDate;
                }

                function earlierDateIsOk(inputDate) {
                    // Check whether the input month is not smaller than the date the From (min) date
                    if (inputDate.getTime() < scope.enableDatesFrom.epoch) {
                        if (inputDate.getFullYear() < scope.enableDatesFrom.epochDate.getFullYear() || inputDate.getMonth() < scope.enableDatesFrom.epochDate.getMonth()) {
                            return false;
                        }
                    }
                    return true;
                }

                // Check whether the input month is not greater than the date the To (max) date
                function laterDateIsOk(inputDate) {
                    if (inputDate.getTime() > scope.enableDatesFrom.epoch) {
                        if (inputDate.getFullYear() > scope.enableDatesTo.epochDate.getFullYear() || (inputDate.getFullYear() === scope.enableDatesTo.epochDate.getFullYear() && inputDate.getMonth() > scope.enableDatesTo.epochDate.getMonth())) {
                            return false;
                        }
                    }
                    return true;
                }

                // build the available months list based on enabled dates
                function buildMonthList(inputDate) {
                    var result = [];
                    angular.forEach(scope.fullMonthsList, function (value, index) {
                        var checkDateFirst = new Date(inputDate);
                        checkDateFirst.setMonth(index);
                        checkDateFirst.setDate(1);
                        var checkDateLast = new Date(inputDate.getFullYear(), index + 1, 0);
                        if (earlierDateIsOk(checkDateFirst) && laterDateIsOk(checkDateLast)) {
                            this.push(value);
                        }
                    }, result);
                    return result;
                }

                //Called when the user clicks on the 'Today' button
                function todaySelected() {
                    var today = clearHMSM(new Date());
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
                    refreshDateList(today);
                }

                //Called when the user clicks on the 'Close' button of the modal
                scope.closeIonicDatePickerModal = function () {
                    scope.inputObj.callback(undefined);
                    scope.closeModal();
                };
                //Called when the user clicks on the 'Today' button of the modal
                scope.setIonicDatePickerTodayDate = function () {
                    todaySelected();
                };
                //Called when the user clicks on the Set' button of the modal
                scope.setIonicDatePickerDate = function () {
                    dateSelected();
                    scope.closeModal();
                };

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

                //Called when the user clicks on the button to invoke the 'ionic-datepicker'
                element.on("click", function () {
                    if (scope.date_selection.selectedDate) {
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
                        var buttons = [];
                        buttons.push({
                            text: scope.closeLabel,
                            type: scope.closeButtonType,
                            onTap: function () {
                                scope.inputObj.callback(undefined);
                            }
                        });
                        if (scope.showTodayButton) {
                            buttons.push({
                                text: scope.todayLabel,
                                type: scope.todayButtonType,
                                onTap: function (e) {
                                    todaySelected();
                                    e.preventDefault();
                                }
                            });
                        }
                        buttons.push({
                            text: scope.setLabel,
                            type: scope.setButtonType,
                            onTap: function () {
                                dateSelected();
                            }
                        });

                        $ionicPopup.show({
                            templateUrl: 'ionic-datepicker-popup.html',
                            title: scope.titleLabel,
                            subTitle: scope.subTitleLabel,
                            scope: scope,
                            buttons: buttons
                        });
                    }
                });
            }
        };
    }
})();
