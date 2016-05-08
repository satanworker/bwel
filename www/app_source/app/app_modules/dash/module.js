"use strict";

var
    _templates = {
        dashboard: require("./templates/dashboard.tpl.html"),
        popupList: {
            login: require("./templates/login.popup.tpl.html"),
            selectTrainingType: require("./templates/selectTrainingType.popup.tpl.html"),
            selectTrainee: require("./templates/selectTrainee.popup.tpl.html"),
            selectGroup: require("./templates/selectGroup.popup.tpl.html"),
            checkGroup: require("./templates/checkGroup.popup.tpl.html"),
            checkTrainer: require("./templates/checkTrainer.popup.tpl.html"),
            errorMessage: require("./templates/errorMessage.popup.tpl.html"),
            addNewTrainee: require("./templates/addNewTrainee.popup.tpl.html"),
        }
    }

/**
 * [exports Angular module dash]
 * @type {[type]}
 */
module.exports = angular.module('dash', ['pascalprecht.translate', 'ngMockE2E'])
    .config(['$translateProvider', function($translateProvider, $locale) {

        //$translateProvider.useSanitizeValueStrategy('sanitize');
        /*
        $translateProvider.translations('en', {
            'ENTER': 'enter',
            'Add': 'add',
            "CANCEL": 'cancel',
            'LOGIN': 'Login',
            'SELECT_TRAINEE': 'Select trainee',
            'SAVE': 'Save',
            'NAME': 'Name',
            'PHONE': 'Phone',
            'IN_TRAINING': 'In training',
            'SELECT_TRAINING_TYPE': 'Select training type',
            'PERSONAL_TRAINING': 'personal training',
            'GROUP_TRAINING': 'group training',
            'SELECT_GROUP': 'Select group',
            'ERROR_MESSAGE': 'There is no way to start a new training',
            'ADD_NEW_TRAINEE': 'add trainee',
            'ENTER_TRAINEE_NAME': 'enter the name of the trainee'


        });

        $translateProvider.translations('ar', {
            'LOGIN': 'הרשמה',
            'SELECT_TRAINEE': 'בחר מתאמן',
            'SAVE': 'שמור',
            'NAME': 'שם',
            'PHONE': 'טלפון',
            'IN_TRAINING': 'באימון',
            'GROUP_TRAINING': 'Group training'

        }, {
            rtl: true
        });

        $translateProvider.preferredLanguage('en');
        */
    }])
    .config(['$translateProvider', function($translateProvider) {

        $translateProvider.preferredLanguage('ar');

        $translateProvider.fallbackLanguage('en');

        $translateProvider.useStaticFilesLoader({
            prefix: 'i18n/', 
            suffix: '.json' 
        });
    }])
    .run(['$templateCache', function($templateCache) {
        $templateCache.put('templates/dash.tpl', _templates.dashboard);
        $templateCache.put('templates/login.popup.tpl', _templates.popupList.login);
        $templateCache.put('templates/selectTrainingType.popup.tpl', _templates.popupList.selectTrainingType);
        $templateCache.put('templates/selectTrainee.popup.tpl', _templates.popupList.selectTrainee);
        $templateCache.put('templates/selectGroup.popup.tpl', _templates.popupList.selectGroup);
        $templateCache.put('templates/checkGroup.popup.tpl', _templates.popupList.checkGroup);
        $templateCache.put('templates/checkTrainer.popup.tpl', _templates.popupList.checkTrainer);
        $templateCache.put('templates/errorMessage.popup.tpl', _templates.popupList.errorMessage);
        $templateCache.put('templates/addNewTrainee.popup.tpl', _templates.popupList.addNewTrainee);
    }])
