/**
 * Директива отображения кнопок запуск начала тренировок - отправки отчетов 
 * trainer-panel-start-buttons.directive.js
 */ 
 function trainerPanelStartButtonsDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: false,
    template: require('./trainer-panel-start-buttons.tpl.html')
  };
}
export default trainerPanelStartButtonsDirective;
