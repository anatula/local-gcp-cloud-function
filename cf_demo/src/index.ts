import * as ff from '@google-cloud/functions-framework'
import { Storage } from '@google-cloud/storage'
import PDFDocument from 'pdfkit'
import fs from 'fs'

ff.http('handler', async (req: ff.Request, res: ff.Response) => {
  try{
    const c = await run(req.body.message)
    res.send(c);
    }catch(err) {
      console.error("err:", err)
    }
});

async function run(message: string) {
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
