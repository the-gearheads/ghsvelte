import type { QuestionList } from "$lib/questions";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  var q = await fetch("/questions");
  var questions = await q.json();
  return {questions: questions as QuestionList};
}