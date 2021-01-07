song="";
leftWristX=0;
leftWristY=0;
rightWristX=0;
rightWristY=0;
leftWristscore=0;
rightWristscore=0;
function preload(){
song=loadSound("music.mp3");
}

function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    poseNet=ml5.poseNet(video,modelloaded);
    poseNet.on('pose',getPoses);
}
function modelloaded(){
    console.log("PoseNet Initialized");
}
function getPoses(results){
 if(results.length > 0){
    console.log(results);
    
    leftWristX=results[0].pose.leftWrist.x;
    leftWristY=results[0].pose.leftWrist.y;
    console.log("Left Wrist X = "+leftWristX+" , "+"Left Wrist Y = "+leftWristY);
    leftWristscore=results[0].pose.keypoints[9].score;
    console.log("Left Wrist Score = "+leftWristscore);

    rightWristX=results[0].pose.rightWrist.x;
    rightWristY=results[0].pose.rightWrist.y;
    console.log("Right Wrist X = "+rightWristX+" , "+"Right Wrist Y = "+rightWristY);
    rightWristscore=results[0].pose.keypoints[10].score;
    console.log("Right Wrist Score = "+rightWristscore);
 }
}

function draw(){
    image(video,0,0,600,500)

    fill("red");
    stroke("red");

    if(rightWristscore > 0.2){
    circle(rightWristX,rightWristY,20);
       
    if(rightWristY>=0 && rightWristY<=100){
        document.getElementById("Speed").innerHTML="Speed = 0.5x";
        song.rate(0.5);
    }else if(rightWristY>100 && rightWristY<=200){
      document.getElementById("Speed").innerHTML="Speed = 1x";
      song.rate(1);
    }else if(rightWristY>200 && rightWristY<=300){
        document.getElementById("Speed").innerHTML="Speed = 1.5x";
        song.rate(1.5);
    }else if(rightWristY>300 && rightWristY<=400){
        document.getElementById("Speed").innerHTML="Speed = 2x";
        song.rate(2);
    }else if(rightWristY>400 && rightWristY<=500){
        document.getElementById("Speed").innerHTML="Speed = 2.5x";
        song.rate(2.5);
    }
    }

 if(leftWristscore > 0.2){
    circle(leftWristX,leftWristY,20);
    InNumberleftWristY=Number(leftWristY);
    remove_decimals=floor(InNumberleftWristY);
    volume=remove_decimals/500;
    document.getElementById("Volume").innerHTML="Volume = "+volume;
    song.setVolume(volume);
 }
}
function play(){
    song.play();
    song.setVolume(0.5);
    song.rate(1);
}
function stop(){
    song.stop();
}