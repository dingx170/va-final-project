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
    barGap: 1,
    height: 150
});

var trace = {
  type: 'parcoords',
  line: {
    color: 'blue'
  },  
  dimensions: [{
    range: [0, 10],
    constraintrange: [3, 4],
    label: 'Cry',
    values: [4,5],
	tickvals: [0,4,5,10],
    ticktext: ['0','28-May','29-May','10']
  }, {    
    range: [0,10],
    label: 'Laugh',
    values: [7,6],
    tickvals: [0,7,6,10],
	ticktext: ['0','28-May','29-May','10']
  }, {
    range: [0, 10],
    label: 'Mumble',
    values: [10,5],
    tickvals: [0,10,5,10],
    ticktext: ['0','28-May','29-May','10']
  }, {
    range: [0, 10],
    label: 'Yell',
    values: [0,0],
	tickvals: [0,0,0,10],
    ticktext: ['0','28-May','29-May','10']
  }]
};

var data = [trace];

Plotly.newPlot('myDiv', data);

// video and audio visualization update triggered by button click
async function updateVideo(expression) {
    var videoData = "static/video/" + expression + ".mp4";
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


// async function changeMovie(movie)
// {
//   $("video").each(function() {
//     $(this).get(0).pause();
//   });

//   await makeChart(movie, 20);
//   await updateMovieInfo(movie);

//   setTimeout(function (){
//     createChord(movie, 1);
//   }, 200);
// }








var expressions = {
  'laugh' : ['😆', 'rgba( 60, 179, 113, 0.5)','rgba(  0, 153,   0, 1)'],
  'cry'   : ['😭', 'rgba(  0,   0, 255, 0.5)','rgba(  0,  76, 153, 1)'],
  'mumble': ['🤪', 'rgba(255, 165, 113, 0.5)','rgba(153, 153,   0, 1)'],
  'yell'  : ['🤬', 'rgba(255,   0,   0, 0.5)', 'rgba(153,  0,  0,  1)'],
};

$(document).ready(function() {
  function createPattern(expression) {
    var exp = expressions[expression]
    var canvas = document.getElementById('myChart')
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
    face_context.fillStyle = "#ff0000";
    face_context.fillText(exp[0], face.width / 2, face.height / 1.7)
    var pattern = document.createElement('canvas');
    pattern.width = SIZE
    pattern.height = SIZE
    var pattern_context = pattern.getContext("2d");
    return pattern_context.createPattern(face, "repeat");
  }








  new Chart(document.getElementById("myChart"), {
      responsive:true,
      maintainAspectRatio: false,
      type: 'bar',
      data: {
        labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        datasets: [
          {
            label: 'laugh',
            data: [2,2,2,2,2,2,2],
            backgroundColor: createPattern('laugh'),
            borderColor: expressions['laugh'][2],
            borderWidth: 2,
            borderRadius: 10,
          },
          {
            label: 'cry',
            data: [2,2,2,2,2,2,2],
            backgroundColor: createPattern('cry'),
            borderColor: expressions['cry'][2],
            borderWidth: 2,
            borderRadius: 10,
          },
          {
            label: 'mumble',
            data: [2,2,2,2,2,2,2],
            backgroundColor: createPattern('mumble'),
            borderColor: expressions['mumble'][2],
            borderWidth: 2,
            borderRadius: 10,
          },
          {
            label: 'yell',
            data: [2,2,2,2,2,2,2],
            backgroundColor: createPattern('yell'),
            borderColor: expressions['yell'][2],
            borderWidth: 2,
            borderRadius: 10,
          }
        ]
      },
      options: {
        plugins:{
          legend: { display: false },
        },
        scales: {
          x: {
            stacked: true,
          },
          y: {
            stacked: true
          }
        }
      }
  });
});
