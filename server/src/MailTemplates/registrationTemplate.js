 function registerTemlate({username}) {
    const html=`
    <html>
<head>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #e9ecef;
        }
        .email-container {
            width: 100%;
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
            border: 1px solid #ddd;
        }
        .header {
            background: linear-gradient(90deg, #4CAF50, #3d9143);
            color: #ffffff;
            padding: 20px 0;
            text-align: center;
        }
        .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: bold;
        }
        .body-content {
            padding: 25px;
            color: #333;
        }
        h2 {
            font-size: 24px;
            color: #4CAF50;
            margin-bottom: 15px;
        }
        p {
            font-size: 16px;
            line-height: 1.8;
            color: #555;
            margin-bottom: 20px;
        }
        .cta-button {
            display: block;
            width: fit-content;
            margin: 20px auto;
            padding: 14px 30px;
            font-size: 18px;
            font-weight: bold;
            color: #ffffff;
            text-decoration: none;
            background-color: #4CAF50;
            border-radius: 5px;
            box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
            transition: background-color 0.3s ease, transform 0.2s ease;
        }
        .cta-button:hover {
            background-color: #45a049;
            transform: translateY(-2px);
        }
        .footer {
            background-color: #f4f4f9;
            padding: 15px 20px;
            text-align: center;
            font-size: 13px;
            color: #888;
            border-top: 1px solid #ddd;
        }
        .footer a {
            color: #4CAF50;
            text-decoration: none;
        }
        .footer a:hover {
            color: #3d9143;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <!-- Header Section -->
        <div class="header">
            <h1>Welcome to Bloog, ${username}!</h1>
        </div>
        
        <!-- Body Content -->
        <div class="body-content">
            <h2>Account Created</h2>
            <p>
                Thank you for joining <strong>Blog</strong>, your new destination for blogging and sharing ideas!  start your blogging journey, by creating blogs.
            </p>
            <p> hey ${username} registration done</p>
            <a href="registration link" class="cta-button"> Registration Completed</a>
            
        </div>
        
        <!-- Footer Section -->
        <div class="footer">
            <p>Best Regards,</p>
            <p>The Blog Team</p>
            <p><a href="https://bloog.com">Visit our website</a></p>
        </div>
    </div>
</body>
</html>
`
        return html
}

export default registerTemlate