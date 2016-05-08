function TrainerCalendarDataService($q, $http) {
  var urlApi = 'http://194.90.117.81:14001/BWell.Trainer.Mobile.WS.svc';
  return {
    getCalendar: _getCalendar

  };

  function _getCalendar() {
    let params = {
      Key: "VT$BbZGmM59exoO",
      TrainerId: "2a2c5a5d-ba0d-e411-af9f-d89d6764e58c"
    };

    return $http.get(urlApi + '/TrainerCalendar',
      params //,
      //transformResponse: appendTransform
    ).then(
      function(data) {
       // console.log(data);
       // alert(JSON.stringify(data));
        return data.data.Practices;
      },
      function(err) {
        alert('error:'+JSON.stringify(err));
       // console.log(err);
      }
    );
  }

  function appendTransform(defaults, transform) {

    // We can't guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];

    // Append the new transformation to the defaults
    return defaults.concat(transform);
  }
}

TrainerCalendarDataService.$inject = ['$q', '$http'];

export default TrainerCalendarDataService;
