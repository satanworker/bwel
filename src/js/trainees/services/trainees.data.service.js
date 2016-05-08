var demo_person = [{
  id: 1, 
  name: "Demo Person 1"
}, {
  id: 2,
  name: "Demo Person 2"
}, {
  id: 3,
  name: "Demo Person 3"
}, {
  id: 4,
  name: "Demo Person 4"
}]
import _ from "lodash";

function TraineesDataServices() {

  return {
    getPerson: _getPerson

  }

  function _getPerson(personId) {

     return _.findFirst(demo_person,{id:personId});
  }
}

export default TraineesDataServices;
