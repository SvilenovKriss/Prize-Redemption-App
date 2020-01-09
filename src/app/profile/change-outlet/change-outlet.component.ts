import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IOutlet } from 'src/app/common/interfaces/outlet';

@Component({
  selector: 'app-change-outlet',
  templateUrl: './change-outlet.component.html',
  styleUrls: ['./change-outlet.component.css']
})

export class ChangeOutletComponent {

  @Output()
  public outletName = new EventEmitter();
  @Input()
  public myOutletName: string;
  @Input()
  public outlets: IOutlet[];

  public saveOutlet(chosenOutlet: string): void {
    this.myOutletName = chosenOutlet;
    const idOfOutlet: string = this.outlets.find((outlet) => outlet.name === chosenOutlet).id;
    this.outletName.emit({ idOfOutlet, nameOfMyOutlet: this.myOutletName });
  }
}
