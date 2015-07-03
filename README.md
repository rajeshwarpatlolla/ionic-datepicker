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
<ionic-datepicker idate="currentDate" disablepreviousdates="true"  disablefuturedates="false" callback="datePickerCallback" title="title">
    <button class="button button-block button-positive"> {{ currentDate | date:'dd - MMMM - yyyy' }} </button>
</ionic-datepicker>
````


a) `ionic-datepicker` is the directive, to which we can pass required vales.

b) `idate` takes date object. If we don't pass any value, the default value will be `new Date()`.

c) `disablepreviousdates` takes true or false. `true` disables the past dates, and `false` doesn't.

c) `disablefuturedates` takes true or false. `true` disables the future dates, and `false` doesn't.

d) `callback` takes the callback function name which will be called once the date picker has been closed.

e) `title` takes a variable of string type. This will be displayed as a title to the datepicker modal. If this attribute is not present, then it will show 'Select Date' by default.

##Screen Shots:

Once you are successfully done with the above steps, you should be able to see the below screen shots.
I have used two buttons here. 

The first screen shot shows only the buttons before clicking on them.
Once you click on the button you should see the second screen shot.
 
![Date picker buttons](https://lh3.googleusercontent.com/-uhIkYlbcuqsZZneSPOwFoePWvhTeqRKa2kVkwN7mMI=w305-h553-no "Date picker buttons") 
![Date picker modal](https://lh3.googleusercontent.com/7iEejIcpprFmpgwWvs240Vn9Dn_Dh-R5HgtC_CJVZMs=w305-h553-no "Date picker modal")
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
### 6) v0.4.0

**Features**

a) Disabling future dates functionality added. You may use it for selecting DOB.

b) Customised title text for datepicker modal's added.

**BugFixes**

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/22)

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/26)

[Bug Fix](https://github.com/rajeshwarpatlolla/ionic-datepicker/issues/29)

##License:
[MIT](https://github.com/rajeshwarpatlolla/ionic-datepicker/blob/master/LICENSE.MD "MIT")

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com
