/* MelOS v3 · Main JS */
'use strict';
const isMobile = window.innerWidth < 768 || ('ontouchstart' in window && window.innerWidth < 1024);

const MEL_CONTEXT = `
You are an AI assistant that is part of a project Mel developed to learn about APIs and NLP/LLMs. Answer questions about Mel Lim Xin Yi based on the following information. Be helpful and concise. Never make up information not listed here.

NAME: Mel Lim Xin Yi
ROLE: Applied AI student, AI/ML Engineer, Full-Stack Developer
LOCATION: Singapore
EMAIL: mellelimxinyi@gmail.com
LINKEDIN: linkedin.com/in/mlemxy
GITHUB: github.com/mlemxy
PORTFOLIO: mlemxy.github.io/portfolio

EDUCATION:
- BSc (Hons) Applied Artificial Intelligence, Singapore Institute of Technology (Oct 2024 to present)
- BSc Computer Science (Hons), University of London, GPA 3.68/4.0 (Oct 2023 to Oct 2024). Directed team at SIM-UOL Hackathon 2023 delivering a sustainable sportswear e-commerce site. Vice President of Japanese Cultural and Gaming Society (JCGS) — managed partnerships, organised events, produced proposals.
- Diploma in Business and Financial Technology, Nanyang Polytechnic (May 2019 to May 2022). Finalist at PolyFintech100 API Hackathon 2021, Green Finance category.

EXPERIENCE:
- GenAI Intern at National Library Board (Jun 2026 to Dec 2026), Finance Procurement and Administration, hybrid
- Business Development Officer at SIM (Dec 2023 to Jun 2024): Python automation reducing voucher emails from 100min to under 1min (99% reduction), led employer outreach, authored CareerSense improvement reports, directed UAT
- IT Automation and Operations at Grab Holdings (Jul 2022 to Jul 2023): MCA and SupplyPay fintech platforms generating USD 1M+ revenue, 66% loan uplift, Singpass API KYC, up to 90% manual task reduction
- Tax Intern at EY Corporate Advisors (Sep 2021 to Nov 2021): automated template processing, Power Query data transformation

PROJECTS (12 total):
1. MelOS Portfolio: macOS-style interactive desktop OS portfolio built in vanilla HTML, CSS, and JavaScript. Features face-api.js ML login screen with 68-point landmark detection, animated Canvas 2D cafe wallpaper, live AI chatbot via Groq API proxied through Cloudflare Worker, draggable windows, interactive terminal, music player. Live at mlemxy.github.io/portfolio.
2. Merchant Cash Advance (Grab): full-stack fintech loan platform. USD 1M+, 66% loan uplift, Singpass OAuth 2.0 instant KYC. Role: developer, UX designer, UAT tester. Stack: Deluge, Singpass API, Figma.
3. SupplyPay (Grab): centralized portal automating Grab-supplier-merchant transactions. Led 95% of development. Stack: Deluge, full-stack.
4. ASL Letter Recognition: 90.38% accuracy on 10 ASL letters. MediaPipe 21 landmarks (63-dim) into PyTorch MLP (256-128-64, ReLU, dropout). 87K+ images + 250 custom webcam samples. Deployed via Flask. Submitted for AAI3001.
5. Customer Churn Prediction: XGBoost + SMOTE-ENN + SHAP. 81.28% recall, 62.94% F1, 0.8263 AUC. Contract type strongest driver (SHAP 0.7143). Extending to real-time edge deployment on POS terminals. Submitted for AAI2002.
6. Apple Quality Classification: multi-modal ML. Tabular: XGBoost/LR/RF soft-voting ensemble. Image: custom CNN then ResNet50 transfer learning. Submitted for INF2008.
7. PeaceSign: speech to ASL web app. Microsoft Code; Without Barriers Grand Finalist. Azure Speech SDK, audio and video input. Stack: Python, Flask, Azure.
8. Suicide Rates Analysis: EDA and NLP study on Singapore suicide determinants and SOS interventions 2016-2021. 5 datasets, unemployment highly correlated with risk. Submitted for CM2015. Stack: Python, Pandas, NLTK, PRAW.
9. SIM Email Automation: voucher email distribution reduced from 100min to under 1min (99% reduction), 100 students per batch. Stack: Python, Pandas.
10. Locky IoT System: 9-month FYP. Android smart locker, Google Sign-In (Firebase Auth), IoT sensor sync (Firebase Realtime DB), push notifications (FCM), Solidity BookingContract.sol on Ethereum for immutable booking records. Stack: Java, Android Studio, Firebase, Solidity.
11. OrangeBot: NLP-powered Discord bot, SQLite persistence, multi-server deployment. Stack: Python, Discord.py.
12. Archivist: Chrome extension (Manifest V3) to bookmark and track AO3 fanfiction. macOS-style desktop dashboard with draggable glassmorphic windows, dock, and menubar. Local-first via IndexedDB, real-time cross-device sync via Firebase Firestore and Auth. AO3 reading history scraper with smart caching and rate limiting. 9 Chart.js reading stat visualisations. Chapter update checker firing every 12h via chrome.alarms. Open source on GitHub. Plans to add ML reading recommendations. Stack: Vanilla JS, Chrome MV3, IndexedDB, Firebase, Chart.js, esbuild.

SKILLS:
- AI/ML/NLP: PyTorch, TensorFlow, XGBoost, MediaPipe, scikit-learn, SHAP, NLTK, LLMs, Transformers, RAG, Prompt Engineering, HuggingFace
- Languages: Python, JavaScript, SQL, C#, Java, PHP, HTML/CSS, Solidity
- Frameworks: Flask, .NET, Discord.py, Android Studio, Chrome Extension (MV3)
- Cloud/Tools: Microsoft Azure, Firebase, REST APIs, Zoho/Deluge, Figma, Pandas, OpenCV

INTERESTS: Research, Reading Novels, Cats
FOCUSTOWN ID: melballs (add her to study together)
`;// ══ BOOT ═════════════════════════════════════════════════
window.addEventListener('DOMContentLoaded', () => {
  if (isMobile) {
    document.getElementById('mobile-view').classList.remove('hidden');
    document.getElementById('face-screen').classList.add('hidden');
    drawMobileBg();
    initMobileTime();
    buildMobileProjects();
  } else {
    initFaceScreen();
  }
});

function initFaceScreen() {


  const status = document.getElementById('face-status');
  const camWrap = document.getElementById('face-cam-wrap');

  status.textContent = 'Loading ML model...';

  const script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/face-api.js@0.22.2/dist/face-api.min.js';
  script.onload = async () => {
    try {
      status.textContent = 'Loading face detection model...';
      await faceapi.nets.tinyFaceDetector.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model');
      await faceapi.nets.faceLandmark68TinyNet.loadFromUri('https://cdn.jsdelivr.net/npm/@vladmandic/face-api@1.7.12/model');
      status.textContent = 'Model loaded. Starting camera...';
      startCamera();
    } catch (e) {
      status.textContent = 'ML model unavailable. Click skip to enter.';
      camWrap.style.display = 'none';
    }
  };
  script.onerror = () => {
    status.textContent = 'Offline mode. Click skip to enter MelOS.';
    camWrap.style.display = 'none';
  };
  document.head.appendChild(script);

  document.getElementById('face-skip').addEventListener('click', enterDesktop);
}

async function startCamera() {
  const video = document.getElementById('face-video');
  const overlay = document.getElementById('face-overlay');
  const status = document.getElementById('face-status');
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'user' } });
    activeCamStream = stream;
    video.srcObject = stream;
    video.onloadedmetadata = () => {
      overlay.width = video.videoWidth;
      overlay.height = video.videoHeight;
      status.textContent = 'Face detected! Neural landmarks active.';
      runFaceDetection(video, overlay, status);
    };
  } catch (e) {
    status.textContent = 'Camera access denied. Click skip to enter.';
    document.getElementById('face-cam-wrap').style.display = 'none';
  }
}

let faceLoopId;
let activeCamStream = null;
async function runFaceDetection(video, overlay, status) {
  const ctx = overlay.getContext('2d');
  let detected = false;
  let enterTimer;

  async function detect() {
    if (!document.getElementById('face-screen') || document.getElementById('face-screen').classList.contains('hidden')) return;
    try {
      const result = await faceapi
        .detectSingleFace(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks(true);

      ctx.clearRect(0, 0, overlay.width, overlay.height);

      if (result) {
        if (!detected) {
          detected = true;
          status.textContent = 'Face detected! Scanning landmarks... entering in 2s';
          enterTimer = setTimeout(enterDesktop, 2000);
        }
        const lm = result.landmarks.positions;
        lm.forEach((pt, i) => {
          ctx.beginPath();
          ctx.arc(pt.x, pt.y, 2.5, 0, Math.PI * 2);
          ctx.fillStyle = i % 3 === 0 ? 'rgba(232,180,192,0.9)' : i % 3 === 1 ? 'rgba(150,152,224,0.9)' : 'rgba(255,255,255,0.7)';
          ctx.fill();
        });
        const box = result.detection.box;
        ctx.strokeStyle = 'rgba(232,180,192,0.6)';
        ctx.lineWidth = 1.5;
        ctx.setLineDash([5, 4]);
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        ctx.setLineDash([]);
        const cs = 14;
        ctx.strokeStyle = '#E8B4C0';
        ctx.lineWidth = 2.5;
        [[box.x,box.y],[box.x+box.width,box.y],[box.x,box.y+box.height],[box.x+box.width,box.y+box.height]].forEach(([cx,cy],i) => {
          ctx.beginPath();
          ctx.moveTo(cx+(i%2===0?0:cs*(i%2===0?1:-1)), cy);
          ctx.lineTo(cx+(i%2===0?cs:-cs), cy);
          ctx.moveTo(cx, cy+(i<2?cs:-cs));
          ctx.lineTo(cx, cy+(i<2?0:cs));
          ctx.stroke();
        });
      } else {
        if (detected) { detected = false; clearTimeout(enterTimer); status.textContent = 'Hold still for face scan...'; }
        else { status.textContent = 'Position your face in the camera...'; }
      }
    } catch (e) {}
    faceLoopId = requestAnimationFrame(detect);
  }
  detect();
}

function enterDesktop() {
  if (faceLoopId) cancelAnimationFrame(faceLoopId);
  if (activeCamStream) { activeCamStream.getTracks().forEach(t => t.stop()); activeCamStream = null; }
  const video = document.getElementById('face-video');
  if (video && video.srcObject) { video.srcObject.getTracks().forEach(t => t.stop()); video.srcObject = null; }
  const face = document.getElementById('face-screen');
  face.style.opacity = '0';
  face.style.transition = 'opacity 0.8s';
  setTimeout(() => {
    face.classList.add('hidden');
    document.getElementById('desktop').classList.remove('hidden');
    drawCafeBg(document.getElementById('wallpaper'));
    initMenubarClock();
    buildProjects();
    initClickCats();
    initStarCanvas();
    startVirusTimer();
    setTimeout(() => openWindow('about'), 300);
  }, 800);
}

function drawCafeBg(canvas) {
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, T = 0;
  const SC = ['#B8D4FF','#F4C2D0','#D4C2F4','#C8E0FF','#F8D0DC','#E0D0F8'];
  const SPARKS = Array.from({length:55},(_,i)=>({
    x:Math.random(), y:Math.random(),
    sz:2+Math.random()*5,
    col:SC[i%SC.length],
    ph:Math.random()*Math.PI*2,
    ts:0.04+Math.random()*0.06,
    type:i%3,
    drift:(Math.random()-.5)*0.0003,
    rise:0.00015+Math.random()*0.0002,
  }));
  const STEAMS=[];
  const LIGHTS=Array.from({length:10},(_,i)=>i*0.7+Math.random());

  function resize(){
    W=canvas.width=canvas.offsetWidth||window.innerWidth;
    H=canvas.height=canvas.offsetHeight||window.innerHeight;
  }
  resize(); window.addEventListener('resize',resize);

  function rr(x,y,w,h,r){ctx.beginPath();ctx.roundRect(x,y,w,h,r);ctx.fill();}

  function bg(){
    const g=ctx.createLinearGradient(0,0,W,H);
    g.addColorStop(0,'#FEF0F5');g.addColorStop(.5,'#F8E8F0');g.addColorStop(1,'#EFE4F8');
    ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    [[.2,.3,200,'rgba(232,180,192,.18)'],[.8,.65,180,'rgba(196,181,253,.15)'],[.5,.12,140,'rgba(255,183,197,.13)']].forEach(([rx,ry,r,c])=>{
      const g2=ctx.createRadialGradient(W*rx,H*ry,0,W*rx,H*ry,r);
      g2.addColorStop(0,c);g2.addColorStop(1,'transparent');
      ctx.fillStyle=g2;ctx.fillRect(0,0,W,H);
    });
  }

  function lights(){
    const n=10;
    ctx.beginPath();ctx.strokeStyle='rgba(196,160,180,.45)';ctx.lineWidth=1.2;
    ctx.moveTo(0,H*.09);
    for(let i=0;i<=n;i++){const x=(W/n)*i,sg=H*.035*Math.sin((i/n)*Math.PI);ctx.lineTo(x,H*.09+sg);}
    ctx.stroke();
    for(let i=0;i<n;i++){
      const x=(W/n)*i+W/(n*2),sg=H*.035*Math.sin((i/n+.5/n)*Math.PI),y=H*.1+sg;
      const flk=.7+.3*Math.sin(T*2.5+LIGHTS[i]);
      const col=SC[i%SC.length];
      const gg=ctx.createRadialGradient(x,y,0,x,y,18);
      gg.addColorStop(0,col+'44');gg.addColorStop(1,'transparent');
      ctx.fillStyle=gg;ctx.fillRect(x-18,y-18,36,36);
      ctx.save();ctx.globalAlpha=flk;ctx.fillStyle=col;
      ctx.beginPath();ctx.ellipse(x,y,5,7,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(196,160,180,.6)';ctx.fillRect(x-3,y-11,6,4);
      ctx.restore();
    }
  }

  function window_(){
    const wx=W*.34,wy=H*.11,ww=W*.32,wh=H*.36;
    const sky=ctx.createLinearGradient(wx,wy,wx,wy+wh);
    sky.addColorStop(0,'#D6EEFF');sky.addColorStop(1,'#F8E8F0');
    ctx.fillStyle=sky;ctx.beginPath();ctx.roundRect(wx,wy,ww,wh,4);ctx.fill();
    // Clouds drift gently left to right at different speeds
    [[.12,.2,28,13,.58,0.08],[.50,.14,22,11,.52,0.05],[.74,.22,18,10,.48,0.11]].forEach(([fx,fy,rx,ry,a,spd],i)=>{
      const rawX = ((T*spd + fx) % 1.25) - 0.1;
      const cx=wx+rawX*ww,cy=wy+fy*wh;
      ctx.save();ctx.globalAlpha=a;ctx.fillStyle='#fff';
      ctx.beginPath();ctx.ellipse(cx,cy,rx,ry,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cx+rx*.5,cy-4,rx*.7,ry*.8,0,0,Math.PI*2);ctx.fill();
      ctx.beginPath();ctx.ellipse(cx-rx*.4,cy-2,rx*.6,ry*.7,0,0,Math.PI*2);ctx.fill();
      ctx.restore();
    });
    const sp=.65+.08*Math.sin(T*.5);
    const sunX = wx+ww*.82 + Math.sin(T*.2)*ww*.02;
    const sunY = wy+wh*.18 + Math.sin(T*.3)*wh*.01;
    ctx.save();ctx.globalAlpha=sp;ctx.fillStyle='#FFE87A';
    ctx.beginPath();ctx.arc(sunX,sunY,15,0,Math.PI*2);ctx.fill();
    ctx.globalAlpha=sp*.65;ctx.fillStyle='#FFD700';
    ctx.beginPath();ctx.arc(sunX,sunY,10,0,Math.PI*2);ctx.fill();
    ctx.restore();
    ctx.strokeStyle='#C4A0B4';ctx.lineWidth=5;
    ctx.beginPath();ctx.roundRect(wx,wy,ww,wh,4);ctx.stroke();
    ctx.lineWidth=3;
    ctx.beginPath();ctx.moveTo(wx+ww/2,wy);ctx.lineTo(wx+ww/2,wy+wh);ctx.stroke();
    ctx.beginPath();ctx.moveTo(wx,wy+wh/2);ctx.lineTo(wx+ww,wy+wh/2);ctx.stroke();
  }

  function counter(){
    ctx.fillStyle='#F2D5E0';ctx.fillRect(0,H*.82,W,H*.18);
    ctx.fillStyle='#E8B4C0';ctx.fillRect(0,H*.82,W,5);
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.fillRect(0,H*.82+5,W,2);
  }

  function cake(){
    const cx=W*.27,cy=H*.56;
    ctx.save();ctx.globalAlpha=.55;ctx.fillStyle='#F5D5E0';
    ctx.beginPath();ctx.ellipse(cx,cy+100,66,12,0,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.fillStyle='#E8B4C0';rr(cx-52,cy+62,104,38,9);
    ctx.fillStyle='rgba(245,213,224,.5)';rr(cx-52,cy+62,104,12,5);
    ctx.fillStyle='#FFF8FA';rr(cx-55,cy+57,110,8,4);
    ctx.fillStyle='#C4B5FD';rr(cx-42,cy+27,84,32,8);
    ctx.fillStyle='rgba(224,216,252,.55)';rr(cx-42,cy+27,84,11,5);
    ctx.fillStyle='#FFF8FA';rr(cx-45,cy+21,90,9,4);
    ctx.fillStyle='#FFB7C5';rr(cx-30,cy-4,60,27,7);
    ctx.fillStyle='#FFF8FA';
    ctx.beginPath();ctx.moveTo(cx-30,cy-4);
    ctx.bezierCurveTo(cx-16,cy-18,cx-6,cy-10,cx,cy-6);
    ctx.bezierCurveTo(cx+6,cy-10,cx+16,cy-18,cx+30,cy-4);ctx.fill();
    ctx.beginPath();ctx.ellipse(cx,cy-8,11,7,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#C0392B';ctx.beginPath();ctx.ellipse(cx,cy-20,9,11,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#2D7A3A';ctx.lineWidth=2;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(cx-2,cy-30);ctx.quadraticCurveTo(cx,cy-35,cx+2,cy-30);ctx.stroke();
    ctx.fillStyle='#FFE87A';ctx.fillRect(cx-2,cy-30,4,11);
    const ff=.7+.3*Math.sin(T*8);
    ctx.save();ctx.globalAlpha=ff;ctx.fillStyle='#FFD700';
    ctx.beginPath();ctx.ellipse(cx,cy-31,4,5,0,0,Math.PI*2);ctx.fill();ctx.restore();
  }

  function parfait(){
    const px=W*.72,py=H*.6;
    ctx.save();
    ctx.fillStyle='rgba(255,240,245,.42)';ctx.strokeStyle='#E8B4C0';ctx.lineWidth=1.5;
    ctx.beginPath();
    ctx.moveTo(px-33,py+92);ctx.lineTo(px-39,py+18);
    ctx.quadraticCurveTo(px-39,py+4,px-21,py+4);
    ctx.lineTo(px+21,py+4);ctx.quadraticCurveTo(px+39,py+4,px+39,py+18);
    ctx.lineTo(px+33,py+92);ctx.closePath();
    ctx.fill();ctx.stroke();
    [[py+70,20,'#FFF8FA',.88],[py+52,20,'#E8B4C0',.7],[py+34,20,'#FFF8FA',.82],[py+17,19,'#C4B5FD',.66]].forEach(([y,h,c,a])=>{
      ctx.globalAlpha=a;ctx.fillStyle=c;ctx.fillRect(px-31,y,62,h);
    });
    ctx.globalAlpha=1;
    ctx.fillStyle='#FFF8FA';
    ctx.beginPath();ctx.ellipse(px,py+4,21,9,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(px,py-4,15,8,0,0,Math.PI*2);ctx.fill();
    ctx.beginPath();ctx.ellipse(px,py-11,10,7,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#C0392B';ctx.beginPath();ctx.ellipse(px,py-21,8,9,0,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#2D7A3A';ctx.lineWidth=1.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(px-1,py-29);ctx.quadraticCurveTo(px,py-33,px+1,py-29);ctx.stroke();
    ctx.save();ctx.translate(px+14,py-2);ctx.rotate(.32);
    ctx.fillStyle='#F0E68C';ctx.beginPath();ctx.roundRect(-2.5,-14,5,28,2);ctx.fill();ctx.restore();
    ctx.restore();
  }

  function mug(){
    const mx=W*.5,my=H*.79;
    ctx.fillStyle='rgba(232,180,192,.48)';ctx.beginPath();ctx.ellipse(mx,my+56,40,8,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(242,208,220,.65)';ctx.beginPath();ctx.ellipse(mx,my+56,32,5,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#FFF0F5';rr(mx-30,my+10,60,45,11);
    ctx.strokeStyle='#E8B4C0';ctx.lineWidth=1.5;ctx.beginPath();ctx.roundRect(mx-30,my+10,60,45,11);ctx.stroke();
    ctx.fillStyle='rgba(196,114,138,.65)';ctx.beginPath();ctx.ellipse(mx,my+14,25,7,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='rgba(255,248,250,.6)';
    ctx.beginPath();ctx.moveTo(mx,my+13);
    ctx.bezierCurveTo(mx,my+7,mx-9,my+7,mx-9,my+13);
    ctx.bezierCurveTo(mx-9,my+19,mx,my+23,mx,my+23);
    ctx.bezierCurveTo(mx,my+23,mx+9,my+19,mx+9,my+13);
    ctx.bezierCurveTo(mx+9,my+7,mx,my+7,mx,my+13);ctx.fill();
    ctx.strokeStyle='#E8B4C0';ctx.lineWidth=5;ctx.lineCap='round';
    ctx.beginPath();ctx.arc(mx+36,my+34,14,-Math.PI*.55,Math.PI*.55);ctx.stroke();
    if(Math.random()<.06) STEAMS.push({x:mx+(Math.random()-.5)*12,y:my+10,a:.65,sz:3+Math.random()*3,vx:(Math.random()-.5)*.35,vy:-.5-Math.random()*.3,spd:.005+Math.random()*.008});
    for(let i=STEAMS.length-1;i>=0;i--){
      const s=STEAMS[i];s.x+=s.vx;s.y+=s.vy;s.a-=s.spd;s.sz*=1.012;
      if(s.a<=0){STEAMS.splice(i,1);continue;}
      ctx.save();ctx.globalAlpha=s.a*.45;ctx.fillStyle='rgba(212,176,192,.8)';
      ctx.beginPath();ctx.arc(s.x,s.y,s.sz,0,Math.PI*2);ctx.fill();ctx.restore();
    }
  }

  function cupcake(){
    const kx=W*.12,ky=H*.78;
    ctx.fillStyle='#E8B4C0';
    ctx.beginPath();ctx.moveTo(kx-27,ky+42);ctx.lineTo(kx-32,ky+10);ctx.lineTo(kx+32,ky+10);ctx.lineTo(kx+27,ky+42);ctx.closePath();ctx.fill();
    ctx.fillStyle='rgba(196,114,138,.38)';ctx.fillRect(kx-32,ky+10,64,8);
    ctx.fillStyle='#FFF0F5';rr(kx-28,ky-1,56,14,4);
    ctx.fillStyle='#C4B5FD';ctx.beginPath();ctx.ellipse(kx,ky-2,23,11,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#D8D0FC';ctx.beginPath();ctx.ellipse(kx,ky-11,16,9,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#E8E4FC';ctx.beginPath();ctx.ellipse(kx,ky-18,10,7,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#F4F2FE';ctx.beginPath();ctx.ellipse(kx,ky-24,6,5,0,0,Math.PI*2);ctx.fill();
    ctx.fillStyle='#C0392B';ctx.beginPath();ctx.arc(kx,ky-29,5,0,Math.PI*2);ctx.fill();
    ctx.strokeStyle='#2D7A3A';ctx.lineWidth=1.5;ctx.lineCap='round';
    ctx.beginPath();ctx.moveTo(kx,ky-34);ctx.quadraticCurveTo(kx+4,ky-38,kx+7,ky-34);ctx.stroke();
  }

  function macarons(){
    const rx=W*.88,ry=H*.79;
    [['#C4728A','#E8B4C0'],['#9698E0','#C4B5FD'],['#F08080','#FFB7C5']].forEach(([bot,top],i)=>{
      const y=ry+46-i*17;
      ctx.fillStyle=bot;ctx.beginPath();ctx.ellipse(rx,y+8,27,8,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle=bot;ctx.fillRect(rx-27,y-5,54,13);
      ctx.fillStyle=top;ctx.beginPath();ctx.ellipse(rx,y-5,27,8,0,0,Math.PI*2);ctx.fill();
      ctx.fillStyle='rgba(255,248,250,.82)';rr(rx-23,y-8,46,6,2);
    });
  }

  function cakeSlice(){
    const sx=W*.2,sy=H*.79;
    ctx.save();ctx.globalAlpha=.4;ctx.fillStyle='#F5D5E0';
    ctx.beginPath();ctx.ellipse(sx,sy+56,28,6,0,0,Math.PI*2);ctx.fill();ctx.restore();
    ctx.fillStyle='#E8B4C0';
    ctx.beginPath();ctx.moveTo(sx-20,sy+52);ctx.lineTo(sx,sy-4);ctx.lineTo(sx+20,sy+52);ctx.closePath();ctx.fill();
    [[sy+36],[sy+20]].forEach(([y])=>{ctx.strokeStyle='rgba(255,248,250,.62)';ctx.lineWidth=3;ctx.beginPath();ctx.moveTo(sx-(sy+52-y)*.42,y);ctx.lineTo(sx+(sy+52-y)*.42,y);ctx.stroke();});
    ctx.fillStyle='#FFF8FA';ctx.beginPath();ctx.moveTo(sx-3,sy-4);ctx.quadraticCurveTo(sx,sy-13,sx+3,sy-4);ctx.fill();
    ctx.fillStyle='#C0392B';ctx.beginPath();ctx.arc(sx,sy-14,5,0,Math.PI*2);ctx.fill();
  }

  function star5(x,y,r,col,a){
    ctx.save();ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();
    for(let i=0;i<5;i++){
      const ang=Math.PI/180*(72*i-90),bang=Math.PI/180*(72*i-90+36);
      i===0?ctx.moveTo(x+r*Math.cos(ang),y+r*Math.sin(ang)):ctx.lineTo(x+r*Math.cos(ang),y+r*Math.sin(ang));
      ctx.lineTo(x+r*.42*Math.cos(bang),y+r*.42*Math.sin(bang));
    }
    ctx.closePath();ctx.fill();ctx.restore();
  }

  function heartSpark(x,y,sz,col,a){
    ctx.save();ctx.globalAlpha=a;ctx.fillStyle=col;ctx.beginPath();
    ctx.moveTo(x,y+sz*.3);
    ctx.bezierCurveTo(x,y-sz*.35,x-sz,y-sz*.35,x-sz,y+sz*.1);
    ctx.bezierCurveTo(x-sz,y+sz*.55,x,y+sz*.85,x,y+sz*.85);
    ctx.bezierCurveTo(x,y+sz*.85,x+sz,y+sz*.55,x+sz,y+sz*.1);
    ctx.bezierCurveTo(x+sz,y-sz*.35,x,y-sz*.35,x,y+sz*.3);
    ctx.closePath();ctx.fill();ctx.restore();
  }

  function sparkles(){
    SPARKS.forEach(s=>{
      s.ph+=s.ts; s.y-=s.rise; s.x+=s.drift;
      if(s.y<-.02){s.y=1.05;s.x=Math.random();}
      if(s.x<-.02||s.x>1.02) s.x=Math.random();
      const a=.35+.65*Math.abs(Math.sin(s.ph));
      const px=s.x*W,py=s.y*H,sz=s.sz*(.7+.4*Math.abs(Math.sin(s.ph)));
      if(s.type===0){
        const gg=ctx.createRadialGradient(px,py,0,px,py,sz*2.5);
        gg.addColorStop(0,s.col+'AA');gg.addColorStop(1,'transparent');
        ctx.fillStyle=gg;ctx.beginPath();ctx.arc(px,py,sz*2.5,0,Math.PI*2);ctx.fill();
        ctx.save();ctx.globalAlpha=a;ctx.fillStyle=s.col;
        ctx.beginPath();ctx.arc(px,py,sz,0,Math.PI*2);ctx.fill();ctx.restore();
      } else if(s.type===1){
        star5(px,py,sz*1.4,s.col,a*.9);
        ctx.save();ctx.globalAlpha=a*.45;ctx.strokeStyle=s.col;ctx.lineWidth=.8;
        ctx.beginPath();ctx.moveTo(px-sz*2,py);ctx.lineTo(px+sz*2,py);
        ctx.moveTo(px,py-sz*2);ctx.lineTo(px,py+sz*2);ctx.stroke();ctx.restore();
      } else {
        heartSpark(px,py,sz*.5,s.col,a*.8);
      }
    });
  }

  (function frame(){
    T+=0.016;
    bg(); lights(); window_(); counter();
    cakeSlice(); cupcake(); cake(); mug(); parfait(); macarons();
    sparkles();
    requestAnimationFrame(frame);
  })();
}

function drawMobileBg() {
  const canvas = document.getElementById('mobile-canvas');
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const ctx = canvas.getContext('2d');
  const g = ctx.createLinearGradient(0,0,0,canvas.height);
  g.addColorStop(0,'#FEF0F5'); g.addColorStop(1,'#EFE4F8');
  ctx.fillStyle=g; ctx.fillRect(0,0,canvas.width,canvas.height);
  for(let i=0;i<60;i++){
    ctx.beginPath();
    ctx.arc(Math.random()*canvas.width,Math.random()*canvas.height,Math.random()*2,0,Math.PI*2);
    ctx.fillStyle=`rgba(232,180,192,${0.25+Math.random()*0.45})`; ctx.fill();
  }
}


function initMenubarClock() {
  function tick() {
    const now = new Date();
    const el = document.getElementById('menubar-time');
    if (el) el.textContent = now.toLocaleDateString('en-SG',{weekday:'short',month:'short',day:'numeric'})+'  '+now.toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit'});
  }
  tick(); setInterval(tick,30000);
}
function initMobileTime() {
  function tick() { const el=document.getElementById('mobile-time'); if(el) el.textContent=new Date().toLocaleTimeString('en-SG',{hour:'2-digit',minute:'2-digit'}); }
  tick(); setInterval(tick,30000);
}

let zTop = 300;
const winState = {};

function openWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.style.display = 'flex';
  if (winState[id]) winState[id].minimized = false;
  focusWindow(id);
  const chip = document.getElementById('min-chip-' + id);
  if (chip) chip.remove();
  markDockOpen(id);
  if (id === 'terminal') setTimeout(initTerminal, 80);
}

function closeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (win) win.style.display = 'none';
  const chip = document.getElementById('min-chip-' + id);
  if (chip) chip.remove();
  unmarkDockOpen(id);
}

function minimizeWindow(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  win.style.display = 'none';
  if (!winState[id]) winState[id] = {};
  winState[id].minimized = true;
  if (!document.getElementById('min-chip-'+id)) {
    const chip = document.createElement('div');
    chip.className = 'min-chip';
    chip.id = 'min-chip-' + id;
    chip.textContent = {about:'🐾 About',projects:'📂 Projects',chat:'🤖 Chat',terminal:'🖤 Terminal',resume:'📋 Resume',contact:'💌 Contact',extras:'🍓 Extras','proj-detail':'📌 Project'}[id]||id;
    chip.addEventListener('click', () => openWindow(id));
    document.getElementById('minimized-bar').appendChild(chip);
  }
}

function toggleMax(id) {
  const win = document.getElementById('win-' + id);
  if (!win) return;
  if (!winState[id]) winState[id] = {};
  if (win.classList.contains('maximized')) {
    win.classList.remove('maximized');
    const s = winState[id].prevStyle;
    if (s) { win.style.top=s.top; win.style.left=s.left; win.style.width=s.width; win.style.height=s.height||''; }
  } else {
    winState[id].prevStyle = {top:win.style.top,left:win.style.left,width:win.style.width,height:win.style.height};
    win.classList.add('maximized');
  }
  focusWindow(id);
}

function focusWindow(id) {
  document.querySelectorAll('.window').forEach(w => w.classList.remove('focused'));
  const win = document.getElementById('win-' + id);
  if (win) { win.classList.add('focused'); win.style.zIndex = ++zTop; }
}

document.addEventListener('mousedown', e => {
  const win = e.target.closest('.window');
  if (win) focusWindow(win.id.replace('win-',''));
});

function markDockOpen(id) {
  const map={about:0,projects:1,chat:2,terminal:3,resume:4,contact:5,extras:6};
  const items=document.querySelectorAll('.dock > .dock-item');
  if(map[id]!==undefined&&items[map[id]]) items[map[id]].classList.add('open-dot');
}
function unmarkDockOpen(id) {
  const map={about:0,projects:1,chat:2,terminal:3,resume:4,contact:5,extras:6};
  const items=document.querySelectorAll('.dock > .dock-item');
  if(map[id]!==undefined&&items[map[id]]) items[map[id]].classList.remove('open-dot');
}

let drag = null;

function startDrag(e, id) {
  if (e.target.closest('.traffic,.finder-tabs,.ftab')) return;
  const win = document.getElementById('win-' + id);
  if (!win || win.classList.contains('maximized')) return;
  focusWindow(id);
  const rect = win.getBoundingClientRect();
  drag = { win, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
  e.preventDefault();
}

document.addEventListener('mousemove', e => {
  if (!drag) return;
  const x = Math.max(0, Math.min(window.innerWidth - 100, e.clientX - drag.ox));
  const y = Math.max(28, Math.min(window.innerHeight - 60, e.clientY - drag.oy));
  drag.win.style.left = x + 'px';
  drag.win.style.top  = y + 'px';
});

document.addEventListener('mouseup', () => { drag = null; });

function initClickCats() {
  document.getElementById('desktop').addEventListener('click', e => {
    if (e.target.closest('.window,.dock,.desktop-icons,.minimized-bar,.avatar-widget')) return;
    spawnCat(e.clientX, e.clientY);
  });
}
function spawnCat(x, y) {
  const el = document.createElement('div');
  el.className = 'click-cat';
  const img = document.createElement('img');
  img.src = 'assets/img/avatar.png';
  img.style.cssText = 'width:48px;height:48px;border-radius:50%;object-fit:cover;border:2px solid rgba(232,180,192,0.8);box-shadow:0 2px 12px rgba(232,180,192,0.5);display:block;';
  el.appendChild(img);
  el.style.left = (x - 24) + 'px';
  el.style.top  = (y - 24) + 'px';
  document.getElementById('click-cats').appendChild(el);
  setTimeout(() => el.remove(), 950);
}

const chatHistory = [];
let chatBusy = false;
let lastChatTime = 0;
const CHAT_COOLDOWN = 2000;

async function sendChat() {
  const input = document.getElementById('chat-input');
  const msg = input.value.trim();
  if (!msg || chatBusy) return;

  const now = Date.now();
  if (now - lastChatTime < CHAT_COOLDOWN) {
    appendChatMsg('Please wait a moment before sending another message.', 'bot');
    return;
  }

  const WORKER = 'https://melos.imgayforbread.workers.dev';

  chatBusy = true;
  lastChatTime = now;
  input.value = '';
  appendChatMsg(msg, 'user');
  chatHistory.push({ role: 'user', content: msg });

  const typingId = 'typing-' + Date.now();
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg bot typing';
  typingEl.id = typingId;
  typingEl.innerHTML = '<span class="chat-bubble"><span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span></span>';
  document.getElementById('chat-messages').appendChild(typingEl);
  scrollChat();

  try {
    const res = await fetch(WORKER, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        max_tokens: 512,
        messages: [
          { role: 'system', content: MEL_CONTEXT },
          ...chatHistory,
        ],
      })
    });
    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content
      || data.error?.message
      || "Hmm, couldn't get a response. Try again!";
    document.getElementById(typingId)?.remove();
    appendChatMsg(reply, 'bot');
    chatHistory.push({ role: 'assistant', content: reply });
    if (chatHistory.length > 20) chatHistory.splice(0, 2); // ponytail: naive FIFO trim, fine for a portfolio chatbot
  } catch (e) {
    document.getElementById(typingId)?.remove();
    appendChatMsg("Couldn't reach the chatbot right now. You can reach Mel directly at mellelimxinyi@gmail.com 📧", 'bot');
  }
  chatBusy = false;
}

function appendChatMsg(text, role) {
  const msgs = document.getElementById('chat-messages');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  div.innerHTML = `<span class="chat-bubble">${text.replace(/\n/g,'<br>')}</span>`;
  msgs.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById('chat-messages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

let termReady = false, termHistory = [], termHistIdx = -1;

function initTerminal() {
  if (termReady) return;
  termReady = true;
  [
    {t:'bold',s:' __  __   _  ___  ___'},
    {t:'bold',s:'|  \\/  | | || _ \\/ __|'},
    {t:'bold',s:'| |\\/| |_| ||  _/\\__ \\'},
    {t:'bold',s:'|_|  |_\\___/|_|  |___/'},
    {t:'pink',s:' Mel Lim Xin Yi · AI/ML Engineer'},
    {t:'lav', s:' LLMs · NLP · Automation · Full-Stack'},
    {t:'dim', s:' Type `help` for commands · ↑↓ for history'},
    {t:'dim', s:''},
  ].forEach(b => appendTerm(b.s, b.t));
  document.getElementById('term-input').focus();
}

function appendTerm(text, cls='info') {
  const out = document.getElementById('term-output');
  if (!out) return;
  const div = document.createElement('div');
  div.className = 'term-row ' + cls;
  div.textContent = text;
  out.appendChild(div);
  const body = document.getElementById('term-body');
  if (body) body.scrollTop = body.scrollHeight;
}

function handleTermKey(e) {
  const input = document.getElementById('term-input');
  if (e.key === 'Enter') {
    const cmd = input.value.trim();
    input.value = '';
    if (cmd) { termHistory.unshift(cmd); termHistIdx = -1; }
    appendTerm('mel@melos ~ % ' + cmd, 'cmd-echo');
    runCommand(cmd.toLowerCase().trim());
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    if (termHistIdx < termHistory.length-1) termHistIdx++;
    input.value = termHistory[termHistIdx]||'';
  } else if (e.key === 'ArrowDown') {
    e.preventDefault();
    termHistIdx > 0 ? termHistIdx-- : (termHistIdx = -1);
    input.value = termHistory[termHistIdx]||'';
  }
}

function runCommand(cmd) {
  const parts = cmd.split(/\s+/);
  switch (parts[0]) {
    case '': break;
    case 'help':
      appendTerm('Commands:', 'warm');
      [['whoami','About Mel'],['ls','List files'],['cat resume','View resume'],['skills','Technical skills'],['interests','Hobbies and interests'],['projects','List all projects'],['focustown','Study together info'],['open <app>','Open: about/projects/chat/contact/resume/extras/terminal'],['clear','Clear terminal'],['date','Current date/time'],['uname','System info'],['neofetch','System overview'],['meow','...']].forEach(([c,d]) => appendTerm(`  ${c.padEnd(24)} ${d}`,'lav'));
      break;
    case 'whoami':
      appendTerm('mel · Mel Lim Xin Yi', 'ok');
      appendTerm('AI/ML Engineer and Full-Stack Developer', 'info');
      appendTerm('SIT Applied AI · Previously Grab Holdings (USD 1M+ revenue generated)', 'dim');
      break;
    case 'ls':
      ['About_Mel.app','Projects.app','Chat_with_Mel.app','Resume.pdf','Contact.app','Extras.app','Terminal.app'].forEach(f => appendTerm('  ' + f, 'ok'));
      break;
    case 'cat':
      if (parts[1]&&parts[1].includes('resume')) {
        [['EDUCATION','warm'],['  BSc (Hons) Applied AI · SIT (2024 to present)','ok'],['  BSc CS Hons 3.68 GPA · University of London (2023-24)','ok'],['  Dip Business and FinTech · NYP (2019-22)','ok'],['EXPERIENCE','warm'],['  GenAI Intern · NLB (Jun to Dec 2026)','ok'],['  Business Dev Officer · SIM · 99% process time reduction','ok'],['  IT Automation · Grab Holdings · USD 1M+ revenue','ok'],['  Tax Intern · EY Corporate Advisors','ok'],['SKILLS','warm'],['  Python · PyTorch · TensorFlow · LLMs · NLP · JS · SQL · Azure · Flask','info']].forEach(([t,c])=>appendTerm(t,c));
      } else { appendTerm('cat: '+(parts[1]||'<file>')+': No such file','err'); appendTerm('Try: cat resume','dim'); }
      break;
    case 'open':
      const apps = ['about','projects','chat','contact','resume','extras','terminal'];
      if (apps.includes(parts[1])) { openWindow(parts[1]); appendTerm('Opened ' + parts[1], 'ok'); }
      else { appendTerm('open: "'+( parts[1]||'')+'" not found','err'); appendTerm('Available: '+apps.join(', '),'dim'); }
      break;
    case 'skills':
      appendTerm('LLMs / NLP:   Transformers · RAG · Prompt Eng · HuggingFace · Fine-tuning', 'pink');
      appendTerm('ML / CV:      PyTorch · TensorFlow · XGBoost · MediaPipe · scikit-learn', 'warm');
      appendTerm('Automation:   Python · Zoho · API pipelines · workflow tools', 'lav');
      appendTerm('Languages:    Python · JavaScript · SQL · C# · Java · HTML/CSS', 'ok');
      appendTerm('Cloud/Tools:  Azure · Firebase · Flask · REST APIs · Figma', 'info');
      break;
    case 'interests':
      appendTerm('📹  Vlogging', 'warm');
      appendTerm('🎭  Cosplaying', 'lav');
      appendTerm('🎨  Painting (digital and traditional)', 'pink');
      appendTerm('🎵  Music', 'ok');
      appendTerm('📚  Studying and research', 'info');
      appendTerm('🐱  Cats', 'warm');
      appendTerm('🤖  Learning about LLMs and NLP', 'lav');
      break;
    case 'focustown':
      appendTerm('FocusTown ID: melballs', 'pink');
      appendTerm('Add me if you are into studying together!', 'warm');
      appendTerm('Life is a continuous journey of self-improvement. Always ready to lock in.', 'dim');
      break;
    case 'projects':
      appendTerm('Projects (' + PROJECTS.length + '):', 'warm');
      PROJECTS.forEach(p => appendTerm(`  ${p.emoji}  ${p.title.padEnd(32)} [${p.category}]`,'info'));
      appendTerm('Run `open projects` to browse with GUI', 'dim');
      break;
    case 'clear':
      document.getElementById('term-output').innerHTML=''; termReady=false; initTerminal(); break;
    case 'date': appendTerm(new Date().toLocaleString('en-SG'),'ok'); break;
    case 'uname': appendTerm('MelOS 3.0.0 strawberry-core arm64 2026','ok'); break;
    case 'neofetch':
      [['   /\\_/\\        mel@melos','pink'],['  ( >w< )       ─────────────────────','pink'],['  / ) ) )\\      OS: MelOS 3.0 Strawberry Edition','info'],['  |`-\"\\`-|      Shell: MelSH 3.0','info'],['              Focus: LLMs · NLP · Automation','info'],['              Stack: Python · PyTorch · Azure','info'],['              Projects: '+PROJECTS.length,'info'],['              FocusTown: melballs','lav'],['              Interests: vlogging cosplay painting music','warm'],['              Mood: locked in and caffeinated ☕','pink']].forEach(([t,c])=>appendTerm(t,c));
      break;
    case 'meow': appendTerm('meow meow meow 🐾', 'warm'); appendTerm('(acknowledged)', 'dim'); break;
    case 'sudo': appendTerm('Nice try. MelOS protects its files. 💅', 'err'); break;
    default: appendTerm('command not found: '+parts[0],'err'); appendTerm('Type `help` for commands','dim');
  }
}

function buildProjects() {
  const grid = document.getElementById('proj-grid');
  if (!grid || typeof PROJECTS === 'undefined') return;
  grid.innerHTML = PROJECTS.map(p => {
    const catLabel = {'ai-ml':'AI / LLMs / NLP',professional:'Professional','full-stack':'Full-Stack'}[p.category]||p.category;
    const imgHTML = p.image
      ? `<div class="proj-img-wrap"><img src="${p.image}" alt="${p.title}" onerror="this.parentElement.innerHTML='<span style=font-size:2rem>${p.emoji}</span>'"></div>`
      : `<div class="proj-img-wrap"><span style="font-size:2rem">${p.emoji}</span></div>`;
    return `<div class="proj-card" data-cat="${p.category}" onclick="openProjectDetail('${p.id}')">
      ${imgHTML}
      <div class="proj-info">
        <span class="proj-cat-badge">${catLabel}</span>
        <h3>${p.title}</h3>
        <p>${p.tagline}</p>
        <div class="proj-tags-row">${p.tags.slice(0,3).map(t=>`<span>${t}</span>`).join('')}</div>
      </div>
    </div>`;
  }).join('');
}

function filterProjects(cat, btn) {
  document.querySelectorAll('.ftab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.proj-card').forEach(c => {
    c.classList.toggle('hidden', cat !== 'all' && c.dataset.cat !== cat);
  });
}

function openProjectDetail(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  document.getElementById('detail-win-title').textContent = p.emoji + ' ' + p.title;
  document.getElementById('detail-body').innerHTML = `
    <div class="detail-metrics">${p.metrics.map(m=>`<div class="det-metric"><strong>${m.v}</strong><span>${m.l}</span></div>`).join('')}</div>
    <div class="det-sec"><h3>Overview</h3><p>${p.overview}</p></div>
    <div class="det-sec"><h3>Problem</h3><p>${p.problem}</p></div>
    <div class="det-sec"><h3>Solution</h3><p>${p.solution}</p></div>
    <div class="det-sec"><h3>Impact</h3><ul>${p.impact.map(i=>`<li>${i}</li>`).join('')}</ul></div>
    <div class="det-sec"><h3>Tech Stack</h3><div class="det-tech">${p.tech.map(t=>`<span>${t}</span>`).join('')}</div></div>
    <div class="det-links">
      ${p.github?`<a href="${p.github}" target="_blank" class="det-btn primary">🐙 GitHub</a>`:''}
      ${p.demo?`<a href="${p.demo}" target="_blank" class="det-btn secondary">🌐 Live Demo</a>`:''}
    </div>`;
  const detail = document.getElementById('win-proj-detail');
  detail.style.top = '65px';
  detail.style.left = Math.min(window.innerWidth-680, 155)+'px';
  openWindow('proj-detail');
}

function mobileSection(id) {
  document.querySelectorAll('.mobile-sheet').forEach(s => s.classList.add('hidden'));
  const sheet = document.getElementById('ms-' + id);
  if (sheet) sheet.classList.remove('hidden');
}
function closeMobileSheet(id) {
  const sheet = document.getElementById('ms-' + id);
  if (sheet) sheet.classList.add('hidden');
}
function buildMobileProjects() {
  const list = document.getElementById('mobile-proj-list');
  if (!list || typeof PROJECTS === 'undefined') return;
  list.innerHTML = PROJECTS.map(p =>
    `<div class="mob-proj-card"><h3>${p.emoji} ${p.title}</h3><p>${p.tagline}</p></div>`
  ).join('');
}

let freeDrag = null;
function startFreeDrag(e, id) {
  const el = document.getElementById(id);
  if (!el) return;
  const rect = el.getBoundingClientRect();
  el.style.right = 'auto';
  el.style.position = 'absolute';
  freeDrag = { el, ox: e.clientX - rect.left, oy: e.clientY - rect.top };
  e.preventDefault(); e.stopPropagation();
}
document.addEventListener('mousemove', e => {
  if (!freeDrag) return;
  freeDrag.el.style.left = Math.max(0, e.clientX - freeDrag.ox) + 'px';
  freeDrag.el.style.top  = Math.max(28, e.clientY - freeDrag.oy) + 'px';
});
document.addEventListener('mouseup', () => { freeDrag = null; });

function closeAllWindows() {
  ['about','projects','chat','terminal','resume','contact','extras','proj-detail'].forEach(closeWindow);
}

function toggleMusic() {
  const audio = document.getElementById('music-audio');
  const disc  = document.getElementById('music-disc');
  const icon  = document.getElementById('music-play-icon');
  if (!audio) return;
  if (audio.paused) {
    audio.play().catch(()=>{});
    disc.classList.add('playing');
    icon.innerHTML = '<rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/>';
  } else {
    audio.pause();
    disc.classList.remove('playing');
    icon.innerHTML = '<polygon points="5,3 19,12 5,21"/>';
  }
}
// Update progress bar
setInterval(()=>{
  const a = document.getElementById('music-audio');
  const p = document.getElementById('music-progress');
  if (a && p && a.duration) p.style.width = (a.currentTime/a.duration*100)+'%';
}, 500);

function initStarCanvas() {
  const c = document.getElementById('star-canvas');
  if (!c) return;
  const ctx = c.getContext('2d');
  let W, H;
  const resize = () => { W=c.width=c.offsetWidth||window.innerWidth; H=c.height=c.offsetHeight||window.innerHeight; };
  resize(); window.addEventListener('resize', resize);

  const star4 = (x,y,r,a) => {
    ctx.save(); ctx.globalAlpha=a; ctx.fillStyle='rgba(255,255,255,0.9)';
    ctx.beginPath();
    for (let i=0;i<8;i++) {
      const ang = (i*Math.PI/4), rad = i%2===0 ? r : r*.35;
      i===0 ? ctx.moveTo(x+rad*Math.cos(ang), y+rad*Math.sin(ang))
             : ctx.lineTo(x+rad*Math.cos(ang), y+rad*Math.sin(ang));
    }
    ctx.closePath(); ctx.fill(); ctx.restore();
  };

  const stars = Array.from({length:30}, () => ({
    x:Math.random(), y:Math.random(),
    r:3+Math.random()*5, ph:Math.random()*Math.PI*2, spd:0.02+Math.random()*0.03,
    rise:0.0001+Math.random()*0.0002,
  }));

  (function frame() {
    ctx.clearRect(0,0,W,H);
    stars.forEach(s => {
      s.ph += s.spd; s.y -= s.rise;
      if (s.y < -0.05) { s.y=1.05; s.x=Math.random(); }
      const a = 0.3+0.7*Math.abs(Math.sin(s.ph));
      star4(s.x*W, s.y*H, s.r*(0.7+0.3*Math.abs(Math.sin(s.ph))), a);
    });
    requestAnimationFrame(frame);
  })();
}

function startVirusTimer() {
  const show = () => document.getElementById('virus-popup')?.classList.remove('hidden');
  setTimeout(show, 60000);
  setInterval(show, 90000); // every 90s after first
}

Object.assign(window, {
  openWindow, closeWindow, minimizeWindow, toggleMax,
  startDrag, handleTermKey, sendChat,
  filterProjects, openProjectDetail,
  mobileSection, closeMobileSheet,
  toggleMusic, closeAllWindows, startFreeDrag,
});
