describe('ionic datepicker app', function() {
  var $injector;
  var $compile;
  var $rootScope;

  beforeEach(function(){
    module(
      'ionic',
      'ionic-datepicker'
    );

    inject(function(_$injector_, _$compile_, _$rootScope_){
      $injector = _$injector_;
      $compile = _$compile_;
      $rootScope = _$rootScope_;
    });
  });

  describe('Service: IonicDatepickerService', function() {
    var IonicDatepickerService;

    beforeEach(function(){
      IonicDatepickerService = $injector.get('IonicDatepickerService');
    });

    it('should have a default monthsList', function() {
      IonicDatepickerService.monthsList.length == 12;

      [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ].forEach(function(month){
        expect(IonicDatepickerService.monthsList).toContain(month);
      });

    });
  });

  describe('Directive: ionic-datepicker', function() {
    var template = [
      '<ionic-datepicker input-obj="datepickerObject">',
        '<button>{{datepickerObject.inputDate | date:"dd-MMMM-yyyy"}}</button>',
      '</ionic-datepicker>'
    ].join('');

    var el;

    beforeEach(function(){
      el = angular.element(template);
    });

    it('should throw if input-obj is not proper config object', function() {
      var boundCompile = compile.bind(null);
      expect(boundCompile).toThrow();
    });

    // xit == skip test
    xit('should throw if input-obj callback not supplied', function() {
      var scope = {datepickerObject: {}};
      var boundCompile = compile.bind(null, scope);

      expect(boundCompile).toThrow();
    });

    it('should compile when input-obj is proper config object (callback required)', function() {
      var scope = {datepickerObject: { callback: function (val) {} }};
      var boundCompile = compile.bind(null, scope);

      expect(boundCompile).not.toThrow();
    });

    it('should set template to modal by default', function() {
      var scope = {datepickerObject: {}};
      compile(scope);

      // this is how you get a handle to the directives scope
      var directiveScope = el.isolateScope();

      spyOn(directiveScope, 'openModal');
      el.triggerHandler('click');

      expect(directiveScope.openModal).toHaveBeenCalled();
    });

    it('should allow setting template to popup', function() {
      var $ionicPopup = $injector.get('$ionicPopup');
      spyOn($ionicPopup, 'show');

      var scope = {datepickerObject: {templateType: 'popup'}};
      compile(scope);

      el.triggerHandler('click');
      expect($ionicPopup.show).toHaveBeenCalled();
    });

    // TODO: Come up with better names, this is simply a placeholder 
    // for option/method reference

    xit('options: "from" date', function() {});
    xit('options: "to" date', function() {});
    xit('options: "inputDate" date', function() {});
    xit('options: "modayFirst" date', function() {});
    xit('options: "disabledDates" date', function() {});

    xit('method: "monthChanged" date', function() {});
    xit('method: "yearChanged" date', function() {});
    xit('method: "prevMonth" date', function() {});
    xit('method: "nextMonth" date', function() {});
    xit('method: "dateSelected" date', function() {});
    xit('method: "openModal" date', function() {});
    xit('method: "closeModal" date', function() {});
    xit('method: "closeIonicDatePickerModal" date', function() {});
    xit('method: "setIonicDatePickerTodayDate" date', function() {});
    xit('method: "setIonicDatePickerDate" date', function() {});

    // util for simplifying the directive compile step
    function compile(scopeProps){
      var scope = $rootScope.$new();
      angular.extend(scope, (scopeProps || {}))
      $compile(el)(scope);
    }
  });
});