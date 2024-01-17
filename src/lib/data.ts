type Id = string;
type Answer = string | string[] | number;
export default interface Data {
  event: string;
  matchNo: number;
  teamNo: number;
  postiion: number;
  answers: Record<Id, Answer>;
}