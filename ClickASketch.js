"use strict"
/*
	Amber Krause
	April 20, 2016
	CISC 131

	JavaScript for assignment due April 25, 2016. This assignment
	creates a sketch area with customizable drawing and canvas colors.
*/

var applyColor;
 //value of true indicates the littleBox elements in the canvas will
 //change color on mouseover

window.onload=function()
{
 var canvasColors;
 var canvasReference;
 var count;
 var drawingColors;
 var i;
 setColoringMode(false);
 drawingColors=["rgb(255, 102, 102)", "#C1E0FF", "rgb(204, 0, 204)", "#00CC66", getRandomRGB()];
 createColorChoice("drawingColorPalette", "drawColor", drawingColors, updateCurrentColor);
 canvasColors=["#F2EBDA", "tan", "rgb(0, 153, 153)", "gray", "black"];
 createColorChoice("canvasColorPalette", "canvasColor", canvasColors, updateCanvasColor);
 document.getElementById("currentColor").style.backgroundColor=drawingColors[0];
 document.getElementById("drawingArea").style.backgroundColor=canvasColors[0];
 canvasReference=document.getElementById("drawingArea");
 canvasReference.innerHTML=createDrawingArea("littleBox", 40, 50, "littleBox", "littleBoxNewRow");
 count=countElementsWithIdPrefixOf("littleBox");
 for(i=0; i<count; i++)
 {
  document.getElementById("littleBox"+i).onmouseover=function()
  {
   if(coloringIsTurnedOn()===true)
   {
	colorTheBox(this, getCurrentColor());
   }
  };
  document.getElementById("littleBox"+i).onclick=function()
  {
   setColoringMode(coloringIsTurnedOn()===false);
   if(coloringIsTurnedOn()===true)
   {
	colorTheBox(this, getCurrentColor());
   }
  };
 }
};

function setColoringMode(mode)
{
 //mutate applyColor
 applyColor=mode;
}

function coloringIsTurnedOn()
{
 //access applyColor
 return applyColor===true;
}

function trim(data)
{
 //remove leading and trailing whitespace characters
 var result;
 if(typeof data==="string")
 {
  var end;
  var start;
  var whitespace;
  whitespace=" \n\r\t\f";
  start=0;
  while(start<data.length&&whitespace.indexOf(data.charAt(start))>=0)
  {
   start=start+1;
  }
  end=data.length-1;
  while(end>=0&&whitespace.indexOf(data.charAt(end))>=0)
  {
   end=end-1;
  }
  if(end<start)
  {
   result="";
  }
  else
  {
   result=data.substring(start, end+1);
  }
 }
 else
 {
  result=data;
 }
 return result;
}

function createHTMLElement(elementType, id, classInfo, content)
{
 if(elementType===null)
 {
  elementType="";
 }
 elementType=""+elementType;
 elementType=trim(elementType);
 if(id===null)
 {
  id="";
 }
 id=""+id;
 id=trim(id);
 if(classInfo===null)
 {
  classInfo="";
 }
 classInfo=""+classInfo;
 classInfo=trim(classInfo);
 if(content===null)
 {
  content="";
 }
 content=""+content;
 if(id.length>0)
 {
  id=' id="'+id+'"'
 }
 if(classInfo.length>0)
 {
  classInfo=' class="'+classInfo+'"';
 }
 return '<'+elementType+id+classInfo+'>'+content+'</'+elementType+'>';
}

function countElementsWithIdPrefixOf(prefix)
{
 var count;
 var elementReference;
 var i;
 count=0;
 i=0;
 elementReference=document.getElementById(prefix+i);
 while(elementReference!==null)
 {
  count=count+1;
  i=i+1;
  elementReference=document.getElementById(prefix+i);
 }
 return count;
}

function getRandomInteger(upperLimit)
{
 //return random integer from 0 to upperLimit
 var result;
 result=Math.floor(Math.random()*(upperLimit+1));
 return result;
}

function getRandomRGB()
{
 //return random color
 var blue;
 var green;
 var red;
 blue=getRandomInteger(255);
 green=getRandomInteger(255);
 red=getRandomInteger(255);
 return "rgb("+red+", "+green+", "+blue+")";
}

function getCurrentColor()
{
 //return current drawing color
 return document.getElementById("currentColor").style.backgroundColor;
}

function createColorChoice(containerId, prefix, colors, executeOnMouseover)
{
 //create HTML div elements for the color palette
 var html;
 var i;
 html="";
 for(i=0; i<colors.length; i++)
 {
  html=html+createHTMLElement("div", prefix+i, "box", "");
 }
 document.getElementById(containerId).innerHTML=html;
 for(i=0; i<colors.length; i++)
 {
  document.getElementById(prefix+i).style.backgroundColor=colors[i];
  document.getElementById(prefix+i).onmouseover=executeOnMouseover;
  document.getElementById(prefix+i).onclick=setColorChoice;
 }
}

function updateCurrentColor()
{
 document.getElementById("currentColor").style.backgroundColor=this.style.backgroundColor;
}

function updateCanvasColor()
{
 document.getElementById("drawingArea").style.backgroundColor=this.style.backgroundColor;
}

function setColorChoice()
{
 var input;
 input=window.prompt("Enter a color", this.style.backgroundColor);
 if(input!==""&&input!==null)
 {
  this.style.backgroundColor=input;
 }
}

function createDrawingArea(prefix, rows, columns, className, newRowClassName)
{
 //return string with HTML for the drawing area
 var classInfo;
 var count;
 var html;
 var i;
 var j;
 html="";
 count=0;
 for(i=0; i<rows; i++)
 {
  classInfo=className+" "+newRowClassName;
  for(j=0; j<columns; j++)
  {
   html=html+createHTMLElement("div", prefix+count, classInfo, "");
   classInfo=className;
   count=count+1;
  }
 }
 return html;
}

function colorTheBox(boxReference, color)
{
 boxReference.style.backgroundColor=color;
}