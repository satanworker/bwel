var ng = require("angular");
require('ngCordova');
require('angular-local-storage');

import TrainerScreenController from './controllers/trainer.screen.controller';
import TrainerReportGroupController from './controllers/trainer.report.group.controller';
import TrainerReportExtendedController from './controllers/trainer.report.extended.controller';
import TrainerReportIndividualController from './controllers/trainer.report.individual.controller';
 
export default ng.module('bwell.trainer', ['ui.router','ngCordova',
    'LocalStorageModule'])
  .controller('trainer.screen.controller', TrainerScreenController)
  .controller(TrainerReportIndividualController.name, TrainerReportIndividualController)
  .config(screenStates)
  .run(_runModuleDefault);

_runModuleDefault.$inject = ['$state'];

function _runModuleDefault($state) {
  console.log('bwell.trainer'); 
 //$state.go('trainer');
}
/**
 * $inject description]
 * @type {Array}
 */
screenStates.$inject = ['$stateProvider'];
/**
 * screenStates Настройка состояния экрана 
 * @return {[type]} [description]
 */
function screenStates($stateProvider) {
  console.log('screenStates');
  $stateProvider.state('trainer', {
      url: '/trainer',
      abstract: '.dashboard',
      templateUrl: 'app.screen.tpl.html', //require('./templates/trainer.screen.html'),
      controller: 'trainer.screen.controller as vm', //TrainerScreenController,      
      resolve: TrainerScreenController.resolve
    })
    .state('trainer.dashboard', {
      url: '/',
      template: require('./templates/trainer.dashboard.tpl.html'),
      // controllerAs: 'contact',
      controller: 'trainer.screen.controller as trainerCtr', //TrainerScreenController,
      resolve: TrainerScreenController.resolve

    })
    .state('trainer.extended', {
      url: '/extended',
      views: {
        '@': {
          template: require('./templates/trainer.extended.tpl.html'),
          //controller: TrainerReportExtendedController.name + " as trainerReportExtendedCtr",
          controller: TrainerReportExtendedController,
          controllerAs: 'trainerReportExtendedCtr'

        }
      }
    })
    .state('trainer.individual', {
      url: '/individual',
      views: {
        '@': {
          template: require('./templates/trainer.individual_start.tpl.html'),
          controller: TrainerReportIndividualController.name + " as trainerReportIndividualCtr",
          resolve: TrainerReportIndividualController.resolve
        }
      }
    })
    // Список группы для выбора тренируемых 
    .state('trainer.group', {
      url: '/group/:groupId',
      views: {
        '@': {
          template: require('./templates/trainer.group.tpl.html')
        }
      }
    })
    // Планы тренирок 
    .state('trainer.myplans', {
      url: '/myplans',
      views: {
        '@': {
          template: require('./templates/trainer.group.tpl.html')
        }
      }
    });

  //==========================================================
  // Run Default action
  //==========================================================

}
