// yükleme perdesi
addEventListener('load',()=>setTimeout(()=>document.getElementById('loader')?.classList.add('off'),450));

// kayan yazı
const mq=document.getElementById('mq');
if(mq){const w=['SKY FLICK','ROAK ONLINE','DUNORI','MOBİL','STEAM','ROAK LAB'];mq.innerHTML=[...w,...w,...w,...w].map(x=>`<span>${x}</span>`).join('')}

// menü
const nav=document.getElementById('nav');
document.getElementById('burger')?.addEventListener('click',()=>nav.classList.toggle('open'));
nav.querySelectorAll('.links a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

// belirme animasyonu
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12});
document.querySelectorAll('.rv').forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+'ms';io.observe(el)});

// sayaç
document.querySelectorAll('[data-n]').forEach(el=>{const n=+el.dataset.n;let c=0;const t=setInterval(()=>{el.textContent=++c;if(c>=n)clearInterval(t)},260)});

// fare ışığı + kart parlaması
const glow=document.getElementById('glow');
addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'});
document.querySelectorAll('.card').forEach(c=>{
  c.addEventListener('pointermove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',(e.clientX-r.left)+'px');c.style.setProperty('--my',(e.clientY-r.top)+'px')});
});

// parçacık ağı
const cv=document.getElementById('bg');
if(cv){
  const x=cv.getContext('2d');let W,H,P=[];
  const rs=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight;P=Array.from({length:Math.min(90,Math.floor(W*H/18000))},()=>({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.3,vy:(Math.random()-.5)*.3}))};
  rs();addEventListener('resize',rs);
  (function f(){x.clearRect(0,0,W,H);
    for(const p of P){p.x+=p.vx;p.y+=p.vy;if(p.x<0||p.x>W)p.vx*=-1;if(p.y<0||p.y>H)p.vy*=-1;
      x.fillStyle='rgba(140,160,255,.55)';x.fillRect(p.x,p.y,1.6,1.6)}
    for(let i=0;i<P.length;i++)for(let j=i+1;j<P.length;j++){const d=Math.hypot(P[i].x-P[j].x,P[i].y-P[j].y);
      if(d<130){x.strokeStyle=`rgba(108,140,255,${.14*(1-d/130)})`;x.beginPath();x.moveTo(P[i].x,P[i].y);x.lineTo(P[j].x,P[j].y);x.stroke()}}
    requestAnimationFrame(f)})();
}

// yasal sayfalarda dil değiştirme
document.querySelectorAll('.langs button').forEach(b=>b.addEventListener('click',()=>{
  document.querySelectorAll('.langs button').forEach(x=>x.classList.toggle('on',x===b));
  document.querySelectorAll('[data-l]').forEach(s=>s.classList.toggle('show',s.dataset.l===b.dataset.l));
}));
