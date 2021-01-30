let keyValuePair ={ArrowUp:false, ArrowDown:false, ArrowLeft:false, ArrowRight:false};
let player ={speed:6 ,icrSpeed :10, score:0};

const score=document.querySelector(".score");
const startGames = document.querySelector(".startScreen");
const tag = document.querySelector(".tag");
const heading = document.querySelector(".heading");
const clickStart = document.querySelector(".clickStart");
const gameArea = document.querySelector(".gameArea");
const name = document.querySelector(".name");
let nameValue= document.getElementById('name');

document.addEventListener("keydown", (e)=>{
  keyValuePair[e.key]=true;
});

document.addEventListener("keyup", (e)=>{
  keyValuePair[e.key]=false;
});

function isCollide(a,b){
  myCar=a.getBoundingClientRect();
  enmyCar=b.getBoundingClientRect();
  return !((myCar.bottom<enmyCar.top) || (myCar.top>enmyCar.bottom) || (myCar.right<enmyCar.left) || (myCar.left>enmyCar.right));
}

function moveLine(){
  const lines=document.querySelectorAll('.lines');

  lines.forEach((item) => {
    if(item.y >=700){
      item.y -=750;
    }

     item.y +=player.speed;
     item.style.top=item.y + "px";
  });
}

function randomColorCar(){
  function c(){
    let hex=Math.floor(Math.random() * 256).toString(16);
    return ("0" + String(hex)).substr(-2);
  }
  return "#"+c()+c()+c();
}

function endGame(){
  player.startGame=false;
  startGames.classList.remove("hide");
  startGames.style.backgroundColor =  "rgba(250, 252, 140, 0.6)";
  document.querySelector(".LeftSide").style.width ="100%";
  document.querySelector(".imagesForm").style.display ="none";
  tag.innerText ="Well played "+nameValue.value+"!!!\n" +"Your Score is "+ player.score;
  clickStart.innerText="Click To Play Again";
}

function moveEnemy(movingCar,score){
  const enemy=document.querySelectorAll('.enemyCar');

  enemy.forEach((item) => {
    if(isCollide(movingCar,item)){
           endGame();
     }
    if(item.y >=750){
      item.y = -300;
      item.style.left= Math.floor(Math.random()*350)+'px';
      item.style.backgroundColor = randomColorCar();
    }

    if(score<1000)
     item.y +=player.speed;
    else 
    item.y +=player.icrSpeed;

     item.style.top=item.y + "px";
  });
}

function startPlaying(){
  const movingCar=document.querySelector(".movingCar");
  const road = gameArea.getBoundingClientRect();
 
  if(player.startGame){
     moveLine();
     moveEnemy(movingCar,player.score);

    if(keyValuePair.ArrowUp && player.y >road.top+70){ 
      player.y -= player.speed;}
    if(keyValuePair.ArrowDown && player.y< road.height- 110){ 
      player.y += player.speed;}
    if(keyValuePair.ArrowLeft && player.x>1){ 
      player.x -= player.speed;}
    if(keyValuePair.ArrowRight && player.x< (road.width-64)){ 
      player.x += player.speed;}

    movingCar.style.top = player.y+"px";
    movingCar.style.left =player.x+"px";

    player.score ++;
    score.innerText = "SCORE : " + (player.score-1);
    name.innerText= "HELLO\n @" +nameValue.value +"!";
    window.requestAnimationFrame(startPlaying);   
  }
}

clickStart.addEventListener("click",()=>{
    if(!(nameValue.value))
      alert("Name is a mandatory field.");
    else{
          startGames.classList.add("hide");
          gameArea.innerHTML ="";
          player.startGame=true;
          player.score =0;
          gameArea.classList.remove("hide");
          heading.classList.add("hide");
          name.classList.remove("hide");
          score.classList.remove("hide");
          window.requestAnimationFrame(startPlaying);
          for(i=0;i<5;i++){
            let roadLines = document.createElement('div');
            roadLines.setAttribute('class','lines');
            roadLines.y=(i*150);
            roadLines.style.top =roadLines.y+ "px";
            gameArea.appendChild(roadLines);
          }
          for(i=0;i<3;i++){
            let enemy = document.createElement('div');
            enemy.setAttribute('class','enemyCar');
            enemy.y=((i+1)*350)* -1;
            enemy.style.top =enemy.y+ "px";
            enemy.style.backgroundColor = randomColorCar();
            enemy.style.left= Math.floor(Math.random()*350)+"px";
            gameArea.appendChild(enemy);
          }
          
          let car= document.createElement('div');
          car.setAttribute('class','movingCar');
          gameArea.appendChild(car);
          car.style.bottom = "120px";
      
          player.x=car.offsetLeft;
          player.y=car.offsetTop;
      }    
});