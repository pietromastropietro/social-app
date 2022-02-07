const { S3Client, PutObjectCommand } = require('aws-sdk');
const { getSignedUrl } = require('aws-sdk');

const getAwsUrl = async (req, res, next) => {
    // Image name will be 'img' plus full date and time of upload, ex: 'img_2022-02-10T14:25'
    const imgName = `img_${new Date.toISOString().substring(0, 16)}`
    const imgType = req.query['img-type'];
    const s3 = new S3Client({ region: 'eu-central-1' });
    const command = new PutObjectCommand(s3Params);

    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: imgName,
        ContentType: imgType,
        ACL: 'public-read'
    };

    const imgUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${imgName}`;

    try {
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

        res.json({ signedUrl: signedUrl, imgUrl: imgUrl });
    } catch (err) {
        return next(err);
    }
}



// const aws = require('aws-sdk');

// const getAwsUrl = (req, res, next) => {
//     // Image name will be 'img' plus full date and time of upload, ex: 'img_2022-02-10T14:25'
//     const imgName = `img_${new Date.toISOString().substring(0, 16)}`;
//     const imgType = req.query['file-type'];
//     const s3 = new aws.S3({ region: 'eu-central-1' });

//     const s3Params = {
//         Bucket: process.env.S3_BUCKET,
//         Key: imgName,
//         Expires: 60,
//         ContentType: imgType,
//         ACL: 'public-read'
//     };

//     const imgUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${imgName}`

//     s3.getSignedUrl('putObject', s3Params, (err, signedUrl) => {
//         if (err) {
//             return next(err);
//         }
//         res.json({ signedUrl: signedUrl, imgUrl: imgUrl });
//     });
// }

module.exports = {
    getAwsUrl
}