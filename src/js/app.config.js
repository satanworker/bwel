// @see https://github.com/nonplus/angular-ui-router-default/blob/master/src/angular-ui-router-default.js
/**
 * angularUiRouterDefault - Конфигурация Ui Router на переход с абстрактного состояния на 
 * @param  {Object} $provide  
 * @return {Object}  $delegate
 */
function angularUiRouterDefault($provide) {

  $provide.decorator('$state', ['$delegate', '$injector', function($delegate, $injector) {

    var transitionTo = $delegate.transitionTo;
    var max_redirects = 10; // NOTE: can be change
    $delegate.transitionTo = function(to, toParams, options) {
      var numRedirects = 0;
      while (numRedirects++ < max_redirects) {
        var target = this.get(to, this.$current);
        if (target.abstract && target.abstract !== true) {
          var childState = target.abstract;
          if (!angular.isString(childState)) {
            childState = $injector.invoke(childState);
          }
          if (childState[0] == '.') {
            to += childState;
          } else {
            to = childState;
          }
        } else {
          break;
        }
      }
      if (numRedirects >= max_redirects) {
        throw new Error("Too many abstract state default redirects");
      }
      return transitionTo.call($delegate, to, toParams, options);
    };
    return $delegate;
  }]);
}

angularUiRouterDefault.$inject = ['$provide'];
//===================================================
// Local storage configuration
//===================================================

function localStorage(localStorageServiceProvider) {
  localStorageServiceProvider
    .setPrefix('Bwell')
    .setStorageType('localStorage')
    .setNotify(true, true);
}

localStorage.$inject = ['localStorageServiceProvider'];

export default {
  angularUiRouterDefault,
  localStorage
};
