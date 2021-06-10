var colors = {
    "Cry" : "skyblue",
    "Laugh" : "pink",
    "Mumble" : "lightgreen",
    "Yell" : "#fdc882"
}

var wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'lightgrey',
    progressColor: 'grey',
    barWidth: 4,
    barHeight: 2,
    barGap: 1,
    height: 150
});

// video and audio visualization update triggered by button click
async function updateVideo(expression) {
    var videoData = "/video/" + expression + ".mp4";
    var videoSrc = $("#player").find("#videoSrc");
    videoSrc.attr("src", videoData);
    let player = $("#player").get(0);
    player.load();
    player.play();

    updateExpressionContainer(colors[expression], expression);
    updateAudioVisualization(colors[expression], videoData);
}

async function updateExpressionContainer(color, expression) {
    $("#expression").text(expression);
    $(".expressionContainer").css("background-color", color);
}

async function updateAudioVisualization(color, videoData) {
    wavesurfer.load(videoData);
    wavesurfer.setProgressColor(color);
    wavesurfer.play();
}










///////////////////////////////////////////////////////////////////////////////////WEEK CHARTS
var lineChart;
var barChart;
var expressions = {
  'laugh' : ['😄', 'rgba(255, 192, 203, 0.8)','rgba(255, 192, 203, 1)'],
  'cry'   : ['😭', 'rgba(135, 206, 235, 0.8)','rgba(135, 206, 235, 1)'],
  'mumble': ['😲', 'rgba(144, 238, 144, 0.8)','rgba(144, 238, 144, 1)'],
  'yell'  : ['😆', 'rgba(253, 200, 130, 0.8)','rgba(253, 200, 130, 1)'],
};

function createIcon(expression, size, op=1, box=false) {
  var exp = expressions[expression]
  var face = document.createElement('canvas');
  face.width = size
  face.height = size
  var face_context = face.getContext("2d");
  face_context.font = size*.86 + 'px serif'
  face_context.textAlign = "center";
  face_context.textBaseline = "middle";
  face_context.fillStyle = exp[1];
  if(box)
    face_context.fillRect(0, 0, face.width, face.height);
  face_context.globalAlpha = op;
  face_context.fillText(exp[0], face.width / 2, face.height / 1.73)
  return face
}


async function updateWeekCharts(date)
{
  var data = await d3.csv("/data/data.csv");
  var chartData = {laugh:[],cry:[],mumble:[],yell:[]};
  var d = new Date((date)?date:data[0].Date);
  var day = d.getDay();
  d.setDate(d.getDate() - day + (day == 0 ? -6:1));
  var labels = [["Monday"], ["Tuesday"], ["Wednesday"], ["Thursday"], ["Friday"], ["Saturday"], ["Sunday"]];
  for(var s=0; s<7; s++)
  {
    labels[s].push(`${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`);
    for (const [k,v] of Object.entries(chartData))
      chartData[k].push(0);
    let obj = data.findIndex(p => p.Date == `${d.getMonth()+1}/${d.getDate()}/${d.getFullYear()}`);
    try{
      chartData.laugh[chartData.laugh.length-1]   = (parseInt(data[obj].MLaugh||0) + parseInt(data[obj].ELaugh||0));
      chartData.cry[chartData.cry.length-1]       = (parseInt(data[obj].MCry||0) + parseInt(data[obj].ECry||0));
      chartData.mumble[chartData.mumble.length-1] = (parseInt(data[obj].MMumble||0) + parseInt(data[obj].EMumble||0));
      chartData.yell[chartData.yell.length-1]     = (parseInt(data[obj].MYell||0) + parseInt(data[obj].EYell||0));
    }catch{}
    d.setDate(d.getDate()+1);
  }
  function DATA(box){
  return {
      labels: labels,
      datasets: [
        {
          label: ' laugh',
          data: chartData.laugh,
          backgroundColor: expressions['laugh'][1],
          borderColor: expressions['laugh'][2],
          borderWidth: 4,
          pointStyle: createIcon('laugh',27,.8,box),
          borderRadius: 10,
          pointRadius: 35
        },
        {
          label: ' cry',
          data: chartData.cry,
          backgroundColor: expressions['cry'][1],
          borderColor: expressions['cry'][2],
          borderWidth: 4,
          pointStyle: createIcon('cry',27,.8,box),
          borderRadius: 10,
          pointRadius: 35
        },
        {
          label: ' mumble',
          data: chartData.mumble,
          backgroundColor: expressions['mumble'][1],
          borderColor: expressions['mumble'][2],
          borderWidth: 4,
          pointStyle: createIcon('mumble',27,.8,box),
          borderRadius: 10,
          pointRadius: 35
        },
        {
          label: ' yell',
          data: chartData.yell,
          backgroundColor: expressions['yell'][1],
          borderColor: expressions['yell'][2],
          borderWidth: 4,
          pointStyle: createIcon('yell',27,.8,box),
          borderRadius: 10,
          pointRadius: 35
        }
      ]
    }
  }
  if(lineChart)lineChart.destroy();
  lineChart = new Chart(document.getElementById('line'), {
        responsive:true,
        maintainAspectRatio: false,
        type: 'line',
        data: DATA(false),
        options: {
          plugins:{
            legend:{
              labels:{
                usePointStyle: true,
                padding: 20
              }
            }
          },
        }
      });
  if(barChart)barChart.destroy();
  barChart = new Chart(document.getElementById('bar'), {
    plugins:[{
      afterDatasetsDraw: function(chartInstance) {
        chartInstance.data.datasets.forEach(function (dataset, i) {
          var meta = chartInstance.getDatasetMeta(i);
          if(meta.hidden != true)
          {
            meta.data.forEach(function (bar, index) {
              var width = bar.width;
              var height = (bar.base - bar.y);
              if(height>0)
              {
                var size = Math.min(width,height);
                var ico = createIcon(meta.label.trim(), size,0.5);
                var centerX = bar.x-(ico.width/2)
                var centerY = bar.base - ((height)/2)-(ico.height/2)
                if(ico.width >0 && ico.height>0)
                  barChart.ctx.drawImage(ico, centerX, centerY, size, size);
              }
            });
          }
        });
      },
    }],
  responsive:true,
  maintainAspectRatio: false,
  type: 'bar',
  data: DATA(true),
  options: {
    scales: {x: {stacked: true,},y: {stacked: true}},
    plugins:{
      legend:{
        labels:{
          usePointStyle: true,
          padding: 25
        }
      }
    },
   }
  });
}

$(document).ready(function() {
  updateWeekCharts(null)
});





