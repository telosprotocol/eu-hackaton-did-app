import {Component, OnInit} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {AlertService} from '../services/alert.service';
import {Storage} from '@ionic/storage';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    selector: 'app-list',
    templateUrl: 'list.page.html',
    styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
    private selectedItem: any;
    private uuid;
    showImage;
    private file;
    public list: any = [];

    constructor(
        private auth: AuthService,
        private alertService: AlertService,
        private authService: AuthService,
        private storage: Storage,
        private sanitizer: DomSanitizer
    ) {
    }

    ngOnInit() {
    }
    ionViewWillEnter() {
        this.storage.get('publicKey').then((key) => {
            this.uuid = key;
            this.auth.getListFiles(this.uuid).subscribe((data) => {
                console.log(data, 'filelist');
                this.list = data;
            });
        });
    }

    openFile(id) {
        this.authService.openFiles(id).subscribe((data: any) => {
            console.log(data);
            this.file = 'data:image/png;base64, ' + data.file;
            this.showImage = this.sanitizer.bypassSecurityTrustUrl(this.file);
        });
    }

}
