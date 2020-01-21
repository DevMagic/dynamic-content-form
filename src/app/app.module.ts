import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form/form-question/form-question.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatAutocompleteComponent } from './form/form-question/mat-autocomplete/mat-autocomplete.component';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { QuestionsService } from './form/questions/questions.service'
import { QuestionControlService } from './form/questions/question-control.service';
import { DynamicContentComponent } from './dynamic-content/dynamic-content.component'

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormQuestionComponent,
    MatAutocompleteComponent,
    DynamicContentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatAutocompleteModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    QuestionsService,
    QuestionControlService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
