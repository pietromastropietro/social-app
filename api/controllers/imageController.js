// AWS config
// const aws = require('aws-sdk');
// aws.config.region = 'eu-central-1'
const { S3Client, getSignedUrl } = require("@aws-sdk/client-s3");


export const getAwsUrl = (req, res, next) => {
    try {
        const client = new S3Client({ region: "eu-central-1" });

        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];

        const s3Params = {
            Bucket: process.env.S3_BUCKET,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };


        const signedUrl = s3.getSignedUrl('putObject', s3Params);

        // const returnData = {
        //     signedRequest: signedUrl,
        //     url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        // };

        // res.json({ returnData: returnData });


        // s3.getSignedUrl('putObject', s3Params, (err, data) => {
        //     if (err) {
        //         return next(err);
        //     }

        //     const returnData = {
        //         signedRequest: data,
        //         url: `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${fileName}`
        //     };

        //     res.json({ returnData: returnData });
        // });
    } catch (err) {
        return next(err);
    }

}