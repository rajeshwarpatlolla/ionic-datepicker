##Introduction:

This is an `ionic-datepicker` bower component, which can be used in any Ionic framework's application. No additional plugins required for this component.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

1) node.js, bower and gulp.

##How to use:

1) In your project repository install the ionic-datepicker using bower

`bower install ionic-datepicker --save`
*OR*
`npm i ionic-datepicker --save`

This will install the latest version released.

2) Give the path of  `ionic-datepicker.bundle.min.js` in your `index.html` file.

````html
<!-- path to ionic/angularjs -->
<script src="lib/ionic-datepicker/dist/ionic-datepicker.bundle.min.js"></script>
````    
The path will change if you have installed with npm.

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
      errorMsgLabel : 'Please select time.',	//Optional
      setButtonType : 'button-assertive',  //Optional
      inputDate: new Date(),	//Optional
      mondayFirst: true,	//Optional
      disabledDates:disabledDates,	//Optional
      monthList:monthList,	//Optional
      from: new Date(2015, 7, 2),	//Optional
      to: new Date(2015, 7, 29),	//Optional
      callback: function (val) {	//Mandatory
        datePickerCallback(val);
      }
    };
````

**$scope.datepickerObject** is the main object, that we need to pass to the directive. The properties of this object are as follows.

a) **titleLabel**(Optional) : The label for 'Title' of the ionic-datepicker popup. Default value is `Select Date`

b) **todayLabel**(Optional) : The label for `Today` button. Default value is `Today`

c) **closeLabel**(Optional) : The label for `Close` button. Default value is `Close`

d) **setLabel**(Optional) : The label for `Set` button. Default value is `Set`

e) **errorMsgLabel**(Optional) : The label for the error message. Default value is `Please select a date.`

f) **setButtonType**(Optional) : This the type of the `Set` button. Default value is `button-positive`. You can give any valid ionic framework's button classes.

g) **inputDate**(Optional) : This is the date object to pass to the directive. You can give any date object to this property. Default value is `new Date()`. But if you wish to show the initial date in the HTML page, then you should define this property. 

h) **mondayFirst**(Optional) : Set `true` if you wish to show monday as the first day. Default value is `false`.

i) **disabledDates**(Optional) : If you have a list of dates to disable, you can create an array like below. Default value is an empty array.
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

j) **monthList**(Optional) : This is an array with a list of all months. You can use this if you want to show months in some other language or format. You can create an array like below.
 ````javascript
 var monthList = ["Jan", "Feb", "March", "April", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];
 ````
 The default values are 
 ````javascript
 ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
````

k) **from**(Optional) : This is a date object, from which you wish to enable the dates. You can use this property to disable **previous dates** by specifying `from: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

l) **to**(Optional) : This is a date object, to which you wish to enable the dates. You can use this property to disable **future dates** by specifying `to: new Date()`. By default all the dates are enabled. Please note that months are 0 based.

m) **callback**(Mandatory) : This the callback function, which will get the selected date in to the controller. You can define this function as follows.
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

a) **ionic-datepicker** is the directive, to which we can pass required vales.

b) **input-obj**(Mandatory) : This is an object. We have to pass an object as shown above.

##Screen Shots:

Once you are successfully done with the above steps, you should be able to see the below screen shots.
I have used two buttons here. 

The first screen shot shows only the buttons before clicking on them.
Once you click on the button you should see the second screen shot.

![Date picker buttons](https://lh3.googleusercontent.com/-uhIkYlbcuqsZZneSPOwFoePWvhTeqRKa2kVkwN7mMI=w305-h553-no "Date picker buttons") 
![Date picker modal](https://lh3.googleusercontent.com/7iEejIcpprFmpgwWvs240Vn9Dn_Dh-R5HgtC_CJVZMs=w305-h553-no "Date picker modal")

##CSS Classes:
#### 1) ionic-datepicker
#### 2) left_arrow
#### 3) drop_down
#### 4) right_arrow
#### 5) calendar_grid
#### 6) date_cell
![Date picker grid](https://lh3.googleusercontent.com/3nh7RvLhsIrdg6hZTeQWWYaE32isIWbIDRRLBigngek=w204-h319-no "Date picker grid")
![Date picker left arrow](https://lh3.googleusercontent.com/Ls2SVCillpzb_4CEiihgfQTPxL3RkYHZLheHTstRaQw=w204-h312-no "Date picker left arrow")
![Date picker dropdown](https://lh3.googleusercontent.com/P_IC6bRS4FC3JXy6pdBJVq1kBUnTEqgVha89vqsmcWc=w202-h315-no "Date picker dropdown")
![Date picker right arrow](https://lh3.googleusercontent.com/MSdEEs-oVNNn8wLvjc4iopXTRREmkdQ2vVVnz1z9UQ8=w201-h314-no "Date picker right arrow")
![Date picker calendar_grid](https://lh3.googleusercontent.com/sQH2wqT1qMEGFpEelApo4JuoFUfiMf4Necb7OOXdfuE=w201-h314-no "Date picker calendar_grid")
![Date picker date cell](https://lh3.googleusercontent.com/1WCeMNH53tfZFBW2GU9QZwQRtqtUuszUk7kszIEYSr8=w201-h312-no "Date picker date cell")

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

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com
