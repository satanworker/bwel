
class TrainercalendarController  {
 /*@ngInject*/
  constructor(TrainerCalendarDataSrv) {
     this.practices =[{}]; 
     this.TrainerCalendarDataSrv =TrainerCalendarDataSrv;
     this.TrainerCalendarDataSrv.getCalendar().then(
       (data)=>{           
          if(!!data){
           this.practices = data; 
          }
       }
     );
     console.log(this.practices);
  }

 
}

export default TrainercalendarController;