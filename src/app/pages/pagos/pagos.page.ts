import { Component, OnInit } from '@angular/core';
import { ApplePayEventsEnum, GooglePayEventsEnum, PaymentFlowEventsEnum, PaymentSheetEventsEnum, Stripe } from "@capacitor-community/stripe";
import { first, lastValueFrom } from 'rxjs';
import { User } from 'src/app/models/user';
import { ApiService } from 'src/app/services/api.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-pagos',
  templateUrl: './pagos.page.html',
  styleUrls: ['./pagos.page.scss'],
})
export class PagosPage implements OnInit {

  public loading: boolean = false;

  public user: User = {
    suscripcion: '',
    email: ''
  };

  constructor(
    private apiService: ApiService,
  ) {
    Stripe.initialize({
      publishableKey: environment.stripe.publishableKey,
    });
  }

  ngOnInit() {
    this.showAuthUserRequest();
  }

  compareDate(fecha: any): boolean {
    if (new Date(fecha) < new Date()) {
      return true;
    }
    return false;
  }

  showAuthUserRequest() {
    this.apiService.showAuthUser()
      .subscribe({
        next: (res: any) => {
          this.user = res
          console.log(res);
        },
        error: (err: any) => {
          console.log(err);
        }
      })
  }

  splitAndJoin(paymentIntent: any) {
    const result = paymentIntent.split('_').slice(0, 2).join('_');
    console.log(result);
    return result;
  }

  async paymentSheet(amount: number, descripcion: string) {
    /*
    With PaymentSheet, you can make payments in a single flow.
    As soon as the User presses the payment button,
    the payment is completed. (If you want user have some flow after that,
    please use paymentFlow method)
    */

    try {
      // be able to get event of PaymentSheet
      Stripe.addListener(PaymentSheetEventsEnum.Completed, () => {
        console.log('PaymentSheetEventsEnum.Completed');
      });

      this.apiService.pagoUnico(amount, 'eur')
      .subscribe({
        next: async (res: any) => {
          console.log(res);
          const { customerId, customerEphemeralKeySecret, paymentIntentClientSecret } = res;

          console.log('paymentIntent: ', paymentIntentClientSecret);

          await Stripe.createPaymentSheet({
            paymentIntentClientSecret: paymentIntentClientSecret,
            customerId: customerId,
            customerEphemeralKeySecret: customerEphemeralKeySecret,
            merchantDisplayName: descripcion,
            countryCode: 'ES',
            style: 'alwaysLight'
          });

          console.log('createPaymentSheet');
          // present PaymentSheet and get result.
          const result = await Stripe.presentPaymentSheet();
          console.log('result: ', result);
          if (result && result.paymentResult === PaymentSheetEventsEnum.Completed) {
            // Happy path
            this.splitAndJoin(paymentIntentClientSecret);
            console.log(result.paymentResult);

            if (amount === 40) {
              // TODO: Procesar pago mensual
              this.apiService.customSubscribe(1).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.showAuthUserRequest();
                },
                error: (err: any) => {
                  console.log(err);
                },
              });
            }
            if (amount === 108) {
              // TODO: Procesar pago trimestral
              this.apiService.customSubscribe(3).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.showAuthUserRequest();
                },
                error: (err: any) => {
                  console.log(err);
                },
              });
            }
            if (amount === 384) {
              // TODO: Procesar pago anual
              this.apiService.customSubscribe(12).subscribe({
                next: (res: any) => {
                  console.log(res);
                  this.showAuthUserRequest();
                },
                error: (err: any) => {
                  console.log(err);
                },
              });
            }
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
    } catch(e) {
      console.log(e);
    }
  }

  async paymentFlow(amount: number, descripcion: string) {
    /*
    With PaymentFlow, you can make payments in two steps flow.
    When the user presses the submit button,
    the system only gets the card information,
    and puts it in a pending state.
    After that, when the program executes the confirmation method,
    the payment is executed. In most cases,
    it is used in a flow that is interrupted by a final confirmation screen.
    */

    // be able to get event of PaymentFlow
    Stripe.addListener(PaymentFlowEventsEnum.Completed, () => {
      console.log('PaymentFlowEventsEnum.Completed');
    });

    this.apiService.pagoUnico(amount, 'eur')
      .subscribe({
        next: async (res: any) => {
          console.log(res);
          const { customerId, customerEphemeralKeySecret, paymentIntentClientSecret } = res;

          console.log('paymentIntent: ', paymentIntentClientSecret);

          // Prepare PaymentFlow with CreatePaymentFlowOption.
          await Stripe.createPaymentFlow({
            paymentIntentClientSecret: paymentIntentClientSecret,
            customerId: customerId,
            customerEphemeralKeySecret: customerEphemeralKeySecret,
            merchantDisplayName: descripcion,
            countryCode: 'ES',
            style: 'alwaysLight'
          });

          // Present PaymentFlow. **Not completed yet.**
          const presentResult = await Stripe.presentPaymentFlow();
          console.log('presentResult: ', presentResult); // { cardNumber: "●●●● ●●●● ●●●● ****" }

          // Confirm PaymentFlow. Completed.
          const confirmResult = await Stripe.confirmPaymentFlow();
          console.log('confirmResult: ', confirmResult);
          if (confirmResult.paymentResult === PaymentFlowEventsEnum.Completed) {
            // Happy path
            this.splitAndJoin(paymentIntentClientSecret);
            console.log(confirmResult.paymentResult);
          }
        },
        error: (err: any) => {
          console.log(err);
        }
      });
  }

  async applePay() {
      // Check to be able to use Apple Pay on device
    const isAvailable = Stripe.isApplePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      // disable to use Google Pay
      return;
    }

    // be able to get event of Apple Pay
    Stripe.addListener(ApplePayEventsEnum.Completed, () => {
      console.log('ApplePayEventsEnum.Completed');
    });

    // ------------ Recoger datos de API ------------ //
    // const data$ = this.httpPost(this.data);

    // const { paymentIntent } = await lastValueFrom(data$);
    // ---------------------------------------------- //
    const paymentIntent = 'paymentIntent';

    // Prepare Apple Pay
    await Stripe.createApplePay({
      paymentIntentClientSecret: paymentIntent,
      paymentSummaryItems: [{
        label: 'Technyks',
        amount: 1099.00
      }],
      merchantIdentifier: 'technyks',
      countryCode: 'IN',
      currency: 'INR',
    });

    // Present Apple Pay
    const result = await Stripe.presentApplePay();
    if (result.paymentResult === ApplePayEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }

  async googlePay() {
    // Check to be able to use Google Pay on device
    const isAvailable = Stripe.isGooglePayAvailable().catch(() => undefined);
    if (isAvailable === undefined) {
      // disable to use Google Pay
      return;
    }

    Stripe.addListener(GooglePayEventsEnum.Completed, () => {
      console.log('GooglePayEventsEnum.Completed');
    });

    // ------------ Recoger datos de API ------------ //
    // const data$ = this.httpPost(this.data);

    // const { paymentIntent } = await lastValueFrom(data$);
    // ---------------------------------------------- //
    const paymentIntent = 'paymentIntent';

    // Prepare Google Pay
    await Stripe.createGooglePay({
      paymentIntentClientSecret: paymentIntent,

      // Web only. Google Pay on Android App doesn't need
      paymentSummaryItems: [{
        label: 'Technyks',
        amount: 1099.00
      }],
      merchantIdentifier: 'merchant.com.getcapacitor.stripe',
      countryCode: 'IN',
      currency: 'INR',
    });

    // Present Google Pay
    const result = await Stripe.presentGooglePay();
    if (result.paymentResult === GooglePayEventsEnum.Completed) {
      // Happy path
      this.splitAndJoin(paymentIntent);
    }
  }
}
