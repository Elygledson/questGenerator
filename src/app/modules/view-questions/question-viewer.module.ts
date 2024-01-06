import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionViewerComponent } from './question-viewer.component';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [QuestionViewerComponent],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  exports: [QuestionViewerComponent],
})
export class QuestionViewerModule {}
