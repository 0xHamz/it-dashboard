async function checkERP() {

    const output = document.getElementById("output");

    try {

        const res = await fetch("/api/check-erp");

        const data = await res.json();

        const statusText =
            data.status === "ONLINE"
            ? '<span class="ok">ONLINE</span>'
            : '<span class="bad">OFFLINE</span>';

        output.innerHTML = `
            <div>---------------------------</div>
            <div>STATUS : ${statusText}</div>
            <div>TARGET : ${data.url}</div>
            <div>RESPONSE CHECK : ${data.responseTime} ms</div>
            <div>LAST UPDATE : ${new Date().toLocaleString("id-ID")}</div>
            <div>---------------------------</div>
        `;

        addLog(data.status, data.responseTime);

    } catch(err){

        output.innerHTML = `
            <div>---------------------------</div>
            <div>STATUS : <span class="bad">OFFLINE</span></div>
            <div>ERROR : ${err.message}</div>
            <div>---------------------------</div>
        `;

        addLog("OFFLINE",0);
    }
}
export default async function handler(req, res) {

    try {

        const start = Date.now();

        const response = await fetch(
            "http://trial-ris.rapigra.co.id/",
            {
                method: "GET"
            }
        );

        const time = Date.now() - start;

        res.status(200).json({
            status: "ONLINE",
            responseTime: time,
            url: "http://trial-ris.rapigra.co.id"
        });

    } catch (err) {

        res.status(500).json({
            status: "OFFLINE",
            error: err.message
        });

    }

}
