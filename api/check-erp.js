export default async function handler(req, res) {
  const url = "http://trial-ris.rapigra.co.id/";

  const start = Date.now();
  let status = "OFFLINE";

  try {
    const response = await fetch(url, {
      method: "GET",
      signal: AbortSignal.timeout(8000)
    });

    status = response.ok ? "ONLINE" : "ERROR";

  } catch (err) {
    status = "OFFLINE";
  }

  const responseTime = Date.now() - start;

  // SIMPAN KE SUPABASE
  try {
    await fetch(`${process.env.SUPABASE_URL}/rest/v1/erp_logs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "apikey": process.env.SUPABASE_KEY,
        "Authorization": `Bearer ${process.env.SUPABASE_KEY}`,
        "Prefer": "return=minimal"
      },
      body: JSON.stringify({
        status,
        response_time: responseTime,
        url
      })
    });
  } catch (e) {
    console.log("Supabase insert failed:", e.message);
  }

  res.json({
    status,
    responseTime,
    url
  });
}