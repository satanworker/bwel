/**
 * Контроллер запуска индивидуальной тренировки
 */

class TrainerReportIndividualController {
  /*@ngInject*/
  constructor(TrainerDataSrv, UserSrv, $scope,$ionicPopup) {
      // this.listTrainees = ListPersons; // список тренируемых 
      // this.$scope = $scope;
      this.TrainerDataSrv = TrainerDataSrv;
      this.traineesList = [];
      this.$scope = $scope;
      this.$ionicPopup =  $ionicPopup;
      this.trainer = UserSrv;
      this.getTraineesWithPrivatePractice();
      this.data = {};
    }
    // TODO: проверка(получение данных от) тренера -> отправка данных -> старт тренировки
  onStartTraining(event, tranee) {
      console.log(tranee);
      var _params = {};
      _.extend(_params, this.trainer, {
        TraineeId: tranee.Id,
        Last4DigitsOfNationalId: '1234',
        Notes: 'Test request'
      });
      this.data =  tranee.Id;
      // this.TrainerDataSrv.startPrivatePractice(_params);  
      var confirmReportPopup = this.$ionicPopup.show({
        template: '<input type="password" ng-model="data.wifi">{{data}}',
        title: 'Enter Wi-Fi Password',
        subTitle: 'Please use normal things',
        scope: this.$scope,
        buttons: [{
          text: 'Cancel'
        }]
      });

      confirmReportPopup.then((res) => {
              console.log(res);
         //   this.TrainerDataSrv.startPrivatePractice(_params);  
      });
    }
    // TODO: отобразить информацию по пользователю 
  onShowTraineeInfo() {
      alert('waiting for API');
    }
    // TODO: вызов и применение сложного фильтра
  onFilterClick() {
      alert('To be implemented in next releases');
    }
    /**
     * getTraineesWithPrivatePractice Получить список тренируемых для начала Персоанальное тренировки
     * @return {[type]} [description]
     */
  getTraineesWithPrivatePractice() {
    var _params = {};

    this.TrainerDataSrv.getTraineesWithPrivatePractice(_params)
      .then(
        (data) => {
          this.traineesList = data;
        }, (err) => {
          console.log('getTraineesWithPrivatePractice:err', err);
        }, (progress) => {
          console.log('getTraineesWithPrivatePractice:progress', progress);
        }
      );
  }
}
/**
 * resolve  Resolve external Services and Data
 * @type {Object}
 */
TrainerReportIndividualController.resolve = {
  TrainerDataSrv: _TrainerDataSrv,
  UserSrv: _UserSrv
};
/*@ngInject*/
function _TrainerDataSrv(TrainerDataSrv) {
  return TrainerDataSrv;
}
/*@ngInject*/
function _UserSrv(UserSrv) {
  return UserSrv;
}

export default TrainerReportIndividualController;
