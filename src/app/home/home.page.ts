import {Component} from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import {FileTransfer, FileTransferObject} from '@ionic-native/file-transfer/ngx';
import {File} from '@ionic-native/file/ngx';
import {DomSanitizer} from '@angular/platform-browser';
import {AlertService} from '../services/alert.service';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {AuthService} from '../services/auth.service';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    uri;
    uuid;
    filename: string;
    originalUrl;
    imagePath;

    constructor(
        public domSanitizer: DomSanitizer,
        private transfer: FileTransfer,
        private file: File,
        private base64: Base64,
        private fileChooser: FileChooser,
        private alertService: AlertService,
        private authService: AuthService,
        private webview: WebView,
        private storage: Storage,
    ) {

    }

    ionViewWillEnter() {
        this.storage.get('publicKey').then((data) => {
            this.uuid = data;
            console.log( this.uuid);
        });
    }

    public selectFile() {
        this.fileChooser.open()
            .then(uri => {
                this.originalUrl = uri;
                this.uri = this.webview.convertFileSrc(uri);
            })
            .catch(e => console.log(e));
    }

    uploadFile() {
        const fileTransfer: FileTransferObject = this.transfer.create();
        fileTransfer.upload(this.originalUrl, 'http://8e56a69c.ngrok.io/api/upload', {
            params: {uuid: this.uuid, name: this.filename, fileType: 'png'}
        })
            .then((data) => {
                this.alertService.presentToast('FILE SEND SUCCESS');
                console.log('data', data);
            }, (err) => {
                this.alertService.presentToast('FILE SEND FAILURE');
                console.log(err, 'err');
                // error
            });
    }

}
