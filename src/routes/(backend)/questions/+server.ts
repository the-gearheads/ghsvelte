import { json } from '@sveltejs/kit';
import type { QuestionList } from '$lib/questions.ts';

const questions: QuestionList = [
  {
    type: "radio",
    question: "What is your favorite color?",
    id: "color",
    options: [
      {
        id: "red",
        text: "Red"
      },
      {
        id: "blue",
        "text": "Blue"
      },
      {
        id: "yellow",
        text: "Yellow",
      },

    ],
    "default": "red"
  },
  {
    type: "shorttext",
    question: "Explain your previous answer in a 3000 word essay.",
    id: "essay",
    placeholder: "I like the color purple because..."
  }
]

export async function GET({ params }) {
  return json(questions);
}