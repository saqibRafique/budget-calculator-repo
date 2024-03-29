import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BudgetItem } from 'src/shared/models/budget-item.model';
import { MatDialog } from '@angular/material/dialog';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

export interface UpdateEvent {
  old: BudgetItem;
  new: BudgetItem;
}
@Component({
  selector: 'app-budget-item-list',
  templateUrl: './budget-item-list.component.html',
  styleUrls: ['./budget-item-list.component.scss']
})

export class BudgetItemListComponent implements OnInit {

  @Input() budgetItems: BudgetItem[];
  @Output() delete: EventEmitter<BudgetItem> = new EventEmitter<BudgetItem>();
  @Output() update: EventEmitter<UpdateEvent> = new EventEmitter<UpdateEvent>();
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  deleteButtonCLick(item: BudgetItem){
    this.delete.emit(item);
  }
  onCardClicked(item: BudgetItem){
    // show the edit dialog
    const dialogRef = this.dialog.open(EditItemModalComponent, {
      width: '580px',
      data: item
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        // replace the item with the updated/submitted item
        // this.budgetItems[this.budgetItems.indexOf(item)] = result
        this.update.emit({
          old: item,
          new: result
        })
      }
    })
  }
}
