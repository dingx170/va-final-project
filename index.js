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
