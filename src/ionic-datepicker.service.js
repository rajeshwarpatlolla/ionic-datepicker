angular.module('ionic-datepicker.service', [])

  .service('IonicDatepickerService', function () {

    this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    this.getYearsList = function (from, to) {
      var yearsList = [];
      var minYear = 1900;
      var maxYear = 2100;

      minYear = from ? new Date(from).getFullYear() : minYear;
      maxYear = to ? new Date(to).getFullYear() : maxYear;

      for (var i = minYear; i <= maxYear; i++) {
        yearsList.push(i.toString());
      }

      return yearsList;
    };

    this.getEnabledMonths = function(from, to) {
      var enabledMonths = [true, true, true, true, true, true, true, true, true, true, true, true];
      var fromDate = from ? new Date(from) : new Date(minYear, 0, 1);
      var toDate = to ? new Date(to) : new Date(maxYear, 11, 31);

      // if from and to have less than a year between each other
      if (fromDate.setMonth(fromDate.getMonth() + 12) > toDate) {
        // reset fromDate and enabled months
        fromDate = from ? new Date(from) : new Date(minYear, 0, 1);
        enabledMonths = [];
        
        // get enabled months
        for (var i = 0; i < 12; i++) {
          // aux dates
          // first date of first month
          var monthA = new Date(fromDate.getFullYear(), i, 1);
          // last minute of last day of last mont
          var monthB = new Date(toDate.getFullYear(), i, 0, 23, 59, 59, 999);

          if (monthA >= fromDate || monthB <= toDate) {
            enabledMonths.push(true);
          } else {
            enabledMonths.push(false);
          }
        }
      }

      return enabledMonths;
    }
  });
