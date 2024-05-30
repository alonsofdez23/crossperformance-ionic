import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { defineCustomElements } from "@ionic/pwa-elements/loader";
import { defineCustomElements as Stripe } from 'stripe-pwa-elements/loader';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .then(() => defineCustomElements(window))
  .then(() => Stripe(window))
  .catch(err => console.log(err));

defineCustomElements(window);
