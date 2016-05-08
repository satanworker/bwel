// require('./trainer.scss');

/**
 * Инициализация модуля 
 */
import _module from './trainer.module';

//============================================
// Directives
//============================================
import trainerPanelStartButtonsDirective from "./directives/trainer-panel-start-buttons.directive"; 
_module.directive('trainerPanelStartButtons',trainerPanelStartButtonsDirective); 

import trainerPanelDopCommandsDirective from "./directives/trainer-panel-dop-commands.directive"; 
_module.directive('trainerPanelDopCommands',trainerPanelDopCommandsDirective);
 
//============================================
// Services
//=========================================== 
import TrainerDataSrv from "./services/trainer.data.service"; 
_module.factory('TrainerDataSrv',TrainerDataSrv);
import TrainerTraining_timerSrv from "./services/trainer.training_timer.service"; 
_module.factory('TrainerTraining_timerSrv',TrainerTraining_timerSrv);

export default _module ; 

