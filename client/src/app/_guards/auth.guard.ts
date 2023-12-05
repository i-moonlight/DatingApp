import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

console.log(accountService.currentUser$);

  return accountService.currentUser$.pipe(
    map(user => {
      console.log(user);
      
      if(user) {
        return true;
      }
      else{
        toastr.error("you shall not pass!");
        return false;
      }
    })
  );
};
// @Injectable({
//   providedIn: "root"
// })
// export class AuthGuard implements CanActivate {
//   constructor(private accountService:AccountService, 
//               private toastr:ToastrService){}
//   canActivate(): Observable<boolean> {
//     return this.accountService.currentUser$.pipe(
//       map(user => {
//         if (user) return true;
//         this.toastr.error('You shall not pass!');
//         return false;
//       })
//     )
//   }  
// }