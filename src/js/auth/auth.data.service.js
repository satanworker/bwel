

class AuthData {
  constructor(data) {
    this.data = data;
  }
  isAuthenticated(){
   return !!this.token
  }
}

/*@ngInject*/
function AuthDataService($http, $q, $window,$auth) {
  var authData = null;
  return {
    init: _init,
    login: _satelizer_login,//_login,//
    getAuthData: _getAuthData
  };
  
  function _satelizer_login(credantionals){
     return $auth.login(credantionals);
  }
 
  function _login(credantionals) {
    let deffered = $q.defer();
    var apiUrl = 'http://194.90.117.81:14003/api/v1'; //'https://alpani.herokuapp.com';
    var req = {
      method: 'POST',
      url: apiUrl + '/trainers/login',
      data: credantionals
    }
    $http(
        req
      )
      .then(
        loginSuccess,
        errorSuccess
      );
    return deffered.promise;

    function loginSuccess(result, heders) {
      authData = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage["authData"] = JSON.stringify(new AuthData(authData));
      deffered.resolve(authData);
    }

    function errorSuccess(err) {
      console.log('login', err);
      deffered.reject(err);
    }
  }

  function _getAuthData() {
    return $q.when(authData);
  }

  function _init() {
    if ($window.sessionStorage["authData"]) {
      authData = JSON.parse($window.sessionStorage["authData"]);
    } else {
      authData = new AuthData({
        Name: "DemoUser"
      });
    }
  }
}

export default AuthDataService;
