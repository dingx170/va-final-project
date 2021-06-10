var emotions = ["Laugh", "Cry", "Mumble", "Yell"];
var currentDate = '';
var radar_chart;
var dataSet;

$(document).ready(function() {
    d3.csv('/data/data.csv').then(createCharts);
  });



async function createCharts(dataSet) {
    // Radar chart
    fillRadarDates(dataSet);
    createRadarChart(dataSet);
}

async function createRadarChart(data) {
    dataSet = data;
    radar_chart = new Chart(document.getElementById('radarChart'), {
        type: 'radar',
        apectRatio: 2,
        data: {
            labels: emotions,
            datasets: [
                {
                    label: "Morning",
                    data: prepareChartData(dataSet, currentDate, true),
                    fill: true,
                    backgroundColor: pattern.draw('diagonal-right-left',`rgba(0, 128, 0,0.3)`),
                    borderColor: 'rgb(0,128,0)',
                    borderWidth: 2,
                    borderRadius: 10
                },
                {
                    label: "Evening",
                    data: prepareChartData(dataSet, currentDate, false),
                    fill: true,
                    backgroundColor: pattern.draw('diagonal',`rgba(128, 0, 128,0.3)`),
                    borderColor: 'rgb(128,0,128)',
                    borderWidth: 2,
                    borderRadius: 10
                }
            ]
        },
    });
}

function prepareChartData(data, date, isMorning) {
    var ret = [];
    dt = data.filter(x => x['Date'] == date)[0];
    if (dt == null)
        return ret;

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
        var opt = document.createElement('button');
        if (x == 0) {
            opt.id = 'active';
        }

        opt.innerText = dataSet[x]['Date'];
        opt.addEventListener('click', onRadarDateChanged);
        select.appendChild(opt);
    }
    currentDate = dataSet[0]['Date'];
}

async function onRadarDateChanged(combo) {
    currentDate = this.innerHTML; // == selected date == today (yesterday's date = today - 1)
    act = document.querySelector('div#radar_dates button#active');
    act.id = '';
    this.id = 'active';
    updateWeekCharts(currentDate);
    radar_chart.destroy();
    
    createRadarChart(dataSet);
    createParallet(currentDate);
}