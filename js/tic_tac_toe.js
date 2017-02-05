"use strict"
//Global variables declared
var grid = 3;
var i,j;
var count = 1;  
var flag = 0;
var cross_horiz = 0, cross_verti = 0, cross_right_diag = 0, cross_left_diag = 0;
var zero_horiz = 0,  zero_verti = 0,  zero_right_diag = 0, zero_left_diag = 0;
var space_horiz = 0,  space_verti = 0, space_right_diag = 0, space_left_diag = 0;
var h, v, dleft, dright;
var num;
var player = "user";
var arr = new Array(3)
  for (i = 0; i < 3; i++)
          arr[i]=new Array(3);

$(document).ready(function() {
// Initialising array by ""
  for (i = 0; i < grid; i++) {
    for (j = 0; j < grid; j++) {
      arr[i][j] = "String";
    }
  }

  //Reset button
  $(".reset").click(function() {
    reset();
  }); 
    
  $(".start").click(function() {
    //Start button for starting the game.
    $(".start").attr('disabled','disabled');
    	alert("Player's move");
        for (i = 0; i < grid; i++) {
          for (j = 0; j < grid; j++){
            $(".main").append("<div class='blocks cell' id=grid-" + i + '-' + j + ">");
            count++;
          }
            $(".main").append("<br>");
    }
  });

//Player (User's chance)
  $("body").on("click",".blocks",function() {
    cross_horiz = 0, cross_verti = 0, cross_right_diag = 0, cross_left_diag = 0;
    zero_horiz = 0, zero_verti = 0, zero_right_diag = 0; zero_left_diag = 0;
    space_horiz = 0, space_verti = 0; space_right_diag = 0, space_left_diag = 0;
    h = 0, v = 0, dleft = 0, dright = 0;
    player = "user";
    var button_value = $(this).attr('id');
    $("#" + button_value).text("X");
    $("#" + button_value).prop('disabled',true); 
    num = button_value.split(/[^0-9a-zA-Z]+/g);  
    arr[num[1]][num[2]] = "X";
    match(num[1], num[2]);
  });  
});    

/*This function checks if any pattern found and if not then 2nd player (i.e computer) will be traversing
the grid on the basis of m,n values which is the id where user played already and see where to mark 
his chance. 
*/
  function match (m,n) {
    console.log(m + " " + n);
    if (m - n == 1 || m - n == -1) {
     h = horizontal_traversing(m,n);
     v = vertical_traversing(m,n);
     if (h < v  && h != 0) {
      horiz_com(m,n);
     }
     else if (v < h && v != 0) {
      vert_com(m,n);
     }
     else if (v == 1 && cross_verti == 2) {
      vert_com(m,n); 
    }
     else if (h == 1 && cross_horiz == 2) {
      horiz_com(m,n); 
    }
     else {
       if(h == 0 && v == 0) {
        random_no();
       }
       else { 
        random_no();
      }
     } 
    } 

    else if (m != 1 && n != 1 && m - n == 0) {
   //   console.log("mohit");
     h = horizontal_traversing(m,n);
     v = vertical_traversing(m,n);
     dleft = diagonal_left(m,n);

     // console.log(h + "" + v + "" + dleft + "cross left  " + cross_left_diag);
     
      if (h < v && h < dleft && h != 0) {
        horiz_com(m,n);
     }
     else if (v < h && v < dleft  &&  v != 0) {
        vert_com(m,n);
     }
     else if (v == 1 && cross_verti == 2) {
      vert_com(m,n); 																						
    }
     else if (h == 1 && cross_horiz == 2) {
      horiz_com(m,n); 
    }
     else if (dleft == 1 && cross_left_diag == 2) {
      diag2_com(); 
    }
     else {
         random_no();
     }
    }

    else if (m - n == 2 || m - n == -2) {
     h = horizontal_traversing(m,n);
     v = vertical_traversing(m,n);
     dright = diagonal_right(m,n);
     if (h < v && h < dright && h != 0) {
        horiz_com(m,n);
     }
     else if (v < h && v < dright && v != 0) {
        vert_com(m,n);
     }
     else if (v == 1 && cross_verti == 2) {
      vert_com(m,n); 
    }
     else if (h == 1 && cross_horiz == 2) {
      horiz_com(m,n); 
    }
     else if (dright == 1 && cross_right_diag == 2) {
      diag1_com(); 
    }

     else {
        random_no();
     }
    }

    else {
     h = horizontal_traversing(m,n);
     v = vertical_traversing(m,n);
     dleft = diagonal_left(m,n);
     dright = diagonal_right(m,n); 
     console.log("center diagonal");
     console.log(h + "  " + v + "  " + dleft + " " + dright + " cross  " + cross_right_diag);
     if (h < v && h < dright && h < dleft && h != 0) {
        horiz_com(m,n);
     }
     else if (v < h && v < dleft && v < dright && v != 0) {
        vert_com(m,n);
     }
     else if (v == 1 && cross_verti == 2) {
      vert_com(m,n); 
    }
     else if (h == 1 && cross_horiz == 2) {
      horiz_com(m,n); 
    }
     else if (dleft == 1 && cross_left_diag == 2) {
      diag2_com(); 
    }
     else if (dright == 1 && cross_right_diag == 2) { 
      diag1_com();
    }
     else {
         random_no();
     }
  }
}

//Horizontal traversing and counting the no of vacant spaces as well as cross and zeroes.
  function horizontal_traversing(m,n) {
    for (j = 0; j < grid; j++) {
        i = m;
      if (arr[i][j] == "X") {
        cross_horiz++;
      }
      else if (arr[i][j] == "0") {
        zero_horiz++;
      }
      else{
        space_horiz++;
      } 
    }
    if (cross_horiz == grid) {
      alert("player wins");
      reset();
    }
    else if (zero_horiz == grid) {
      alert("comp_player wins");
      reset();
    } 
    else {
       if (player == "user") 
     return space_horiz; 
    }
}  

  //Vertical traversing and counting the no of vacant spaces as well as cross and zeroes.
 function vertical_traversing(m,n) {
  for (i = 0; i < grid; i++) {
    j = n;
      if (arr[i][j] == "X") {
        cross_verti++;
      }
      else if (arr[i][j] == "0") {
        zero_verti++;
      }
      else{
        space_verti++;
      }
  }
    if (cross_verti == grid) {
      alert("player wins");
      reset();
    }
    else if (zero_verti == grid) {
      alert("comp_player wins");
      reset();
    } 
    else {
       if (player == "user") 
       return space_verti; 
    }
}


//Diagonal traversing as there are two diagonals, this is 1st one. 
  function diagonal_right(m,n) {
  for (i = grid -1, j = 0; i >= 0; i--) {
    if (arr[i][j] == "X") {
          cross_right_diag++;
        }
      else if (arr[i][j] == "0") {
        zero_right_diag++;
      }
      else{
        space_right_diag++;
      }

      j++;
  }
    if (cross_right_diag == grid) {
      alert("player wins");
      reset();
    }
    else if (zero_right_diag == grid) {
      alert("comp_player wins");
      reset();
    } 
    else {
       if (player == "user") 
     return space_right_diag; 
    }
}
//2nd diagonal
function diagonal_left(m,n) {
  for (i = 0, j = 0; i < grid; i++) {
     if (arr[i][j] == "X") {
          cross_left_diag++;
        }
      else if (arr[i][j] == "0") {
        zero_left_diag++;
      }
      else{
        space_left_diag++;
      }
      j++;
  }
    if (cross_left_diag == grid) {
      alert("player wins");
      reset();
    }
    else if (zero_left_diag == grid) {
      alert("comp_player wins");
      reset();
    } 
    else {
       if (player == "user") 
     return space_left_diag; 
    }
}

//Functions for computer chance....
function horiz_com (m,n) {    
  for (j = 0; j < grid; j++) {
    i = m;
 //   console.log(arr[i][j]);
    if (arr[i][j] == "String") {
      var  id = "grid-" + i + "-" + j;
      $("#"+ id).text("0");
      $("#" + id).prop('disabled',true); 
      arr[i][j] = "0";
      player = "comp";
      match_comp(i,j);
      break;
    } 
  }
}  

function vert_com (m,n) {
  for (i = 0; i < grid; i++) {
    j = n;
    if (arr[i][j] == "String") {
      var id = "grid-" + i + "-" + j;
      $("#"+id).text("0");
      $("#" + id).prop('disabled',true); 
      arr[i][j] = "0";
      player = "comp";
      match_comp(i,j);
      break;
    }
  }
} 

function diag1_com () {
  j = 0;
  console.log("ewfgg");
  for (i = grid -1; i >= 0; i--) {
    if (arr[i][j] == "String") {
      var id = "grid-" + i + "-" + j;
      $("#"+id).text("0");
      $("#" + id).prop('disabled',true); 
      arr[i][j] = "0";
      player = "comp";
      match_comp(i,j);
      break;
    } 
    else {
      j++;
    }
  }
}

function diag2_com () {
  for (i = 0, j = 0; i < grid; i++) {
    if (arr[i][j] == "String") {
      var id = "grid-" + i + "-" + j;
      $("#"+id).text("0");
      $("#" + id).prop('disabled',true); 
      arr[i][j] = "0";
      player = "comp";
      match_comp(i,j);
      break;
     } 
     else {
      j++;
      }
    } 
  }

//Random no generator for comp's chance.
function random_no() {
  var x = Math.floor((Math.random() * 3) + 1);
  var y = Math.floor((Math.random() * 3) + 1); 
  x--; y--;
//  console.log(x + " " + y + "random numbers");
  if (player != "comp") {
    horiz_com(x,y);
  }
  else if (player != "comp") {
    vert_com(x,y);
  }
  else if (player != "comp") {
    diag2_com();
  }
  else {
    diag1_com();
  }
}

function match_comp(m,n) {
  zero_horiz = 0, zero_verti = 0, zero_left_diag = 0, zero_right_diag = 0;
  cross_horiz = 0, cross_verti = 0, cross_right_diag = 0, cross_left_diag = 0;
  space_horiz = 0,  space_verti = 0, space_right_diag = 0, space_left_diag = 0;
  console.log(m + " " + n);
  if (m - n == 1 || m - n == -1) {
    horizontal_traversing(m,n);
    vertical_traversing(m,n);
  } 
  else if (m != 1 && n != 1 && m - n == 0) {
    horizontal_traversing(m,n);
    vertical_traversing(m,n);
    diagonal_left(m,n);
    }
  else if (m - n == 2 || m - n == -2) {
    horizontal_traversing(m,n);
    vertical_traversing(m,n);
    diagonal_right(m,n);
    }
  else {
    horizontal_traversing(m,n);
    vertical_traversing(m,n);
    diagonal_left(m,n);
    diagonal_right(m,n); 
  }
}  

function reset() {
   $(".blocks").text("");
   $('.blocks').prop('disabled','false');
   arr = new Array(3)
   for (i = 0; i < 3; i++)
    arr[i]=new Array(3);

   for (i = 0; i < grid; i++) {
    for (j = 0; j< grid; j++) {
      arr[i][j] = "String";
    }
  }   
 }  