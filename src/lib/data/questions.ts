type QuestionTypes = "radio" | "longtext"  | "shorttext" | "checkbox" | "slider";

export interface BaseQuestion {
  question: string,
  id: string,
  type: QuestionTypes,
  /* defaults to true */
  required?: boolean,
}

/* for radio and checkbox questions */
interface Group {
    id: string,
    text: string
}

export interface RadioQuestion extends BaseQuestion {
  type: "radio",
  options: Group[],
  default?: string,
}

export interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox",
  options: Group[],
  default?: string[],
}

export interface LongTextQuestion extends BaseQuestion {
  type: "longtext",
  placeholder?: string,
}

export interface ShortTextQuestion extends BaseQuestion {
  type: "shorttext",
  placeholder?: string,
}

export interface SliderQuestion extends BaseQuestion {
  type: "slider",
  min: number,
  max: number,
  step: number,
  default?: number,
}

export type Question = RadioQuestion | CheckboxQuestion | LongTextQuestion | ShortTextQuestion | SliderQuestion;

export type QuestionList = Question[];

export const questions: QuestionList = [
  {
    type: "radio",
    question: "What is your favorite color of rock?",
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
    type: "longtext",
    question: "Explain your previous answer in a 3000 word essay.",
    id: "essay",
    placeholder: "I like the color purple because..."
  },
  {
    "type": "slider",
    "question": "How much do you like the color purple?",
    "id": "slider",
    "min": 0,
    "max": 10,
    "step": 1,
    "default": 6
  },
  {
    "type": "slider",
    "question": "How much do you like the color red?",
    "id": "slider2",
    "min": 0,
    "max": 10,
    "step": 1,
    "default": 5
  }
]

export default function idToQuestion(id: string): Question {
  const question = questions.find(q => q.id === id);
  if (question === undefined) {
    console.warn(`Could not find question with id ${id}`);
    return {
      question: "[ID Not Found]",
      id: "error",
      type: "shorttext",
    }
  }
  return question;
}