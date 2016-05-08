var ng = require('angular');
require('angular-local-storage');
require('ionic');
require('./app.scss');
import localizationModule from "./localization";
import authenticationModule from "./auth";

import userModule from "./user";

import traineesModule from "./trainees";
import trainerModule from "./trainer";
import trainerCalendarModule from "./trainercalendar";

import appRunAction from "./app.run";
import configAction from "./app.config";

ng.module('app', [
    'ionic',
    'LocalStorageModule',
    localizationModule.name,
    traineesModule.name,
    trainerModule.name,
    trainerCalendarModule.name,
    userModule.name,
    authenticationModule.name 
  ])
  .config(configAction.angularUiRouterDefault)
  .config(configAction.localStorage)
  .config(routing)
  .run(appRunAction.ionicPlatform)
  .run(appRunAction.templateCache)
  .value("SQLDB", null)
  .value("DBNAME", "bwell")
  .service('UserSrv',_UserSrv);
function _UserSrv(){
    this.TrainerId = "2a2c5a5d-ba0d-e411-af9f-d89d6764e58c";
    this.Key = "VT$BbZGmM59exoO"; 
    return this;
}
routing.$inject = ['$stateProvider', '$urlRouterProvider'];

/**
 * routing Конфигурация маршрутизации
 * @param  {Function} $stateProvider      
 * @param  {Function} $urlRouterProvider 
 * @return                    
 */
function routing($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/app/");

  $stateProvider
    .state('app', {
      url: "/app",
      template: require('./templates/app.screen.tpl.html')

    });
    // DEVELOP PAGE
  $stateProvider
    .state('app.dev', {
      url: "/",
      template: require('./templates/app.develop.tpl.html'),
      controller: ['$scope', '$http', function($scope, $http) {
        var baseSvc = 'http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc/';
        var params = {
          Key: "VT$BbZGmM59exoO",
          TrainerId: "2a2c5a5d-ba0d-e411-af9f-d89d6764e58c",
          GroupPracticeId:"41bc3203-3ea6-40c1-aa51-ce1ea06a8d0e",
          NationalId:"2345"
        };

          //
        $scope.onGetTraineesWithPrivatePractice = function() {
          $http.get(baseSvc + 'GetTraineesWithPrivatePractice', params).then(
            onSuccess, onErr);

          function onSuccess(data, header) {
            alert(JSON.stringify(data));
          }

          function onErr(err) {
            alert(JSON.stringify(err));
          }
        }
         //  http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc/OrderGroupPractice?Key=VT$BbZGmM59exoO&TrainerId=2a2c5a5d-ba0d-e411-af9f-d89d6764e58c&GroupPracticeId=41bc3203-3ea6-40c1-aa51-ce1ea06a8d0e&NationalId=%22RU%22
       $scope.OrderGroupPractice  = function() {
          $http.post(baseSvc + 'OrderGroupPractice', params).then(
            onSuccess, onErr);

          function onSuccess(data, header) {
            alert(JSON.stringify(data));
          }

          function onErr(err) {
            alert(JSON.stringify(err));
          }
        }

       $scope.LoginTrainee  = function() {
           var _params = {
          Key: "VT$BbZGmM59exoO", 
          PhoneNumber:"123456789",
          NationalId:"2345"
        };
        var req = {
          method: 'POST',
          url: baseSvc + 'LoginTrainee',
          params: _params

        }
          $http(req).then(
            onSuccess, onErr);

          function onSuccess(data, header) {
            alert(JSON.stringify(data));
          }

          function onErr(err) {
            alert(JSON.stringify(err));
          }
        }        

      }],
      controllAs: "devCtr"
    });
  // NOTE: экран контактной информации
  $stateProvider
    .state('app.contacts', {
      url: "/contacts",
      template: require('./templates/app.contacts.tpl.html')
    });

}
/**
 * @ngdoc Запуск приложения 
 * @param  {Document}  
 * @return  
 */
ng.element(document).ready(function() {
  ng.bootstrap(document, ['app']);
});
