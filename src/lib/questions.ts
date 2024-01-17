type QuestionTypes = "radio" | "longtext"  | "shorttext" | "checkbox" | "slider";

interface BaseQuestion {
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

interface RadioQuestion extends BaseQuestion {
  type: "radio",
  options: Group[],
  default?: string,
}

interface CheckboxQuestion extends BaseQuestion {
  type: "checkbox",
  options: Group[],
  default?: string[],
}

interface LongTextQuestion extends BaseQuestion {
  type: "longtext",
  placeholder?: string,
}

interface ShortTextQuestion extends BaseQuestion {
  type: "shorttext",
  placeholder?: string,
}

interface SliderQuestion extends BaseQuestion {
  type: "slider",
  min: number,
  max: number,
  step: number,
  default: number,
}

export type Question = RadioQuestion | CheckboxQuestion | LongTextQuestion | ShortTextQuestion | SliderQuestion;

export type QuestionList = Question[];