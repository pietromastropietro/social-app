import axios from "axios";

// Upload image to AWS S3 bucket
export const handleImageUpload = async (image) => {
    try {
        // Get a pre-signed AWS url to upload an image
        let res = await axios.get(`${process.env.REACT_APP_API_URL}/aws-url?img-type=${image.type}`);

        const { signedUrl: signedRequest, resourceUrl: imgUrl } = res.data;

        if (!signedRequest) {
            return;
        }

        // Upload image with the pre-signed url
        res = await axios.put(signedRequest, image, {
            headers: { 'Content-Type': image.type }
        });

        if (res.status !== 200) {
            return;
        }

        return imgUrl;
    } catch (err) {
        console.log(err.message);
    }
}