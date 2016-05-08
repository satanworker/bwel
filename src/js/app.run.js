/**
 * ionicPlatform detect platform ready
 * @description Стандартное определение и
 * @param  {[type]} $ionicPlatform [description]
 * @return 
 */
function ionicPlatform($ionicPlatform, SQLDB, DBNAME) {
  $ionicPlatform.ready(function() {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      window.StatusBar.styleDefault();
    }
    //@see http://www.html5rocks.com/en/tutorials/webdatabase/todo/
    // @see http://html5doctor.com/introducing-web-sql-databases/
   // _setupWebQSL(DBNAME);
  });
}

ionicPlatform.$inject = ['$ionicPlatform', 'SQLDB', 'DBNAME'];
//===============================================================
//
//===============================================================
var _sql = {
  "CREATE": []
};
_sql['CREATE'].push("CREATE TABLE IF NOT EXISTS trainees (id integer primary key autoincrement, firstname text, lastname text)");

/**
 * _setupWebQSL Настройка WebSQL БД  
 * 
 * @param  {Function} $ionicPlatform [description] 
 * @return  {Boolean} результат создания БД
 */
function _setupWebQSL(DBNAME) {
  var dbSize = 5 * 1024 * 1024; // 5MB 
  var db = window.openDatabase(DBNAME + ".db", "1.0", "bwell tariners Demo", dbSize);
  db.transaction(function(tx) {
    _sql["CREATE"].forEach((item) => {
      tx.executeSql(item, []);
    });
    var _demoUser = [{
      id: 1,
      firstname: "User 1",
      lastname: " Demo 1"
    }, {
      id: 2,
      firstname: "User 2",
      lastname: " Demo 2"
    }, {
      id: 3,
      firstname: "User 3",
      lastname: " Demo 3"
    }, {
      id: 4,
      firstname: "User 4",
      lastname: " Demo 4"
    }, ]
    _demoUser.forEach((user) => {
      tx.executeSql("INSERT INTO trainees (id , firstname,lastname) VALUES (?,?,?);", [user.id,user.firstname,user.lastname],
        function(transaction, results) {
          console.log(transaction, results, 'demo user insert')
        },
        function(transaction, err) {
          console.log(transaction, err);
        }
      );
    });
  });
}

/**
 * _setupQSLite Настройка SQLite БД
 * 
 * @param  {Function} $ionicPlatform  
 * @param  {Function} $cordovaSQLite  
 * @return {Boolean}                 
 */
function _setupQSLite($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    var db = $cordovaSQLite.openDB({
      name: "bwell.db"
    });
    _sql["CREATE"].forEach((item) => {
      $cordovaSQLite.execute(db, item);
    });
  });
}
//============================================
// $templateCache
//============================================
templateCache.$inject = ['$templateCache'];

function templateCache($templateCache) {
  $templateCache.put('app.screen.tpl.html', require('./templates/app.screen.tpl.html'));
}
export default {
  ionicPlatform,
  templateCache
};
