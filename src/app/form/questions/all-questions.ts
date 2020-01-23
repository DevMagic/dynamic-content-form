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

      //Abaixo o mínimo necessário para adicionar um campo ao formulário

      new TextboxQuestion({
        key: 'name',
        label: 'Nome e Cognome',
        value: '',
        placeholder: 'Come ti chiami?',
        order : 1
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
        let question = questions.find((question) => { return question.key == 'name'});
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
        let question = questions.find((question) => { return question.key == 'cellphone'});
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
        let question = questions.find((question) => { return question.key == 'email'});
        question.cssClass ? question.cssClass = null : false;
      },
      type: 'email',
      required: true,
      step: 1,
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
        let question = questions.find((question) => { return question.key == 'birthdate'});
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
          result =  this.translate.instant('form.step-one.birthdate.validation-error-message')
        }

        return (result == null ? true : result);

      },
      type: 'tel',
      required: true,
      step: 1,
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
        let question = questions.find((question) => { return question.key == 'terms'});
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
        let question = questions.find((question) => { return question.key == 'english_level'});
        question.cssClass ? question.cssClass = null : false;
      }
    }),

  ]
}
