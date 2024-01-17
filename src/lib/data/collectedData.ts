type Id = string;
type Answer = string | string[] | number;
/* Keys gotta be short since they're in the QR code */
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