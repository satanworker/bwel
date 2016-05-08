//var tpl = '<ion-modal-view><ion-header-bar> <h1 class="title">My Modal title</h1> </ion-header-bar><ion-content>Hello!</ion-content></ion-modal-view>';
// @see http://stackoverflow.com/questions/25854422/using-this-as-scope-when-creating-ionicmodal
class TraineesScreenController {
  /**@ngInject*/
  constructor($state, $ionicModal) {
    this.$state = $state;
    // this.$ionicModal = $ionicModal; 
    // this.modal = $ionicModal.fromTemplate(tpl, {
    //     scope: this.$scope,
    //     animation: 'slide-in-up'
    //   });
  }
  /**
   * onShowDopInfo Отобразить полную информацию о пользователе
   * @param  {String} id   
   * @return  
   */
  onShowDopInfo(id) {
    console.log("TODO:  trainees.person");
    this.$state.go('trainees.person', {
      personId: id
    });
    //TODO: delete if no use modal window
    // this.modal.show();
  }

}

TraineesScreenController.resolve = {
  // TODO: проверить доступ к камере
};

export default TraineesScreenController;
