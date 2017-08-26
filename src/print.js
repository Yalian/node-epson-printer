const escpos = require('./hoi-escpos');
const device = new escpos.Network('192.168.9.91');
const printer = new escpos.Printer(device);
const argv = process.argv.slice(2)
const filePath = argv[0];
if(!filePath) throw new Error("No specific file to print");

let loadImgPro = new Promise(resolve => {
  escpos.Image.load(filePath, image => {
    resolve(image)
  });
})

let deviceOpenPro = new Promise(resolve => {
  device.open(() => resolve());
})

Promise.all([loadImgPro, deviceOpenPro]).then(([img]) => {
    printer
      .align('ct')
      .raster(img)
      .cut(false, 10)
      .close()
  }
)
