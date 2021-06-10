var today;
var yesterday;
var extTod = [0];
var extYesd = [0];

var parallData;
var currentDate = '5/28/2021'

//d3.csv("/data/baby.csv").then(createParallet);
async function createParallet(currentDate){
var trace;
var dataSet = await d3.csv("/data/data.csv");
var todayDate = dataSet[dataSet.length-1]['Date'];
var emotion = ['0','😭', '😆', '🤪', '🤬', '40'];


parallData = [];
Plotly.newPlot('parallel', parallData);
yesterday = dayData(dataSet, currentDate);
today = dayData(dataSet, todayDate);
extOne = extYesd.concat(yesterday);
extTwo = extTod.concat(today);


trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },

  dimensions: [{
    range: [0, 20],
    label: currentDate,
    values: yesterday, // dayData(dataSet, 'yesterday'),
	  tickvals: extOne, //[0,8,17,16,0,20],
    ticktext: emotion
  }, {
    range: [0, 20],
    label: 'Today',
    values: today, //dayData(dataSet, 'today'),
    tickvals: extTwo, // [0,12,16,13,2,20],
	ticktext: emotion
  }]
};

parallData = [trace]

var layout = {
  title: 'Baby expression <br>today vs previous day ',
  showlegend: true
};

Plotly.newPlot('parallel', parallData,layout, {displayModeBar: true});

}

function dayData(dataSet, date) {
    var ret = [];
    dt = dataSet.filter(x => x['Date'] == date)[0];
    const numCry = parseInt(dt['MCry'] || 0)+parseInt(dt['ECry']||0);
    const numLaugh = parseInt(dt.MLaugh || 0)+parseInt(dt.ELaugh||0);
    const numMumble = parseInt(dt.MMumble || 0)+parseInt(dt.EMumble || 0);
    const numYell =  parseInt(dt.MYell || 0)+parseInt(dt.EYell || 0);
	  ret.push(numCry, numLaugh, numMumble, numYell);
    return ret;
}

$(document).ready(function() {
  createParallet(null)
});


