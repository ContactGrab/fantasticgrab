const puppeteer = require('puppeteer');

async function extractMediaUrl(postUrl) {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  const page = await browser.newPage();
  await page.goto(postUrl, { waitUntil: 'networkidle2' });

  // Try video first
  let mediaUrl = await page.evaluate(() => {
    const video = document.querySelector('video');
    if (video) return video.src;

    const img = document.querySelector('img[decoding="auto"]');
    return img ? img.src : null;
  });

  await browser.close();

  if (!mediaUrl) throw new Error('Media not found');
  return mediaUrl;
}

module.exports = { extractMediaUrl };
