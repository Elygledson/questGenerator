export interface Question {
  id?: number;
  context: string;
  question: string;
  options: string[];
  answer: string;
  justifications: string[];
}
