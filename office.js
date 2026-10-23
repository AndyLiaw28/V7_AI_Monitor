/* V2B: self-contained, pixel-art, synthetic visual only. No network, MT5, database or orders. */
(()=>{'use strict';
const canvas=document.getElementById('pixelOffice');if(!canvas)return;
const c=canvas.getContext('2d',{alpha:false});const W=360,H=330;
const C={bg:'#090d20',floor:'#1a1b35',wall:'#10192f',line:'#563d80',pink:'#ef5ec4',purple:'#9d7dff',cyan:'#65e8e9',green:'#66f4b9',yellow:'#f9d27e',white:'#e2e9ff',dim:'#6d7e9f',red:'#ff7189'};
let frame=0,last=0;const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
const rect=(x,y,w,h,color)=>{c.fillStyle=color;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const line=(x,y,x2,y2,color,width=1)=>{c.strokeStyle=color;c.lineWidth=width;c.beginPath();c.moveTo(Math.round(x)+.5,Math.round(y)+.5);c.lineTo(Math.round(x2)+.5,Math.round(y2)+.5);c.stroke()};
const text=(s,x,y,color=C.white,size=9)=>{c.fillStyle=color;c.font=`bold ${size}px monospace`;c.fillText(s,x,y)};
function monitor(x,y,phase,mode){rect(x-3,y-3,57,35,'#080d19');rect(x,y,51,26,'#26385c');rect(x+3,y+3,45,20,'#071b28');for(let i=0;i<9;i++){let px=x+5+i*5,py=y+15+Math.sin(i*.9+phase)*6;rect(px,py,3,3,i>6?C.pink:C.green)}if(mode==='alert'){rect(x+9,y+9,33,9,C.red);text('RISK',x+15,y+16,'#171024',8)}rect(x+22,y+26,7,6,'#60749a')}
function agent(x,y,color,phase,mode,id){const bob=mode==='idle'?0:Math.sin(phase*2+id)*2;const yy=Math.round(y+bob);rect(x-12,yy+20,26,8,'#171124');rect(x-10,yy+6,23,19,color);rect(x-9,yy-7,22,17,'#dceaff');rect(x-6,yy-5,16,11,color);rect(x-3,yy-1,3,3,'#0c1932');rect(x+6,yy-1,3,3,'#0c1932');rect(x-12,yy+8,4,10,C.white);rect(x+12,yy+8,4,10,C.white);const arm=mode==='idle'?3:Math.sin(phase*6+id)>0?2:6;rect(x-15,yy+17+arm,7,3,C.white);rect(x+12,yy+17+6-arm,7,3,C.white);if(mode==='signal'){rect(x+15,yy-18,6,6,C.yellow);rect(x+17,yy-22,2,4,C.yellow)}if(mode==='alert'){rect(x+15,yy-18,9,8,C.red);text('!',x+18,yy-11,'#111',8)}}
function desk(x,y,accent){rect(x-5,y+1,82,12,'#3b315b');rect(x-5,y+1,82,3,accent);rect(x,y+12,7,19,'#251d3f');rect(x+66,y+12,7,19,'#251d3f');rect(x+30,y+2,20,5,'#18243d');for(let i=0;i<5;i++)rect(x+32+i*3,y+3,2,1,C.cyan)}
function draw(now){if(now-last<33){requestAnimationFrame(draw);return}last=now;const mode=window.V7DemoOffice?.getMode?.()||'scan';const phase=reduce?0:now/1000;frame++;
rect(0,0,W,H,C.bg);rect(7,7,346,316,'#10142b');rect(11,11,338,308,C.wall);
for(let x=16;x<350;x+=24){line(x,86,x,316,'#23203c');}for(let y=87;y<320;y+=24){line(12,y,348,y,'#23203c')}
rect(11,11,338,29,'#171b36');rect(13,39,334,3,C.pink);text('V7 // AI TRADING FLOOR',19,29,C.pink,12);text('OFFLINE DEMO',266,28,C.green,8);
rect(23,51,314,34,'#09172b');text('MARKET ANALYSIS   XAUUSD.m   M15',32,63,C.cyan,9);
for(let i=0;i<24;i++){let x=33+i*12;let y=72+Math.sin(i*.7+phase*.65)*5;line(x,y-5,x,y+6,i%4===0?C.red:C.green);rect(x-3,y,7,Math.max(2,Math.abs(Math.sin(i+phase)*6)),i%4===0?C.red:C.green)}
const stations=[{x:28,y:117,label:'CHEF',color:C.pink,id:0},{x:194,y:117,label:'SCAN',color:C.cyan,id:1},{x:28,y:217,label:'RISK',color:C.yellow,id:2},{x:194,y:217,label:'PILOT',color:C.purple,id:3}];
for(const s of stations){rect(s.x-6,s.y-11,148,95,'#131a32');line(s.x-5,s.y-10,s.x+140,s.y-10,s.color);text(s.label,s.x,s.y-1,s.color,10);monitor(s.x+47,s.y+5,phase+s.id,mode);desk(s.x+23,s.y+42,s.color);agent(s.x+92,s.y+28,s.color,phase,mode,s.id);rect(s.x+4,s.y+58,33,8,'#08182a');text(mode==='idle'?'IDLE':mode==='alert'?'ALERT':mode==='signal'?'SIGNAL':'WORK',s.x+7,s.y+65,mode==='alert'?C.red:C.green,7)}
if(mode==='signal'||mode==='alert'){const flash=reduce||Math.floor(phase*3)%2===0;if(flash){rect(164,177,33,19,mode==='alert'?C.red:C.yellow);text(mode==='alert'?'!':'↗',177,190,'#131226',13)}}else{line(169,180,190,180,C.purple,2);rect(176,177,5,5,C.green)}
rect(11,310,338,10,'#211632');rect(13,310,mode==='alert'?260:mode==='signal'?200:145,2,mode==='alert'?C.red:C.pink);
requestAnimationFrame(draw)}
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect();const x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;const id=y>=206?(x<180?2:3):y>=102&&y<206?(x<180?0:1):-1;if(id>=0)window.V7DemoOffice?.selectAgent?.(id)});
requestAnimationFrame(draw);
})();
