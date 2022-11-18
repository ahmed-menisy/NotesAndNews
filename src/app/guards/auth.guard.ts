import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './../shared/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthLoginUser implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    // console.log(this._AuthService.role.getValue());
    // console.log(this._AuthService.user.getValue());
    if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'user'
    )
      return true;
    else if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'admin'
    ) {
      this._Router.navigate(['/admin']);

      return false;
    }
    this._Router.navigate(['/auth/login']);

    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthLoginAdmin implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'admin'
    )
      return true;
    else if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'user'
    ) {
      this._Router.navigate(['/user']);

      return false;
    }
    this._Router.navigate(['/auth/login']);

    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class AuthLog implements CanActivate {
  constructor(private _AuthService: AuthService, private _Router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'admin'
    ) {
      this._Router.navigate(['/admin']);
      return false;
    } else if (
      this._AuthService.user.getValue() &&
      this._AuthService.role.getValue() === 'user'
    ) {
      this._Router.navigate(['/user']);

      return false;
    }

    return true;
  }
}
