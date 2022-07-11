import { Component, Injectable } from '@angular/core';
import { NgbCalendar, NgbDateAdapter, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { validateLocaleAndSetLanguage } from 'typescript';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class NgDatePickerAdapter extends NgbDateAdapter<string> {

  readonly DELIMITER = '-';

  fromModel(value: string | null): NgbDateStruct | null {
    if (value && value.length !== 0) {
      value = '' + value;
      const date = value.split(this.DELIMITER, 3);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10)
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): string | null {
    if (date) {
      let month: string = date.month.toString();
      if (month.length == 1) {
        month = '0' + month;
      }

      let day: string = date.day.toString();
      if (day.length == 1) {
        day = '0' + day;
      }

      return date.year + this.DELIMITER + month + this.DELIMITER + day;
    }
    return '';
  }
}

/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {

  readonly DELIMITER = '-';

  parse(value: string): NgbDateStruct | null {
    if (value && value.length !== 0) {
      value = '' + value;
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[2], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[0], 10)
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    if (date) {
      let month: string = date.month.toString();
      if (month.length == 1) {
        month = '0' + month;
      }

      let day: string = date.day.toString();
      if (day.length == 1) {
        day = '0' + day;
      }

      return date.year + this.DELIMITER + month + this.DELIMITER + day;
    }
    return '';
  }
}
