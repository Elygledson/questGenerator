import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionViewerComponent } from './question-viewer.component';

@NgModule({
  declarations: [QuestionViewerComponent],
  imports: [CommonModule],
  providers: [],
  exports: [QuestionViewerComponent],
})
export class QuestionViewerModule {}
