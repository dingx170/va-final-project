
var emotions = ["laugh", "cry", "mumble", "yell"];
var currentDate = '05/27/21';
var radar_chart;
var dataSet;

d3.csv('/data/data.csv').then(createCharts);


async function createCharts(dataSet) {


    // Radar chart
    fillRadarDates(dataSet);
    createRadarChart(dataSet);

}

async function createRadarChart(data) {
    dataSet = data;
    radar_chart = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        data: {
            labels: emotions,
            datasets: [
                {
                    label: "Morning",
                    data: prepareChartData(dataSet, currentDate, true),
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    borderWidth: 2,
                    borderRadius: 10
                },
                {
                    label: "Evening",
                    data: prepareChartData(dataSet, currentDate, false),
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    borderWidth: 2,
                    borderRadius: 10
                }
            ]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3,
                    tension: 0.15
                }
            },
            scales: {
                r: {
                    angleLines: {
                        display: false
                    },
                    suggestedMin: 0
                }
            }
        }
    });
}

function prepareChartData(data, date, isMorning) {
    var ret = [];
    dt = data.filter(x => x['Date'] == date)[0];
    if (isMorning) {
        ret.push(dt['MLaugh'], dt['MCry'], dt['MMumble'], dt['MYell']);
    }
    else {
        ret.push(dt['ELaugh'], dt['ECry'], dt['EMumble'], dt['EYell']);
    }
    return ret;
}




async function fillRadarDates(dataSet) {
    select = document.getElementById('radar_dates');

    for (x = 0; x < dataSet.length; ++x) {
        var opt = document.createElement('option');
        opt.val = dataSet[x]['Date'];
        opt.text = dataSet[x]['Date'];
        select.appendChild(opt);
    }
    currentDate = dataSet[0]['Date'];
}

async function onRadarDateChanged(combo) {
    var idx = combo.selectedIndex;
    currentDate = combo.options[idx].innerHTML;
    radar_chart.destroy();
    createRadarChart(dataSet);
}