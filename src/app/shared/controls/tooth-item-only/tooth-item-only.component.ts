import { Component, Input, OnInit } from '@angular/core';
import { ECaseTeeth } from '../../../models/data';

@Component({
  selector: 'app-tooth-item-only',
  templateUrl: './tooth-item-only.component.html',
  styleUrls: ['./tooth-item-only.component.scss']
})
export class ToothItemOnlyComponent implements OnInit {

  constructor() { }

  @Input()
  public Tooth: string = 'L1';

  ngOnInit() {
  }

  public get IconStr(): string {
    let state = 'not_active';
    
    let pos_state = 'upper';
    let pos = this.Tooth.substring(0, 1);
    if (pos == 'L') {
      pos_state = 'lower';
    }

    let index = parseInt(this.Tooth.substring(1));

    let index_state = 'r_8';
    if (index <= 8) {
      index_state = 'r_' + (8 - index + 1)
    }
    else {
      index_state = 'l_' + (index - 8)
    }

    return "./../../assets/images/instructions/" + pos_state + "_" + index_state + "_" + state + ".svg";
  }
}
