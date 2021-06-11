var today;
var yesterday;
var extTod = [0];
var extYesd = [0];


var parallData;
var currentDate = '5/28/2021';
var defaultDate = '5/28/2021';

//d3.csv("/data/baby.csv").then(createParallet);
async function createParallet(today){

  $("#parallel").html("");
  $("#cirl-chart").html("");


var trace, traceCry, traceLaugh, traceYell, traceMumble;
var dataSet = await d3.csv("/data/data.csv");

var d = new Date((today)?today:data[0].dataSet);
var todayDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
today = dayData(dataSet, todayDate);
d.setDate(d.getDate() - 1);
var yesterdayDate = `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`
yesterday = dayData(dataSet, `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`);

var emotion = ['','😭', '😄', '😲', '😆'];
var emotion2 = [`😄Laugh`, `😭Cry`,` 😲Mumble`,` 😆Yell`];
var colorEmo = ['rgba(255, 192, 203, 1)','rgba(255, 192, 203, 1)','rgba(135, 206, 235, 1)','rgba(144, 238, 144, 1)','rgba(253, 200, 130, 1)','rgba(253, 200, 130, 1)'],



parallData = [];

extOne = extYesd.concat(yesterday);
extTwo = extTod.concat(today);



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
    label: yesterdayDate,
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
  font: {size: 16},

  },
  showlegend: true
};

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
 
  var parallel = par.node();
  Plotly.plot(parallel, parallData, layout);
 

  window.onresize = function() {
   Plotly.Plots.resize(parallel);
  };



}

function dayData(dataSet, date) {
    var ret = [];
    dt = dataSet.filter(x => x['Date'] == date)[0];
    if (dt === undefined) {return [0,0,0,0,0]}
    const numCry = parseInt(dt['MCry'] || 0)+parseInt(dt['ECry']||0);
    const numLaugh = parseInt(dt.MLaugh || 0)+parseInt(dt.ELaugh||0);
    const numMumble = parseInt(dt.MMumble || 0)+parseInt(dt.EMumble || 0);
    const numYell =  parseInt(dt.MYell || 0)+parseInt(dt.EYell || 0);

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