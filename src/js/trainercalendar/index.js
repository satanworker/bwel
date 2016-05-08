import _module from "./trainercalendar.module";
import TrainerCalendarDataService from './trainercalendar.data.service';

_module.factory('TrainerCalendarDataSrv', TrainerCalendarDataService);
export default _module;