import { QuestionBase } from './question-base';

import { TextboxQuestion } from './question-textbox';
import { CheckboxQuestion } from './question-checkbox';
import { DropdownQuestion } from './question-dropdown';
import { RadioQuestion } from './question-radio';
import { AutocompleteQuestion } from './question-autocomplete';

import { FormGroup, Validators } from '@angular/forms';

import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';

export class AllQuestions {
  constructor(
    public translate: TranslateService
  ) { }
  questions: QuestionBase<any>[] = [

    /*
      All questions on the form were listed.
      To create new questions, just follow the template below:


      ------------------------------------------------------- FIELD EXAMPLE ------------------------------------
      new TextboxQuestion({
        key: '___',                                                                                             |   field identifier
        label: this.translate.instant('___'),                                                                   |   label, reference to the 'pt-BR.json' file
        value: '',                                                                                              |   default = ''
        placeholder: this.translate.instant('___'),                                                             |   field placeholder
        errorMessage: this.translate.instant('___'),                                                            |   errorMessage, reference to the 'pt-BR.json' file
        validationErrorMessage: this.translate.instant('___'),                                                  |   validationErrorMessage, reference to the 'pt-BR.json' file 
        type: 'tel',                                                                                            |   field type
        required: true,                                                                                         |   set field as mandatory
        onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {                           |   onChange method                  
          let question = questions.find((question) => { return question.key == '____'});                        |   field identifier is used here
          question.cssClass ? question.cssClass = null : false;                                                 |   apply custom class
        },
        step: 1,                                                                                                |   set which step the question should appear
        order: 2,                                                                                               |   set the position of the question on the form
        mask: '(00) 00000-0000',                                                                                |   set a mask
        belongsTo: ['form1']                                                                                    |   set which forms the question should appear for
      })


      ------------------------------------------------ AUTOCOMPLETE EXAMPLE ------------------------------------
      new AutocompleteQuestion({ 
      key: '___',                                                                                               |   field identifier
      label: this.translate.instant('___'),                                                                     |   label, reference to the 'pt-BR.json' file
      placeholder: this.translate.instant('___'),                                                               |   field placeholder
      belongsTo: ['form1'],                                                                                     |   set which forms the question should appear for 
      cssClass: 'withoutMargin',
      options: [                                                                                                |   list of options with values
        { key: this.translate.instant('___'), value: '0' },
        { key: this.translate.instant('___'), value: '1' },
        { key: this.translate.instant('___'), value: '2' },
        { key: this.translate.instant('___'), value: '3' },
      ],
      step: 1,                                                                                                  |   set which step the question should appear
      required: true,                                                                                           |   set field as mandatory
      order: 4,                                                                                                 |   set the position of the question on the form
      errorMessage: this.translate.instant('___'),                                                              |   errorMessage, reference to the 'pt-BR.json' file
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {                             |   onChange method
        let question = questions.find((question) => { return question.key == '___'});                           |   field identifier is used here
        question.cssClass ? question.cssClass = null : false;                                                   |   apply custom class
      }
    }),
    */


    new TextboxQuestion({
      key: 'name',
      label: this.translate.instant('form.step-one.name.label'),
      value: '',
      type: 'text',
      placeholder: this.translate.instant('form.step-one.name.placeholder'),
      errorMessage: this.translate.instant('form.step-one.name.error-message'),
      validationErrorMessage: this.translate.instant('form.step-one.name.validation-error-message'),
      validator: (value: any) => {
        return (value && value.length && value.split(" ").length > 1 && value.split(" ")[1].length ? true : false);
      },
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'name' });
        question.cssClass ? question.cssClass = null : false;
      },
      required: true,
      step: 1,
      order: 1,
      belongsTo: ['form1']
    }),

    new TextboxQuestion({
      key: 'cellphone',
      label: this.translate.instant('form.step-one.cellphone.label'),
      value: '',
      placeholder: this.translate.instant('form.step-one.cellphone.placeholder'),
      errorMessage: this.translate.instant('form.step-one.cellphone.error-message'),
      validationErrorMessage: this.translate.instant('form.step-one.cellphone.validation-error-message'),
      type: 'tel',
      required: true,
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'cellphone' });
        question.cssClass ? question.cssClass = null : false;
      },
      step: 1,
      order: 2,
      mask: '(00) 00000-0000',
      belongsTo: ['form1']
    }),

    new TextboxQuestion({
      key: 'email',
      label: this.translate.instant('form.step-one.email.label'),
      value: '',
      placeholder: this.translate.instant('form.step-one.email.placeholder'),
      errorMessage: this.translate.instant('form.step-one.email.error-message'),
      validationErrorMessage: this.translate.instant('form.step-one.email.validation-error-message'),
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'email' });
        question.cssClass ? question.cssClass = null : false;
      },
      type: 'email',
      required: true,
      step: 2,
      order: 3,
      belongsTo: ['form1']
    }),

    new TextboxQuestion({
      key: 'birthdate',
      label: this.translate.instant('form.step-one.birthdate.label'),
      value: '',
      placeholder: this.translate.instant('form.step-one.birthdate.placeholder'),
      errorMessage: this.translate.instant('form.step-one.birthdate.error-message'),
      validationErrorMessage: this.translate.instant('form.step-one.birthdate.validation-error-message'),
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'birthdate' });
        question.cssClass ? question.cssClass = null : false;
      },
      validator: (value: any) => {

        if (!value) {
          return false;
        }

        let date = moment(value, 'DDMMYYYY').format('DD/MM/YYYY').split('/');
        let dateIsValid = ((+date[0] > 0 && +date[0] <= 31) && (+date[1] > 0 && +date[1] <= 12) && (+date[2] > 1900 && +date[2] < moment().year()));
        let result = null;

        if (!dateIsValid) {
          result = this.translate.instant('form.step-one.birthdate.validation-error-message')
        }

        return (result == null ? true : result);

      },
      type: 'tel',
      required: true,
      step: 2,
      order: 4,
      mask: '00/00/0000',
      belongsTo: ['form1']
    }),

    new CheckboxQuestion({
      key: 'terms',
      label: this.translate.instant('form.step-one.checkbox-terms.message'),
      link: {
        message: this.translate.instant('form.step-one.checkbox-terms.link'),
        url: 'http://devmagic.com.br'
      },
      value: false,
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'terms' });
        question.cssClass ? question.cssClass = null : false;
      },
      step: 1,
      order: 5,
      required: true,
      belongsTo: ['form1']
    }),

    new AutocompleteQuestion({
      key: 'english_level',
      label: this.translate.instant('form.step-one.english-level.label'),
      placeholder: this.translate.instant('form.step-one.english-level.placeholder'),
      belongsTo: ['form1'],
      cssClass: 'withoutMargin',
      options: [
        { key: this.translate.instant('form.step-one.english-level.options.option-1.key'), value: '0' },
        { key: this.translate.instant('form.step-one.english-level.options.option-2.key'), value: '1' },
        { key: this.translate.instant('form.step-one.english-level.options.option-3.key'), value: '2' },
        { key: this.translate.instant('form.step-one.english-level.options.option-4.key'), value: '3' },
      ],
      step: 1,
      required: true,
      order: 4,
      errorMessage: this.translate.instant('form.step-one.english-level.error-message'),
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'english_level' });
        question.cssClass ? question.cssClass = null : false;
      }
    }),

  ]
}
