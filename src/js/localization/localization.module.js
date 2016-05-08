var ng = require('angular');
require('angular-translate');

export default ng.module('bwell.localization', [
    'pascalprecht.translate'
  ])
  .config(_translateProviderConfig);

_translateProviderConfig.$inject = ['$translateProvider'];

function _translateProviderConfig($translateProvider) {
  var en = {
    //side menu
    "main_screen": "Main screen",
    "log_out": "Log out",
    // trainercalendar 
    "my_schedule_title": "My schedule",
    "schedule_Date": "Date {{display_date}}", // NOTE: текст возле даты
        // auth module
    "Login_title": "Login",
     "NationalID":"NationalID", //"שם מלא"
    "NationalID":"NationalID", //"תעודת זהות"
    "Username": "Username",//"שם מלא",
    "Password": "Password",//"תעודת זהות",
    "PhoneNumber": "Phone Number",
    "Sign-In": "Sign-In",//"התחבר"
  };
  // var ar = {
  //   //side menu
  //   "main_screen": "?Main screen",
  //   "log_out": "?Log out",
  //   // auth module
  //   "username": "שם מלא",

    
  //   // trainercalendar 
  //   "my_schedule_title": "?My schedule",

  // };
 //$translateProvider.useSanitizeValueStrategy('sanitize');
  $translateProvider
    .translations('en', en)
    .preferredLanguage('en');
  $translateProvider.preferredLanguage("en");
  $translateProvider.fallbackLanguage("en");
}
