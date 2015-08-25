##Introduction:

This is an `ionic-datepicker` bower component, which can be used in any Ionic framework's application. No additional plugins required for this component.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

* node.js
* npm
* bower
* gulp

##How to use:

1) In your project repository install the ionic-datepicker using bower

`bower install ionic-datepicker --save`

This will install the latest version released.

2) Give the path of  `ionic-datepicker.bundle.min.js` in your `index.html` file.

````html
<!-- path to ionic/angularjs -->
<script src="lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js"></script>
````

3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-datepicker']){
//
}
````

4) Use the below format in your template's corresponding controller

````javascript
    $scope.datepickerObject = {
      titleLabel: 'Title',	//Optional
      todayLabel: 'Today',	//Optional
      closeLabel: 'Close',	//Optional
      setLabel: 'Set',	//Optional
      setButtonType : 'button-assertive',  //Optional
      todayButtonType : 'button-assertive',  //Optional
      closeButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),	//Optional
      mondayFirst: true,	//Optional
      disabledDates: disabledDates,	//Optional
      weekDaysList: weekDaysList,	//Optional
      monthList: monthList,	//Optional
      templateType: 'popup', //Optional
      modalHeaderColor: 'bar-positive', //Optional
      modalFooterColor: 'bar-positive', //Optional
      from: new Date(2012, 8, 2),	//Optional
      to: new Date(2018, 8, 25),	//Optional
      callback: function (val) {	//Mandatory
        datePickerCallback(val);
      }
    };
````

**$scope.datepickerObject** is the main object, that we need to pass to the directive. The properties of this object are as follows.

**a) titleLabel**(Optional) : The label for 'Title' of the ionic-datepicker popup. Default value is `Select Date`

**b) todayLabel**(Optional) : The label for `Today` button. Default value is `Today`

**c) closeLabel**(Optional) : The label for `Close` button. Default value is `Close`

**d) setLabel**(Optional) : The label for `Set` button. Default value is `Set`

**e) setButtonType**(Optional) : This the type of the `Set` button. Default value is `button-positive`. You can give any valid ionic framework's button classes.

**f) todayButtonType**(Optional) : This the type of the `Today` button. Default value is `button-stable`. You can give any valid ionic framework's button classes.

**g) closeButtonType**(Optional) : This the type of the `Close` button. Default value is `button-stable`. You can give any valid ionic framework's button classes.

**h) inputDate**(Optional) : This is the date object to pass to the directive. You can give any date object to this property. Default value is `new Date()`. But if you wish to show the initial date in the HTML page, then you should define this property. 

**i) mondayFirst**(Optional) : Set `true` if you wish to show monday as the first day. Default value is `false`.

**j) disabledDates**(Optional) : If you have a list of dates to disable, you can create an array like below. Default value is an empty array.
````javascript
var disabledDates = [
      new Date(1437719836326),
      new Date(),
      new Date(2015, 7, 10), //months are 0-based, this is August, 10th!
      new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
      new Date("08-14-2015"), //Short format
      new Date(1439676000000) //UNIX format
    ];
````

**k) weekDaysList**(Optional) : This is an array with a list of all week days. You can use this if you want to show months in some other language or format or if you wish to use the modal instead of the popup for this component (Refer to point **l**), you can define the `weekDaysList` array in your controller as shown below.
 ````javascript
 var weekDaysList = ["Sun", "Mon", "Tue", "Wed", "thu", "Fri", "Sat"];
 ````
 The default values are 
 ````javascript
 ["S", "M", "T", "W", "T", "F", "S"];
````

**l) monthList**(Optional) : This is an array with a list of all months. You can use this if you want to show months in some other language or format. You can create an array like below.
 ````javascript
 var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
 ````
 The default values are 
 ````javascript
 ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
````

**m) templateType**(Optional) : This is string type which takes two values i.e. `modal` or `popup`. Default value is `modal`. If you wish to open in a popup, you can specify the value as `popup` or else you can ignore it.

**n) modalHeaderColor**(Optional) : This takes any valid ionic framework's header color. Default value is `bar-stable`

**o) modalFooterColor**(Optional) : This takes any valid ionic framework's footer color. Default value is `bar-stable`
      
**p) from**(Optional) : This is a date object, from which you wish to enable the dates. You can use this property to disable **previous dates** by specifying `from: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**q) to**(Optional) : This is a date object, to which you wish to enable the dates. You can use this property to disable **future dates** by specifying `to: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

**r) callback**(Mandatory) : This the callback function, which will get the selected date in to the controller. You can define this function as follows.
````javascript
var datePickerCallback = function (val) {
  if (typeof(val) === 'undefined') {
	console.log('No date selected');
  } else {
	console.log('Selected date is : ', val)
  }
};
````

5) Then use the below format in your template / html file

````html
<ionic-datepicker input-obj="datepickerObject">
  <button class="button button-block button-positive"> {{datepickerObject.inputDate | date:'dd - MMMM - yyyy'}}</button>
</ionic-datepicker>
````

**a) ionic-datepicker** is the directive, to which we can pass required vales.

**b) input-obj**(Mandatory) : This is an object. We have to pass an object as shown above.

##Screen Shots:

Once you are successfully done with the above steps, you should be able to see the below screen shots.
I have used two buttons here. 

The first screen shot shows only the buttons before clicking on them.
Once you click on the button you should see the second screen shot.

<img src="https://lh3.googleusercontent.com/IeNOa_UmMpRhWCP4Hl2Cc4ZO1YuwNAd4vmKBYzsX2FY=w434-h678-no" width="300" height="450" />
<img src="https://lh3.googleusercontent.com/IGjqpsiPj1_92DTiW2oJcSvBTdp93PGOYEk4VzQiABg=w442-h678-no" width="300" height="450" />

##CSS Classes:

<img src="https://lh3.googleusercontent.com/tX9IyFN9w3GigHnltCJCdSj1Df5OjDDqxPXmNr7oAdQ=w423-h634-no" width="300" height="450" />

#### 1) ionic_datepicker_modal_content
#### 2) selected_date_full
#### 3) left_arrow
#### 4) drop_down
#### 5) month_dropdown
#### 6) year_dropdown
#### 7) right_arrow
#### 8) date_col
#### 9) date_selected
#### 10) calendar_grid

You can use these classes to customize the alignment, if required.

##Versions:

### 1) v0.1.0
The whole date picker functionality has been implemented, and can be installed with  `bower install ionic-datepicker --save`

### 2) v0.1.1
Bug Fix. This is the latest version of `ionic-datepicker` component.

### 3) v0.1.2
Bug Fix. If we don't pass the date to the time picker it will pick the todays date by default.

### 4) v0.1.3
[Bug Fix](http://forum.ionicframework.com/t/ionic-datepicker-bower-component-for-ionic-framework-applications/21516/14)

### 5) v0.2.0
Disabling previous dates functionality added.

### 6) v0.3.0
a) User can select the years and months using the dropdown.

b) A callback function is added.

### 7) v0.4.0

**Features**

a) Disabling future dates functionality added. You may use it for selecting DOB.

b) Customised title text for datepicker modal's added.

**BugFixes**

[Bug#22](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/22),
[Bug#26](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/26),
[Bug#29](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/29)

### 8) v0.5.0

a) Feature for disabling particular dates has been added.

b) CSS classes added for customisation.

### 9) v0.6.0

a) Date selection color issue fixed.

b) Added feature to show Monday as the first day of the week.

### 10) v0.7.0

**Features**

a) `From` and `to` dates functionality added.

b) Code re-structuring.
 
c) Updated node modules.

**BugFixes**

[Bug#58](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/58),
[Bug#56](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/56),
[Bug#54](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/54),
[Bug#42](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/42),
[Bug#37](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/37),
[Bug#28](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/28)

### 11) v0.8.0

**Feature**

You can use either a popup or a modal for this `ionic-datepicker`.

**BugFix**

[Bug#59](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/59)

### 12) v0.9.0

**Feature**

You can give your custom week names.

**BugFix**

[Bug#63](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/63)

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com
