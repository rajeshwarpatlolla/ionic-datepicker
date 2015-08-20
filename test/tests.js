describe('ionic datepicker app', function() {
  var $injector;
  var $rootScope;

  beforeEach(function(){
    module(
      'ionic',
      'ionic-datepicker'
    );

    inject(function(_$injector_, _$rootScope_){
      $injector = _$injector_;
      $rootScope = _$rootScope_;
    });
  });

  it('is setup', function() {
    expect(true).toBe(true);
  });
});