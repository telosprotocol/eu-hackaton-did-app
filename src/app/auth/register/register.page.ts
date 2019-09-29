import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
import {AuthService} from '../../services/auth.service';

interface KeyModel {
    account: AccModel;
}
interface AccModel {
    address?: string;
    privateKey?: string;
    publicKey?: string;
}
@Component({
    selector: 'app-register',
    templateUrl: './register.page.html',
    styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

    constructor(
        private androidFingerprintAuth: AndroidFingerprintAuth,
        private storage: Storage,
        private authService: AuthService,
    ) {
    }

    ngOnInit() {
    }

    public register(form?: NgForm) {
        console.log(form);
        if (form.value) {
            this.setFingerPrint(form);
        }
    }

    public setFingerPrint(form) {
        this.androidFingerprintAuth.isAvailable()
            .then((result) => {
                if (result.isAvailable) {
                    // it is available
                    this.androidFingerprintAuth.encrypt({
                        clientId: 'hackMoon',
                        username: form.value.email,
                        password: form.value.password,
                    })
                        .then((result) => {
                            if (result.withFingerprint) {
                                console.log('Successfully encrypted credentials.');
                                console.log('Encrypted credentials: ' + result.token);
                                this.authService.setSecret(result.token);
                                this.authService.setEmail(form.value.email);
                                console.log(this.ascii_to_hexa(form.value.email + form.value.password));
                                this.authService.regist(this.ascii_to_hexa(form.value.email + form.value.password))
                                    .subscribe((data: KeyModel) => {
                                        this.authService.setKeys(data.account.privateKey, data.account.publicKey);
                                        console.log(data, 'reg success');
                                });
                            } else if (result.withBackup) {
                                console.log('Successfully authenticated with backup password!');
                            } else console.log('Didn\'t authenticate!');
                        })
                        .catch(error => {
                            if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
                                console.log('Fingerprint authentication cancelled');
                            } else console.error(error);
                        });

                } else {
                    // fingerprint auth isn't available
                }
            })
            .catch(error => console.error(error));
    }

    public ascii_to_hexa(str) {
        let arr1 = [];
        for (let n = 0, l = str.length; n < l; n++) {
            let hex = str.charCodeAt(n).toString(16);
            arr1.push(hex);
        }
        return arr1.join('');
    }

}
