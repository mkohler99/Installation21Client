//spritesource.style.display = "none";
var shipSpriteImage = new Image();

var socket = io('https://www.oasis-sandbox.com:3000');

const shipNames = ['Pegasus','Viper','Hummingbird','Dakota','Wildcat','HWSS The Commissioner','CS Trinity','HWSS Cataphract','CS Frontier','SC Argonaut','Vanguard','Star Talon','Huntress','Panama','Shade','USS Ural','CS Falling Star','SS Panama','HWSS Elena','HMS Vision','Gremlin','Cordoba','Providence','Nemesis','Prennia','HMS Trailblazer','USS Death','SC Karnack','LWSS Fudgy','CS The Rhinoceros','Adder','Strike','Galactica','Manhattan','Nightingale','BC Elena','LWSS Claymore','LWSS Kingfisher','CS Firebrand','LWSS Adder','Observer','Templar','Pandora','Ark Royal','Britain','LWSS The Messenger','HWSS Mercenary','HMS Kryptoria','CS Marauder','USS Thebes','The Vagabond','Kraken','Scavenger','Constellation','Resolution','STS Lion','STS Alexandria','BC Barbara','CS Striker','LWSS Dagger','Rising','Spitfire','Nihilus','Diplomat','STS Excalibur','BS Hummingbird','SSE Challenger','HMS Wolverine','SC Sparrow','The Raven','Stargazer','Warlock','Scorpio','Argonaut','ISS Vagabond','CS Athens','LWSS Duke','HWSS Defiant','BC Gremlin','Wyvern','Verminus','Baldrin','Covenant','Burn','BS Crash','BC Pandora','USS Storm','SSE Lightning','STS Nuria','Harmony','Pursuer','Behemoth','Gladius','Comet','HMS Inferno','STS Berserk','STS Opal Star','BS Behemoth','BC Kennedy','NYAN CAT'];


socket.on('disconnect', handleDisconnect);
socket.on('forceDisconnect', handleForceDisconnect);
socket.on('playerUpdate', handlePlayerUpdate);
socket.on('itemEvent', handleItemEvent);
socket.on('forceClientReset', handleForceClientReset);
socket.on('codeAccepted', joinTouchChannel);
socket.on('codeRejected', handleIncorrectCode);

const gameScreen = document.getElementById('gameScreen');
const initialScreen = document.getElementById('initialScreen');
const gameOverScreen = document.getElementById('gameOverScreen');

const joinTDBtn = document.getElementById('joinTDChannel');
const leaveTDBtn = document.getElementById('leaveTDChannel');
const pingBtn = document.getElementById('ping');
const leftBtn = document.getElementById('leftButton');
const rightBtn = document.getElementById('rightButton');
const upBtn = document.getElementById('upButton');
const downBtn = document.getElementById('downButton');

//const colorPicker = document.getElementById('colorPicker');

//const gameCodeDisplay = document.getElementById('gameCodeDisplay');
const gameLivesDisplay = document.getElementById('gameLivesDisplay');
const gameScoreDisplay = document.getElementById('gameScoreDisplay');
const playerClassDisplay = document.getElementById('PlayerType');
const pickupDisplay = document.getElementById('pickupDisplay');
const gameOverDisplay = document.getElementById('gameOverDisplay');

const gameCodeInput = document.getElementById('gameCodeInput');
const nameInput = document.getElementById('nameField');
const codeField = document.getElementById('codeField');

const canvasUp = document.getElementById('canvasUp');
const canvasLeft = document.getElementById('canvasLeft');
const canvasCenter = document.getElementById('canvasCenter');
const canvasRight = document.getElementById('canvasRight');
const canvasDown = document.getElementById('canvasDown');
const canvasDummy = document.getElementById('dummy');

const shipModelDisplay = document.getElementById('shipModelDisplay');

var devCounter = 0;



function touchShip(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Ship Display Canvas")
  handleDevCounter();
}

function clickShip(evt) {
  evt.preventDefault();
  console.log("Click Started on Ship Display Canvas")
  handleDevCounter();
}

function handleDevCounter(){
  devCounter +=1;
  if(devCounter >= 10){
    console.log("Looks like we have a developer!")
    playerClassDisplay.innerText="Developer";
    shipSlider.max=99;
  }
}

//Setup New Fancy Color Picker
var colorPicker = new iro.ColorPicker('#picker', {
  width:150,
  borderWidth:1,
  borderColor:"#000",
  layout: [
    { 
      component: iro.ui.Wheel,
      options: {}
    },
  ]
});

const shipSlider = document.getElementById('shipSlider');
pickupDisplay.innerText = "You haven't found anything yet...";



var connectionHandle = "TEST";

const queryString = window.location.search;
console.log(queryString);
const urlParams = new URLSearchParams(queryString);
const theCode = urlParams.get('code')
console.log(theCode);
codeField.value = theCode;

const spritecanvas = document.getElementById('spritecanvas');
spritecanvas.addEventListener("touchstart", touchShip, false);
spritecanvas.addEventListener('click', clickShip, false);
const ctx = spritecanvas.getContext('2d');
const gameHUD = document.getElementById('canvasHUD');
const ctxHUD = gameHUD.getContext('2d');
//const image = document.getElementById('spritesource');

shipSpriteImage.onload = function () {
  ctx.clear
  spritecanvas.width = 100;
  spritecanvas.height = 100;
  ctx.fillStyle = "rgba(255, 255, 255, 255)";
  var x = 0;
  var y = 0;
  ctx.fillRect(0, 0, spritecanvas.width, spritecanvas.height);
  ctx.globalCompositeOperation = "copy";
  ctx.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, spritecanvas.width, spritecanvas.height);
  ctx.globalCompositeOperation = "multiply"; // multiply it by red color
  ctx.fillStyle = colorPicker.color.hexString; 
  ctx.fillRect(0, 0, spritecanvas.width, spritecanvas.height);
  ctx.globalCompositeOperation = "destination-atop"; // restore transparency
  ctx.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, spritecanvas.width, spritecanvas.height);
  
  
  
  ctxHUD.clear
  gameHUD.width = 100;
  gameHUD.height = 100;
  ctxHUD.fillStyle = "rgba(255, 255, 255, 255)";
  ctxHUD.fillRect(0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "copy";
  ctxHUD.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxHUD.fillStyle = colorPicker.color.hexString; 
  ctxHUD.fillRect(0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "destination-atop"; // restore transparency
  ctxHUD.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, gameHUD.width, gameHUD.height);
  
}
shipSpriteImage.src = 'spritesheet1.png';




var arrowImage = new Image();
var arrowImageRight = new Image();
var diceImage = new Image();

//Get context ready
var ctxUP = canvasUp.getContext('2d');
var ctxDWN = canvasDown.getContext('2d');
var ctxLEFT = canvasLeft.getContext('2d');
var ctxRIGHT = canvasRight.getContext('2d');
var ctxCENTER = canvasCenter.getContext('2d');

//Now, set .onload with function(s) that require a loaded image, before setting .src
arrowImage.onload = function () {
    ctxUP.drawImage(arrowImage, 0, 0, 256, 256, 0, 0, canvasUp.width, canvasUp.height);
    drawImage(ctxDWN,arrowImage,0,0,canvasDown.width,canvasDown.height,180);
}

arrowImageRight.onload = function () {
  ctxRIGHT.drawImage(arrowImageRight, 0, 0, 256, 256, 0, 0, canvasRight.width, canvasRight.height);  
  drawImage(ctxLEFT,arrowImageRight,0,0,canvasLeft.width,canvasLeft.height,180);
}

diceImage.onload = function () {
  ctxCENTER.drawImage(diceImage, 0, 0, 256, 256, 0, 0, canvasCenter.width, canvasCenter.height);  
}

//Finally, start the loading process
arrowImage.src = 'Arrow.png';
arrowImageRight.src = 'ArrowRight.png';
diceImage.src = 'Random.png';




function drawImage(ctx, image, x, y, w, h, degrees){
  ctx.save();
  ctx.translate(x+w/2, y+h/2);
  ctx.rotate(degrees*Math.PI/180.0);
  ctx.translate(-x-w/2, -y-h/2);
  ctx.drawImage(image, x, y, w, h);
  ctx.restore();
}



function touchUp(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Canvas UP Button")
  moveUp();
}
function touchLeft(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Canvas LEFT Button")
  moveLeft();
}
function touchCenter(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Canvas CENTER Button")
  ping();
}
function touchRight(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Canvas RIGHT Button")
  moveRight();
}
function touchDown(evt) {
  evt.preventDefault();
  console.log("TouchStarted on Canvas DOWN Button")
  moveDown();
}
function touchDummy(evt) {
  evt.preventDefault();
}

function clickUp(evt) {
  evt.preventDefault();
  console.log("Click Started on Canvas UP Button")
  moveUp();
}
function clickLeft(evt) {
  evt.preventDefault();
  console.log("Click Started on Canvas LEFT Button")
  moveLeft();
}
function clickCenter(evt) {
  evt.preventDefault();
  console.log("Click Started on Canvas CENTER Button")
  ping();
}
function clickRight(evt) {
  evt.preventDefault();
  console.log("Click Started on Canvas RIGHT Button")
  moveRight();
}
function clickDown(evt) {
  evt.preventDefault();
  console.log("Click Started on Canvas DOWN Button")
  moveDown();
}









socket.on('connect', () => {
  console.log('Successfully connected!');
  connectionHandle = socket.id;
  console.log(connectionHandle);
});


joinTDBtn.addEventListener('click', validateForm);
leaveTDBtn.addEventListener('click', leaveTouchChannel);

shipSlider.addEventListener('input',shipSliderChanged);
//colorPicker.addEventListener('change',shipSliderChanged);
colorPicker.on('color:change', function(color) {
  // log the current color as a HEX string
  shipSliderChanged();
});

canvasUp.addEventListener("touchstart", touchUp, false);
canvasUp.addEventListener('click', clickUp, false);

canvasLeft.addEventListener("touchstart", touchLeft, false);
canvasLeft.addEventListener('click', clickLeft, false);

canvasCenter.addEventListener("touchstart", touchCenter, false);
canvasCenter.addEventListener('click', clickCenter, false);

canvasRight.addEventListener("touchstart", touchRight, false);
canvasRight.addEventListener('click', clickRight, false);

canvasDown.addEventListener("touchstart", touchDown, false);
canvasDown.addEventListener('click', clickDown, false);

canvasDummy.addEventListener("touchstart", touchDummy, false);










function shipSliderChanged(){
  console.log("Changed");
  shipModelDisplay.innerText=shipNames[shipSlider.value];
  ctx.clear
  ctx.fillRect(0, 0, spritecanvas.width, spritecanvas.height);
  const spriteRows = 10
  const spriteCols = 10
  const spriteSize = 64
  var index = shipSlider.value;
  var columns = 10;
  // should be 0, 64, 128,
  x = index % columns;
  y = Math.floor(index / columns);
  //console.log("X: ",x,"Y: ",y)
  ctx.globalCompositeOperation = "copy";
  ctx.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, spritecanvas.width, spritecanvas.height);
  ctx.globalCompositeOperation = "multiply"; // multiply it by red color
  ctx.fillStyle = colorPicker.color.hexString; 
  ctx.fillRect(0, 0, spritecanvas.width, spritecanvas.height);
  ctx.globalCompositeOperation = "destination-atop"; // restore transparency
  ctx.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, spritecanvas.width, spritecanvas.height);
  
  ctxHUD.clear
  ctxHUD.fillRect(0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "copy";
  ctxHUD.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxHUD.fillStyle = colorPicker.color.hexString; 
  ctxHUD.fillRect(0, 0, gameHUD.width, gameHUD.height);
  ctxHUD.globalCompositeOperation = "destination-atop"; // restore transparency
  ctxHUD.drawImage(shipSpriteImage, 64*x, 64*y, 64, 64, 0, 0, gameHUD.width, gameHUD.height);
  
  ctxUP.clear;
  ctxUP.fillRect(0, 0, canvasUp.width, canvasUp.height);
  ctxUP.globalCompositeOperation = "copy";
  ctxUP.drawImage(arrowImage, 0, 0, 256, 256, 0, 0, canvasUp.width, canvasUp.height);
  ctxUP.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxUP.fillStyle = colorPicker.color.hexString; 
  ctxUP.fillRect(0, 0, canvasUp.width, canvasUp.height);
  ctxUP.globalCompositeOperation = "destination-atop"; // restore transparency
  ctxUP.drawImage(arrowImage, 0, 0, 256, 256, 0, 0, canvasUp.width, canvasUp.height);
  
  ctxDWN.clear;
  ctxDWN.fillRect(0, 0, canvasDown.width, canvasDown.height);
  ctxDWN.globalCompositeOperation = "copy";
  drawImage(ctxDWN,arrowImage,0,0,canvasDown.width,canvasDown.height,180);
  ctxDWN.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxDWN.fillStyle = colorPicker.color.hexString; 
  ctxDWN.fillRect(0, 0, canvasDown.width, canvasDown.height);
  ctxDWN.globalCompositeOperation = "destination-atop"; // restore transparency
  drawImage(ctxDWN,arrowImage,0,0,canvasDown.width,canvasDown.height,180);
  
  ctxRIGHT.clear;
  ctxRIGHT.fillRect(0, 0, canvasRight.width, canvasRight.height);
  ctxRIGHT.globalCompositeOperation = "copy";
  ctxRIGHT.drawImage(arrowImageRight, 0, 0, 256, 256, 0, 0, canvasRight.width, canvasRight.height);
  ctxRIGHT.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxRIGHT.fillStyle = colorPicker.color.hexString; 
  ctxRIGHT.fillRect(0, 0, canvasRight.width, canvasRight.height);
  ctxRIGHT.globalCompositeOperation = "destination-atop"; // restore transparency
  ctxRIGHT.drawImage(arrowImageRight, 0, 0, 256, 256, 0, 0, canvasRight.width, canvasRight.height);
  
  ctxLEFT.clear;
  ctxLEFT.fillRect(0, 0, canvasLeft.width, canvasLeft.height);
  ctxLEFT.globalCompositeOperation = "copy";
  drawImage(ctxLEFT,arrowImageRight,0,0,canvasLeft.width,canvasLeft.height,180);
  ctxLEFT.globalCompositeOperation = "multiply"; // multiply it by red color
  ctxLEFT.fillStyle = colorPicker.color.hexString; 
  ctxLEFT.fillRect(0, 0, canvasLeft.width, canvasLeft.height);
  ctxLEFT.globalCompositeOperation = "destination-atop"; // restore transparency
  drawImage(ctxLEFT,arrowImageRight,0,0,canvasLeft.width,canvasLeft.height,180);
  
  
  
  
    
  
}

function indexToGridCoords(i){
  var base = Math.round(Math.sqrt(i))
  remains = i - base * base
  if (remains <= base){
    x = remains
    y = base
  } else {
    x = base;
    y = 2 * base - remains
  }
  return{x, y};
}




function ping() {
  socket.emit('pingMessage',"hello");
}

function handleForceDisconnect() {
  console.log("User was kicked for idling");
  leaveTouchChannel();
}

function handlePlayerUpdate(lives,score) {
  console.log("Got player update from server! Lives:",lives," Score: ",score);
  gameLivesDisplay.innerText = lives;
  gameScoreDisplay.innerText = score;
  gameOverDisplay.innerText = score;
}

function handleItemEvent(eventString,eventEffect) {
  console.log("Got item event:",eventString," Effect: ",eventEffect);
  pickupDisplay.innerText = eventString;
  
  switch(eventEffect){
    case 0:
      console.log("Got Message");
      break;
    case 1:
      console.log("Do something fun here?");
      break;
  default:
  }

}

function moveLeft() {
  socket.emit('movePlayer',"LEFT");
}
function moveRight() {
  socket.emit('movePlayer',"RIGHT");
}
function moveUp() {
  socket.emit('movePlayer',"UP");
}
function moveDown() {
  socket.emit('movePlayer',"DOWN");
}


function validateForm() {
  let formValid = false;
  let allAreFilled = true;
  document.getElementById("initialScreen").querySelectorAll("[required]").forEach(function(i) {
    if (!allAreFilled) return;
    if (!i.value) allAreFilled = false;
    console.log(i)
    if (!allAreFilled) {
      alert('Fill all the fields');
      return;
    } else {
      formValid = true;
    }
  })
  if(formValid == true)
  {
    console.log("Form is valid");
    codeCheck();
  }
  
}

function codeCheck() {
  var gameCode = codeField.value;
  socket.emit('checkCode', gameCode);
}

function joinTouchChannel() {
  //var objectUUID = Math.random().toString(36).substr(2, 9);
  var objectUUID = connectionHandle;
  var playerName = nameInput.value;
  shipColor = hexToRgb(colorPicker.color.hexString);
  playerObject = {
    [objectUUID] : [
      {"name":playerName, "xPos":"1000","yPos":"2000","lastChanged":"0","score":"0","color":shipColor,"state":"0","shipID":(shipSlider.value)}
    ]
  }
  socket.emit('joinTDChannel', JSON.stringify(playerObject));
  init(objectUUID);
}

function handleIncorrectCode() {
  alert('Code was invalid, you may have timed out or you may need to re-scan the qr code at our booth!');
  reset();
}

function leaveTouchChannel() {
  reset();
  socket.emit('leaveTDChannel');
  
}

function handleForceClientReset() {
  reset();  
}



let playerNumber;
let gameActive = false;

function init(objectUUID) {
  initialScreen.style.display = "none";
  gameOverScreen.style.display = "none";
  gameScreen.style.display = "block";
  //gameCodeDisplay.innerText = objectUUID;
  

}





function handleDisconnect() {
  reset();
}

function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null;
}


function reset() {
  gameScreen.style.display = "none";
  gameOverScreen.style.display="block";
  setTimeout(showInitialScreen,4000);
  pickupDisplay.innerText = "You haven't found anything yet...";
}

function showInitialScreen(){
  initialScreen.style.display = "block";
  gameOverScreen.style.display="none";
}



