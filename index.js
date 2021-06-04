var colors = {
    "Cry" : "skyblue",
    "Laugh" : "pink",
    "Mumble" : "lightgreen",
    "Yell" : "#fbfb86"
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

function createPattern(expression, chart) {
  var exp = expressions[expression]
  var canvas = document.getElementById(chart)
  var SIZE = canvas.width/16
  var face = document.createElement('canvas');
  face.width = SIZE
  face.height = SIZE
  var face_context = face.getContext("2d");
  face_context.font = SIZE*.9 + 'px serif'
  face_context.textAlign = "center";
  face_context.textBaseline = "middle";
  face_context.fillStyle = exp[1];
  face_context.fillRect(0, 0, face.width, face.height);
  //face_context.fillStyle = "#ff0000";
  face_context.fillText(exp[0], face.width / 2, face.height / 1.7)
  var pattern = document.createElement('canvas');
  pattern.width = SIZE
  pattern.height = SIZE
  var pattern_context = pattern.getContext("2d");
  return pattern_context.createPattern(face, "repeat");
}

function createIcon(expression) {
  var exp = expressions[expression]
  var SIZE = 20
  var face = document.createElement('canvas');
  face.width = SIZE
  face.height = SIZE
  var face_context = face.getContext("2d");
  face_context.font = SIZE*.9 + 'px serif'
  face_context.textAlign = "center";
  face_context.textBaseline = "middle";
  //face_context.fillStyle = exp[1];
  face_context.fillText(exp[0], face.width / 2, face.height / 1.7)
  return face
}





var expressions = {
  'laugh' : ['😆', 'rgba( 60, 179, 113, 0.5)','rgba(  0, 153,   0, 1)'],
  'cry'   : ['😭', 'rgba(  0,   0, 255, 0.5)','rgba(  0,  76, 153, 1)'],
  'mumble': ['🤪', 'rgba(255, 165, 113, 0.5)','rgba(153, 153,   0, 1)'],
  'yell'  : ['🤬', 'rgba(255,   0,   0, 0.5)', 'rgba(153,  0,  0,  1)'],
};

$(document).ready(function() {



  function createWeekCharts(){

    var sun = new Image();
sun.src = 'https://i.imgur.com/yDYW1I7.png';

var cloud = new Image();
cloud.src = 'https://i.imgur.com/DIbr9q1.png';

    for(var type of ['bar', 'line'])
    {
      var stacked = (type=='bar')?true:false
      new Chart(document.getElementById(type), {
        responsive:true,
        maintainAspectRatio: false,
        type: type,
        data: {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
          datasets: [
            {
              label: 'laugh',
              data: [7,6,10,10,12],
              backgroundColor: createPattern('laugh',type),
              borderColor: expressions['laugh'][2],
              borderWidth: 2,
              pointStyle: createIcon('laugh'),
              borderRadius: 10,
              pointRadius: 5
            },
            {
              label: 'cry',
              data: [4,5,6,6,3],
              backgroundColor: createPattern('cry',type),
              borderColor: expressions['cry'][2],
              borderWidth: 2,
              pointStyle: createIcon('cry'),
              borderRadius: 10,
              pointRadius: 5
            },
            {
              label: 'mumble',
              data: [10,5,10,10,6],
              backgroundColor: createPattern('mumble',type),
              borderColor: expressions['mumble'][2],
              borderWidth: 2,
              pointStyle: createIcon('mumble'),
              borderRadius: 10,
              pointRadius: 5
            },
            {
              label: 'yell',
              data: [0,0,6,6,10],
              backgroundColor: createPattern('yell',type),
              borderColor: expressions['yell'][2],
              borderWidth: 2,
              pointStyle: createIcon('yell'),
              borderRadius: 10,
              pointRadius: 5
            }
          ]
        },
        options: {
          plugins:{
            legend: { display: false },
          },
          scales: {
            x: {
              stacked: stacked,
            },
            y: {
              stacked: stacked
            }
          }
        }
      });
    }
  }

  createWeekCharts()



});
