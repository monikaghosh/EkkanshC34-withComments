var ball;
//to create my own database
var database;
var position;

function setup(){
    createCanvas(500,500);
    ball = createSprite(250,250,10,10);
    ball.shapeColor = "red";

    //1st step
    database = firebase.database();

    //to go to a location in the DB
    var dbref = database.ref("ballPosition");
    //to fetch the value from that location 
    //on("value",work to be done with the value, how to handle the error(optional))
    dbref.on("value",fetchValue, showError);



}

function draw(){
    background("white");
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
   // ball.x = ball.x + x;
   // ball.y = ball.y + y;

   // I not only want to change the ball's position , 
   //but I also want to save that position in the DB - 
   //so that all users can see the latest position

   //1st refer tp the location in the DB
   var dbref = database.ref("ballPosition");
   //next step is to update the DB
   dbref.update({
       x: position.x+x,
       y: position.y+y
   })

}
function fetchValue(data){
    //to put the value of data in a variable we use the .val()
    position = data.val();
    console.log(position);

    //i want to set the balls x and y as per what is saved in my DB
    ball.x= position.x;
    ball.y= position.y;

}

function showError(){
    console.log("Database Error");
}