//By Rajeshwar Patlolla
//https://github.com/rajeshwarpatlolla

"use strict";
var app = angular.module('ionic-datepicker', ['ionic', 'ionic-datepicker.templates']);

app.service('DatepickerService', function () {

  this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  this.yearsList = [1900,
    1901, 1902, 1903, 1904, 1905, 1906, 1907, 1908, 1909, 1910,
    1911, 1912, 1913, 1914, 1915, 1916, 1917, 1918, 1919, 1920,
    1921, 1922, 1923, 1924, 1925, 1926, 1927, 1928, 1929, 1930,
    1931, 1932, 1933, 1934, 1935, 1936, 1937, 1938, 1939, 1940,
    1941, 1942, 1943, 1944, 1945, 1946, 1947, 1948, 1949, 1950,
    1951, 1952, 1953, 1954, 1955, 1956, 1957, 1958, 1959, 1960,
    1961, 1962, 1963, 1964, 1965, 1966, 1967, 1968, 1969, 1970,
    1971, 1972, 1973, 1974, 1975, 1976, 1977, 1978, 1979, 1980,
    1981, 1982, 1983, 1984, 1985, 1986, 1987, 1988, 1989, 1990,
    1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999, 2000,
    2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030,
    2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039, 2040,
    2041, 2042, 2043, 2044, 2045, 2046, 2047, 2048, 2049, 2050,
    2051, 2052, 2053, 2054, 2055, 2056, 2057, 2058, 2059, 2060,
    2061, 2062, 2063, 2064, 2065, 2066, 2067, 2068, 2069, 2070,
    2071, 2072, 2073, 2074, 2075, 2076, 2077, 2078, 2079, 2080,
    2081, 2082, 2083, 2084, 2085, 2086, 2087, 2088, 2089, 2090,
    2091, 2092, 2093, 2094, 2095, 2096, 2097, 2098, 2099, 2100];

});

app.directive('ionicDatepicker', ['$ionicPopup', 'DatepickerService', function ($ionicPopup, DatepickerService) {
  return {
    restrict: 'AE',
    replace: true,
    scope: {
      ipDate: '=idate',
      disablePreviousDates: '=disablepreviousdates',
      mondayFirst: '=?mondayfirst',
      callback: '=callback'
    },
    link: function (scope, element, attrs) {

      var monthsList = DatepickerService.monthsList;
      scope.monthsList = monthsList;
      scope.yearsList = DatepickerService.yearsList;

      scope.currentMonth = '';
      scope.currentYear = '';

      if (!scope.ipDate) {
        scope.ipDate = new Date();
      }

      if(!angular.isDefined(scope.mondayFirst)||scope.mondayFirst=="false") {
        scope.mondayFirst=0;
      }else{
        scope.mondayFirst=1;
      }

      scope.previousDayEpoch = (+(new Date()) - 86400000);
      var currentDate = angular.copy(scope.ipDate);
      currentDate.setHours(0);
      currentDate.setMinutes(0);
      currentDate.setSeconds(0);
      currentDate.setMilliseconds(0);

      scope.selctedDateString = currentDate.toString();
      scope.weekNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
      if(scope.mondayFirst==1) {
        var lastWeekDay = scope.weekNames.shift();
        scope.weekNames.push(lastWeekDay);
      }
      scope.today = {};

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

        var firstDay = scope.dayList[0].day - scope.mondayFirst;

        scope.currentMonthFirstDayEpoch = scope.dayList[0].epochLocal;

        for (var j = 0; j < firstDay; j++) {
          scope.dayList.unshift({});
        }

        scope.rows = [];
        scope.cols = [];

        scope.currentMonth = monthsList[current_date.getMonth()];
        scope.currentYear = current_date.getFullYear();

        scope.numColumns = 7;
        scope.rows.length = 6;
        scope.cols.length = scope.numColumns;
      };

      scope.monthChanged = function (month) {
        var monthNumber = scope.monthsList.indexOf(month);
        currentDate.setMonth(monthNumber);
        refreshDateList(currentDate)
      };

      scope.yearChanged = function (year) {
        currentDate.setFullYear(year);
        refreshDateList(currentDate)
      };

      scope.prevMonth = function () {
        if (currentDate.getMonth() === 1) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() - 1);

        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();

        refreshDateList(currentDate)
      };

      scope.nextMonth = function () {
        if (currentDate.getMonth() === 11) {
          currentDate.setFullYear(currentDate.getFullYear());
        }
        currentDate.setMonth(currentDate.getMonth() + 1);

        scope.currentMonth = monthsList[currentDate.getMonth()];
        scope.currentYear = currentDate.getFullYear();

        refreshDateList(currentDate)
      };

      scope.date_selection = {selected: false, selectedDate: '', submitted: false};

      scope.dateSelected = function (date) {
        scope.selctedDateString = date.dateString;
        scope.date_selection.selected = true;
        scope.date_selection.selectedDate = new Date(date.dateString);
      };

      element.on("click", function () {
        if (!scope.ipDate) {
          var defaultDate = new Date();
          refreshDateList(defaultDate);
        } else {
          refreshDateList(angular.copy(scope.ipDate));
        }

        $ionicPopup.show({
          templateUrl: 'date-picker-modal.html',
          title: '<strong>Select Date</strong>',
          subTitle: '',
          scope: scope,
          buttons: [
            {
              text: 'Close',
              onTap: function (e) {
                scope.callback(undefined);
              }
            },
            {
              text: 'Today',
              onTap: function (e) {

                var today = new Date();
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
              text: 'Set',
              type: 'button-positive',
              onTap: function (e) {
                scope.date_selection.submitted = true;

                if (scope.date_selection.selected === true) {
                  scope.ipDate = angular.copy(scope.date_selection.selectedDate);
                  scope.callback(scope.ipDate);
                } else {
                  e.preventDefault();
                }
              }
            }
          ]
        })
      })
    }
  }
}]);