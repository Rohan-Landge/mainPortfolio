/**
 * Contact controller
 * - Extracts `name`, `email`, `message` from `req.body`
 * - Validates presence of fields
 * - Logs the message and returns a success JSON
 */
exports.handleContact = (req, res) => {
  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, error: 'Name, email and message are required.' });
    }

    const payload = {
      name: String(name).trim(),
      email: String(email).trim(),
      message: String(message).trim()
    };

    // Log the received contact data for server-side visibility
    console.log('Contact form received:', payload);

    // Return required success response
    return res.status(200).json({ success: true, message: 'Message received successfully' });
  } catch (err) {
    console.error('Contact handler error:', err);
    return res.status(500).json({ success: false, error: 'Internal server error' });
  }
};
