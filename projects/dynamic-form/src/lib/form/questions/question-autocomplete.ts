import { QuestionBase } from './question-base';

export class AutocompleteQuestion extends QuestionBase<string> {
  controlType = 'autocomplete';
  options: { key: string, value: string }[] = [];

  constructor(options: {} = {}) {
    super(options);
    this.options = options['options'] || [];
  }
}


/*
Copyright Google LLC. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/