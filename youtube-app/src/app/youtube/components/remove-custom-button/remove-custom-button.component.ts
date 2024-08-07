import { Component, Input } from '@angular/core';
import { Item } from '../../../core/models/search-item.model';
import { Store } from '@ngrx/store';
import { GlobalState } from '../../../redux/store.model';
import * as AppAction from './../../../redux/actions';

@Component({
  selector: 'app-remove-custom-button',
  templateUrl: './remove-custom-button.component.html',
  styleUrl: './remove-custom-button.component.scss',
})
export class RemoveCustomButtonComponent {
  @Input() item!: Item;

  // eslint-disable-next-line @ngrx/no-typed-global-store
  constructor(private store: Store<GlobalState>) {}

  isCustom(): boolean {
    return this.item.kind === 'custom-video';
  }

  onClick() {
    this.store.dispatch(AppAction.removeCustomVideo({ video: this.item }));
  }
}
