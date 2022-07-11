import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ECaseTeeth } from '../../../models/data';

@Component({
  selector: 'app-tooth-item',
  templateUrl: './tooth-item.component.html',
  styleUrls: ['./tooth-item.component.scss']
})
export class ToothItemComponent implements OnInit {

  constructor() { }

  @Input()
  public CtrKind: string = "Extract";

  @Input()
  public Tooth: ECaseTeeth = new ECaseTeeth();

  @Input()
  public IsReadOnly: boolean = false;

  ngOnInit() {
  }

  public isMoseOver: boolean = false;
  public get Selected(): boolean {
    if (this.Tooth) {
      switch (this.CtrKind) {
        case "Extract":
          return this.Tooth.ExtractTooth;
        case "Move":
          return this.Tooth.DontMove;
        case "Spaces":
          return this.Tooth.KeepSpaces;
          case "Attachments":
          return this.Tooth.AvoidAttachments;
      }      
    }
    return false;
  }
  public set Selected(value: boolean) {
    if (this.Tooth && !this.IsReadOnly) {
      switch (this.CtrKind) {
        case "Extract": {
          this.Tooth.ExtractTooth = value;
          break;
        }
        case "Move": {
          this.Tooth.DontMove = value;
          break;
        }
        case "Spaces": {
          this.Tooth.KeepSpaces = value;
          break;
        }
        case "Attachments": {
          this.Tooth.AvoidAttachments = value;
          break;
        }
      }
    }
  }

  public IconStr(p: number): string {
    let state = 'active';
    if (p == 1) {
      state = 'not_active';
    }
    if (this.IsReadOnly == false && p == 2) {
      state = 'hover';
    }
    let pos_state = 'upper';
    let pos = this.Tooth.ToothID.substring(0, 1);
    if (pos == 'L') {
      pos_state = 'lower';
    }

    let index = parseInt(this.Tooth.ToothID.substring(1));

    let index_state = 'r_8';
    if (index <= 8) {
      index_state = 'r_' + (8 - index + 1)
    }
    else {
      index_state = 'l_' + (index - 8)
    }

    return "./../../assets/images/instructions/" + pos_state + "_" + index_state + "_" + state+".svg";
  }

  public OnSelect() {
    if (this.IsReadOnly == false) {
      if (this.Selected) {
        this.Selected = false;
      }
      else {
        this.Selected = true;
      }
    }
  }

}
