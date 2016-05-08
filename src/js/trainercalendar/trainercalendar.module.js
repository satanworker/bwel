var ng = require('angular');

let _module = ng.module('trainercalendar', []);

import TrainerCalendarController from './trainercalendar.controller';
 
export default _module;


_module.config(_congifState);
_module.run(_defaultRun);
_module.controller(TrainerCalendarController.name, TrainerCalendarController)
;
/*@ngInject*/
function _defaultRun($state) {
  console.log('run ' + 'trainercalendar');
 // $state.go('trainercalendar');
}
/*@ngInject*/
function _congifState($stateProvider) {
  $stateProvider.state(
    'trainercalendar', {
      abstract: '.list',
      url: '/calendar',
      templateUrl: 'app.screen.tpl.html'
     
    }
  );

  $stateProvider.state(
    'trainercalendar.list', {
      url: '',
      template:  require('./templates/trainercalendar.dashboard.tpl.html'),
       controller: TrainerCalendarController.name +" as trainerCalendarCtr"
    }
  );
}
