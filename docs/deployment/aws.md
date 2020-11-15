# Deploying to AWS S3 - Cloudfront

### Deploying to S3 in 7 steps

_Step 1:_ Run `yarn install` to install dependencies, then `yarn build` to create the `./build` folder.

_Step 2:_ Navigate to [AWS S3](https://aws.amazon.com/s3) and login (or sign up if you don't have an account). Click on `Services` followed by `S3` in the dropdown.

_Step 3:_ Click on `Create Bucket` and fill out both your `Bucket Name` and `Region` (for the USA, we recommend `US Standard`). Click `Next` until the `Set Permissions` section appears, and remove the tick from `Block all public access` (to make objects public). Click `Create` to create your bucket.

_Step 4:_ To make the bucket objects publicly viewable, go into the bucket, then `Permissions` (on the top bar) -> `Bucket Policy`. Copy-paste this, replacing`[BUCKET_NAME]` with your bucket name).

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AddPerm",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::[BUCKET_NAME]/*"
        }
    ]
}
```

_Step 5:_ Go to `Properties`. Click on the `Static Website Hosting` accordion where you should see the URL (or _endpoint_) of your website (i.e., `example.s3-website-us-east-1.amazonaws.com`). Click `Enable website hosting` and fill in both the `Index document` and `Error document` input fields with `index.html`. Click `Save`.

_Step 6:_ Click on your new S3 bucket on the left to open the bucket. Click `Upload` and select all the files within your `./build` folder. Click `Start Upload`. You can easily automate the deployment with a single [helper script](https://gist.github.com/Can-Sahin/d7de7e2ff5c1a39b82ced2d9bd7c60ae) that uses `aws-cli`. Running the shell script with necessary permissions on `AWS` will take care of all the issues mentioned in the warning below.

_Step 7:_ Click on the `Properties` tab, open `Static Website Hosting`, and click on the _Endpoint_ link. The app should be running on that URL.

{% hint style="danger" %}

IMPORTANT: S3 objects' `Cache-Control` metadata can cause problems on deployments. For example, not serving the new `index.html` file but returning the cached one, possibly resulting in users not getting the recently deployed web app. Since the `index.html` and `sw.js` files are the files loaded initially, and all the js bundles and chunks come later depending on these two files, we suggest adjusting the `Cache-Control` metadata for them after deployments. To do so, go to the file, then `Properties` -> `Metadata`. Add `max-age=0,no-cache,no-store,must-revalidate` to the key `Cache-Control`.

{% endhint %}

### Cloudfront for HTTPS and GZIP

_HTTPS_: `S3` serves only `HTTP`, so for `HTTPS`, you can use `Cloudfront`. Setting up `Cloudfront` is a bit longer than `S3 Static Website Hosting`. Therefore follow [AWS Instructions](https://aws.amazon.com/premiumsupport/knowledge-center/cloudfront-serve-static-website/) - follow the second configuration steps (Using a website endpoint as the origin with anonymous (public) access allowed) - to set a `Cloudfront` distribution using your `S3 Website`.

{% hint style="info" %}

Note: SPA applications handle routing inside the client, so pages like `/about` are unknown to the `Cloudfront`; it's configured to return the `index.html` file in the `S3 Bucket`). To prevent `404 Not Found` responses, after setting up your Cloudfront Distribution, go to the `Error Pages` then `Create Custom Error Response` to map `404` code to `200`.

{% endhint %}

_GZIP Compression_: Enabling gzip can reduce chunk sizes and improve loading performance dramatically. To enable gzip with `Cloudfront`, navigate to your distribution, then `Behaviors` -> `Edit` -> `Compress Objects Automatically`. Mark `Yes`. This alone **isn't enough**. You must update your `S3 Bucket CORS Configuration` to send `Content-Length` header by adding `<AllowedHeader>Content-Length</AllowedHeader>` in a [CORSRule](https://docs.aws.amazon.com/AmazonS3/latest/dev/cors.html).
