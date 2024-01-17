import type { QuestionList } from "$lib/questions";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
  try {
    var q = await fetch("/questions");
    var questions = await q.json();
    return { questions: questions as QuestionList };
  } catch (error) {
    // Handle the error here
    console.error("Error fetching data:", error);

    // You can return a default or empty value or throw a custom error if needed
    return { questions: [] }; // Replace with your default value or handle the error accordingly
  }
};