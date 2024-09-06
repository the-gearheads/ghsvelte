import type { Writable } from "svelte/store";
import localStore from "$lib/localStore";

type Id = string;
export type Answer = string | string[] | number;
export type QRDataType = {[key: string]: MatchData};
/* Keys gotta be short since they're in the QR code. Event code and username are stored in each matchdata because I want them to be standalone so they can be shuffled around. */

export interface MatchData {
  /* match number */
  m: number;
  /* team number */
  t: number;
  /* alliance color */
  c: "red" | "blue";
  /* position on alliance */
  p: number;
  /* anwers */
  a: Record<Id, Answer>;
  /* was it submitted to the server */
  s: boolean;
  /* author name/username. if undefined assume self*/
  un?: string;
  /* event code. if undefined assume self */
  ev?: string;
}

export default interface Data {
  /* event code */
  eventCode: string;
  /* username */
  username: string;
  /* match data, key is id */
  md: QRDataType;
}


export let formDataStore: Writable<Data> = localStore('formData', {
  eventCode: "",
  username: "",
  md: {},
});