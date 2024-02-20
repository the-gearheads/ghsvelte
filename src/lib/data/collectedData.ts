import type { Writable } from "svelte/store";
import localStore from "$lib/localStore";

type Id = string;
export type Answer = string | string[] | number;
/* Keys gotta be short since they're in the QR code */

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
  /* id */
  i: string;
}

export default interface Data {
  /* event code */
  ev: string;
  /* username */
  un: string;
  /* match data */
  md: MatchData[];
}


export let formDataStore: Writable<Data> = localStore('formData', {
  ev: "",
  un: "",
  md: [],
});