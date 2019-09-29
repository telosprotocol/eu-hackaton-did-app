import {Injectable} from '@angular/core';
import {Storage} from '@ionic/storage';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(
        private storage: Storage,
        private http: HttpClient,
    ) {
    }

    public isLoggedIn() {
        return this.storage.get('token').then(token => token);
    }

    public login(fingerHex: string) {
        return this.http.post('http://05c36382.ngrok.io/login', {fingerHex});
    }

    public regist(fingerHex: string) {
        return this.http.post('http://05c36382.ngrok.io/register', {fingerHex});
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

    public getListFiles() {
        const headers = new HttpHeaders({
            'Authorization': 'Bearer' + ' ' + 'TODO TOKEN'
        });
        return this.http.get('http://8e56a69c.ngrok.io/api/files?uuid=6');
    }

}
