function setup() {
  createCanvas(windowWidth,windowHeight)
  
}
function draw() {
  background('#946d44')

	//making use of milliseconds for smooth animations
	var d = new Date()
	var mSec = d.getMilliseconds()
	var sec = d.getSeconds()
	var min = d.getMinutes()
	var hr = d.getHours()

	var secMil = mSec + sec * 1000
	var minSecMil = secMil + min * 60000

	numH = 24 // number of horizontal threads, hours
	numV = 360 // number of vertical threads, minutes (four minutes per thread, here)
	vAdjust = 1440/numV // the number of minutes per vertical thread
		// adjusting the spacing and width of the horizontal lines
	heightPartition = height / (numH + 2)//24 hours in the day, with the extra is for padding
	margin = heightPartition
	heightCoefficient = .8//% of the partition which the line takes up
	strokeHeight = heightPartition*heightCoefficient
	widthPartition = (width-2*margin-16) / (numV + 2)
		//giving it the same margin as the vertical
		//the 8 on the width is to account for the scroll bar on the right side

strokeWidth = widthPartition * 1//in here in case the stroke width was going to be different from the partition

lineAdjust = heightPartition-strokeHeight/2	//this is the amount of overlap of a vertical thread between the horizontal threads	
heightSection = ((height-margin+lineAdjust)-(heightPartition+margin-lineAdjust))/vAdjust //the portion of the vertical thread for each minute,
	//here it is a quarter of the height

//for horizontal motion, over an hour
var left = map(minSecMil,0,3600000,margin,width-2*margin)
//for vertical motion, over four minutes
var top = map(secMil,0,vAdjust*60000,heightPartition+margin-lineAdjust,height-margin+lineAdjust)

//one layer of vertical lines underneath the horizontal lines
//so the appearance is smooth
//the overlying thread lines are drawn below
var xThread = (hr*60+min)/vAdjust //this finds how many minutes through the day we are
	//and then finds which vertical thread it is, scaled based on how many minutes per thread
var topAdjust = vAdjust*(xThread%1)
var heightAlign = 12
	//this draws the thread which is currently being pulled, underneath
for (s=floor(xThread); s<numV; s++){
	strokeWeight(strokeWidth/2)
	for (i=0; i<numH/2; i++){
		var lineColor = color(255*s/numV) //the day starts full of color, and is used up minute by minute
		lineColor.setAlpha(255-50*s/numV)
		stroke(lineColor)
		if(s==floor(xThread)){//this is the thread being removed
			line((s+1)*strokeWidth+margin,	top+topAdjust*heightSection-heightAlign,	(s+1)*strokeWidth+margin,	height-margin+lineAdjust-heightAlign)
		}
		else{//these are the remaining threads
			line((s+1)*strokeWidth+margin,	heightPartition+margin-lineAdjust-heightAlign,	(s+1)*strokeWidth+margin,	height-margin+lineAdjust-heightAlign)
		}
	}
}

//this fills in the horizontal hours
	// I originally had two for statements, one for the stationary threads and one for the moving threads
	// I have combined them to avoid having the stroke collor switch code twice ...  is there a better way to include it without repetition?
for (m=hr; m<numH; m++){
 	strokeWeight(strokeHeight/1.25)
 			i=0
 			var fillVal = '#000000';
 			switch(m){//horizontal colors change with the sky color throughout the day, sunrise / sunset for early March, ~41N, before DST
				case 0:
					fillVal=('#010204')
					break;
				case 1:
					fillVal=('#151b2e')
					break;
				case 2:
					fillVal=('#1d253f')
					break;
				case 3:
					fillVal=('#232e4e')
					break;
				case 4:
					fillVal=('#29355a')
					break;
				case 5:
					fillVal=('#fe9058')
					break;
				case 6:
					fillVal=('#708cac')
					break;
				case 7:
					fillVal=('#7291b5')
					break;
				case 8:
					fillVal=('#7599c4')
					break;
				case 9:
					fillVal=('#799fd0')
					break;
				case 10:
					fillVal=('#7da7de')
					break;
				case 11:
					fillVal=('#6fa0da')
					break;
				case 12:
					fillVal=('#8fabd0')
					break;
				case 13:
					fillVal=('#91b0d4')
					break;
				case 14:
					fillVal=('#95b6da')
					break;
				case 15:
					fillVal=('#97bbde')
					break;
				case 16:
					fillVal=('#9ac1e3')
					break;
				case 17:
					fillVal=('#9bc4e6')
					break;
				case 18:
					fillVal=('#fc8792')
					break;
				case 19:
					fillVal=('#273356')
					break;
				case 20:
					fillVal=('#232c4c')
					break;
				case 21:
					fillVal=('#1a233a')
					break;
				case 22:
					fillVal=('#13192a')
					break;
				case 23:
					fillVal=('#000101')
					break;
				default:
					fillVal=('#000000')
				}
 			stroke(fillVal)		
			if (m==hr){ //the current hour, which is being pulled out
 				line(left,	(m+1)*heightPartition+margin-heightAlign,	width-margin-16,	(m+1)*heightPartition+margin-heightAlign)
 			}
			else { //the future hours, which are stationary for now
				line(margin,	(m+1)*heightPartition+margin-heightAlign,	width-margin-16,	(m+1)*heightPartition+margin-heightAlign)
			}
		}

//this puts in the vertical threads, over the hours
for (s=floor(xThread); s<numV; s++){ //makes sure to only have the remaining hours in the day shown
	strokeWeight(strokeWidth/2)
	for (i=0; i<numH/2; i++){
		var lineColor = color(255*s/numV) //the day starts full of color, and is used up minute by minute
		lineColor.setAlpha(255-50*s/numV)
		stroke(lineColor)

		if(s==floor(xThread)){//the vertical thread which is currently being removed
			if(s%2==0)	{
				if(top+topAdjust*heightSection < (2*i+1)*heightPartition+margin-lineAdjust){//not yet moving
					line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin+lineAdjust-heightAlign)
					}
				else if(top+topAdjust*heightSection > (2*i+1)*heightPartition+margin+lineAdjust){//all the way pulled off
					}
				else{//moving down
					line((s+1)*strokeWidth+margin,	top+topAdjust*heightSection-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin+lineAdjust-heightAlign)
					}
				}
			else{
				if(top+topAdjust*heightSection < (2*i+2)*heightPartition+margin-lineAdjust){//not yet moving
					line((s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin-lineAdjust-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin+lineAdjust-heightAlign)
					}
				else if(top+topAdjust*heightSection > (2*i+2)*heightPartition+margin+lineAdjust){//all the way pulled off
					}
				else{//moving down
					line((s+1)*strokeWidth+margin,	top+topAdjust*heightSection-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin+lineAdjust-heightAlign)
					}
				}
		}
		else{//the vertical threads for the future, which are stationary
		if(s%2==0)	{
			line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin+lineAdjust-heightAlign)
			}
		else{
			line((s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin-lineAdjust-heightAlign,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin+lineAdjust-heightAlign)
			}
		}
	}
}

//create a border to hide the ends
strokeWeight(margin)
stroke('#7a450c')
line(margin/2,0,margin/2,height)
line(width-16-margin/2,0,width-16-margin/2,height)

h1 = heightPartition+margin-lineAdjust-heightAlign
strokeWeight(h1)
line(0,h1/2,width,h1/2)

h2 = margin+heightAlign-lineAdjust //the distance between the bottom of the vertical threads and the edge
strokeWeight(h2)
line(0,height-h2/2,width,height-h2/2)
}
