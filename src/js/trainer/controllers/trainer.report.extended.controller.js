import _ from 'lodash';
class TrainerReportExtendedController {
  /*ngInject*/
  constructor($scope,$state, $ionicHistory,TrainerTraining_timerSrv) {
      this.timer = TrainerTraining_timerSrv; 
      this.$ionicHistory = $ionicHistory;
    }
    // Подтверждение начала тренировки группы
  onConfirmTrainingGroup() {
      // TODO: получить геолокационные данные 
      // TODO: отправить данные на сервер
      var _timeStartTraning = +new Date();
      // TODO: установить время завершения тренировки
      var _minutesTraining = 0.5; // NOTE: время тренировки
      this.timer.setTimeStartTraining(_timeStartTraning)
        .then(
          (timeStart) => {
            var _timeStopTraning = new Date(timeStart + (_minutesTraining * 60 * 1000)).getTime(); 
            this.timer.setTimeStopTraining(_timeStopTraning)
              .then(
                (timeStop) => {
                  this.timer.startTimer();
                  //console.log(timeStop);
                  try {
                    console.log(cordova); 
                  } catch (e) {
                    //console.log(e)
                  }
                  //console.log('time stop', timeStop);
                 this.$ionicHistory.goBack();
                });

          }
        );
        //this.startTimer();
    }
    // methods
}
TrainerReportExtendedController.resolve = {
  // TODO: resolve list group
};
export default TrainerReportExtendedController;
