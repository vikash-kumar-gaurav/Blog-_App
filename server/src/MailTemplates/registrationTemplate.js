 function registerTemlate({username}) {
    const html=`
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
                    background-color: #4CAF50;
                    color: #fff;
                    padding: 12px 30px;
                    font-size: 18px;
                    text-decoration: none;
                    border-radius: 50px;
                    margin: 20px 0;
                    transition: all 0.3s ease;
                }
                .cta-button:hover {
                    background-color: #45a049;
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
                    background-color: #4CAF50;
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
                <h2>You're Almost There!</h2>
                <p>Thank you for signing up to Bloog, your new home for blogging! To complete your registration and start writing your first post, we just need you to confirm your email address.</p>
                <p>Click the button below to verify your email address and activate your account:</p>
                
                <a href="registration link" class="cta-button">Complete Your Registration</a>

                <p>If you did not sign up with us, you can safely ignore this email.</p>

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

export default registerTemlate