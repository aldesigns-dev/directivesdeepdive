import { Directive, input } from "@angular/core";

@Directive({
  // Attribute directive to quick and easy enhance built-in elements
  // a = anchor element die de [appSafeLink] attribute heeft
  selector: 'a[appSafeLink]', 
  standalone: true,
  host: {
    '(click)': 'onConfirmLeavePage($event)'
  }
})

// Custom Attribute Directive
export class SafeLinkDirective {
  queryParam = input('myapp', { alias: 'appSafeLink' });

  constructor() {
    console.log('SafeLinkeDirective is active.');
  }

  onConfirmLeavePage() {
    const wantsToLeave = window.confirm('Do you want to leave the app?');

    if (wantsToLeave) {
      const address = (event?.target as HTMLAnchorElement).href;
      (event?.target as HTMLAnchorElement).href = address + '?from=' + this.queryParam();
      return;
    }

    event?.preventDefault();
  }
}