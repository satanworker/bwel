/**
 * Контроллер основного экрана 
 */
class TrainersScreenController {
  /*@ngInject*/
  constructor(User, TrainerDataSrv, TrainerTraining_timerSrv, $scope, $state, $ionicModal, $ionicPopup, $ionicLoading) {
    this.$scope = $scope;
    this.user = User;
    this.groupList = TrainerDataSrv.getGroupList();
    console.log(this.groupList);
    this.$state = $state;
    this.$ionicPopup = $ionicPopup;
    this.isActiveTraining =  TrainerTraining_timerSrv.isActiveTraining;
    this.timer = TrainerTraining_timerSrv;
    // this.$ionicModal = $ionicModal;
    // console.log($ionicModal);
    // this.modal = $ionicModal.fromTemplate(tpl, {
    //   scope: this.$scope,
    //   animation: 'slide-in-up'
    // });
  }
  onStartGroupTraining() {
    console.log('onStartGroupTraining');
    this.popupGroupTraining = this.$ionicPopup.show({
      template: require('./../templates/popups/trainer.popup.group_list.tpl.html'), //'templates/selectGroup.popup.tpl',
      //cssClass: 'disable-title',
      scope: this.$scope
    });
    // this.popupListTrainees = this.$ionicPopup.show({
    //   //templateUrl: 'templates/selectTrainee.popup.tpl',
    //   template: require('./../templates/trainers.popup.group_list.tpl.html'), 
    //   cssClass: 'disable-title',
    //   // scope: $scope
    // });
  }
  onCloseGroupList() {
    console.log('onCloseGroupList');
    this.popupGroupTraining.close();
    this.currentTreenees = [];
  }
  onSelectTrainingGroup(group) {
      this.$state.go('trainer.group', {
        groupId: group.id
      });
      this.popupGroupTraining.close();
    }
    //
  onOpenListTrainees() {
    console.log('onOpenListTrainees');
    this.popupListTrainees = this.$ionicPopup.show({
      //templateUrl: 'templates/selectTrainee.popup.tpl',
      template: require('./../templates/trainer.individual_start.tpl.html'), //"<h1>PoPM</h1>",
      cssClass: 'disable-title',
      // scope: $scope
    });

    //   if ($scope.security.isAuth()) {
    //     $ionicLoading.show({
    //       template: 'Please wait... Get list of contacts'
    //     });
    //     DashSrv.getListContacts()
    //       .then(function(data) {
    //         //console.log(data);
    //         $scope.listTrainees = data.data.Contacts;
    //         $ionicLoading.hide();
    //         popupListTrainees = $ionicPopup.show({
    //           templateUrl: 'templates/selectTrainee.popup.tpl',
    //           cssClass: 'disable-title',
    //           scope: $scope
    //         });
    //       }, function(err) {
    //         //console.log(err)
    //         $ionicLoading.hide();
    //       })
    //   } else {
    //     //console.log('not auth');
    //   }
  }

  onGoHome() {
    console.log("TODO: go to home eveent ", this.user.name);
  }
}

TrainersScreenController.resolve = {
  /*@ngInject*/
  User: function() {
    console.log('User');
    return {
      name: "DEMO USER"
    };
  },
  /*ngInject*/

  // groupList: (TrainerDataSrv) => {
  //   console.log('==', TrainerDataSrv);
  //   return true; //TrainerDataSrv.getGroupList;
  // }
};

export default TrainersScreenController;
