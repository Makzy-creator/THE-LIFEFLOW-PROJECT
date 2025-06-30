// /api/tavus-proxy.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { endpoint, ...body } = req.body;

  const tavusRes = await fetch(`https://platform.tavus.io/api/v1/${endpoint}`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.TAVUS_API_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  const data = await tavusRes.json();
  res.status(tavusRes.status).json(data);
}