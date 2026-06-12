export default async function handler(req, res) {
  const { status, response_time } = req.body;

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_KEY = process.env.SUPABASE_KEY;

  try {
    const result = await fetch(`${SUPABASE_URL}/rest/v1/erp_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": SUPABASE_KEY,
        "Authorization": `Bearer ${SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        status,
        response_time,
        created_at: new Date().toISOString()
      })
    });

    res.status(200).json({ ok: true });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}