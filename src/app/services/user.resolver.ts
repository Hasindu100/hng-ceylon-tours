import { inject, Injectable } from "@angular/core";
import { Auth, authState, User } from "@angular/fire/auth";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { filter, map, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UserResolver implements Resolve<User>{
    auth = inject(Auth);
    // create the use observable
    user$ = authState(this.auth).pipe(
        filter(user => user != null),
        map(user => user)
    );

    // resolve the user data to the router
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
        return this.user$;
    }
}