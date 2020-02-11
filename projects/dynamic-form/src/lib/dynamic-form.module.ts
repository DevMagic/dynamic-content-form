import { DynamicFormComponent } from './dynamic-form.component';


import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER, Injector } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormComponent } from './form/form.component';
import { FormQuestionComponent } from './form/form-question/form-question.component';
import { NgxMaskModule } from 'ngx-mask';
import { MatSelectModule, MatAutocompleteModule } from '@angular/material';
import { MatAutocompleteComponent } from './form/form-question/mat-autocomplete/mat-autocomplete.component';
import { MatInputModule } from '@angular/material/input';


import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { LOCATION_INITIALIZED } from '@angular/common';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { QuestionsService } from './form/questions/questions.service'
import { QuestionControlService } from './form/questions/question-control.service';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, "./assets/i18n/", ".json");
}

// export function appInitializerFactory(translate: TranslateService, injector: Injector) {
//   return () => new Promise<any>((resolve: any) => {
//     const locationInitialized = injector.get(LOCATION_INITIALIZED, Promise.resolve(null));
//     locationInitialized.then(() => {
//       const langToSet = 'pt-BR'
//       translate.setDefaultLang('pt-BR');
//       translate.use(langToSet).subscribe(() => {
//         console.info(`Successfully initialized '${langToSet}' language.'`);
//       }, err => {
//         console.error(`Problem with '${langToSet}' language initialization.'`); 
//       }, () => {
//         resolve(null);
//       });
//     });
//   });
// }

@NgModule({
  declarations: [
    DynamicFormComponent, 
    FormComponent,
    FormQuestionComponent,
    MatAutocompleteComponent,
  ],
  imports: [
    BrowserModule,
    NgxMaskModule.forRoot(),
    MatSelectModule,
    MatAutocompleteModule,
    ScrollingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    QuestionsService,
    QuestionControlService,
    QuestionControlService,
    // {
    //   provide: APP_INITIALIZER,
    //   useFactory: appInitializerFactory,
    //   deps: [TranslateService, Injector],
    //   multi: true
    // }
  ],

  exports: [DynamicFormComponent]
})
export class DynamicFormModule { }