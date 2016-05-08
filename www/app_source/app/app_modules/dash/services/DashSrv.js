/**
 * DashSrv 
 */
require('../module.js')
    //TODO: delete fake data   
    .run(['$httpBackend', function($httpBackend) {
        var serviceUrl = "http://109.226.39.196:18500";
        var serverDataOK = {
            "Error": false,
            "ErrorMessage": null,
            "Contacts": [{
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc38",
                "Name": "אביב יגר"
            }, {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc39",
                "Name": "תומר חן"
            }, {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc40",
                "Name": "ערן לבון"
            },
            {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc41",
                "Name": "אמיתי נחמד"
            }],
            "Id": "32a38d24-bca4-e411-8ad3-d89d6764b68c"
        };
        $httpBackend.whenGET(serviceUrl + "/BWellService.svc//GetTrainer?phone=0524649545&key=VT$BbZGmM59exoO").
        respond(200, serverDataOK);
        // TODO:
        $httpBackend.whenPOST('/phones').respond(function(method, url, data, headers) {
            console.log('Received these data:', method, url, data, headers);
            phones.push(angular.fromJson(data));
            return [200, {}, {}];
        });

        $httpBackend.whenGET(/templates\/\w+.*/).passThrough();
        $httpBackend.whenGET(/i18n\/\w+.*/).passThrough();

        var groupList = {
            "Error": false,
            "ErrorMessage": null,
            "GroupList": [{
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc38",
                "Name": "אינטל בוקר"
            }, {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc39",
                "Name": "אמדוקס זומבה"
            }, {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc40",
                "Name": "מטריקס פילאטיס"
            },
            {
                "Id": "b289c0cc-baa4-e411-b50c-d89d6763fc41",
                "Name": "מקאן אריקסון יוגה"
            }],
            "Id": "32a38d24-bca4-e411-8ad3-d89d6764b68c"
        };

        $httpBackend.whenGET(serviceUrl + "/BWellService.svc//GetGroupList").respond(200, groupList);

    }])
    // 
    .factory('DashSrv', ['$http', '$q', 'localStorageService', function($http, $q, localStorageService) {

        var
            _isTraining = localStorageService.get('_isTraining') || false,
            _isAuth = localStorageService.get('userInfo') ? true : false,
            serviceUrl = "http://109.226.39.196:18500"; //TODO: rebase to constant CONFIG.

        return {

            auth: function(data) {
                /* отпарвка запроса на сервер и авторизация пользователя */
                return true;
            },

            checkGeolocation: function() {
                // TODO: @see https://github.com/jessemonroy650/Phonegap-GPS-Test/blob/master/gpsNotepad.js
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(function(position) {
                        console.log(position);
                    });
                } else {
                    //console.log('Geolocation is not supported by this browser.');
                }
                return true
            },

            verificationTrainer: function(data) {
                return true;
            },

            setTrainingStatus: function(value) {
                localStorageService.set('_isTraining', value);
                _isTraining = value;
            },

            isAuth: function() {
                console.log(localStorageService.get('userInfo') ? true : false);
                return localStorageService.get('userInfo') ? true : false;
            },


            /**
             * [firstRegistration description]
             * @param  {[type]} userInfo [description]
             * @return {[type]}          [description]
             */
            firstRegistration: function(userInfo) {
                var deferred = $q.defer();
                var promise = deferred.promise;

                if (!!userInfo.phone) {
                    this.setUserInfo(userInfo);
                    deferred.resolve(userInfo)
                } else {
                    deferred.reject(null);
                }

                return promise;
            },

            /**
             * [setUserInfo description]
             * @return {[type]} [description]
             */
            setUserInfo: function(value) {
                localStorageService.set('userInfo', value);
            },

            /**
             * [getUserInfo description]
             * @return {[type]} [description]
             */
            getUserInfo: function() {
                return localStorageService.get('userInfo');
            },

            /**
             * [getListContacts description]
             * @return {[type]} [description]
             */
            getListContacts: function(userInfo) {
                var req = $http
                    .get(serviceUrl + "/BWellService.svc//GetTrainer?phone=0524649545&key=VT$BbZGmM59exoO");
                console.log('--', req)
                return req;
            },

            /**
             * [setTraineePerson description]
             * @return {[type]} [description]
             */
            setTraineePerson: function(traineePerson) {
                return localStorageService.set('traineePerson', traineePerson);
            },

            /**
             * [getTraineePerson description]
             * @return {[type]} [description]
             */
            getTraineePerson: function() {
                return localStorageService.get('traineePerson') || {};
            },

            /**
             * [removeTraineePerson description]
             * @return {[type]} [description]
             */
            removeTraineePerson: function() {
                return localStorageService.remove('traineePerson');
            },

            /**
             * [setGroupTraining description]
             * @return {[type]} [description]
             */
            setGroupTraining: function(groupTraining) {
                return localStorageService.set('groupTraining', groupTraining);
            },

            /**
             * [getGroupTraining description]
             * @return {[type]} [description]
             */
            getGroupTraining: function() {
                return localStorageService.get('groupTraining') || [];
            },

            /**
             * [removeGroupTraining description]
             * @return {[type]} [description]
             */
            removeGroupTraining: function() {
                return localStorageService.remove('groupTraining');
            },

            getGroupList: function() {
                return $http.get(serviceUrl + "/BWellService.svc//GetGroupList");
            },

            getCurGroup: function(){
                return localStorageService.get('curGroup');
            },

            setCurGroup: function(curGroup){
                return localStorageService.set('curGroup', curGroup);
            }

        }
    }])
