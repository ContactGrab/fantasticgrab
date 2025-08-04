const express = require('express');
const path = require('path');
const { extractMediaUrl } = require('./scraper');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.json());

app.post('/download', async (req, res) => {
  const { url } = req.body;
  if (!url || !url.includes('instagram.com')) {
    return res.status(400).json({ error: 'Invalid Instagram URL' });
  }

  try {
    const mediaUrl = await extractMediaUrl(url);
    res.json({ mediaUrl });
  } catch (err) {
    res.status(500).json({ error: 'Failed to extract media' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
