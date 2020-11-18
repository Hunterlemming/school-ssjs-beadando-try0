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
    createChart(createFrame(data.split(",")));
}

const positions = [];

function initPositions() {
    for (let y = 1; y < 65; y++) {
        for (let x = 1; x < 65; x++) {
            positions.push({x: x, y: y});
        }
    }
}

initPositions();

function createFrame(rawFrameData) {
    while (positions.length === 0) {
        // waiting for positions to load
    }
    return rawFrameData.map(pixel => {
        switch (pixel) {
            case "0": return 'rgba(105,105,105)';
            case "1": return 'rgba(255,0,0)';
            case "2": return 'rgba(180,0,0)';
        }
    });
}

function createChart(frameColors) {
    console.log(frameColors);
    const ctx = document.getElementById("myChart");
    ctx.style.backgroundColor = 'rgba(0,0,0)';
    const myChart = new Chart(ctx, {
        type: 'scatter',
        data: {
            datasets: [{
                data: positions,
                pointBackgroundColor: frameColors,
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