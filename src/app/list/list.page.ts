import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {WebView} from '@ionic-native/ionic-webview/ngx';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    public list: any = [];
    constructor(
        private auth: AuthService,
        private alertService: AlertService
    ){}
    ngOnInit() {
    }

    // add back when alpha.4 is out
    // navigate(item) {
    //   this.router.navigate(['/list', JSON.stringify(item)]);
    // }
    ionViewWillEnter() {
      this.auth.getListFiles().subscribe((data) => {
        console.log(data, 'filelist');
        this.list = data;
      });
    }


}
