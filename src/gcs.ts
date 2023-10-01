import { Storage } from "@google-cloud/storage"

async function run() {
    // Creates a client
    const storage: Storage = new Storage({
      apiEndpoint: "http://localhost:9090",
      projectId: "test",
    });

    const bucketName="sample-bucket"
    const filePath="/Users/analauratula/dev/local-cf-bucket/src/some_file.txt"

    const [b] = await storage.createBucket(bucketName)
  
    const [buckets] = await storage.getBuckets();
    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.id);
    });
        
    await b.upload(filePath);
    console.log(`${filePath} uploaded to ${bucketName}`);

    const [content] = await storage.bucket('sample-bucket')
    .file('some_file.txt')
    .download();
    console.log("Contents:")
    console.log(content.toString())  
  }
  
  run().catch((err) => {
    console.error(err);
    process.exit(1);
  });