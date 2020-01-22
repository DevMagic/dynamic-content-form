import { Injectable } from '@angular/core';
import { AllQuestions } from './all-questions';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class QuestionsService {

  constructor() { }

  allQuestions: AllQuestions = new AllQuestions();

  getQuestions(formName: string) {

    let questions = [];

    questions = this.allQuestions.questions.filter(function (question) {
      return (question.belongsTo.find((context) => { return context == formName }));
    });
    
    return questions.sort((a, b) => a.order - b.order);
  }
}