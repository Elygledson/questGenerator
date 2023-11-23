import { Component, Input } from '@angular/core';
import { Question } from './interfaces/question.interface';

@Component({
  selector: 'app-question-viewer',
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.css'],
})
export class QuestionViewerComponent {
  @Input() questions: Question[] = [];
  letters: string[] = ['A', 'B', 'C', 'D', 'E'];
}
