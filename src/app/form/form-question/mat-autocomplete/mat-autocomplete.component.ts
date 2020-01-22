import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup }        from '@angular/forms';
import { QuestionBase }     from './../../questions/question-base';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatAutocompleteTrigger } from '@angular/material';

@Component({
  selector: 'app-mat-autocomplete',
  templateUrl: './mat-autocomplete.component.html',
  styleUrls: ['./mat-autocomplete.component.scss']
})
export class MatAutocompleteComponent implements OnInit {

  @Input() myFormControl : FormGroup;
  @Input() question: QuestionBase<any>;
  @Input() form: FormGroup;
  @ViewChild(MatAutocompleteTrigger, {read: MatAutocompleteTrigger, static: false }) inputAutoComplit: MatAutocompleteTrigger;

  filteredOptions: Observable<any[]>;

  ngOnInit() {

    this.filteredOptions = this.myFormControl.valueChanges
      .pipe(
        startWith(''),
        map(option => typeof option === 'string' ? option : (option ? option.key : null)),
        map(value => value ? this.filter(value) : this.question.options.slice())
      );
  }

  displayFn(option?: any): string | undefined {
    return option ? option.key : undefined;
  }

  eraseSelect(evt = null):void {
    this.question.value = "";
    this.myFormControl.setValue(null);
    if (evt)
      evt.stopPropagation();
    this.inputAutoComplit.openPanel();
  }

  private filter(value: string):[] {
    return this.question.options.filter(option => {
      return option.key.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "").indexOf(value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")) !== -1
    });
  }

  autocompleteFocused(){
    this.inputAutoComplit.openPanel();
    if (this.question.formControl.value && this.question.formControl.value.key){
      this.eraseSelect();
    }
  }

  autocompleteBlur(){
    this.inputAutoComplit.closePanel();
  }
}
