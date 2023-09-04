import logo from './logo.svg';
import './App.css';
import { useEffect, useRef, useState } from 'react';


const rows = 20;
const feed = 3;
const AreaSize = Math.round((window.innerHeight * 0.7) / 100) * 100;
const unit = Math.round(AreaSize/rows * 10) /10;
var snake = [{"xCoordinate": unit, "yCoordinate": unit}]


var xCollectable = unit * (Math.floor(Math.random() * (rows - 5) + 5));
var yCollectable = unit * (Math.floor(Math.random() * (rows - 5) + 5));

var ctx = 0;
var gameStarted = false; 

var currentDirection = "Right"

document.addEventListener("keydown", (event) => {
  
  var score = document.getElementById("score")

  if (!gameStarted){
    gameStarted = true

  

   
    var interval = setInterval(() => {

    ctx.beginPath()

    
    ctx.clearRect(0, 0, AreaSize, AreaSize);

    ctx.fillStyle = "green";

    moveSnake();
    

    switch (currentDirection){
      case "Left":
        snake[0].xCoordinate-=unit
        break;
      case "Right": 
        snake[0].xCoordinate+=unit 
        break;
      case "Up": 
        snake[0].yCoordinate-=unit 
        break;
      case "Down": 
        snake[0].yCoordinate+=unit 
        break;
    }

    
    if (collisionCheck()) {
      clearInterval(interval)
      alert("gameover"); 
      window.location.reload();

    }


    if (Math.abs(xCollectable - snake[0].xCoordinate) < unit && Math.abs(yCollectable - snake[0].yCoordinate) < unit){
      generateCollectable()
      for (var i = 0; i < feed; i++){
        snake.push({"xCoodinate": 0, "yCoodinate": 0})}

      score.innerHTML = parseInt(score.innerHTML) + 10;
      
    }
    

    ctx.fillRect(snake[0].xCoordinate, snake[0].yCoordinate, unit, unit);
    
    ctx.rect(snake[0].xCoordinate, snake[0].yCoordinate, unit, unit);
    ctx.stroke()
    ctx.fillStyle = "red";

    ctx.fillRect(xCollectable, yCollectable, unit, unit);
    
    ctx.closePath();
    
    
    },120)
  }


switch (event.key) {
  case "ArrowLeft":
    if (currentDirection != "Right"){
      currentDirection = "Left"}
      break;
  case "ArrowRight":
    if (currentDirection != "Left"){
    currentDirection = "Right"}
      break;
  case "ArrowUp":
    if (currentDirection != "Down"){
    currentDirection = "Up"}
      break;
  case "ArrowDown":
    if (currentDirection != "Up"){
    currentDirection = "Down"}
      break;
}


});


function moveSnake(){

  for (var i = 1; i < snake.length; i++){
    snake[snake.length-i].xCoordinate = snake[snake.length-1-i].xCoordinate;
    snake[snake.length-i].yCoordinate = snake[snake.length-1-i].yCoordinate;
    ctx.fillRect(snake[snake.length - i].xCoordinate, snake[snake.length-i].yCoordinate, unit, unit)
    ctx.rect(snake[snake.length - i].xCoordinate, snake[snake.length-i].yCoordinate, unit, unit);
    ctx.stroke()
  }
  console.log(snake.length)
}



function collisionCheck(){

  if (snake[0].xCoordinate >= AreaSize || snake[0].xCoordinate < 0 || snake[0].yCoordinate >= AreaSize || snake[0].yCoordinate < 0 ){
    return true
  }
  for (var i = 1; i < snake.length; i++){

    if (snake[i].xCoordinate == snake[0].xCoordinate && snake[i].yCoordinate == snake[0].yCoordinate){
      return true
    }
  }
}

function generateCollectable(){

  xCollectable = unit * (Math.floor(Math.random() * (rows)));
  yCollectable = unit * (Math.floor(Math.random() * (rows)));

  for (var i = 0; i < snake.length; i++){
    	if (snake[i].xCoordinate == xCollectable && snake[i].yCoordinate == yCollectable){
        generateCollectable()
      }
  }
  while (Math.abs(xCollectable - snake[0].xCoordinate) < unit && Math.abs(yCollectable - snake[0].yCoordinate) < unit){

    xCollectable = unit * (Math.floor(Math.random() * (rows)));
    yCollectable = unit * (Math.floor(Math.random() * (rows)));
    
  }

  
}




function App() {

  const canvasRef = useRef(null)

  useEffect(() => {
    
    const canvas = canvasRef.current;
    canvas.width = AreaSize;
    canvas.height = AreaSize;

    ctx = canvas.getContext("2d");
    ctx.beginPath()
    ctx.fillStyle = "green";
    ctx.fillRect(unit, unit, unit, unit);
    ctx.rect(unit, unit, unit, unit);
    ctx.stroke()
    ctx.fillStyle = "red";
    ctx.fillRect(xCollectable, yCollectable, unit, unit);
    ctx.rect(unit, unit, unit, unit);
    ctx.stroke()

    
    

  }, [])
  
  return (
    <div>
      <h1 id="score">0</h1>
    <canvas id="gameArea"
      ref={canvasRef}>
        
      </canvas>
    </div>
  );
}


export default App;
