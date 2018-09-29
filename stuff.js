var marker = true;
var table = $('table tr');
var turn = $('h4');

/*****************************************************************************/
//Colouring on click

$('td').click(hitMe);

function hitMe()
{
  var col = $(this).closest('td').index();
  var row = $(this).closest('tr').index();
  // console.log("Row : ",row,"Col : ",col);]
  decide(col, row);
  if(checkWin() || isDraw())
    resetBoard();
}

function decide(col, row)           //Decides which cell is to get coloured and then colours it
{
  if(getColour(col, 0) != 'grey')
    return;

  if(getColour(col, -1) == 'grey')
  {
    setColour(col, -1);
    toggleMarker();
    return;
  }

  for(var i=0;i<7;i++)
  {
    var colr = getColour(col, i);
    if(colr != 'grey')
    {
      setColour(col, i-1);
      toggleMarker();


      break;
    }
  }
}

function getColour(col, row)      //Returns the colour of a particular cell
{
  var colr = table.eq(row).find('td').eq(col).find('button').css('background-color');
  if(colr === 'rgb(128, 128, 128)')
   return 'grey';
  else if(colr === 'rgb(0, 0, 255)')
    return 'blue';
  else if(colr === 'rgb(255,0,0)')
    return 'red';
}

function setColour(col, row)      //Sets the colour of a particular cell to red or blue depending on 'marker' value
{
  console.log("Coloured : Row : ",row,"Col : ",col);
  if(marker == true)
    table.eq(row).find('td').eq(col).find('button').css('background-color','blue')
  else
    table.eq(row).find('td').eq(col).find('button').css('background-color','red');
}

function toggleMarker()       //Toggles marker value after each turn
{
  if(marker == true)
  {
    marker = false;
    turn.text('B: It\'s your move. Place your red chip');
  }
  else
  {
    marker = true;
    turn.text('A: It\'s your move. Place your blue chip');
  }
}

/***************************************************************************************/
// Checking for win


function checkWin()
{
  if(checkHorizontal() || checkVertical() || checkDiagonal())
  {
    reportWin();
    return true;
  }
  return false;
}

function reportWin()
{
  if(marker == true)
    alert('B wins');
  else
    alert('A wins');
}

function checkHorizontal()  //horizontal 4 matches
{
  for(var i=0;i<7;i++)
  {
    for(var j=0;j<4;j++)
    {
      if(returnColorCheck(getColour(j,i), getColour(j+1,i), getColour(j+2,i), getColour(j+3,i)))
        return true;
    }
  }
  return false;
}

function checkVertical()  //vertical 4 matches
{
  for(var i=0;i<7;i++)
  {
    for(var j=0;j<4;j++)
    {
      if(returnColorCheck(getColour(i,j), getColour(i,j+1), getColour(i,j+2), getColour(i,j+3)))
        return true;
    }
  }
  return false;
}

function checkDiagonal()  //diagonal 4 matches
{
  // diagonal 1
  for(var i=0;i<4;i++)
  {
    for(var j=0;j<4;j++)
    {
      if(returnColorCheck(getColour(i,j), getColour(i+1,j+1), getColour(i+2,j+2), getColour(i+3,j+3)))
        return true;
    }
  }

  // diagonal 2
  for(var i=6;i>=3;i--)
  {
    for(var j=0;j<4;j++)
    {
      if(returnColorCheck(getColour(i,j), getColour(i-1,j+1), getColour(i-2,j+2), getColour(i-3,j+3)))
        return true;
    }
  }
  return false;
}

function returnColorCheck(color1, color2, color3, color4) //checks if 4 colours match
{
  if(color1!='grey' && color1==color2 && color1==color3 && color1==color4)
    return true;
  else
    return false;
}

/**********************************************************************************/
//Checking for draw
function isDraw()
{
  for(var i=0;i<6;i++)
  {
    for(var j=0;j<6;j++)
    {
      if(getColour(i,j)=='grey')
        return false;
    }
  }
  return true;
}

/**************************************************************************************/
//reset board
function resetBoard()
{
  for(var i=0;i<7;i++)
  {
    for(var j=0;j<7;j++)
    {
      table.eq(i).find('td').eq(j).find('button').css('background-color','grey');
    }
  }
}
