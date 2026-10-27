export default async function handler(req, res) {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    res.setHeader('Access-Control-Allow-Origin','*');
    return res.status(400).json({error:'Missing url'});
  }
  let url = targetUrl;
  try { url = decodeURIComponent(url); } catch(e) {}
  const endpoints = [url, url.replace('query1.finance.【entity-yahoo¦canonical_name=Yahoo】.com','query2.finance.【entity-yahoo¦canonical_name=Yahoo】.com')];
  for (const tryUrl of endpoints) {
    try {
      const r = await fetch(tryUrl, { headers: { 'User-Agent': 'Mozilla/5.0', 'Accept': 'application/json' } });
      const text = await r.text();
      res.setHeader('Access-Control-Allow-Origin','*');
      if (text.trim().startsWith('{') || text.trim().startsWith('[')) {
        res.setHeader('Content-Type','application/json');
        return res.status(200).send(text);
      }
      if (r.ok) return res.status(200).send(text);
    } catch(e) { continue; }
  }
  return res.status(404).json({error:'【entity-Yahoo¦canonical_name=Yahoo】 blocked'});
}
