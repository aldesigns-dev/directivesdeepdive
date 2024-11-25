import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from "@angular/core";

import { Permission } from "./auth.model";
import { AuthService } from "./auth.service";

@Directive({
  selector: '[appAuth]',
  standalone: true
})

// Custom Structural Directive
export class AuthDirective {
  // Here we need the user to show which content will be shown 
  userType = input.required<Permission>({alias: 'appAuth'});
  // Find out which kind of user is currently logged in
  private authService = inject(AuthService);

  // Structural Directives worden gebruikt op een ng-template:
  // Verwijst naar de ng-template inhoud
  private templateRef = inject(TemplateRef);
  // Wordt gebruikt om inhoud in de DOM te injecteren of verwijderen
  private viewContainterRef = inject(ViewContainerRef);

  constructor() {
    effect(() => {
      if (this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');
        this.viewContainterRef.createEmbeddedView(this.templateRef);
      } else {
        console.log('DO NOT SHOW ELEMENT');
        this.viewContainterRef.clear();
      }
    });
  }
}