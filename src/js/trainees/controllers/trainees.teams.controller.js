class TraineesTeamsController {
  /**@ngInject*/
  constructor($state) {
    this.$state = $state;
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

TraineesTeamsController.resolve = {
  // TODO: получить список группы
};

export default TraineesTeamsController;
