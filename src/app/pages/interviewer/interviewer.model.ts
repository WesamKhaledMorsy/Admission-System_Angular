import { Interview } from "../interview/interview.model";
import { Round } from "../rounds/round.model";
import { Student } from "../students/student.model";

export class Interviewer
{
  id:number=0;
  interviewerName :string ="";
  startDate : string;
  endDate: string;
  roundId :number;
  roundName: string;
  studentId :number;
  studentName : string;
  interviewId: number;
  interviewName : string;
  adminId:number;
}
export class InterviewerData{
  students : Student[];
  interview : Interview[];
  rounds: Round[];
}
