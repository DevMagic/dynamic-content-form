import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { QuestionBase } from './questions/question-base';
import { QuestionsService } from './questions/questions.service';
import { QuestionControlService } from './questions/question-control.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  @Input() questions: QuestionBase<any>[] = [];

  form: FormGroup;
  payLoad = '';
  currentStep: number = 1;
  maxSteps: number;
  submitted : boolean = false;
  loading : boolean = false;

  constructor(
    private qcs: QuestionControlService,
    private qs: QuestionsService
  ) { }
  

  ngOnInit() {
    this.questions = this.qs.getQuestions('form1');
    this.maxSteps = [...new Set(this.questions.map(p => p.step))].length;
    this.form = this.qcs.toFormGroup(this.questions);
    this.onInitForm();
  }

  ngOnDestroy(){
    this.form.reset();
  }

  isValidFormStep() {
    let questions = this.questions.filter((q) => q.step == this.currentStep);
    let isValid = true;
    questions.forEach((question) => {
      if ((!this.form.controls[question.key].valid || this.form.controls[question.key].errors) || (question.required && !this.form.controls[question.key].value)) {
        isValid = false;
      }
    });
    return isValid;
  }

  onInitForm() {
    let questions = this.questions;
    questions.forEach((question) => {

      if (question.onChange != undefined) {
        this.form.controls[question.key]
          .valueChanges.subscribe(
            value => {
              if (question.controlType == "autocomplete") {
                let isObject = typeof value == "object";
                let isEmpty = isObject ? false : !!!value.split(" ").join("");
                if (typeof value == "object" || isEmpty)
                  question.onChange((isEmpty ? '' : value), this.form, questions);
              } else {
                question.onChange(value, this.form, questions);
              }
            }
          )
      }
      if (question.onInit != undefined) {
        question.onInit(question, this.form, questions);
      }
      question.formControl = this.form.controls[question.key];
    });
  }

  goToPreviousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
      this.moveToTop()
    }
  }

  checkTermsHaveBeenAccepted(){
    return this.form.value.terms == true;
  }

  async goToNextStep() {
    if (this.currentStep < this.maxSteps) {
      this.currentStep++;
      this.moveToTop();
    }
    else {
      // this.loading = true;

      window.open('http://www.devmagic.com.br', '_target');
    }
  }

  onSubmit() {
    if (!this.isValidFormStep()){
      this.submitted = true;
      this.getInvalidFields();
      document.getElementById('btn-' + this.currentStep).classList.add('shake');
      setTimeout(() => {
        document.getElementById('btn-' + this.currentStep).classList.remove('shake');
      }, 500);
      return;
    }
    this.goToNextStep();
  }

  getInvalidFields() {
    let questions = this.questions.filter((q) => q.step == this.currentStep);
    questions
      .filter((question) => {
        return (!this.form.controls[question.key].valid || this.form.controls[question.key].errors) || (!this.form.controls[question.key].value && question.required)
      })
      .forEach((question) => {
        question.cssClass += ' invalid'
      })
  }

  moveToTop() {
    document.getElementById('main').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}
