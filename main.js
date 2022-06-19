const { reject } = require("q");
const { detectLocale } = require("yargs");

objects=[];
status="";

function preload(){
video=createVideo('video.mp4'); 
}

function setup(){
canvas=createCanvas(480,380);
canvas.center();
video.hide();
}
function start(){
objectDetector=ml5.objectDetector('cocossd',modelLoaded);
document.getElementById("status").innerHTML="Status: Detecting objects";
}
function modelLoaded(){
console.log("model is loaded");
status=true;video.loop();
video.speed(1);
video.volume(0);
}
function gotResult(error,results){
if(error){
console.log(error);
}
console.log(results);
objects=results;
}
function draw(){
image(video,0,0,480,380);
if (status!="")
objectDetector.detect(video,gotResult);
for(i=0;i<objects.length;i++){
document.getElementById("status").innerHTML="Status:Objects Detected";
document.getElementById("number_of_objects").innerHTML="Number of Objects are:" + objects.length;
fill("#FF0000");
percent=floor(objects[i].label + "" + percent + "%", objects[i].x + 15, objects[i].y + 15);
noFill();
stroke("#FF0000");
reject(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
}
}