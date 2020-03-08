function setup() {
  createCanvas(windowWidth,windowHeight)
  
}
function draw() {
  //background(49, 74, 115)
  //background('#c5a17c')
  background('#946d44')

  //making use of miliseconds for smooth animations
var d = new Date()
var mSec = d.getMilliseconds()
var sec = d.getSeconds()
var min = d.getMinutes()
var secMil = mSec + sec * 1000
var minSecMil = secMil + min * 60000

	// adjusting the spacing and width of the horizontal lines
heightPartition = height / 26;//24 hours in the day, with the extra is for padding
heightCoefficient = .8//% of the partition which the line takes up
strokeHeight = heightPartition*heightCoefficient
widthPartition = ((width-8) - 2 * heightPartition) / 180;
	//giving it the same margin as the vertical
	//the 8 on the width is to account for the scroll bar on the right side

strokeWidth = widthPartition * 1

margin = heightPartition;
 // fill('white')
 // rect(margin,margin, width-2*margin-16,height-2*margin)
	//the 16 on the width is to account for the scroll bar on the right side



//for horizontal motion, over an hour
var left = map(minSecMil,0,3600000,margin,width-2*margin)
//for vertical motion, over four minutes
var top = map(secMil,0,240000,margin,height-2*margin)//4 minutes for each vertical


//one layer of vertical lines underneath the horizontal lines
//so the appearance is smooth
for (s=0; s<180; s++){
	strokeWeight(strokeWidth/2)
	for (i=0; i<12; i++){
		lineColor = 255*s/180 //the day starts full of color, and is used up minute by minute
		stroke(lineColor)
		lineAdjust = heightPartition-strokeHeight/2
		line((s+1)*strokeWidth+margin,	heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	height-margin+lineAdjust)
		}
	}


//this fills in the future hours, which have not yet been pulled off
	for (m=hour()+1; m<24; m++){
	//for (m=0; m<24; m++){
	strokeWeight(strokeHeight/1.25)
	//for (i=0; i<5; i++){
			i=0
			var fillVal = '#000000';
			switch(m){//horizontal colors change with the sky color throughout the day, sunrise / sunset for early March, ~41N
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
			line(margin,	(m+1)*heightPartition+margin,	width-2*margin,	(m+1)*heightPartition+margin)
	//}
}

for (m=hour(); m<hour()+1; m++){
	strokeWeight(strokeHeight/1.25)
	//for (i=0; i<5; i++){
			i=0
			var fillVal = '#000000';
			switch(m){
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
			line(left,	(m+1)*heightPartition+margin,	width-2*margin,	(m+1)*heightPartition+margin)
	//}
}

//for (s=hour()*60+minute()+1; s<360; s++){
// for (s=0; s<180; s++){
// 	strokeWeight(strokeWidth/2)
// 	for (i=0; i<12; i++){
// 		lineColor = 255*s/180 //the day starts full of color, and is used up minute by minute
// 		stroke(lineColor)
// 		lineAdjust = heightPartition-strokeHeight/2
// 		if(s%2==0)	{
// 			if (2*i<hour()){
// 				if ((s+2)*strokeWidth+margin<left){//for vertical lines above and to the left of the current hour
// 					stroke('red')
// 					if (hour()%2==0){
// 						line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+2*strokeHeight+margin)
// 					}
// 					else{line((s+1)*strokeWidth+margin,	(2*i)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+2*strokeHeight+margin)}
// 				}
// 				else{//for vertical lines above
// 					stroke('blue')
// 					if (hour()%2==0){
// 						line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+2*strokeHeight+margin)
// 					}
// 					else{line((s+1)*strokeWidth+margin,	(2*i)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i)*heightPartition+2*strokeHeight+margin)}
// 					}
// 				}
// 			else{
// 				line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin+lineAdjust)
// 			}
// 		}
// 		// else 		{
// 		// 	if (2*i<hour()){
// 		// 		if ((s+2)*strokeWidth+margin<left){//for vertical lines above and to the left of the current hour
// 		// 			line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+2*strokeHeight+margin)
// 		// 		}
// 		// 		else{//for vertical lines above
// 		// 			line((s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+1)*heightPartition+2*strokeHeight+margin)
// 		// 		}
				
// 		// 	}
// 		// 	else{
// 		// 		line((s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin-lineAdjust,	(s+1)*strokeWidth+margin,	(2*i+2)*heightPartition+margin+lineAdjust)
// 		// 	}
// 		// }
			
// 		}
// 	}

//this is the current minute, which is slowly being pulled off
// for (s=0; s<2; s++){
// 	strokeWeight(strokeWidth/2)
// 	for (i=0; i<12; i++){
// 		lineColor = 255*s/360 //the day starts full of color, and is used up minute by minute
// 		stroke("orange")
// 		lineAdjust = heightPartition-strokeHeight/2
// 		//  if (floor(i/2.5)<hour()){
// 		// 	lineAdjust=heightPartition
// 		// }
// 		if(s%2==0)	{line((s+1)*strokeWidth+margin,	margin+2*(i+.5)*heightPartition-lineAdjust,	(s+1)*strokeWidth+margin,	margin+2*(i+.5)*heightPartition+lineAdjust)}
// 		else 		{line((s+1)*strokeWidth+margin,	margin+2*(i+1)*heightPartition-lineAdjust,	(s+1)*strokeWidth+margin,	margin+2*(i+1)*heightPartition+lineAdjust)}
			
// 		}
// 	}
}