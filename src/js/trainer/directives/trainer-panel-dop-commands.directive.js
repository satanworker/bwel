/**
 * 
 */
 function trainerPanelDopCommandsDirective(){
  return {
    restrict: 'E',
    replace: true,
    scope: false,
    template: require('./trainer-panel-dop-commands.tpl.html')
  };
}
export default trainerPanelDopCommandsDirective;