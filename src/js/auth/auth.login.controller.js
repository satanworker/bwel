class AuthLoginController {
  /*ngInject*/
  constructor(AuthDataSrv) {
    this.AuthDataSrv = AuthDataSrv;
    this.credantionals = {
      "Key": "VT$BbZGmM59exoO",
      "PhoneNumber": "0524649545",
      "NationalId": "123456897"
    };
  }
  signIn(credantionals) {
      console.log(credantionals,this.credantionals);
      this.AuthDataSrv.login(this.credantionals).then(
        (data) => {
          alert('OK: ' + JSON.stringify(data));
        }, (err) => {
          alert('ERR: ' + JSON.stringify(err));
        }
      )
    }
    // $ionicPopover.fromTemplateUrl('my-popover.html', {
    //   scope: $scope,
    // }).then(function(popover) {
    //   $scope.popover = popover;
    // });
    // $scope.openPopover = function($event) {
    //   $scope.popover.show($event);
    // };
    // $scope.closePopover = function() {
    //   $scope.popover.hide();
    // };
    // //Cleanup the popover when we're done with it!
    // $scope.$on('$destroy', function() {
    //   $scope.popover.remove();
    // });
    // // Execute action on hide popover
    // $scope.$on('popover.hidden', function() {
    //   // Execute action
    // });
    // // Execute action on remove popover
    // $scope.$on('popover.removed', function() {
    //   // Execute action
    // });
}

export default AuthLoginController;
