require("../../less/style.less");

var
    _routing = require('./routing.js');

require('./app_modules/dash/index.js');

angular.module('app', ['ionic', 'LocalStorageModule', 'ngCordova', 'dash'])
    .config(_routing)
    .config(['localStorageServiceProvider', function(localStorageServiceProvider) {
        localStorageServiceProvider
            .setPrefix('Bwell')
            .setStorageType('localStorage')
            .setNotify(true, true)
    }])
    .run(['$ionicPlatform', function($ionicPlatform) {
        $ionicPlatform.ready(function() {
            if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                StatusBar.styleLightContent();
            }
        });

        document.addEventListener("deviceready", function() {
            screen.lockOrientation('portrait');
        });
    }])


angular.element(document).ready(function() {
    angular.bootstrap(document, ['app']);
});
