// UserProfileService/handler.js
const AWS = require('aws-sdk');
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const { USER_PROFILES_TABLE, S3_BUCKET_NAME } = process.env;

// Function to create or update a user profile
exports.updateUserProfile = async (event) => {
    const { userId, name, email, profilePicture } = JSON.parse(event.body);

    // Upload profile picture to S3 and get the URL
    const profilePictureUrl = await uploadProfilePictureToS3(userId, profilePicture);

    const params = {
        TableName: USER_PROFILES_TABLE,
        Item: {
            userId,
            name,
            email,
            profilePictureUrl,
            updatedAt: new Date().toISOString(),
        },
    };

    try {
        await dynamoDb.put(params).promise();
        return {
            statusCode: 200,
            body: JSON.stringify({ message: 'User profile updated successfully' }),
        };
    } catch (error) {
        console.error(error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Could not update user profile' }),
        };
    }
};

// Helper function to upload profile picture to S3
async function uploadProfilePictureToS3(userId, base64EncodedImage) {
    const buffer = Buffer.from(base64EncodedImage, 'base64');
    const key = `profile-pictures/${userId}.png`;

    const uploadParams = {
        Bucket: S3_BUCKET_NAME,
        Key: key,
        Body: buffer,
        ContentType: 'image/png',
        ACL: 'public-read', // Ensure this meets your privacy requirements
    };

    try {
        const result = await s3.upload(uploadParams).promise();
        return result.Location; // URL of the uploaded image
    } catch (error) {
        console.error('Error uploading image to S3:', error);
        throw error;
    }
}

