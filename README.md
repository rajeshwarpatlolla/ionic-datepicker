##Introduction:

This is an `ionic-datepicker` bower component, which can be used in any Ionic framework's application.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

1) node.js, bower and gulp.

##How to use:

1) In your project repository install the ionic-datepicker using bower

bower install ionic-datepicker --save

This will install the latest version released.

2) Then you can see the following directory structure see in your project folder

![Directory structure](https://lh3.googleusercontent.com/8x3OByTXzzgJSxm-n5Yg8-0g-u2OZt18j9EbvNTgK3Q=w112-h207-p-no "Directory structure")

Give the path of  `style.css, templates.js and ionic-datepicker.js` in your `index.html` file.

````html
<link href="lib/ionic-datepicker/dist/style.css" rel="stylesheet"> 
<!-- path to ionic/angularjs js -->
<script src="lib/ionic-datepicker/dist/templates.js"></script>
<script src="lib/ionic-datepicker/dist/ionic-datepicker.js"></script>
````    

3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('mainModuleName', ['ionic', 'ionic-datepicker']){
//
}
````

4) Use the below format in your template's corresponding controller

````javascript
$scope.currentDate = new Date();
$scope.title = "Custom Title";

$scope.datePickerCallback = function (val) {
	if(typeof(val)==='undefined'){		
		console.log('Date not selected');
	}else{
		console.log('Selected date is : ', val);
	}
};
````

a) `currentDate` is the date object which we are passing to the `ionic-datepicker`.

b) `datePickerCallback` is the callback function which we have to pass to the `ionic-datepicker`. This function takes an argument which will return `undefined` if the user didnot selected any date. And returns a `date` object, if the user selects any date.

c) `title` is the string variable, which can be assigned to the datepicker modal's title.

5) Then use the below format in your template / html file

````html
<ionic-datepicker idate="currentDate" disablepreviousdates="true"  disablefuturedates="false" callback="datePickerCallback" disableddates="disabledDates" title="title" mondayfirst="true">
	<button class="button button-block button-positive"> {{ currentDate | date:'dd - MMMM - yyyy' }} </button>
</ionic-datepicker>
````


a) `ionic-datepicker` is the directive, to which we can pass required vales.

b) `idate` takes date object. If we don't pass any value, the default value will be `new Date()`.

c) `disablepreviousdates` takes true or false. `true` disables the past dates, and `false` doesn't.

c) `disablefuturedates` takes true or false. `true` disables the future dates, and `false` doesn't.

d) `callback` takes the callback function name which will be called once the date picker has been closed.

e) `title` takes a variable of string type. This will be displayed as a title to the datepicker modal. If this attribute is not present, then it will show 'Select Date' by default.

f) `disableddates` is an array of dates to disable the particular dates.

Example : In your controller you can define `disabledDates` as follows

````javascript
$scope.disabledDates = [
	new Date(2015,7,10), //months are 0-based, this is August, 10th!
	new Date('Wednesday, August 12, 2015'), //Works with any valid Date formats like long format
	new Date("08-14-2015"), //Short format
	new Date(1439676000000) //UNIX format
]; 
````

g) `mondayfirst` takes true or false. If the given values is `true`, shows Monday as the first day of the week, and if the given value is `false`, then Sunday will be first day of the week.

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

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/22)

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/26)

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/29)
### 8) v0.5.0

a) Feature for disabling particular dates has been added.

b) CSS classes added for customisation.
### 9) v0.6.0

a) Date selection color issue fixed.

b) Added feature to show Monday as the first day of the week.

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com
