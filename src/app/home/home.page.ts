import {Component} from '@angular/core';
import {FileChooser} from '@ionic-native/file-chooser/ngx';
import {Base64} from '@ionic-native/base64/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import {path} from '@angular-devkit/core';
import { DomSanitizer } from '@angular/platform-browser';
import {AlertService} from '../services/alert.service';
import {WebView} from '@ionic-native/ionic-webview/ngx';
@Component({
    selector: 'app-home',
    templateUrl: 'home.page.html',
    styleUrls: ['home.page.scss'],
})
export class HomePage {
    uri;
    imagePath;
    constructor(
        public domSanitizer: DomSanitizer,
        private transfer: FileTransfer,
        private file: File,
        private base64: Base64,
        private fileChooser: FileChooser,
        private alertService: AlertService,
        private webview: WebView,
    ) {

    }

    public selectFile() {
        this.fileChooser.open()
            .then(uri => {
                this.uri = this.webview.convertFileSrc(uri);
                const fileTransfer: FileTransferObject = this.transfer.create();
                fileTransfer.upload(uri, 'http://8e56a69c.ngrok.io/api/upload', {params: {uuid: 2, name: '', fileType:'png'}})
                    .then((data) => {
                        this.alertService.presentToast('file send success');
                        console.log('data', data);
                    }, (err) => {
                        this.alertService.presentToast('file send failure');
                        console.log(err, 'err');
                        // error
                    });
                console.log(uri);
            })
            .catch(e => console.log(e));
    }

}
