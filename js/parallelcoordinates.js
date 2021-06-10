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

  $("#parallel").html("");
  $("#cirl-chart").html("");





var trace, traceCry, traceLaugh, traceYell, traceMumble;
var dataSet = await d3.csv("/data/data.csv");
var todayDate = dataSet[dataSet.length-1]['Date'];
var emotion = ['','😭', '😄', '😲', '😆'];
var emotion2 = [`😄Laugh`, `😭Cry`,` 😲Mumble`,` 😆Yell`];
var colorEmo = ['rgba(255, 192, 203, 1)','rgba(255, 192, 203, 1)','rgba(135, 206, 235, 1)','rgba(144, 238, 144, 1)','rgba(253, 200, 130, 1)','rgba(253, 200, 130, 1)'],

cry = [];
laugh = [];
mumble = [];
yell = [];

parallData = [];

yesterday = dayData(dataSet, currentDate);
today = dayData(dataSet, todayDate);
extOne = extYesd.concat(yesterday);
extTwo = extTod.concat(today);
sumCurr =  yesterday.reduce((a, b) => a + b);
sumToday = today.reduce((a,b) => a + b);

cirlCurr = getRatio(yesterday, sumCurr+sumToday);
cirlTod = getRatio(today, sumToday+sumCurr);
var maxRange = Math.max(Math.max.apply(null, extOne),Math.max.apply(null, extTwo))

var abc = [], bca = []

for(var x=0; x<extOne.length; x++)
  abc.push(emotion[x]+" "+extOne[x]) 
for(var x=0; x<extTwo.length; x++)
  bca.push(emotion[x]+" "+extTwo[x]) 

trace = {
  type: 'parcoords',

  dimensions: [ {
    range: [0, maxRange],
    label: currentDate,
    values: yesterday, 
    tickvals: extOne, 
    ticktext: abc,
    colors: colorEmo

  },

  {
    range: [0, maxRange],
    label: todayDate,
    values: today, 
    tickvals: extTwo, 
	  ticktext: bca,
    color: colorEmo
  
  }]
};

var traceBar1 = {
  x:emotion2,
  y: yesterday,
  type: 'bar',
  name: currentDate,
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
  font: {
    family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
    size: 20
    },

  title: {text:'😄Laugh 😭Cry 😲Mumble 😆Yell',
  font: {size: 14},

  },
  showlegend: true
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


var elmnt = document.getElementById("abc");
  var par = Plotly.d3.select('#parallel').append('div').style({
     height: elmnt.offsetWidth+'px',
    'margin-top': 0 + '%',
    'margin-bottom': 10 + '%'
  });
  /*
  var cir = Plotly.d3.select('#cirl-chart').append('div').style({
    height: HEIGHT_IN_PERCENT_OF_PARENT + 'vh',
   'margin-top': 0 + 'vh',
   'margin-bottom': 10 + 'vh'
 });
 */
  var parallel = par.node();
  Plotly.plot(parallel, parallData, layout);
  //var circle = cir.node();
  //Plotly.plot(circle, circleData, layout2);

  window.onresize = function() {
   Plotly.Plots.resize(parallel);
   //Plotly.Plots.resize(circle);
  };



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