/**
 * Данные связанные с тренироваками и доступные треннеру 
 * GetTraineeDetails
 */
let dbSize = 5 * 1024 * 1024; // 5MB 
var db;
var _demo_data = [{
  id: 1,
  name: "DEMO GROUP 1"
}, {
  id: 2,
  name: "DEMO GROUP 2"
}];

import ionic from 'ionic';

function TrainerDataService($q, $http, DBNAME, $cordovaSQLite) {
  db = window.openDatabase(DBNAME + ".db", "1.0", "bwell tariners Demo", dbSize);
  // _setupWebSQL(db);
  return {
    getGroupList: ionic.Platform.device() ? _getGroupList : _getGroupList2,
    getTraineesWithPrivatePractice: _GetTraineesWithPrivatePractice,
    startPrivatePractice: _StartPrivatePractice
  };

  /**
   * _GetTraineesWithPrivatePractice  Получение списка Тренируемых для индивидуальной тренировки
   * @param  {Object} params  параметры для выполнения запроса
   * @return {Promise}        
   */
  function _GetTraineesWithPrivatePractice(params) {
    var deffer = $q.defer();
    console.log('_GetTraineesWithPrivatePractice:params ', params);
    // TODO : make baseUrlAPI as VALUE 
    var baseUrlAPI = 'http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc/';
    var req = {
      method: "GET",
      url: baseUrlAPI + 'GetTraineesWithPrivatePractice',
      params: {
        Key: params.Key,
        TrainerId: params.TrainerId
      }
    };
    // Request API 
    $http(req).then(
      (result) => {
        if (result.data && result.data.Error) {
          deffer.reject(result);
        } else {
          deffer.resolve(result.data.Trainees);
        }
      }, (err) => {
        deffer.reject(err);
      });
    return deffer.promise;
  }
  function _StartPrivatePractice(params){
    var deffer = $q.defer();
    console.log('_StartPrivatePractice:params ', params);
    // TODO : make baseUrlAPI as VALUE 
    var baseUrlAPI = 'http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc/';
    var req = {
      method: "POST",
      url: baseUrlAPI + 'StartPrivatePractice',
      params: {
        Key: params.Key,
        //TrainerId: params.TrainerId, //TODO: Не требуется но вероятно должен быть 
        PracticeStartTime: new Date().toISOString(),
        TraineeId:  params.TraineeId,
        Last4DigitsOfNationalId: params.Last4DigitsOfNationalId,
        Notes: params.Notes
      }
    };
    // Request API 
    $http(req).then(
      (result) => {
        if (result.data && result.data.Error) {
          deffer.reject(result);
        } else {
          console.log(result);
          deffer.resolve(result.data );
        }
      }, (err) => {
        deffer.reject(err);
      });
    return deffer.promise;
  }
}

function _getGroupList2() {
  return _demo_data;
}

function _getGroupList() {
  var _list = [];
  db.transaction(function(tx) {
    tx.executeSql('SELECT * FROM groups', [], function(tx, results) {
      var len = results.rows.length;
      for (let i = 0; i < len; i++) {
        //Set values coming from the database  
        _list.push(results.rows.item(i));
      }
    });
  });
  return _list;
}

//=================================
// _setupWebSQL
//=================================
function _setupWebSQL(db) {
  let _createTableGroup = "CREATE TABLE IF NOT EXISTS " +
    " groups (id integer primary key, name text);";
  var _insertTableGroup = "INSERT INTO groups ( id, name) VALUES(?,?);";
  let _demoData = [];
  db.transaction(function(tx) {
    tx.executeSql(_createTableGroup, [], _logTransaction, _errInfo);
  });

  function _logTransaction(tx, err) {
   // console.log('_logTransaction', tx, err);
    _demo_data.forEach((group) => {
      console.log(group, tx);
      tx.executeSql(_insertTableGroup, [group.id, group.name], function() {}, function(t, e) {
        console.log(t, e);
      });
    });

  }

  function _errInfo() {}
}
TrainerDataService.$inject = ['$q', '$http', 'DBNAME', '$cordovaSQLite'];
export default TrainerDataService;
