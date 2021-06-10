var today;
var yesterday;
var extTod = [0];
var extYesd = [0];


var parallData;
var currentDate = '5/28/2021';
var defaultDate = '5/28/2021';

var sumCurr;
var sumToday;

var cirlCurr =[];
var cirlTod = [];

var cry = [];
var laugh = [];
var mumble = [];
var yell = [];

//d3.csv("/data/baby.csv").then(createParallet);
async function createParallet(currentDate){
var trace, traceCry, traceLaugh, traceYell, traceMumble;
var dataSet = await d3.csv("/data/data.csv");
var todayDate = dataSet[dataSet.length-1]['Date'];
var emotion = ['0','😭', '😄', '😲', '😆', '40'];
var emotion2 = [`😄Laugh`, `😭Cry`,` 😲Mumble`,` 😆Yell`];
var colorEmo = ['rgba( 60, 179, 113, 0.5)','rgba(  0,   0, 255, 0.5)','rgba(255, 165, 113, 0.5)','rgba(255,   0,   0, 0.5)'];

cry = [];
laugh = [];
mumble = [];
yell = [];

parallData = [];

Plotly.newPlot('parallel', parallData);
yesterday = dayData(dataSet, currentDate);
today = dayData(dataSet, todayDate);
extOne = extYesd.concat(yesterday);
extTwo = extTod.concat(today);
sumCurr =  yesterday.reduce((a, b) => a + b);
sumToday = today.reduce((a,b) => a + b);

cirlCurr = getRatio(yesterday, sumCurr+sumToday);
cirlTod = getRatio(today, sumToday+sumCurr);




trace = {
  type: 'parcoords',
  line: {
    color: '#17BECF'
  },

  dimensions: [ {
    range: [0, 35],
    label: currentDate,
    values: yesterday, //dayData(dataSet, 'today'),
    tickvals: extOne, // [0,12,16,13,2,20],
	ticktext: emotion
  },

  {
    range: [0, 35],
    label: todayDate,
    values: today, //dayData(dataSet, 'today'),
    tickvals: extTwo, // [0,12,16,13,2,20],
	ticktext: emotion
  }]
};

var traceBar1 = {
  x:emotion2,
  y: yesterday,
  type: 'bar',
  name: currentDate
};

var traceBar2 = {
  x:emotion2,
  y: today,
  type: 'bar',
  name: todayDate
};

parallData = [trace]
barData = [traceBar1,traceBar2]

var layout = {
  title: {text:'😄Laugh 😭Cry 😲Mumble 😆Yell',
  font: {
    family: 'Times New Roman',
    size: 18
    },

  },
  showlegend: true
};
var config = {
  showLink: true,
  plotlyServerURL: "https://chart-studio.plotly.com"
};


var traceCir1 = {
  x: emotion2,
  y: yesterday,
  mode: 'markers',
  marker: {
      size: cirlCurr,
  },
  name: currentDate
};
var traceCir2 = {
  x: emotion2,
  y: today,
  mode: 'markers',
  marker: {
      size: cirlTod,
      color: 'green',
  },
  name: todayDate
};


var circleData = [traceCir1, traceCir2];

var layout2 = {
  title: `Baby Expression: ${currentDate} vs ${todayDate}`,
  showlegend: true
};

var config = {
toImageButtonOptions: {
  format: 'svg', // one of png, svg, jpeg, webp
  filename: 'custom_image',
  height: 500,
  width: 500,
  scale: 1 // Multiply title/legend/axis/canvas sizes by this factor
}
};

Plotly.newPlot('cirl-chart', circleData, layout2, config);


Plotly.newPlot('parallel', parallData,layout, {displayModeBar: true}, config);

//Plotly.newPlot('bar-chart', barData,layout, {displayModeBar: true}, config);

}

function dayData(dataSet, date) {
    var ret = [];
    dt = dataSet.filter(x => x['Date'] == date)[0];
    const numCry = parseInt(dt['MCry'] || 0)+parseInt(dt['ECry']||0);
    const numLaugh = parseInt(dt.MLaugh || 0)+parseInt(dt.ELaugh||0);
    const numMumble = parseInt(dt.MMumble || 0)+parseInt(dt.EMumble || 0);
    const numYell =  parseInt(dt.MYell || 0)+parseInt(dt.EYell || 0);
   // cry.push( numCry);
   // laugh.push(numLaugh);
   // mumble.push(mumble);
    yell.push( mumble);
	  ret.push(numCry, numLaugh, numMumble, numYell);
    return ret;
}

function getRatio(arr, sumData){
  var ratio = [];
  for(var i=0;i<arr.length;i++){
    ratio.push(arr[i]*250/sumData);
  }
  return ratio;

}

$(document).ready(function() {
  createParallet(defaultDate)
});


