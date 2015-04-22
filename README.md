##Introduction:

This is a `ionic-datepicker` bower component which can be used with any Ionic framework's application.
This is still under development. Once i am done with the full implementation i will post this in ionic forum.

[View Demo](http://rajeshwarpatlolla.github.io/DatePickerForIonicFramework/demo/ "Demo") 


##Prerequisites.

1) node.js, bower and gulp.

##How to use:

1) In your project repository install the ionic date picker using bower

    bower install ionic-datepicker --save-dev
    
2) Then you can see the following directory structure see in your project folder
   

Give the path of  `style.css, templates.js and ionic-datepicker.js` in your `index.html` file.

````html
<link href="lib/ionic-datepicker/dist/style.css" rel="stylesheet"> 
<!-- path to ionic/angularjs js -->
<script src="lib/ionic-datepicker/dist/templates.js"></script>
<script src="lib/ionic-datepicker/dist/ionic-timepicker.js"></script>
````    
    
3) In your application module inject the dependency `ionic-datepicker`, in order to work with the ionic time picker
````javascript
angular.module('modulename', ['ionic', 'ionic-datepicker']){
 //
}
````

4) Use the below format in your template's corresponding controller

````javascript
$scope.currentDate = new Date();
````

5) Then use the below format in your template / html file

````html
<ionic-datepicker idate="pastDate" >
    <button class="button button-block button-positive"> {{pastDate | date:'dd - MMMM - yyyy'}} </button>
</ionic-datepicker>
````


a) `ionic-datepicker` is the directive, to which we can pass required vales.

b) `idate` takes date object.

Tested with `angular#1.3.6` and `ionic#1.0.0-rc.4`. 

 
##Versions:

### 1) v0.1.0
The whole date picker functionality has been implemented, and can be installed with 
    
    bower install ionic-datepicker --save


##License:
MIT

##Contact:
gmail : rajeshwar.patlolla@gmail.com

github : https://github.com/rajeshwarpatlolla

twitter : https://twitter.com/rajeshwar_9032

facebook : https://www.facebook.com/rajeshwarpatlolla

paypal : rajeshwar.patlolla@gmail.com
