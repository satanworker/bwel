/**
 * TrainingSrv.js - Сервис работы с данными по Текущей тренировке
 */
require('../module.js')
    .factory('TrainingSrv', ['$q', '$interval', '$timeout', 'localStorageService', function($q, $interval, $timeout, localStorageService) {
        var _timeStartTraining = localStorageService.get('timeStartTraining');
        var _timeStopTraining = localStorageService.get('timeStopTraining');
        var _isActiveTraining = localStorageService.get('timeStartTraining') ? true : false;
        var _timerDiff = getTimer(0);
        var _minutesTraining = 1; // TODO: 60 минут тренировки в продакшен 
        //console.log('start ', '_timeStartTraining= ', _timeStartTraining, '_isActiveTraining= ', _isActiveTraining);
        /**
         * setTimeStopTraining - сохранить время завершения тренировки
         */
        this.setTimeStopTraining = function(time) {
            var _deffered = $q.defer();
            var _promise = _deffered.promise;
            //console.log('setTimeStopTraining', time);
            // TODO: добавить проверку указанного времени - больше текушего времени
            if (localStorageService.set('timeStopTraining', time)) {
                _deffered.resolve(time)
            } else {
                _deffered.reject()
            }
            return _promise;
        };
        /**
         * Начать контроль времени завершения тренировки 
         */
        this.setTimeStartTraining = function(time) {
            var _deffered = $q.defer();
            var _promise = _deffered.promise;
            //console.log('startTraining', time);
            // TODO: добавить проверку указанного времени - больше текушего времени
            if (localStorageService.set('timeStartTraining', time)) {
                _deffered.resolve(time)
            } else {
                _deffered.reject()
            }
            return _promise;
        };
        /**
         * [isActiveTraining проверка наступления завершения занятия 
         * @return {Boolean} [description]
         */
        this.isActiveTraining = function() {

            //console.log('isActiveTraning', _isActiveTraining)
            var _timeStart = localStorageService.get('timeStartTraining');
            var _timeStop = localStorageService.get('timeStopTraining');
            var _now = +new Date;
            if (!!_timeStart && !!_timeStop) {
                //_isActiveTraining = localStorageService.get('timeStartTraining') ? true : false;
                var diffTime = _timeStop - _now;
                //console.log(diffTime);
                return (diffTime > 0)
            } else {
                return false
            }

        };

        function getTimer(count) {
            var timer = new Object();
            timer.mseconds = count / 1000;
            //count = (count - timer.seconds) / 60;

            timer.seconds = count % 60;
            count = (count - timer.seconds) / 60;

            timer.minutes = count % 60;
            count = (count - timer.minutes) / 60;

            timer.hours = count % 24;
            timer.days = (count - timer.hours) / 24;

            for (i in timer) {
                if (timer[i] <= 0) {
                    timer[i] = '0';
                }
                if(timer[i] < 10) {
                    timer[i] = '0' + timer[i];
                }
            }

            return timer;
        };
        /**
         * [startTimer description]
         * @see http://jsfiddle.net/KiTE/mUHmr/
         * @return {[type]} [description]
         */
        var intervalID;
        this.startTimer = function() {
            var _now = new Date(); // Текущее время
            var _timeStartTraining = localStorageService.get('timeStartTraining'); // 
            var _timeStopTraining = localStorageService.get('timeStopTraining'); //
            if (!!_timeStartTraining && !!_timeStopTraining) {

            }

            var counter = _timeStopTraining - _now.getTime(); // кол-во милисекунд до окончания тренировки
            var timeout = counter % 1000; // Милисекунды до синхронного вывода целых секунд

            counter = (counter - timeout) / 1000; // Кол-во секунд до завершения тренировки     
            //console.log('startTimer', _timeStopTraining, 'timeout', timeout, counter)

            $timeout(function() {
                //console.log(getTimer(counter)); // Синхронный вывод 1-й целой секунды
                _timerDiff = getTimer(counter + 1);
                if (!!intervalID)
                    $interval.cancel(intervalID);
                intervalID = $interval(function() {
                    counter--;
                    if (counter >= 0) {
                        _timerDiff = getTimer(counter);
                        //console.log(getTimer(counter)); //TODO: set val  Синхронный вывод n-й целой секунды
                    } else {
                        $interval.cancel(intervalID);
                        // TODO: stop Timer - clear local storage 
                        localStorageService.remove('timeStartTraining'); //localStorageService.set('timeStartTraining', _now.getTime()) ? true : false;
                    }
                }, 1000);
            }, timeout);
        }

        this.startTimer()

        this.diffTimer = function() {
            //console.log('diffTimer', _timerDiff)
            return _timerDiff
        }

        return this
    }])
