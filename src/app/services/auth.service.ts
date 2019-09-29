import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private storage: Storage) {
    }

    public isLoggedIn() {
        return this.storage.get('token').then(token => token);
    }

    public setToken() {
        return this.storage.set('token', 123);
    }

    public removeTocken() {
        return this.storage.remove('token');
    }

    public setSecret(secret: string) {
        return this.storage.set('secret', secret)
            .then(
                () => {
                    console.log('Token Stored');
                },
                error => console.error('Error storing item', error)
            );
    }

    public getSecret() {
        return this.storage.get('secret').then(
            data => data,
            error => null,
        );
    }

    public setEmail(mail: string) {
        return this.storage.set('mail', mail)
            .then(
                () => {
                    console.log('Mail saved');
                },
                error => console.error('Error storing item', error)
            );
    }
    public getMail() {
        return this.storage.get('mail').then(
            data => data,
            error => null,
        );
    }

}
