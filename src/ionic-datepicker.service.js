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
      var toDate = to ? new Date(to) : new Date(maxYear, 11, 31, 23, 59, 59, 999);

      // if from and to have less than a year between each other
      if (fromDate.getFullYear() + 1 >= toDate.getFullYear()) {
        var fromMonth = fromDate.getMonth();
        var toMonth = toDate.getMonth();

        var minMonth = Math.min(fromMonth, toMonth);
        var maxMonth = Math.max(fromMonth, toMonth);

        // from is in a different year than to
        var betweenYears = toMonth <= fromMonth;

        // reset enabled months
        enabledMonths = [];
        
        // get enabled months
        for (var i = 0; i < 12; i++) {
          if(minMonth <= i && maxMonth >= i) {
            enabledMonths.push(!betweenYears);
          } else {
            enabledMonths.push(betweenYears);
          }
        }
      }

      return enabledMonths;
    }
  });