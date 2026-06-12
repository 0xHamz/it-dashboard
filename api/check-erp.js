async function checkERP() {

    const output =
    document.getElementById("output");

    try {

        const response =
        await fetch("/api/check-erp");

        const result =
        await response.json();

        output.innerHTML = `
            <div>---------------------------</div>
            <div>STATUS :
                ${
                    result.status === "ONLINE"
                    ? '<span class="ok">ONLINE</span>'
                    : '<span class="bad">OFFLINE</span>'
                }
            </div>
            <div>TARGET :
                ${result.url}
            </div>
            <div>RESPONSE CHECK :
                ${result.responseTime} ms
            </div>
            <div>LAST UPDATE :
                ${new Date().toLocaleString("id-ID")}
            </div>
            <div>---------------------------</div>
        `;

        addLog(
            result.status,
            result.responseTime
        );

    } catch(err) {

        output.innerHTML = `
            <div>---------------------------</div>
            <div>STATUS :
                <span class="bad">OFFLINE</span>
            </div>
            <div>ERROR :
                ${err.message}
            </div>
            <div>LAST UPDATE :
                ${new Date().toLocaleString("id-ID")}
            </div>
            <div>---------------------------</div>
        `;

        addLog("OFFLINE", 0);
    }
}
