const jwt = require("jsonwebtoken");

module.exports = (req, res) => {
  // Extract the token from the request body
  const { token } = req.body;

  // Check if a token exists
  if (token) {
    try {
      // Verify the token using the JWT_SECRET from environment variables
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // If verification succeeds, send back authenticated status and decoded token data
      res.json({
        auth: true,
        data: decode,
      });
    } catch (error) {
      // If verification fails (e.g., expired or invalid token), send back authentication failure
      res.json({
        auth: false,
        data: error.message, // Error message from jwt.verify
      });
    }
  } else {
    // If no token found in the request body, send back authentication failure
    res.json({
      auth: false,
      data: "No Token Found in request",
    });
  }
};
