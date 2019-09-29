import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Storage} from '@ionic/storage';
import {AuthService} from '../../services/auth.service';
import {Platform} from '@ionic/angular';
import {AndroidFingerprintAuth} from '@ionic-native/android-fingerprint-auth/ngx';
import {Router} from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public secret;
    public mail;

    constructor(
        private storage: Storage,
        private authService: AuthService,
        private plt: Platform,
        private androidFingerprintAuth: AndroidFingerprintAuth,
        private router: Router,
    ) {
    }

    ngOnInit() {

    }

    ionViewWillEnter() {
        this.authService.getMail().then(data => {
            this.mail = data;
            this.encode(data);
        });
    }

    public login(form?: NgForm) {
     console.log(form);
     this.encode(form.value.email);
    }

    public encode(mail) {
        this.authService.getSecret().then(data => {
            this.secret = data;
            if (this.secret) {
                console.log('SECRET HERE');
                this.plt.ready().then((readySource) => {
                    console.log(readySource, 'SOURCE READY');
                    this.androidFingerprintAuth.isAvailable()
                        .then((result) => {
                            console.log(result, 'from finger');
                            if (result.isAvailable) {
                                this.androidFingerprintAuth.decrypt({
                                    clientId: 'hackMoon',
                                    username: mail,
                                    token: this.secret
                                }).then((data) => {
                                    //TODO LOGIN DATA
                                    console.log('DATA ENCRYPTED', this.ascii_to_hexa(mail + data.password));
                                    this.authService.login(this.ascii_to_hexa(mail + data.password)).subscribe((data) => {
                                        console.log('login success', data);
                                    });
                                    this.authService.setToken().then((token) => {
                                        console.log('data token set', token);
                                        this.router.navigate(['/home']);
                                    });
                                });
                            }
                        });
                });
            }
        });
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
