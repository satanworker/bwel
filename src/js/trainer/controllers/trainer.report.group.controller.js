/**
 * Контроллер Отчета о групповой тренировки
 */
class TrainerReportGroupController {
  /*@ngInject*/
  constructor($scope) {
    this.$scope = $scope;
  }
}

TrainerReportGroupController.resolve = {
  // TODO: Получить список тренируемой группы
};

export default TrainerReportGroupController;
