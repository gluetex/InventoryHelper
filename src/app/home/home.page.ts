// import { Component } from '@angular/core';
// import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';

// interface BarcodeData {
//   stock: number;
//   name: string;
//   description: string;
//   image: string;

// }


// @Component({
//   selector: 'app-home',
//   templateUrl: 'home.page.html',
//   styleUrls: ['home.page.scss'],
// })
// export class HomePage {


//   BarcodeData: BarcodeData[] = [
//     {
//       stock: 5,
//       name: 'IntravenousCannula',
//       description: 'Intravenous (IV) Cannula is a disposable item to inject certain products within patient bloodstream.',
//       image: 'https://cdn-aphgg.nitrocdn.com/pFKaQZowDhbhkufgJoHjxPXwdVGuxPHc/assets/images/optimized/rev-3d1859a/img.tradees.com/file/upload/2020/05/10/injection-port-disposable-intravenous-catheter-IV-cannula.jpg',
//     },
//     {
//       stock: 15,
//       name: 'Lancet',
//       description: 'A medical tool required for capillary blood sampling',
//       image: 'https://cdn-aphgg.nitrocdn.com/pFKaQZowDhbhkufgJoHjxPXwdVGuxPHc/assets/images/optimized/rev-3d1859a/sc01.alicdn.com/kf/HTB1kjHtlgLD8KJjSszeq6yGRpXae.jpg',
//     },
//   ];

//   matchedBarcode: BarcodeData | undefined;


//   scannedData: any;
//   encodedData!: '';
//   encodeData: any;
//   inputData: any;
//   constructor(private barcodeScanner: BarcodeScanner) {}

//   async scanBarcode() {
//     const options: BarcodeScannerOptions = {
//       preferFrontCamera: false,
//       showFlipCameraButton: true,
//       showTorchButton: true,
//       torchOn: false,
//       prompt: 'Place a barcode inside the scan area',
//       resultDisplayDuration: 500,
//       formats: 'EAN_13,EAN_8,QR_CODE,PDF_417 ',
//       orientation: 'portrait',
//     };

//     this.barcodeScanner.scan(options).then(barcodeData => {
//       console.log('Barcode data', barcodeData);
//       this.scannedData = barcodeData;
  
//       this.matchedBarcode = this.BarcodeData.find(item => item.name === barcodeData.text);
  
//     }).catch(err => {
//       console.log('Error', err);
//     });
//   }

//   createBarcode() {
//     this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData).then((encodedData) => {
//       console.log(encodedData);
//       this.encodedData = encodedData;
//     }, (err) => {
//       console.log('Error occured : ' + err);
//     });
//   }

// }

import { Component } from '@angular/core';
import { BarcodeScanner, BarcodeScannerOptions } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController } from '@ionic/angular';

interface BarcodeData {
  stock: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  BarcodeData: BarcodeData[] = [
    {
            stock: 5,
            name: 'IntravenousCannula',
            description: 'Intravenous (IV) Cannula is a disposable item to inject certain products within patient bloodstream.',
            image: 'https://cdn-aphgg.nitrocdn.com/pFKaQZowDhbhkufgJoHjxPXwdVGuxPHc/assets/images/optimized/rev-3d1859a/img.tradees.com/file/upload/2020/05/10/injection-port-disposable-intravenous-catheter-IV-cannula.jpg',
          },
          {
            stock: 15,
            name: 'Lancet',
            description: 'A medical tool required for capillary blood sampling',
            image: 'https://cdn-aphgg.nitrocdn.com/pFKaQZowDhbhkufgJoHjxPXwdVGuxPHc/assets/images/optimized/rev-3d1859a/sc01.alicdn.com/kf/HTB1kjHtlgLD8KJjSszeq6yGRpXae.jpg',
          },
          
  ];

  matchedBarcode: BarcodeData | undefined;
  scannedData: any;
  encodedData!: '';
  encodeData: any;
  inputData: any;

  constructor(
    private barcodeScanner: BarcodeScanner,
    private alertController: AlertController
  ) {}

  async scanBarcode() {
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
      showFlipCameraButton: true,
      showTorchButton: true,
      torchOn: false,
      prompt: 'Place a barcode inside the scan area',
      resultDisplayDuration: 500,
      formats: 'EAN_13,EAN_8,QR_CODE,PDF_417',
      orientation: 'portrait',
    };

    this.barcodeScanner.scan(options).then(async (barcodeData) => {
      console.log('Barcode data', barcodeData);
      this.scannedData = barcodeData;

      this.matchedBarcode = this.BarcodeData.find(
        (item) => item.name === barcodeData.text
      );

      if (this.matchedBarcode) {
        await this.showAlertForProduct(this.matchedBarcode);
      }
    }).catch((err) => {
      console.log('Error', err);
    });
  }

  async showAlertForProduct(product: BarcodeData) {
    const alert = await this.alertController.create({
      header: 'Product Found',
      message: `Do you want to use ${product.name}?`,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Yes',
          handler: () => {
            this.useProduct(product);
          },
        },
      ],
    });

    await alert.present();
  }

  useProduct(product: BarcodeData) {
    if (product.stock > 0) {
      product.stock--;
      
    } else {
      alert('Out of stock');
        }
  }

  createBarcode() {
    this.barcodeScanner
      .encode(this.barcodeScanner.Encode.TEXT_TYPE, this.inputData)
      .then(
        (encodedData) => {
          console.log(encodedData);
          this.encodedData = encodedData;
        },
        (err) => {
          console.log('Error occurred: ' + err);
        }
      );
  }
}
