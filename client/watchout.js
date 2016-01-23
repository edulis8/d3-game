// start slingin' some d3 here.
var height = 500;
var width = 500;
d3.select('.gameBoard').append("svg").attr("width", width).attr("height", height).style("background", "ghostwhite").append("circle").attr("cx", 250).attr("cy", 250).attr("r", 20).style("fill", "blue");

var enemies = [];

for(var i = 0; i < 10; i++){
  var cy = Math.random() * height;
  var cx = Math.random() * width;
  var enemy = d3.select("svg").append("circle").attr("class", "enemy").attr("id", i).attr("cx", cx).attr("cy", cy).attr("r", 20).style("fill", "red");
  enemies.push(enemy);
}
//enemies[0].transition().duration(500).attr("cx", 0).attr("cy", 0);
//d3.selectAll(".enemy").transition().duration(500).attr()

var randomizeEnemies = function(){

   for(var i = 0; i < enemies.length; i++){
    var cy = Math.random() * height;
    var cx = Math.random() * width;
    enemies[i].transition().duration(500).attr("cx", cx).attr("cy", cy);
  }
  
setTimeout(randomizeEnemies, 1000);
}; 

randomizeEnemies();
 
  // d3.selectAll('svg').each(function(){
  //   var cy = Math.random() * height;
  //   var cx = Math.random() * width;
  //   d3.select(this).transition().duration(500).attr("cx", cx).attr("cy", cy);
  // });


  // }
//  <svg width="100" height="100">
//   <circle cx="50" cy="50" r="40" stroke="green" stroke-width="4" fill="yellow" />
// </svg>