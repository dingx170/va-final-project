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

var trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },
  
  dimensions: [{
    range: [0, 20],
    label: 'Yesterday: 28-May',
    values: [8,17,16,0],
	  tickvals: [0,8,17,16,0,20],
    ticktext: ['0','Cry','Laugh','Mumble','Yell','20']
  }, {    
    range: [0, 20],
    label: 'Today: 29-May',
    values: [12,16,13,2],
    tickvals: [0,12,16,13,2,20],
	ticktext: ['0','Cry','Laugh','Mumble','Yell','20']
  }]
};

var data = [trace]

Plotly.newPlot('parallel', data);