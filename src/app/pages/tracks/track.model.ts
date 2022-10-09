import { Round } from "../rounds/round.model";
import { Student } from "../students/student.model";

export class Track{
  id :number =0;
  trackName :string ="";
  startDate : string;
  endDate: string;
  adminId:number;
  roundId:number;
  roundName:string;

  
}

export class TrackData {
  rounds : Round[];
  students : Student[];
}
