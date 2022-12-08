import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
import {catchError, Observable, of, switchMap} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate,CanLoad {
  constructor(
    private authService:AuthService,
    private router: Router
  ) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated().pipe(switchMap((auth)=>{
      if (auth){
        return of(auth);
      }
      return this.router.navigate(["/login"]);
    }),
      catchError(err => {
        console.log("error was "+JSON.stringify(err));
        return this.router.navigate(["/login"]);
      }));

  }

  canLoad(route: Route, segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.isAuthenticated()
      .pipe(
        switchMap((auth)=>!!auth?of(auth):this.router.navigate(["/login"])),
        catchError(err => of(false)))
  }



}
