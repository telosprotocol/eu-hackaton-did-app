import {Component, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';
import { Storage } from '@ionic/storage';
import {AuthService} from '../../services/auth.service';


@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    constructor(
        private storage: Storage,
        private authService: AuthService) {
    }

    ngOnInit() {

    }

    public login(form?: NgForm) {
      console.log(form);
      this.authService.setToken();
    }

}
