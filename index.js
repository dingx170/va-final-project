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
    // temp fix
    var filename = expression == "Laugh" ? "Giggle" : expression;
    var videoData = "static/video/" + filename + ".mp4";

    // var videoData = "static/video/" + expression + ".mp4";
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
  'laugh' : ['😆', 'rgba( 60, 179, 113, 0.5)','rgba(  0, 153,   0, 1)'],
  'cry'   : ['😭', 'rgba(  0,   0, 255, 0.5)','rgba(  0,  76, 153, 1)'],
  'mumble': ['🤪', 'rgba(255, 165, 113, 0.5)','rgba(153, 153,   0, 1)'],
  'yell'  : ['🤬', 'rgba(255,   0,   0, 0.5)', 'rgba(153,  0,  0,  1)'],
};

function createIcon(expression, size, op=1) {
  var exp = expressions[expression]
  var face = document.createElement('canvas');
  face.width = size
  face.height = size
  var face_context = face.getContext("2d");
  face_context.font = size*.88 + 'px serif'
  face_context.textAlign = "center";
  face_context.textBaseline = "middle";
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

  var data= {
      labels: labels,
      datasets: [
        {
          label: 'laugh',
          data: chartData.laugh,
          backgroundColor: expressions['laugh'][1],
          borderColor: expressions['laugh'][2],
          borderWidth: 2,
          pointStyle: createIcon('laugh',20),
          borderRadius: 10,
          pointRadius: 20
        },
        {
          label: 'cry',
          data: chartData.cry,
          backgroundColor: expressions['cry'][1],
          borderColor: expressions['cry'][2],
          borderWidth: 2,
          pointStyle: createIcon('cry',20),
          borderRadius: 10,
          pointRadius: 20
        },
        {
          label: 'mumble',
          data: chartData.mumble,
          backgroundColor: expressions['mumble'][1],
          borderColor: expressions['mumble'][2],
          borderWidth: 2,
          pointStyle: createIcon('mumble',20),
          borderRadius: 10,
          pointRadius: 20
        },
        {
          label: 'yell',
          data: chartData.yell,
          backgroundColor: expressions['yell'][1],
          borderColor: expressions['yell'][2],
          borderWidth: 2,
          pointStyle: createIcon('yell',20),
          borderRadius: 10,
          pointRadius: 20
        }
      ]
    }
  if(lineChart)lineChart.destroy();
  lineChart = new Chart(document.getElementById('line'), {
        responsive:true,
        maintainAspectRatio: false,
        type: 'line',
        data: data,
        options: {
          plugins:{
            tooltip:{backgroundColor: "rgba(0,0,0,1)"},
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
  responsive:true,
  maintainAspectRatio: false,
  type: 'bar',
  data: data,
  options: {
    plugins:{
      tooltip:{backgroundColor: "rgba(0,0,0,1)"},
      legend:{
        labels:{
          usePointStyle: true,
          padding: 20
        }
      }
    },
    animation: {
    duration: 1,
    onProgress: function () {
        barChart.data.datasets.forEach(function (dataset, i) {
          var meta = barChart.getDatasetMeta(i);
          if(meta.hidden != true)
          {
            meta.data.forEach(function (bar, index) {
              var width = bar.width;
              var height = (bar.base - bar.y);
              if(height>0)
              {
                var size = Math.min(width,height);
                var ico = createIcon(meta.label, size,.25);
                var centerX = bar.x-(ico.width/2)
                var centerY = bar.base - ((height)/2)-(ico.height/2)
                barChart.ctx.drawImage(ico, centerX, centerY, size, size);
              }
            });
          }
        });
      }
    },
    scales: {x: {stacked: true,},y: {stacked: true}}
   }
  });
}

$(document).ready(function() {
  updateWeekCharts(null)
});





