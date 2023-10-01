const {Storage} = require("@google-cloud/storage")
const PDFDocument = require('pdfkit');
const fs = require('fs');

async function run(message) {
    // Create PDF
    let pdfDoc = new PDFDocument;
    pdfDoc.pipe(fs.createWriteStream('SampleDocument.pdf'));
    pdfDoc.text("My Sample PDF Document");
    pdfDoc.end();

    // Creates a client
    const storage = new Storage({
      apiEndpoint: "http://gcs:9090",
      projectId: "test",
    });

    const [content] = await storage.bucket('sample-bucket')
    .file('some_file.txt')
    .download();
    console.log("Contents:", content.toString())
    return content.toString()
}

async function handler(req, res) {
    try{
    const c = await run(req.body.message)
    res.send(c);
    }catch(err) {
      console.error("err:", err)
    }
}
  
  module.exports = {
    handler,
  };