// var trace = {
//   type: 'parcoords',
//   line: {
//     color: 'blue'
//   },
  
//   dimensions: [{
//     range: [0, 10],
//     constraintrange: [3, 4],
//     label: 'Cry',
//     values: [4,5],
// 	tickvals: [0,4,5,10],
//     ticktext: ['0','28-May','29-May','10']
//   }, {    
//     range: [0,10],
//     label: 'Laugh',
//     values: [7,6],
//     tickvals: [0,7,6,10],
// 	ticktext: ['0','28-May','29-May','10']
//   }, {
//     range: [0, 10],
//     label: 'Mumble',
//     values: [10,5],
//     tickvals: [0,10,5,10],
//     ticktext: ['0','28-May','29-May','10']
//   }, {
//     range: [0, 10],
//     label: 'Yell',
//     values: [0,0],
// 	tickvals: [0,0,0,10],
//     ticktext: ['0','28-May','29-May','10']
//   }]
// };

var dataSet = d3.csv("/data/baby.csv");
var yesterday ;
var today;


var emotion = ['0','Cry', 'Laugh', 'Mumble', 'Yell', '20'];
/*
yesterday = dayData(dataSet, 'yesterday');
console.log(yesterday);
today = dayData(dataSet, 'today');
console.log(today);
*/
var trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },
  
  dimensions: [{
    range: [0, 20],
    label: 'Yesterday',
    values: [8,17,16,0],
	  tickvals: [0,8,17,16,0,20],
    ticktext: emotion
  }, {    
    range: [0, 20],
    label: 'Today',
    values: [12,16,13,2],
    tickvals: [0,12,16,13,2,20],
	ticktext: emotion
  }]
};
/*
//function dayData(data, date, isToday) {
//    var ret = [];
//    dt = data.find(x => x['Date'] == date)[0];
//	ret.push(dt['Cry'], dt['Laugh'], dt['Mumble'], dt['Yell']);
//    return ret;
}
*/


var data = [trace]

Plotly.newPlot('parallel', data);