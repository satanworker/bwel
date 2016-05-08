class TraineesFotoController {
  /**@ngInject*/
  constructor($state, $cordovaCamera, $cordovaFile,$stateParams, TraineesFotoSrv) {
    this.$state = $state;
    this.$cordovaCamera = $cordovaCamera;
    this.$cordovaFile = $cordovaFile;
    this.TraineesFotoSrv = TraineesFotoSrv;
    this.currentPicture = this.TraineesFotoSrv.currentPicture;
    this.messages = [];
    this.typeId= $stateParams.typeId;
  }
  /**
   * onGetPicture Получение фотографии с камеры 
   * @see  http://www.joshmorony.com/store-camera-photos-permanently-using-phonegap-ionic-ngcordova/
   * @return  
   */
  onGetPicture() {
  

  }
  //Upload file on server
  onSendFoto(){
    alert('waiting for API');
    this.TraineesFotoSrv.uploadPicture().then(
          function(){
            alert('Upload OK');
          },
          function(){
            alert('Upload ERROr');
          }
      );
  
  }
  urlForImage(imageName) {
    console.log("get correct path for image");
  }
  /**
   * goBackToList Закрыть текущий экран для возврата в основной список
   * @return  
   */
  goBackToList() {
    console.log('on go back to list');
    this.$state.go(".^");
  }
}

TraineesFotoController.resolve = {
  // TODO: проверить доступ к камере
};

export default TraineesFotoController;
