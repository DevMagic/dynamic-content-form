import { QuestionBase } from './question-base';

import { TextboxQuestion } from './question-textbox';
import { CheckboxQuestion } from './question-checkbox';
import { DropdownQuestion } from './question-dropdown';
import { RadioQuestion } from './question-radio';
import { AutocompleteQuestion } from './question-autocomplete';

import { FormGroup, Validators } from '@angular/forms';

import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';

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
      label: 'Nome',
      value: '',
      type: 'text',
      placeholder: 'Digite seu nome',
      errorMessage: 'Digite seu nome, por favor',
      validationErrorMessage: 'Digite nome e sobrenome',
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
      label: 'Celular',
      value: '',
      placeholder: 'Digite o número do seu celular',
      errorMessage: 'Digite seu número de celular, por favor',
      validationErrorMessage: 'Digite um número de celular válido, por favor',
      type: 'tel',
      required: true,
      onChange: (option: any, form: FormGroup, questions: QuestionBase<any>[]) => {
        let question = questions.find((question) => { return question.key == 'cellphone'});
        question.cssClass ? question.cssClass = null : false;
      },
      step: 1,
      order: 2,
      mask: '000 000 0000',
      belongsTo: ['form1']
    }),

    new TextboxQuestion({
      key: 'email',
      label: 'E-mail',
      value: '',
      placeholder: 'Digite seu e-mail',
      errorMessage: 'Digite seu e-mail, por favor',
      validationErrorMessage: 'Digite um endereço de e-mail válido',
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
      label: 'Data de nascimento',
      value: '',
      placeholder: 'Data de nascimento',
      errorMessage: 'Informe sua data de nascimento, por favor',
      validationErrorMessage: 'Informe uma data válida',
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
        let yearsOld = moment().diff(moment(value, 'DDMMYYYY').format('MM-DD-YYYY'), 'years');
        let result = null;

        if (!dateIsValid) {
          result =  'Informe uma data válida';
        }

        if (dateIsValid && (yearsOld > 30 || yearsOld < 18)) {
          result = 'Você precisa ter entre 18 e 30 anos';
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
      label: 'Li e aceito',
      link: {
        message: "os termos de uso e condições de cadastro",
        url: 'https://www.aiesec.it/termini-duso-e-le-condizioni-di-registrazione-aiesec-in-italia/'
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

  ]
}
