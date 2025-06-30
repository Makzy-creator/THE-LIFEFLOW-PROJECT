// /api/tavus-proxy.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { endpoint, ...body } = req.body;
  try {
    const tavusRes = await fetch(`https://platform.tavus.io/api/v1/${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.TAVUS_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    const text = await tavusRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch (err) {
      // Not JSON, return as error
      return res.status(500).json({ error: 'Tavus API did not return valid JSON', raw: text });
    }
    res.status(tavusRes.status).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message || 'Tavus proxy error' });
  }
}