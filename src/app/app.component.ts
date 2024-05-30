import { Component } from '@angular/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Stripe } from '@capacitor-community/stripe';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    Stripe.initialize({
      publishableKey: 'pk_test_51LxluOFEu1F8Aw4ZFU3RtCL17JX0zICqtplmw3ereucD6pSNkh3BNoZIGHolOaBDzV4YG0eBse1jeG6rJbJiiQxN005p5lBK6R',
    });
  }

  title = 'angular';
  public Editor = ClassicEditor
}
