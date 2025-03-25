import { CanDeactivateFn } from '@angular/router';

export interface CanDeactivateComponent {
  canDeactivate: () => boolean;
}

export const unsavedChangesGuard: CanDeactivateFn<CanDeactivateComponent> = (component) => {
  return component.canDeactivate ? component.canDeactivate() : true;
};
