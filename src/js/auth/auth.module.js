var ng = require('angular');
require('satellizer');
import AuthLoginController from './auth.login.controller';

export default ng.module('bwell.auth', ['satellizer'])
  .run(_defaultRun)
  .run(routeChange)
  .config(_stateAuth)
  .config(satellizerConfiguration)
  .controller(AuthLoginController.name, AuthLoginController);

/*@ngInject*/
function _defaultRun($state, AuthDataSrv) {
  console.log('run auth', AuthDataSrv);
  $state.go('auth');
  //AuthDataSrv.login(); 

  AuthDataSrv.getAuthData().then(
    (data) => console.log(data)
  )
}

/*@ngInject*/
function routeChange($rootScope, $location) {
  $rootScope.$on("$routeChangeSuccess", function(userInfo) {
    console.log('===', userInfo);

  });

  $rootScope.$on("$routeChangeError", function(event, current, previous, eventObj) {
    if (eventObj.authenticated === false) {
      $location.path("/login");
    }
  });
}
/*@ngInject*/
function _stateAuth($stateProvider) {
  $stateProvider.state('auth', {
    url: '/auth',
    abstract: '.login',
    templateUrl: 'app.screen.tpl.html'
  });

  $stateProvider.state('auth.login', {
    url: '/login',
    template: require('./templates/auth.login.tpl.html'),
    controller: AuthLoginController.name + ' as authLoginCtr'
  });
}
/*@ngInject*/
function ionicPlatform($ionicPlatform, AuthDataSrv) {
  $ionicPlatform.ready(function() {
    AuthDataSrv.init();
  });
}

/*@ngInject*/
function satellizerConfiguration($authProvider, $httpProvider) {
  $authProvider.baseUrl = 'http://194.90.117.81:14003/api/v1';
  $authProvider.loginUrl = '/trainers/login'; //'/auth/login';
  $authProvider.withCredentials = false;
  $authProvider.tokenName = 'TrainerId';
  $authProvider.tokenPrefix = 'bwell_trainer';
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
}

//http://194.90.117.81:14003/api/v1/trainers/login
