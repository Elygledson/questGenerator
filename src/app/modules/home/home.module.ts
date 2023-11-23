import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { QuestionViewerModule } from '../view-questions/question-viewer.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';

// Add these two
import { LottieModule } from 'ngx-lottie';

// Export this function
export function playerFactory(): any {
  return import('lottie-web');
}

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    QuestionViewerModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatIconModule,
    MatButtonModule,
    MatButtonToggleModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [],
})
export class HomeModule {}
