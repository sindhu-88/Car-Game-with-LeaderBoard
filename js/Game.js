class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
   if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
       // playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("car1",car1Img);
    car2 = createSprite(300,200);
    car2.addImage("car2",car2Img);
    car3 = createSprite(500,200);
    car3.addImage("car3",car3Img);
    car4 = createSprite(700,200);
    car4.addImage("car4",car4Img);
    cars = [car1, car2, car3, car4];
    // passedFinish = false;
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    player.getFinishedPlayers();
    
    if(allPlayers !== undefined){
      //var display_position = 100;
      background(rgb(195,135,103));
      image(track, 0, -displayHeight*3.95,displayWidth,displayHeight*5);
      //index of the array
      var index = 0;

      var x = 0;
      var y;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        x = x + 275;
        //use data from the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          stroke(10);
          fill("red");
          ellipse(x,y,60,60);
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;
        }
       
        textAlign(CENTER);
        textSize(20);
        text(allPlayers[plr].name, cars[index - 1].x, cars[index - 1].y + 75);
    
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null && passedFinish === false){
      player.distance +=10
      player.update();
    }

    if(player.distance > 420 && passedFinish === false)
    {
      Player.updateFinishedPlayers();
      player.rank = finishedPlayers;
      console.log(finishedPlayers);
      console.log(player.rank);
      player.update();
      passedFinish = true; 
      //gameState = 2;
     // player.getFinishedPlayers();
      
    }

    drawSprites();
  }

  displayRanks()
  {
    camera.position.x = 0;
    camera.position.y = 0;

    imageMode(CENTER);
    Player.getPlayerInfo();

    image(bronzeImg, displayWidth/-4, -100 + displayHeight/9, 200, 240);
    image(silverImg, displayWidth/4, -100 + displayHeight/10, 225, 270);
    image(goldImg, 0, -100, 250, 300);

    textAlign(CENTER);
    textSize(50);
    for(var plr in allPlayers)
    {
      if(allPlayers[plr].rank === 1)
      {
        text("1st: "+allPlayers[plr].name, 0, 85);
      }
      else if(allPlayers[plr].rank === 2)
      {
        text("2nd: "+allPlayers[plr].name, -350, 175);
      }
      else if(allPlayers[plr].rank === 3)
      {
        text("3rd: "+allPlayers[plr].name, 350, 175);
      }
      else
      {
        textSize(30);
        text("Honorable Mention: " + allPlayers[plr].name, 0, 200);
      }
    }
  }
}
