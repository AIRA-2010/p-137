video = "";
status="";
objects =[];
function preload(){
}
function setup(){
   canvas = createCanvas(400,400);
   canvas.center();
   video = createCapture(VIDEO);
   video.hide();
}
function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "STATUS : Detecting objects";  
    input_value = document.getElementById("name_of_objects").value;
}
function modelLoaded(){
    console.log("model is intialized");
    status=true;
}
function gotResult(error,results){
 if(error){
    console.error(error);
 }
 console.log(results);
 objects = results;
}
function draw(){
    image(video,0,0,400,400);
    if(status != ""){
        objectDetector.detect(video,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML = "STATUS : Objects Detected";    
            console.log(objects.length);        
            fill("red");
            text(objects[i].label+" "+floor(objects[i].confidence * 100)+" %",objects[i].width+2,objects[i].height+2);
            stroke("red");
            noFill();
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == input_value){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML = "STATUS : Objects Mentioned Detected";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(input_value+"found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML = "STATUS : Objects Mentioned Not Detected";  
            }
        }
    }
}