type Id = string;
type Answer = string | string[] | number;
export default interface Data {
  event: string;
  username: string;
  matchData: {
    /* match number */
    matchN: number;
    /* team number */
    teamN: number;
    /* alliance color */
    alliance: "red" | "blue";
    /* position on alliance */
    pos: number;
    /* anwers */
    ans: Record<Id, Answer>;
  }
}