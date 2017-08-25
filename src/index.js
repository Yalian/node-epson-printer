const escpos = require('escpos');

// Select the adapter based on your printer type
// const device  = new escpos.USB();
const device  = new escpos.Network('192.168.1.14');
// const device  = new escpos.Serial('/dev/usb/lp0');

const printer = new escpos.Printer(device);

// device.open(function(){
//   console.log('is open');
//   printer
//     // .font('a')
//     // .align('ct')
//     // .style('bu')
//     // .size(1, 1)
//     // .text('The quick brown fox jumps over the lazy dog')
//     // .text('敏捷的棕色狐狸跳过懒狗')
//     // .text('Hồng trà lắc')
//     // .barcode('12345678', 'EAN8')
//     .image()
//     .cut()
//     .close()
//
// });

// escpos.Image.load(__dirname + '/tux.png', function(image){
//   device.open(function(){
//     printer
//       .align('ct')
//       .setColor(1)
//       .hoiImage(image) // Use hoitImage for epson tm u220
//       .cut(false, 5)
//       .close()
//
//   });
// });

let receiptImagePro = new Promise(resolve => {
  escpos.Image.load(__dirname + '/receipt5.png', function(image){
    resolve(image)
  });
})

let tuxImagePro = new Promise(resolve => {
  escpos.Image.load(__dirname + '/tux.png', function(image){
    resolve(image)
  });
})

Promise.all([receiptImagePro, tuxImagePro]).then(([receiptImage, tuxImage]) => {
  device.open(function(){

    printer
      .align('ct')
      .setColor(0)
      .text("text: set color black")
      .text("print receipt image")
      .hoiImage(receiptImage)
      .setColor(1)
      .text("text: set color black")
      .text("print tux image")
      .hoiImage(tuxImage)
      .cut(false, 5)
      .close()

  });
});
