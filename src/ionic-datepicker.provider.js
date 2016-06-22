angular.module('ionic-datepicker.provider', [])

    .provider('ionicDatePicker', function () {

        var translation = {
            'default': {
                setLabel: 'Set',
                todayLabel: 'Today',
                closeLabel: 'Close',
                weeksList: ["S", "M", "T", "W", "T", "F", "S"],
                monthsList: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            }
        };
        translation.current = 'default';

        this.addLocale = function (locale, values) {
            // default can't be replaced - it is used as a fallback
            if (locale !== 'default') {
                translation[locale] = values;
            }
        };

        this.setLocale = function (locale) {
            if (translation[locale]) {
                translation.current = locale;
            }
        };

        this.getLocale = function () {
            return translation.current;
        };


        var config = {
            inputDate: new Date(),
            mondayFirst: true,
            templateType: 'popup',
            showTodayButton: false,
            closeOnSelect: false,
            disableWeekdays: []
        };

        this.configDatePicker = function (inputObj) {
            angular.extend(config, inputObj);
        };

        var me = this;

        this.$get = ['$rootScope', '$ionicPopup', '$ionicModal', 'IonicDatepickerService', function ($rootScope, $ionicPopup, $ionicModal, IonicDatepickerService) {

            var provider = {};

            var $scope = $rootScope.$new();
            $scope.today = resetHMSM(new Date()).getTime();
            $scope.disabledDates = [];

            $scope.translate = function (id) {
                if (!translation[translation.current][id]) {
                    if (!translation.default[id]) {
                        return id;
                    }
                    return translation.default[id];
                }
                return translation[translation.current][id];
            };

            provider.setLocale = me.setLocale;

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
                if ($scope.currentDate.getMonth() === 1) {
                    $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
                }
                $scope.currentDate.setMonth($scope.currentDate.getMonth() - 1);
                $scope.currentMonth = $scope.translate('monthsList')[$scope.currentDate.getMonth()];
                $scope.currentYear = $scope.currentDate.getFullYear();
                refreshDateList($scope.currentDate);
            };

            //Next month
            $scope.nextMonth = function () {
                if ($scope.currentDate.getMonth() === 11) {
                    $scope.currentDate.setFullYear($scope.currentDate.getFullYear());
                }
                $scope.currentDate.setDate(1);
                $scope.currentDate.setMonth($scope.currentDate.getMonth() + 1);
                $scope.currentMonth = $scope.translate('monthsList')[$scope.currentDate.getMonth()];
                $scope.currentYear = $scope.currentDate.getFullYear();
                refreshDateList($scope.currentDate);
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

                $scope.currentMonth = $scope.translate('monthsList')[currentDate.getMonth()];
                $scope.currentYear = currentDate.getFullYear().toString();
                $scope.currentMonthSelected = angular.copy($scope.currentMonth);
                $scope.currentYearSelected = angular.copy($scope.currentYear);
                $scope.numColumns = 7;
            }

            //Month changed
            $scope.monthChanged = function (month) {
                var monthNumber = $scope.translate('monthsList').indexOf(month);
                $scope.currentDate.setMonth(monthNumber);
                refreshDateList($scope.currentDate);
            };

            //Year changed
            $scope.yearChanged = function (year) {
                $scope.currentDate.setFullYear(year);
                refreshDateList($scope.currentDate);
            };


            $scope.getMonthsList = function () {
                var monthsList = $scope.translate('monthsList');
                return monthsList;
            };

            $scope.getWeeksList = function () {
                var weeksList = $scope.translate('weeksList');
                if ($scope.mainObj && $scope.mainObj.mondayFirst) {
                    weeksList.push(weeksList.splice(0, 1)[0]);
                }
                return weeksList;
            };

            //Setting up the initial object
            function setInitialObj(ipObj) {
                $scope.mainObj = angular.copy(ipObj);
                $scope.selctedDateEpoch = resetHMSM($scope.mainObj.inputDate).getTime();
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
                        text: $scope.translate('setLabel'),
                        type: 'button_set',
                        onTap: function (e) {
                            $scope.mainObj.callback($scope.selctedDateEpoch);
                        }
                    }];
                }

                if ($scope.mainObj.showTodayButton) {
                    buttons.push({
                        text: $scope.translate('todayLabel'),
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
                    text: $scope.translate('closeLabel'),
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
