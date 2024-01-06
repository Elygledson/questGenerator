import { Component, Input, OnInit } from '@angular/core';
import { Question } from './interfaces/question.interface';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-question-viewer',
  templateUrl: './question-viewer.component.html',
  styleUrls: ['./question-viewer.component.css'],
})
export class QuestionViewerComponent implements OnInit {
  @Input() questions: Question[] = [];
  public letters: string[] = ['A', 'B', 'C', 'D', 'E'];
  public form: UntypedFormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      questions: this.formBuilder.array([]),
    });
  }

  ngOnInit() {
    this.questions.forEach((question) => {
      this.addQuestion(question);
    });
  }

  get questionsFormArray() {
    return this.form.get('questions') as FormArray;
  }

  getOptions(value: any) {
    return value;
  }

  addQuestion(question?: Question) {
    const newQuestion = this.formBuilder.group({
      id: new FormControl(-1),
      context: new FormControl('', [Validators.required]),
      question: new FormControl('', [Validators.required]),
      options: this.addOption(question?.options || []),
      answer: new FormControl('', [Validators.required]),
      justifications: this.formBuilder.array([]),
      editable: new FormControl(false),
    });
    if (question) {
      newQuestion.patchValue(question);
    }
    this.questionsFormArray.push(newQuestion);
  }

  addOption(options: any[]) {
    const optionsForm = this.formBuilder.group({
      options: this.formBuilder.array([]),
    });
    const newOptions = optionsForm.get('options') as FormArray;
    options.forEach((option) => {
      const newOption = this.formBuilder.group({
        description: [option, Validators.required],
      });
      newOptions.push(newOption);
    });
    return newOptions;
  }

  editQuestion(control: AbstractControl): void {
    if (control.get('editable')?.value)
      control.get('editable')?.setValue(false);
    else {
      control.get('editable')?.setValue(true);
    }
  }

  trackByFunction(index: number, item: any): number {
    return item.id;
  }

  onSubmit() {
    console.log(this.form.value);
  }
}
