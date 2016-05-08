require('ngCordova');
require('./scss/trainees.bashboard.scss');

import ng from 'angular';
import TraineesDashboardController from './controllers/trainees.screen.controller';
import TraineesTeamsController from './controllers/trainees.teams.controller';
import TraineesPersonController from './controllers/trainees.person.controller';
import TraineesFotoController from './controllers/trainees.foto.controller';

export default ng.module('bwell.trainees', ['ngCordova', 'ionic'])
  .config(_states)
  .controller(TraineesDashboardController.name, TraineesDashboardController)
  .controller(TraineesTeamsController.name, TraineesTeamsController)
  .controller(TraineesPersonController.name, TraineesPersonController)
  .controller(TraineesFotoController.name, TraineesFotoController)

.run(_runModuleDefault);

_runModuleDefault.$inject = ['$state'];

function _runModuleDefault($state) {
  console.log('bwell.trainees');
  // $state.go('trainees.person', {
  //   personId: 1
  // });
}

/**
 * 
 */
_states.$inject = ['$stateProvider'];

function _states($stateProvider) {
  $stateProvider.state('trainees', {
    url: '/trainees',
    abstract: '.dashboard',
    templateUrl: 'app.screen.tpl.html', // require('./templates/trainees.screen.html')
  });
  // экран по умолчанию - список тренируемых 
  $stateProvider.state('trainees.dashboard', {
    url: '',
    template: require('./templates/trainees.bashboard.tpl.html'),
    controller: TraineesDashboardController.name + ' as dashboardCtr',
    resolve: TraineesDashboardController.resolve
  });
  // 
  $stateProvider.state('trainees.teams', {
    url: '/teams',
    views: {
      "@trainees": {
        template: require('./templates/trainees.teams.tpl.html'),
        controller: TraineesTeamsController.name + ' as traineesTeamsCtr',
        resolve: TraineesTeamsController.resolve
      }
    }
  });

  // экран просмотра персональных данных отдельного тренируемого с функцие отправки фотографии
  $stateProvider.state('trainees.person', {
    url: '/person/:personId',
    views: {
      "@": {
        template: require('./templates/trainees.person.tpl.html'),
        controller: TraineesPersonController.name + ' as personCtr',
        resolve: TraineesPersonController.resolve
      }
    }
  });
  //  Экран просмотра и отправки фото добавление к личному делу сфотографированных документов
  $stateProvider.state('trainees.person.foto', {
    url: '/foto/:typeId',
    views: {
      "@": {
        template: require('./templates/trainees.person.foto_confirm.tpl.html'),
        controller: TraineesFotoController.name + ' as personFotoCtr',
        resolve: TraineesFotoController.resolve
      }
    }
  });

}
