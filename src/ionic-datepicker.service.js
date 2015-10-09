//By Rajeshwar Patlolla - rajeshwar.patlolla@gmail.com
//https://github.com/rajeshwarpatlolla

(function () {
    'use strict';

    angular.module('ionic-datepicker')
        .service('IonicDatepickerService', IonicDatepickerService);

    IonicDatepickerService.$inject = [];
    function IonicDatepickerService() {
        this.monthsList = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        this.yearsList = function (from, to) {
            var startYear = from.epochDate.getFullYear();
            var endYear = to.epochDate.getFullYear();
            var years = [];
            for (var i = startYear; i <= endYear; i++) {
                years.push(i);
            }
            return years;
        }
    }
})();
