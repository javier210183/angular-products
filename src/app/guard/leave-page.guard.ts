import { CanDeactivateFn } from "@angular/router";
import { ProductFormComponent } from "../products/product-form/product-form.component";
import { CanComponentDeactivate } from "../products/interfaces/can-component-deactivate";

export const leavePageGuard: CanDeactivateFn<CanComponentDeactivate> = (
  component,
  currentRoute,
  currentState,
  nextState
) => {
  return component.canDeactivate? component.canDeactivate() : true;
};