exports.handler = async (event) => {
    return {
        statusCode: 200,
        headers: {
            "Content-Type": "text/html; charset=UTF-8"
        },
        body: `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Social Media Dashboard</title>
            </head>
            <body>
                <h1>Social Media Dashboard is running!</h1>
                <p>Welcome to the Social Media Dashboard.</p>
            </body>
            </html>
        `,
        isBase64Encoded: false
    };
};

