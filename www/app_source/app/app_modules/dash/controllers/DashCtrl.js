/**
 * DashCtrl - Dashboard Controller - controll all logick application
 */
require('../module.js')
    .controller('DashCtrl', ['$scope', 'DashSrv', 'TrainingSrv', '$ionicPopup', '$ionicLoading',
        function($scope, DashSrv, TrainingSrv, $ionicPopup, $ionicLoading) {
            var popupLogin,
                popupSelectTypeTraining,
                popupListTrainees,
                popupGroupTraining,
                popupVerification,
                popupErrorMessage;

            $scope.listTrainees = [];
            $scope.currentTreene = DashSrv.getTraineePerson();
            $scope.currentTreenees = DashSrv.getGroupTraining();
            $scope.currentGroup = DashSrv.getCurGroup();
            $scope.model = {};
            $scope.treineeInfo = {
                workoutCount: 8,
                maxWorkoutCount: 10
            }

            $scope.security = {
                isAuth: DashSrv.isAuth
            };

            $scope.isActiveTraining = TrainingSrv.isActiveTraining;

            $scope.diffTimer = TrainingSrv.diffTimer;
            /**
             * [onOpenLoginForm Event of Open Login Form for User registration on Device]
             * 
             * @description событие вызова окна регистрации пользователя на устройстве
             * 
             * @param  {[Events]}  $event
             * @return null   
             */
            $scope.onOpenLoginForm = function(e) {
                //  
                if ($scope.security.isAuth()) {
                    //console.log('user is auth');
                    e.preventDefault();
                    return;
                } else {

                    // NOTE: call standart popup  
                    popupLogin = $ionicPopup
                        .show({
                            title: '',
                            subTitle: '',
                            templateUrl: 'templates/login.popup.tpl',
                            cssClass: 'disable-title',
                            // buttons: [{
                            //     text: '<b>שמור</b>', // NOTE: "SAVE"
                            //     type: 'button-positive',
                            //     onTap: this.onSaveUserInfo
                            // }],
                            scope: $scope
                        })
                    popupLogin.then(
                        // NOTE: success close popup
                        function(res) {
                            //console.log('Tapped!', res);
                        },
                        //NOTE: error in popup
                        function(err) {

                        }
                    );
                }
            };
            /**
             * [onSaveUserInfo event call Save User Information]
             *
             * @description Событие сохранить данные пользователя в приложении
             * 
             * @param  {[type]} e $event from element
             * @return {[type]}   [description]
             */
            $scope.onSaveUserInfo = function(e) {
                e.preventDefault();
                $ionicLoading.show({
                    template: 'Please wait...'
                });

                // TODO: check auth data and save on device
                DashSrv.firstRegistration($scope.model)
                    .then(
                        function(data) {
                            //console.log(data)
                            popupLogin.close(data);
                            $ionicLoading.hide();
                        },
                        function(err) {
                            $ionicLoading.hide();
                        }
                    )
            };
            /**
             * [onCloseLoginPopup close popup login Form ]
             *
             * @description Закрыть popup формы авторизации (регистрации)
             * 
             * @return {[type]} [description]
             */
            $scope.onCloseLoginPopup = function() {
                popupLogin.close();
            };
            /**
             * [onOpenListTrainees open List of Person ]
             *
             * @description Отобразить список тренеруемых 
             * 
             * @return {[type]} [description]
             */
            $scope.onOpenListTrainees = function() {
                if ($scope.security.isAuth()) {
                    $ionicLoading.show({
                        template: 'Please wait... Get list of contacts'
                    });
                    DashSrv.getListContacts()
                        .then(function(data) {
                            //console.log(data);
                            $scope.listTrainees = data.data.Contacts;
                            $ionicLoading.hide();
                            popupListTrainees = $ionicPopup.show({
                                templateUrl: 'templates/selectTrainee.popup.tpl',
                                cssClass: 'disable-title',
                                scope: $scope
                            });
                        }, function(err) {
                            //console.log(err)
                            $ionicLoading.hide();
                        })
                } else {
                    //console.log('not auth');
                }
            };

            /**
             * [onOpenGroupTraining event open popupGroupTraining from select trainees persone ]
             *
             * @description Отобразить список тренеруемых 
             * 
             * @return {[type]} [description]
             */
            $scope.onOpenGroupTraining = function() {
                if ($scope.security.isAuth()) {
                    $ionicLoading.show({
                        template: 'Please wait... Get list of contacts'
                    });
                    DashSrv.getListContacts()
                        .then(function(data) {
                            //console.log(data);
                            $scope.listTrainees = data.data.Contacts;
                            $ionicLoading.hide();
                            popupGroupTraining = $ionicPopup.show({
                                templateUrl: 'templates/selectGroup.popup.tpl',
                                cssClass: 'disable-title',
                                scope: $scope
                            });
                        }, function(err) {
                            //console.log(err)
                            $ionicLoading.hide();
                        })
                } else {
                    //console.log('not auth');
                }
            };

            /**
             * [onCloseGroupTraining event close popupGroupTraining ]
             *
             * @description Отобразить список тренеруемых 
             * 
             * @return {[type]} [description]
             */
            $scope.onCloseGroupTraining = function() {
                popupGroupTraining.close();
                $scope.currentTreenees = [];
            }

            /**
             * [onSelectTraineePerson event select Contact Person for training ]
             *
             * @description Выбор персоны из списка тренируемых. Сохранение данных персоны в localStorage.
             * 
             * @param  Event e             [description]
             * @param  Object selectedTrainee [description]
             * @return {[type]}               [description]
             */
            $scope.onSelectTraineePerson = function(e, selectedContact) {
                $scope.currentTreene = selectedContact; // NOTE: set
                popupListTrainees.close();
                /* save traineePerson info on localStorage */
                DashSrv.setTraineePerson(selectedContact);

                popupVerification = $ionicPopup.show({
                    title: '',
                    subTitle: '',
                    templateUrl: 'templates/checkTrainer.popup.tpl',
                    cssClass: 'disable-title',
                    scope: $scope
                });
                // NOTE: then close popupVerification 
                popupVerification.then(
                    function(data) {
                        popupListTrainees.close();
                    }
                )
            };

            /**
             * [onAddTraineInGroup event select Contact Person for training ]
             *
             * @description Выбор персоны из списка тренируемых. Сохранение данных персоны в localStorage.
             * 
             * @param  Event e             [description]
             * @param  Object selectedTrainee [description]
             * @return {[type]}               [description]
             */
            $scope.onAddTraineInGroup = function(e, selectedContact, click) {
                if (click) {
                    $scope.currentTreenees.forEach(function(item, key) {
                        if (selectedContact.Id == item.Id) {
                            $scope.currentTreenees.splice(key, 1);
                        }
                    });
                } else {
                    console.log('add!');
                    $scope.currentTreenees.push(selectedContact);
                }
            };

            /**
             * [onOpenVerificationPopup event open popupVerification from enter verification code ]
             *
             * @description Окно для верификации тренера по коду
             * 
             * @param  Event e             [description]
             * @param  Object selectedTrainee [description]
             * @return {[type]}               [description]
             */
            $scope.onOpenVerificationPopup = function() {
                if (popupCheckGroup) {
                    popupCheckGroup.close();
                }
                DashSrv.setGroupTraining($scope.currentTreenees);
                DashSrv.setCurGroup($scope.currentGroup);
                popupVerification = $ionicPopup.show({
                    title: '',
                    subTitle: '',
                    templateUrl: 'templates/checkTrainer.popup.tpl',
                    cssClass: 'disable-title',
                    scope: $scope
                });
            }

            /**
             * [onCloseListTraineesPopup close List of Trainees ]
             * @return {[type]} [description]
             */
            $scope.onCloseListTraineesPopup = function() {
                $scope.currentTreene = {}; // NOTE: закрыли
                popupListTrainees.close();
            };

            /**
             * [onCloseVerificationPopup close verification code controll, clear currentTreene, currentTreenees and model.code]
             * @return {[type]} [description]
             */
            $scope.onCloseVerificationPopup = function() {
                $scope.model = {};

                $scope.currentTreene = {};
                DashSrv.removeTraineePerson();

                $scope.currentTreenees = [];
                DashSrv.removeGroupTraining();

                popupVerification.close();
            };

            /**
             * [onStartTraining description]
             *
             *  @description  Стартовать тренировку 
             * 
             * @param  {[type]} e                [description]
             * @param  {[type]} confirmCode перкоснальнй код трененра для проверки права доступа
             * @return {[type]}                  [description]
             */
            $scope.onStartTraining = function(e, confirmCode) {
                //console.log(confirmCode);
                // TODO: проверить код удостовенрения личности тренера 
                popupVerification.close();
                $scope.model = {};
                // TODO: получить геолокационные данные 
                // TODO: отправить данные на сервер
                var _timeStartTraning = +new Date;
                // TODO: установить время завершения тренировки
                var _minutesTraining = 0.5; // NOTE: время тренировки
                TrainingSrv.setTimeStartTraining(_timeStartTraning)
                    .then(
                        function(timeStart) {
                            var _timeStopTraning = new Date(timeStart + (_minutesTraining * 60 * 1000)).getTime();
                            //console.log('_timeStopTraning', _timeStopTraning);
                            //console.log('timeStart', timeStart);
                            TrainingSrv.setTimeStopTraining(_timeStopTraning)
                                .then(
                                    function(timeStop) {
                                        TrainingSrv.startTimer()
                                            //console.log(timeStop);
                                        try {
                                            //console.log(cordova);
                                            /*
                                            $cordovaLocalNotification.add({
                                                id: timeStop,
                                                at: new Date(timeStop),
                                                text: 'Training is over',
                                                title: 'B-well trainers',
                                                autoCancel: true
                                            }).then(function() {
                                                console.log('nat start!');
                                            });
                                            */
                                        } catch (e) {
                                            //console.log(e)
                                        }
                                        //console.log('time stop', timeStop);

                                    })

                        }
                    )
            };

            /**
             *  Наблюдение за изменением автивности тренировки  
             */
            $scope.$watch(TrainingSrv.isActiveTraining, function(newVal) {
                $scope.isActiveTraining = newVal;
                if (!newVal) {
                    $scope.currentTreenees = [];
                    $scope.currentTreene = {};
                    DashSrv.removeTraineePerson();
                    DashSrv.removeGroupTraining();
                }
            });

            /**
             * [onShowErrorMessagePopup open popup - "error message" ]
             * @return {[type]} [description]
             */
            $scope.onShowErrorMessagePopup = function() {
                if ($scope.isActiveTraining) {
                    popupErrorMessage = $ionicPopup.show({
                        templateUrl: 'templates/errorMessage.popup.tpl',
                        cssClass: 'disable-title error-popup',
                        scope: $scope
                    });
                }
            }

            /**
             * [onCloseErrorMessagePopup close popup - "error message" ]
             * @return {[type]} [description]
             */
            $scope.onCloseErrorMessagePopup = function() {
                popupErrorMessage.close();
            }

            /**
             * [onShowSelectTrainingTypePopup open popup - "select training type" ]
             * @return {[type]} [description]
             */
            $scope.onShowSelectTrainingTypePopup = function() {
                if ($scope.security.isAuth()) {
                    popupSelectTypeTraining = $ionicPopup.show({
                        cssClass: 'disable-title',
                        templateUrl: 'templates/selectTrainingType.popup.tpl',
                        scope: $scope
                    });
                }
            }

            /**
             * [onCloseSelectTrainingTypePopup close popup - "select training type" ]
             * @return {[type]} [description]
             */
            $scope.onCloseSelectTrainingTypePopup = function() {
                popupSelectTypeTraining.close();
            }

            /**
             * [onSelectTrainingType selected training type ]
             * @return {[type]} [description]
             */
            $scope.onSelectTrainingType = function(e, trainingType) {
                if ($scope.security.isAuth()) {
                    e.preventDefault();
                    if (trainingType == 'personal') {
                        $scope.onOpenListTrainees();
                    }
                    if (trainingType == 'group') {
                        $scope.onOpenGroupList();
                    }
                    popupSelectTypeTraining.close();
                }
            }

            /**
             * [onOpenGroupList open popup - "select group" ]
             * @return {[type]} [description]
             */
            $scope.onOpenGroupList = function() {

                DashSrv.getGroupList().then(function(res) {
                    $scope.groupList = res.data.GroupList;
                }, function(error) {
                    console.log(error);
                })

                popupSelectGroup = $ionicPopup.show({
                    cssClass: 'disable-title',
                    templateUrl: 'templates/selectGroup.popup.tpl',
                    scope: $scope
                });
            }

            /**
             * [onCloseGroupList close popup - "select group" ]
             * @return {[type]} [description]
             */
            $scope.onCloseGroupList = function() {
                popupSelectGroup.close();
            }

            /**
             * [onSelectGroup selected group ]
             * @return {[type]} [description]
             */
            $scope.onSelectGroup = function(group) {
                popupSelectGroup.close();
                $scope.currentGroup = group;
                DashSrv.getListContacts()
                    .then(function(data) {

                        $scope.testList = data.data.Contacts;
                        $scope.lowLine = $scope.testList.length;

                        $ionicLoading.hide();
                        popupCheckGroup = $ionicPopup.show({
                            cssClass: 'disable-title',
                            templateUrl: 'templates/checkGroup.popup.tpl',
                            scope: $scope
                        });
                    }, function(err) {
                        //console.log(err)
                        $ionicLoading.hide();
                    })
            }

            /**
             * [onOpenCheckGroupPopup open popup - "check group" ]
             * @return {[type]} [description]
             */
            $scope.onOpenCheckGroupPopup = function() {
                popupCheckGroup = $ionicPopup.show({
                    cssClass: 'disable-title group-popup',
                    templateUrl: 'templates/checkGroup.popup.tpl',
                    scope: $scope
                });
            }

            /**
             * [onCloseCheckGroupPopup close popup - "check group" ]
             * @return {[type]} [description]
             */
            $scope.onCloseCheckGroupPopup = function() {
                popupCheckGroup.close();
            }

            /**
             * [changeLine control checkgroup slider ]
             * @return {[type]} [description]
             */
            $scope.changeLine = function(event) {
                if (event == 'up' && $scope.lowLine > 4) {
                    $scope.lowLine = $scope.lowLine - 1;
                }
                if (event == 'down' && $scope.lowLine < $scope.testList.length) {
                    console.log('down');
                    $scope.lowLine = $scope.lowLine + 1;
                }
            }

            /**
             * [onOpenAddNewTraineePopup open popup - "add new trainee" ]
             * @return {[type]} [description]
             */
            $scope.onOpenAddNewTraineePopup = function() {
                popupAddNewTrainee = $ionicPopup.show({
                    cssClass: 'disable-title',
                    templateUrl: 'templates/addNewTrainee.popup.tpl',
                    scope: $scope
                });
            }

            /**
             * [onCloseAddNewTraineePopup close popup - "add new trainee" ]
             * @return {[type]} [description]
             */
            $scope.onCloseAddNewTraineePopup = function() {
                popupAddNewTrainee.close();
            }

            /**
             * [onAddNewTrainee add new trainee on current trainee list ]
             * @return {[type]} [description]
             */
            $scope.onAddNewTrainee = function(newTrainee) {
                $scope.testList.push({
                    Name: newTrainee
                });
                popupAddNewTrainee.close();
                $scope.lowLine = $scope.lowLine + 1;
            }

        }
    ])
    .filter('checkGroupFilter', function() {

        return function(input, scope) {

            var count = 4;
            var min = scope.lowLine - count;
            var out = [];
            angular.forEach(input, function(item, key) {
                if (key >= min && key <= scope.lowLine - 1) {
                    out.push(item);
                }

            })
            return out;
        }

    });
