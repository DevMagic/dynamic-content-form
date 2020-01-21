import { FormGroup, FormControl, AbstractControl } from '@angular/forms';

export class QuestionBase<T> {
  value: any;
  key: string;
  label: string;
  required: boolean;
  focus: boolean;
  order: number;
  controlType: string;
  placeholder: string;
  errorMessage: string;
  validationErrorMessage: string;
  validationErrorMessages: { id: string, label: string, show: boolean, hasError: boolean }[] = [];
  getValidationErrors: (id?: string) => any[];
  getValidationError: (id: string) => { id: string, label: string, show: boolean, hasError: boolean };
  step: number;
  type: string;
  validator: (value: any, question?: QuestionBase<any>, form?: FormGroup) => any; //validator must return a boolean, must be true when value is valid. Or it may also return a string, where the return is a custom error message.
  mask: string;
  onChange: (value: any, form: FormGroup, questions: QuestionBase<any>[]) => void;
  onFocus: () => void;
  onBlur: () => void;
  onInit: (question: QuestionBase<any>, form: FormGroup, questions: QuestionBase<any>[]) => void;
  visible: boolean;
  options: any;
  formControl: AbstractControl;
  isInitialized: boolean; //internal use, you do not need to change this value
  optionSelected: (value: any) => void;
  belongsTo: any;
  cssClass: string;
  blockInteractions: boolean;
  validateMessage : boolean;
  link : any;

  constructor(options: {
    value?: any,
    key?: string,
    label?: string,
    required?: boolean,
    focus?: boolean,
    order?: number,
    controlType?: string,
    placeholder?: string,
    errorMessage?: string,
    validationErrorMessage?: string,
    step?: number,
    type?: string,
    validator?: (value: any, question?: QuestionBase<any>, form?: FormGroup) => any,
    mask?: string,
    onChange?: (value: any, form: FormGroup, questions: QuestionBase<any>[]) => void,
    onFocus?: () => void,
    onBlur?: () => void,
    visible?: boolean,
    options?: any,
    onInit?: (question: QuestionBase<any>, form: FormGroup, questions: QuestionBase<any>[]) => void,
    validationErrorMessages?: { id: string, label: string, show: boolean, hasError: boolean }[],
    formControl?: AbstractControl,
    isInitialized?: boolean,
    optionSelected?: (value: any) => void,
    belongsTo?: any,
    cssClass?: string,
    blockInteractions?: boolean,
    validateMessage?: boolean,
    link?: any,
  } = {}) {
    this.value = options.value;
    this.key = options.key || '';
    this.label = options.label || '';
    this.required = !!options.required;
    this.focus = !!options.focus;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.placeholder = options.placeholder || '';
    this.errorMessage = options.errorMessage || '';
    this.validationErrorMessage = options.validationErrorMessage || '';
    this.step = options.step || 1;
    this.type = options.type || 'text';
    this.validator = options.validator || function () { return true; }
    this.mask = options.mask || null;
    this.onChange = options.onChange || undefined;
    this.visible = options.visible === false ? false : true;
    this.options = options.options || [];
    this.onInit = options.onInit || undefined
    this.validationErrorMessages = options.validationErrorMessages || [];
    this.onFocus = function () {
      this.focus = true;
      this.cssClass = null;
      this.validateMessage = false;
    };
    this.onBlur = function () {
      this.focus = false;
      this.validateMessage = true;
    };
    this.getValidationErrors = function (id: string = null) {
      return this.validationErrorMessages.filter((data) => {
        if (id) {
          return data.id == id;
        }
        return data;
      });
    };
    this.getValidationError = function (id: string = null) {
      let error = this.getValidationErrors(id);
      return (error && error.length ? error[0] : null);
    },
      this.formControl = options.formControl || null;
    this.isInitialized = options.isInitialized || false;
    this.optionSelected = options.optionSelected || function (value: any) {
      return value;
    }
    this.belongsTo = options.belongsTo || [];
    this.cssClass = options.cssClass || null;
    this.blockInteractions = options.blockInteractions || false;
    this.link = options.link || null
  }
}