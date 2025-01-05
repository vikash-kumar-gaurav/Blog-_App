function verifyEmailTemplate({username,verificationLink}) {
    const html = `
    <html>
        <head>
            <style>
                body {
                    font-family: 'Arial', sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f4f4f9;
                }
                .email-container {
                    width: 100%;
                    max-width: 600px;
                    margin: 0 auto;
                    background-color: #ffffff;
                    border-radius: 8px;
                    padding: 20px;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                }
                h2 {
                    color: #333;
                    font-size: 26px;
                    margin-bottom: 15px;
                }
                p {
                    color: #555;
                    line-height: 1.6;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .cta-button {
                    display: inline-block;
                    background-color: #5b9bd5;
                    color: #fff;
                    padding: 12px 30px;
                    font-size: 18px;
                    text-decoration: none;
                    border-radius: 50px;
                    margin: 20px 0;
                    transition: all 0.3s ease;
                }
                .cta-button:hover {
                    background-color: #4a8cc2;
                }
                .footer {
                    font-size: 12px;
                    color: #888;
                    text-align: center;
                    margin-top: 30px;
                }
                .footer a {
                    color: #888;
                    text-decoration: none;
                }
                .footer a:hover {
                    color: #555;
                }
                .header {
                    background-color: #5b9bd5;
                    padding: 15px 0;
                    text-align: center;
                    border-radius: 8px 8px 0 0;
                }
                .header h1 {
                    color: #fff;
                    font-size: 30px;
                    margin: 0;
                }
            </style>
        </head>
        <body>
            <div class="email-container">
                <div class="header">
                    <h1>Welcome to Bloog, ${username}!</h1>
                </div>
                <h2>Confirm Your Email Address</h2>
                <p>Thank you for joining our blogging platform! To complete your registration, please verify your email address.</p>
                <p>Simply click the button below to get started:</p>
                
                <a href="${verificationLink}" class="cta-button">Verify Your Email</a>

                <p>If you didn't register with us, feel free to ignore this email.</p>

                <div class="footer">
                    <p>Best Regards,<br/>The Bloog Team</p>
                    <p><a href="https://bloog.com">Visit our website</a></p>
                </div>
            </div>
        </body>
        </html>
    
    `
    return html
}
export default verifyEmailTemplate