const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

const getAwsUrl = async (req, res, next) => {
    // Image name will be 'img' plus full date and time of upload, ex: 'img_2022-02-10T14:25'
    const dt = new Date().toISOString().substring(0, 16);
    const imgName = `img_${dt}`
    const imgType = req.query['img-type'];
    const s3 = new S3Client({ region: 'eu-central-1' });
    
    const s3Params = {
        Bucket: process.env.S3_BUCKET,
        Key: imgName,
        ContentType: imgType,
        ACL: 'public-read'
    };

    const command = new PutObjectCommand(s3Params);
    
    const imgUrl = `https://${process.env.S3_BUCKET}.s3.amazonaws.com/${imgName}`;

    try {
        const signedUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

        res.json({ signedUrl: signedUrl, resourceUrl: imgUrl });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getAwsUrl
}