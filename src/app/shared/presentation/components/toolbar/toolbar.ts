import { Component, Input, inject } from '@angular/core';
import { MatListItem, MatNavList } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon'; // <--- ESTO
import { IamStore } from '../../../../IAM/application/iam.store';

@Component({
  selector: 'app-toolbar',
  imports: [
    MatNavList,
    MatListItem,
    RouterLink,
    RouterLinkActive,
    TranslatePipe,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './toolbar.html',
  styleUrl: './toolbar.scss'
})
export class Toolbar {
  @Input() options: any[] = [];

  private iamStore = inject(IamStore);

  onLogout() {
    this.iamStore.signOut();
  }
}
