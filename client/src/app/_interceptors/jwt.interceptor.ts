import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../services/account.service';
import { take } from 'rxjs';


export const JwtInterceptor: HttpInterceptorFn = (req, next) => {
  var accountService = inject(AccountService);
  accountService.currentUser$.pipe(take(1)).subscribe({
    next: user=> {
      if(user){
        req = req.clone({
          setHeaders:{
            Authorization: `Bearer ${user.token}`
          }
        });
      }
    }
  })
  return next(req);
};
