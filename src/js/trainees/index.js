/**
 * Модуль экранов реализации функционала "Персональные данные" 
 */
import _module from './trainees.module'; 

// NOTE:  регистрация доступных директив модуля 

//============================
//
//============================
 
import TraineesDataServices from './services/trainees.data.service';
_module.factory('TraineesDataSrv', TraineesDataServices);

import TraineesFotoServices from './services/trainees.foto.service';
_module.factory('TraineesFotoSrv', TraineesFotoServices);

export default _module;