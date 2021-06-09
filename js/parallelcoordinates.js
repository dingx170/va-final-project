var today;
var yesterday;
var extTod = [0];
var extYesd = [0];

var emotion1 = ['0','😭', '😆', '🤪', '🤬', '20'];
var emotion2 = ['0','😭', '😆', '🤪', '🤬', '20'];

var dataSet = d3.csv("/data/baby.csv");

d3.csv("/data/baby.csv").then(createParallet);
async function createParallet(dataSet){

yesterday = dayData(dataSet, 'yesterday');
today = dayData(dataSet, 'today');
extOne = extYesd.concat(yesterday);
extOne.push(20);
extTwo = extTod.concat(today);
extTwo.push(20);
var trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },
  
  dimensions: [{
    range: [0, 20],
    label: 'Yesterday',
    values: yesterday, // dayData(dataSet, 'yesterday'),
	  tickvals: extOne, //[0,8,17,16,0,20],
    ticktext: emotion1
  }, {    
    range: [0, 20],
    label: 'Today',
    values: today, //dayData(dataSet, 'today'),
    tickvals: extTwo, // [0,12,16,13,2,20],
	ticktext: emotion2
  }]
};

var data = [trace]

Plotly.newPlot('parallel', data);

}

function dayData(dataSet, date) {
    var ret = [];
    dt = dataSet.filter(x => x['Date'] == date)[0];
	ret.push(dt.Cry, dt.Laugh, dt.Mumble, dt.Yell);
    return ret;
}


