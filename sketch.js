var button,db,pc=0,gs=0,reset,currentindex=0;

var car1,car2,cars=[];

var allplayers;

var index,x;




function setup()
{
  createCanvas(displayWidth,displayHeight)

  //initializing firebase
  db=firebase.database();


  car1=createSprite(200,200,30,30);
 
 

  
  car2=createSprite(200,200,30,30);
  

  car3=createSprite(200,200,30,30);
  
  
  car4=createSprite(200,200,30,30);
  



  cars=[car1,car2,car3,car4];
  
  //linking pc to database playercount

  db.ref('playercount').on("value",function(data){
    pc=data.val();
  })

 //linking gs to database gamestate
  
 db.ref('gamestate').on("value",function(data){
  gs=data.val();
})
  //creating button
  button=createButton('SUBMIT');
  button.position(500,200);
  button.mousePressed(enterPlayer)

  reset=createButton('RESET');
  reset.position(1100,50);
  reset.mousePressed(resetD);
}

function draw()
{
  if(pc==4 && gs==0)
  {

    
     db.ref('/').update({
      gamestate:1
    })


  }

  
  if(allplayers==undefined && gs==1)
  {
    db.ref('players').on("value",function(data){
      allplayers=data.val()
    })
  }

  

  if(gs==1)
  {

     
    
    
    background(0);
   

    index=0;
     x=250;
   
    
    //linking database positions to sprite positions in the browsers
    for(var i in allplayers)
    {
       cars[index].x=x;
       x=x+250;
       cars[index].y=allplayers[i].y;
       
       console.log(cars[index].x)
       index+=1;

      


    }


    if(keyDown("up"))
    {
      cars[currentindex-1].y-=5;

      db.ref('players/player'+(currentindex)).update({
        y:cars[currentindex-1].y
      })
    }

    drawSprites();


  }



}


//button press function
function enterPlayer()
{
  var hello=createElement('h1');
  hello.position(200,500);
  hello.html("Welcome , Please wait for others to join");
  button.hide();

  pc=pc+1;

  db.ref('/').update({
      playercount:pc
  })

  db.ref('players/player'+pc).set({
      y:590,
      index:pc
  })

currentindex=pc;

}



function resetD()
{
    db.ref('/').update({
        gamestate:0,
        playercount:0
    })

    db.ref('players').remove()
}