import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService
    ) {
    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot) {
        return this.authService.isLoggedIn().then((data => {
            const currentUser = data;
            if (currentUser) {
                console.log('data', currentUser);
                // authorised so return true
                return true;
            }
            this.router.navigate(['/login']);
            return false;
        }));
        // not logged in so redirect to login page with the return url
    }
}
