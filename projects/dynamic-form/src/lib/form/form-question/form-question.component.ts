import { Component, Input } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './../questions/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './form-question.component.html',
  styleUrls: ['./form-question.component.scss']
})
// @dynamic
export class FormQuestionComponent {
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  constructor(){
    
  }
  get validateData() {
    let result = true;
    let formControl = this.form.controls[this.question.key];

    switch (this.question.type) {
      case 'email':
        result = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
      break;
    }

    if (this.question.controlType == "autocomplete") {
      
      let value = typeof this.value == "object" ? this.value.value : this.value;

      let options = this.question.options.filter(option => {
        return option.key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1
      });
      
      if (!this.value || typeof this.value != "object" || (this.value && !options.length)) {
        result = false;
        if (typeof this.value != "object") {
          this.question.validationErrorMessage = this.question.errorMessage;
          formControl.setErrors({ valid : false });
        }else{
          result = true;
        }
      }

    }

    let checkValidator = this.question.validator(this.value, this.question, this.form);

    if (typeof checkValidator == "boolean") {

      if (!checkValidator || !result) {
        if (!formControl.hasError || (formControl.errors && !formControl.errors.required)) {
          this.form.controls[this.question.key].setErrors({ valid : false });
        }
      }else if (checkValidator && formControl.hasError){
        formControl.setErrors(null);
      }

    }else if (!formControl.hasError || (formControl.errors && !formControl.errors.required) || (!formControl.errors && checkValidator)) {
        //if valid is not a boolean, then there is an error message
        formControl.setErrors({ valid : false });
        this.question.validationErrorMessage = checkValidator;
    }

    if (result && ((checkValidator && typeof checkValidator == "boolean") || !checkValidator)) {
      formControl.setErrors(null);
    }

    let isValid = result && checkValidator && !formControl.errors;
    
    if (!isValid) {
      formControl.setErrors({ valid : false });
    }

    return isValid;
  }
  get isValid() { return this.form.controls[this.question.key].valid && this.validateData; }
  get hasError() { return this.form.controls[this.question.key].dirty && (this.form.controls[this.question.key].errors && this.form.controls[this.question.key].errors.required) }
  get value() { return this.form.controls[this.question.key].value; }
  get hasMultipleErrorMessages() {
    let errors = this.question.getValidationErrors().filter((data) => {
      return data.show;
    });
    return errors.length ? true : false
  }

  redirectTo(url: string){
    window.open(url);
  }
}
