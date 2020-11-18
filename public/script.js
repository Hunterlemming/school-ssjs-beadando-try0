const ws = new WebSocket(location.href.replace("http", "ws"));
ws.binaryType = "arraybuffer";

ws.onmessage = event => {
    let data;
    if (event.data instanceof ArrayBuffer) {
        let decoder = new TextDecoder("utf-8");
        data = decoder.decode(event.data);
    } else {
        data = event.data.toString();
    }
    console.log(data);
}


function createChart() {
    const ctx = document.getElementById("myChart");
    ctx.style.backgroundColor = 'rgba(0,0,0)';
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                data: [{x: 1, y: 1}, {x: 1, y: 64}, {x: 64, y: 5}, {x: 64, y: 6}, {x: 63, y: 5}],
                pointBackgroundColor: ["gray", "gray", "red", "red", "gray"],
                pointRadius: 6
            }]
        },
        options: {
            legend: {
                display: false
            },
            animation: {
                duration: 0
            },
            responsive: false,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{
                    ticks: {
                        max: 65
                    },
                    display: false
                }],
                yAxes: [{
                    ticks: {
                        max: 65
                    },
                    display: false
                }]
            }
        }
    });
}

createChart();