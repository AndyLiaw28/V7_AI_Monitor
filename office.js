/* V2C: self-contained synthetic pixel-art office. No network / MT5 / trading APIs. */
(()=>{'use strict';
const canvas=document.getElementById('pixelOffice');if(!canvas)return;
const c=canvas.getContext('2d',{alpha:false}),W=360,H=500;
const P={bg:'#0b0d1d',floor:'#24203b',wall:'#17162c',pink:'#f07bd4',purple:'#ae8cff',cyan:'#65e9ee',green:'#64f4bd',yellow:'#ffd077',red:'#ff778e',white:'#e5dfff',dim:'#8b81ac'};
const reduce=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
const stations=[{x:27,y:135,name:'CHEF',color:P.pink,agent:0},{x:195,y:135,name:'SCAN',color:P.cyan,agent:1},{x:27,y:255,name:'RISK',color:P.yellow,agent:2},{x:195,y:255,name:'PILOT',color:P.purple,agent:3},{x:27,y:375,name:'NEWS',color:P.green,agent:4},{x:195,y:375,name:'VET',color:P.red,agent:5}];
const rect=(x,y,w,h,col)=>{c.fillStyle=col;c.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h))};
const line=(x,y,xx,yy,col,w=1)=>{c.strokeStyle=col;c.lineWidth=w;c.beginPath();c.moveTo(Math.round(x)+.5,Math.round(y)+.5);c.lineTo(Math.round(xx)+.5,Math.round(yy)+.5);c.stroke()};
const txt=(t,x,y,col=P.white,size=9)=>{c.font=`bold ${size}px monospace`;c.fillStyle=col;c.fillText(t,x,y)};
function workstation(s,t,mode){const {x,y,color,name,agent}=s;rect(x-8,y-14,154,111,'#101326');rect(x-8,y-14,154,2,color);rect(x-8,y-14,2,111,'#5d386d');rect(x+144,y-14,2,111,'#5d386d');txt(name,x,y-2,color,11);
// Neon triple-monitor workstation
for(let j=0;j<2;j++){let mx=x+12+j*54;rect(mx,y+6,52,32,'#0b091b');rect(mx+3,y+9,46,24,'#172e3c');for(let i=0;i<7;i++){let h=5+Math.round(7*Math.abs(Math.sin(i*.83+t*.65+j+agent)));rect(mx+6+i*6,y+29-h,3,h,(i+agent)%4===0?P.red:color)}rect(mx+23,y+38,6,4,'#6c587b')}
rect(x+10,y+47,121,8,'#443054');rect(x+14,y+54,7,30,'#35243e');rect(x+120,y+54,7,30,'#35243e');rect(x+53,y+50,36,5,'#15243b');for(let i=0;i<8;i++)rect(x+57+i*4,y+51,2,2,P.cyan);
const yy=y+56+(mode==='idle'?0:Math.round(Math.sin(t*3+agent)*2));const cx=x+70;rect(cx-15,yy+18,30,13,'#292340');rect(cx-14,yy+1,29,24,color);rect(cx-13,yy-15,27,20,'#d9d8f7');rect(cx-10,yy-11,21,13,'#222b4d');if(mode==='idle'){rect(cx-6,yy-5,6,1,P.white);rect(cx+4,yy-5,6,1,P.white)}else{rect(cx-6,yy-7,4,4,P.green);rect(cx+5,yy-7,4,4,P.green)}rect(cx-18,yy+9,6,14,'#c3b9e5');rect(cx+14,yy+9,6,14,'#c3b9e5');const key=mode==='idle'?0:Math.round(Math.sin(t*9+agent)*4);rect(cx-20,yy+20+key,8,3,P.white);rect(cx+15,yy+20-key,8,3,P.white);rect(cx-11,yy-18,5,3,color);rect(cx+6,yy-18,5,3,color);
if(mode==='signal'&&agent===1){rect(x+116,y-7,9,9,P.yellow);txt('!',x+119,y,P.bg,8)}if(mode==='alert'&&agent===2){rect(x+113,y-7,12,11,P.red);txt('!',x+117,y+1,P.bg,10)}
rect(x+3,y+84,48,8,'#1c2536');txt(mode==='idle'?'IDLE':mode==='alert'?'ALERT':mode==='signal'?'SIGNAL':'WORK',x+7,y+91,mode==='alert'?P.red:P.green,7)}
function render(now){const mode=window.V7DemoOffice?.getMode?.()||'scan';const t=reduce?0:now/1000;rect(0,0,W,H,P.bg);
rect(8,7,344,486,'#16152c');rect(13,12,334,477,P.floor);
for(let x=13;x<350;x+=16)line(x,110,x,489,'#302640');for(let y=112;y<490;y+=16)line(13,y,347,y,'#302640');
rect(13,12,334,42,P.wall);rect(13,53,334,3,P.pink);txt('V7 // MINI AI COMMAND CENTER',23,29,P.pink,11);txt('6 AGENTS  /  OFFLINE SIMULATION',23,44,P.green,8);
rect(22,64,316,46,'#081727');txt('XAUUSD.m  M15   SYNTHETIC FEED',30,76,P.cyan,8);
for(let i=0;i<24;i++){const x=32+i*12,y=90+Math.sin(i*.8+t*.4)*7;line(x,y-6,x,y+7,i%5===0?P.red:P.green);rect(x-3,y,6,4+(i%3)*2,i%5===0?P.red:P.green)}
// animated signal travel through center aisle
line(178,125,178,473,'#6a3d80',2);for(let k=0;k<5;k++){const y=130+((t*26+k*75)%345);rect(176,y,5,9,mode==='alert'?P.red:mode==='signal'?P.yellow:P.purple)}
for(const s of stations)workstation(s,t,mode);
rect(13,487,334,6,'#2a1436');rect(13,487,mode==='alert'?334:mode==='signal'?260:190,2,mode==='alert'?P.red:P.pink);
if(mode==='alert'&&(reduce||Math.floor(t*2)%2===0)){rect(132,116,96,14,P.red);txt('RISK ALERT',140,126,P.bg,10)}
if(mode==='signal'){rect(133,116,94,14,P.yellow);txt('SIGNAL DEMO',137,126,P.bg,9)}
requestAnimationFrame(render)}
canvas.addEventListener('click',e=>{const r=canvas.getBoundingClientRect();const x=(e.clientX-r.left)*W/r.width,y=(e.clientY-r.top)*H/r.height;const station=stations.find(s=>x>=s.x-8&&x<=s.x+146&&y>=s.y-14&&y<=s.y+97);if(station)window.V7DemoOffice?.selectAgent?.(station.agent)});
requestAnimationFrame(render);
})();
