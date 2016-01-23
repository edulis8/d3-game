// start slingin' some d3 here.

colors = d3.scale.category20();

var dragmove = function(d) {
    d3.select(this)
      .attr("cy", ((d3.event.sourceEvent.pageY) - this.offsetHeight/2 - 70)+"px")
      .attr("cx", ((d3.event.sourceEvent.pageX) - this.offsetWidth/2)+"px");
};

var drag = d3.behavior.drag().on("drag", dragmove);


var height = 500;
var width = 500;
// Player
var player = d3.select('.gameBoard').append("svg").attr("width", width).attr("height", height).style("background", "ghostwhite").append("circle").attr("cx", 250).attr("cy", 250).attr("r", 20).attr("class", "draggable player").style("fill", "blue").call(drag);

var enemies = [];

for(var i = 0; i < 10; i++){
  var cy = Math.random() * height;
  var cx = Math.random() * width;
  var enemy = d3.select("svg").append("g").append("ellipse").attr("class", "enemy").attr("id", i).attr("cx", cx).attr("cy", cy).attr("rx", 20).attr("ry", 10).style("fill", "red").style("opacity", 0.5);

  enemies.push(enemy);
}

d3.selectAll("g").append("text").text("ABC");






var randomizeEnemies = function(){

//   The Svg rotate transformation takes an optional x,y pair so if you want to rotate 90deg about 10,10 it would be
// .attr('transform', 'rotate(90, 10, 10)')

// attrTween("transform", function() {
//       return d3.interpolateString("rotate(0)", "rotate(720)")})

   for(var i = 0; i < enemies.length; i++){
    var cy = Math.random() * height;
    var cx = Math.random() * width;
    enemies[i].transition()
      .duration(500)
      .attr("cx", cx).attr("cy", cy)
      //.attr("transform", "rotate("+Math.random()*360+")") 
    
      .tween('custom', function(){
        return function(){
          var enemyCoord = [parseFloat(d3.select(this).attr('cx')), parseFloat(d3.select(this).attr('cy'))];
          var playerCoord = [parseFloat(player.attr('cx')), parseFloat(player.attr('cy'))];

          if(euclid(enemyCoord, playerCoord) < 40){
            //reset score
            if(currentScore > highScore){
              highScore = currentScore;
              d3.select(".high span").text(highScore);
            } 
            collisions++;
            d3.select(".collisions span").text(collisions);
            d3.select(".current span").text(0);
            currentScore = 0;
            d3.select("body").transition().duration(100).style({"background": "lightpink"});
          }
           d3.select("body").style({"background": "white"});

        };
      }).select("g").attr("transform", "rotate("+Math.random()*360+")");
      
  }
  setTimeout(randomizeEnemies, 1000);
};

var colors = ["gray", "fuchsia", "mediumseagreen", "orangered", "orchid", "papayawhip", "lime", "oldlace", "darkkhaki", "teal"];
var update = function(data){
  // all enemy nodes will get attach to a piece of data. enemy1 | "gray"
  var enemies = d3.selectAll(".enemies").data(data, function(d){ return d;});

}
// For using data:
// var alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
//---
// 
//---
//setInterval(function() {
//   update(d3.shuffle(colors)
//       .slice(0, Math.floor(Math.random() * 10));
// }, 1500);


// Global Score Board Vars;
var highScore = 0;
var collisions = 0;
var currentScore = 0;


// ScoreBoard
var increaseScore = function(){
  currentScore++;
  d3.select(".current span").text(currentScore);
};
setInterval(increaseScore, 50);

randomizeEnemies();
      


// Euclid function:
var merge = function(array1, array2, callback){     
  var mergedArr = [];    
    for(var i = 0; i < array1.length; i++){
     mergedArr.push(callback(array1[i], array2[i]));
    }
    return mergedArr;
};      

var euclid = function(coords1, coords2){
 var squaredDeltas = merge(coords1, coords2, function(a,b){
   return Math.abs((a-b)*(a-b));
  });

var answer = Math.sqrt(squaredDeltas[0] + squaredDeltas[1]);

  return answer;
};



  

//

// d3.select('.gameBoard').transition().tween("text", function() {
//   var i = d3.interpolateRound(0, 100);
//   console.log(i)
//   return function(t) {
//     console.log('t', t)
//     this.textContent = (t);
//   };
// });
 
  // d3.selectAll('svg').each(function(){
  //   var cy = Math.random() * height;
  //   var cx = Math.random() * width;
  //   d3.select(this).transition().duration(500).attr("cx", cx).attr("cy", cy);
  // });


  // }
//  <svg width="100" height="100">
//   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
// </svg>