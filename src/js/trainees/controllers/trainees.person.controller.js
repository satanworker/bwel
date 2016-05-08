/**
 * 
 */
class TraineesPersonController {
  /**@ngInject*/
  constructor($scope, $timeout, $state, $ionicPopup, $ionicModal, $cordovaCamera, $cordovaFile, TraineesFotoSrv) {
    this.$scope = $scope;
    this.$state = $state;
    this.$cordovaCamera = $cordovaCamera;
    this.$cordovaFile = $cordovaFile;
    this.$ionicPopup = $ionicPopup;
    this.$ionicModal = $ionicModal;
    this.TraineesFotoSrv = TraineesFotoSrv;
    this.lastFoto = this.TraineesFotoSrv.currentPicture;
    this.$timeout = $timeout;
    // this.$scope.modal =  this.$ionicModal.fromTemplate(
    //   require('./../templates/trainees.person.foto_confirm.tpl.html'), {
    //     scope: this.$scope,
    //     animation: 'slide-in-up'
    //   });

    // this.$scope.$on('$destroy',   ()=> {
    //   this.$scope.modal.remove();
    // });
    this.messages = [];
    this.typeSendList = [{
      id: 1,
      name: "Send foto person"
    }, {
      id: 2,
      name: "Send foto document"
    }];
  }

  onSelectTypeSendPicture() { 
    this.$scope.popupTypeSending = this.$ionicPopup.show({ 
      template: require('./../templates/popups/trainees.popup.person.type_send.tpl.html'),
      cssClass: 'disable-title',
      scope: this.$scope,
      buttons: [{
        text: 'Cancel'
      }]
    });
    this.$scope.popupTypeSending.then((res) => {
        console.log(res);
      }
    );

    // this.popupListTrainees = this.$ionicPopup.show({
    //   //templateUrl: 'templates/selectTrainee.popup.tpl',
    //   template: require('./../templates/trainers.popup.group_list.tpl.html'), 
    //   cssClass: 'disable-title',
    //   // scope: $scope
    // });
  }
  onClosePopupTypeSending() {
      console.log('onClosePopupTypeSending', this.$scope.popupTypeSending);
      // this._confirmSendFoto(1);
      this.$scope.popupTypeSending.close();
      //  this.modal.show();
    }
    /**
     * onGetPicture Получение фотографии с камеры 
     * @see  http://www.joshmorony.com/store-camera-photos-permanently-using-phonegap-ionic-ngcordova/
     * @return  
     */
  onGetPicture(typeSend) {
      console.log('onGetPicture', this.$scope.popupTypeSending)
      this.$scope.popupTypeSending.close(); 
      this.TraineesFotoSrv.getPicture().then((img) => { 
          //if(img)
          this._confirmSendFoto(typeSend);
        }) 
    }
    // открыть окно просмотра и подтверждения отправки 
  _confirmSendFoto(typeId) {
      this.$scope.popupTypeSending.close();   
      this.$state.go('trainees.person.foto', {
        typeId: typeId
      });
    }
    /**
     * goBackToList Закрыть текущий экран для возврата в основной список
     * @return  
     */
  goBackToList() { 
    this.$state.go('^', null, {
      boolean: false
    });
  }
}

TraineesPersonController.resolve = {
  // TODO: получить данные конкретного тренируемого
};

export default TraineesPersonController;
