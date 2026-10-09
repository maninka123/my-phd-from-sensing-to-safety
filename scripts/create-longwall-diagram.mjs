import {writeFile, mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';

// Original cutaway artwork, built from projected geometry. No paper image is used.
// Equipment proportions and the proposed sensing position are illustrative.
const out=resolve('public/assets/diagrams');
await mkdir(out,{recursive:true});
// A level, near-front view. Equal horizontal/vertical scale keeps drums round
// and the row straight; shallow depth shows structure without stretching it.
const p=([x,y,z])=>[205+x*80+y*24,380+y*24-z*80];
const xy=v=>p(v).map(n=>n.toFixed(1)).join(',');
const poly=(vertices,fill,stroke='#b2c5d0',width=.8)=>`<polygon points="${vertices.map(xy).join(' ')}" fill="${fill}" stroke="${stroke}" stroke-width="${width}" stroke-linejoin="round"/>`;
const line=(a,b,color,width=2,extra='')=>`<path d="M${xy(a)}L${xy(b)}" fill="none" stroke="${color}" stroke-width="${width}" stroke-linecap="round" ${extra}/>`;
const dot=(v,r,fill,stroke='none')=>`<circle cx="${p(v)[0]}" cy="${p(v)[1]}" r="${r}" fill="${fill}" stroke="${stroke}"/>`;
const cap=(v,r,fill,stroke='#5d7381')=>`<ellipse cx="${p(v)[0]}" cy="${p(v)[1]}" rx="${r}" ry="${r*.3}" transform="rotate(11 ${p(v)[0]} ${p(v)[1]})" fill="${fill}" stroke="${stroke}"/>`;
const box=(x,y,z,w,d,h,top='url(#steelTop)',front='url(#steelSide)',side='#43596a')=>poly([[x,y,z+h],[x+w,y,z+h],[x+w,y+d,z+h],[x,y+d,z+h]],top)+poly([[x,y+d,z],[x+w,y+d,z],[x+w,y+d,z+h],[x,y+d,z+h]],front)+poly([[x+w,y,z],[x+w,y+d,z],[x+w,y+d,z+h],[x+w,y,z+h]],side);
const cylinder=(a,b,r,color='url(#chrome)')=>line(a,b,'#1a2832',r*2+3)+line(a,b,color,r*2)+(Math.abs(a[2]-b[2])>.8?cap(a,r,color)+cap(b,r*.8,'#b5c5cd'):dot(a,r,color,'#8ba0ae')+dot(b,r*.8,'#b5c5cd','#5d7381'));
let seed=138;
const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
const defs=`<defs>
  <linearGradient id="background" x2="0.8" y2="1"><stop stop-color="#1d344a"/><stop offset="1" stop-color="#0c1a29"/></linearGradient>
  <radialGradient id="light"><stop stop-color="#75a9be" stop-opacity=".14"/><stop offset="1" stop-color="#1b3044" stop-opacity="0"/></radialGradient>
  <linearGradient id="steelTop" x2=".2" y2="1"><stop stop-color="#dae2e3"/><stop offset=".4" stop-color="#a8bdc6"/><stop offset="1" stop-color="#688291"/></linearGradient>
  <linearGradient id="steelSide" x2="0" y2="1"><stop stop-color="#7b929e"/><stop offset="1" stop-color="#3a5262"/></linearGradient>
  <linearGradient id="supportTop" x2="0" y2="1"><stop stop-color="#b2d1e5"/><stop offset="1" stop-color="#6e9fbd"/></linearGradient>
  <linearGradient id="supportSide" x2="0" y2="1"><stop stop-color="#5b89a9"/><stop offset="1" stop-color="#365d7b"/></linearGradient>
  <linearGradient id="conveyorTop" x2="0" y2="1"><stop stop-color="#63b6ba"/><stop offset="1" stop-color="#35868e"/></linearGradient>
  <linearGradient id="chrome"><stop stop-color="#506772"/><stop offset=".25" stop-color="#e2edf0"/><stop offset=".5" stop-color="#a7c2cf"/><stop offset=".7" stop-color="#eff5f4"/><stop offset="1" stop-color="#526e7b"/></linearGradient>
  <linearGradient id="yellowTop" x2="0" y2="1"><stop stop-color="#ffdc76"/><stop offset="1" stop-color="#d9a33e"/></linearGradient>
  <linearGradient id="yellowSide" x2="0" y2="1"><stop stop-color="#d6a73d"/><stop offset="1" stop-color="#976624"/></linearGradient>
  <linearGradient id="coal" x2=".3" y2="1"><stop stop-color="#4a5051"/><stop offset=".3" stop-color="#292d30"/><stop offset="1" stop-color="#141c22"/></linearGradient>
  <filter id="coalTexture" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".035 .14" numOctaves="3" seed="17"/><feColorMatrix type="saturate" values="0"/><feComponentTransfer result="texture"><feFuncR type="linear" slope=".25" intercept=".025"/><feFuncG type="linear" slope=".25" intercept=".04"/><feFuncB type="linear" slope=".25" intercept=".045"/></feComponentTransfer><feComposite in="texture" in2="SourceGraphic" operator="in"/></filter>
  <filter id="shadow" x="-20%" y="-30%" width="140%" height="180%"><feGaussianBlur stdDeviation="12"/></filter>
</defs>`;
let body=`<rect width="1600" height="720" fill="url(#background)"/><ellipse cx="800" cy="330" rx="800" ry="440" fill="url(#light)"/>`;
body+=poly([[-.65,-.6,0],[13.7,-.6,0],[13.7,5.85,0],[-.65,5.85,0]],'#243a47','#536775');
body+=`<ellipse cx="800" cy="459" rx="590" ry="72" fill="#050d15" opacity=".65" filter="url(#shadow)"/>`;
for(let i=0;i<45;i++){const x=rand()*13.4,y=rand()*5.4,z=.015;body+=line([x,y,z],[x+.03+rand()*.1,y+.01,z],i%3?'#77909d':'#142732',.7,'opacity=".2"');}

// Five separated shield supports keep the physical structure easy to read.
for(let i=0;i<5;i++){
  const x=i*2.46,w=2.25;
  body+=`<g id="roof-support-${i+1}">`;
  body+=box(x,.12,.07,w,3.35,.21,'#648fae','#365773','#263e52');
  for(const dx of [.4,1.66])body+=box(x+dx,.34,.28,.23,2.7,.14,'#92b3c6','#3c5c76','#263c48');
  body+=poly([[x,.15,.3],[x+w,.15,.3],[x+w,.6,2.75],[x,.6,2.75]],'url(#supportSide)');
  for(const dx of [.17,w-.17])body+=line([x+dx,.22,.47],[x+dx,.58,2.64],'#8ab0c8',4);
  body+=line([x+.2,.28,.51],[x+w-.2,.58,2.46],'#416d8c',6);
  for(const dx of [.54,1.72]){
    body+=cylinder([x+dx,1.98,.45],[x+dx,1.82,1.68],12,'url(#steelSide)');
    body+=cylinder([x+dx,1.82,1.64],[x+dx,1.65,2.92],6,'url(#chrome)');
    body+=cap([x+dx,1.82,1.67],13,'#d6dedf','#4b626f');
    body+=line([x+dx+.07,1.99,.67],[x+dx+.11,2.05,1.48],'#141f28',3);
    body+=box(x+dx-.12,1.77,.33,.24,.4,.17,'#7f98a4','#3c5362');
  }
  body+=cylinder([x+1.12,.72,.55],[x+1.12,2.65,.52],5);
  body+=box(x,-.02,2.91,w+.05,3.37,.17,'url(#supportTop)','url(#supportSide)','#3c6482');
  body+=line([x+.04,1.65,3.09],[x+w,1.65,3.09],'#6d97b2',1.5);
  body+=line([x+.08,3.35,2.98],[x+w-.03,3.35,2.98],'#d1e7ef',2);
  for(const dx of [.14,w-.13])body+=dot([x+dx,3.13,3.1],2.4,'#506f89','#c9d7db');
  body+=`</g>`;
}

// Armoured face conveyor: joined pans, guide rail, twin chain and coal fragments.
body+=`<g id="face-conveyor">`;
for(let i=0;i<12;i++){
  const x=-.2+i*1.12;
  body+=box(x,3.75,.2,1.08,1.13,.3,'url(#conveyorTop)','#28606f','#244d60');
  body+=box(x,4.74,.49,1.08,.13,.25,'#82c9ca','#367e87','#2d6575');
  body+=box(x,3.74,.49,1.08,.11,.18,'#73bfc2','#367b85');
  body+=line([x+.04,3.95,.515],[x+1.04,3.95,.515],'#173b47',3);
  body+=line([x+.04,4.52,.515],[x+1.04,4.52,.515],'#173b47',3);
  body+=line([x+.54,3.95,.54],[x+.54,4.52,.54],'#adc7c6',3.5);
  body+=dot([x+.14,4.88,.61],2.5,'#d3dee0','#394e5a');
}
for(let i=0;i<32;i++){const x=rand()*12.8,y=4.06+rand()*.4,z=.55+rand()*.06;body+=poly([[x,y,z],[x+.08,y+.03,z+.08],[x+.13,y+.1,z],[x+.02,y+.12,z]],i%3?'#20313b':'#42515a','#172731',.4);}
body+=`</g>`;

// A retained section of the coal seam makes the cutaway's mining face explicit.
body+=`<g id="coal-face">`;
body+=box(9.72,5.17,.02,3.58,.47,3.47,'#766f5f','url(#coal)','#222b2d');
body+=`<g filter="url(#coalTexture)">${poly([[9.72,5.645,.02],[13.3,5.645,.02],[13.3,5.645,3.49],[9.72,5.645,3.49]],'url(#coal)','#5d6664')}</g>`;
for(const z of [.33,.73,1.31,2.14,2.73,3.12]){
  const vein=Array.from({length:20},(_,i)=>xy([9.72+i*3.58/19,5.65,z+rand()*.05]));
  body+=`<path d="M${vein.join('L')}" stroke="#a1a395" stroke-width="1.2" fill="none" opacity=".27"/>`;
}
for(let i=0;i<14;i++){
  const x=9.77+rand()*3.42,z=.08+rand()*3.29,dx=.05+rand()*.2,dz=.1+rand()*.4;
  body+=line([x,5.655,z],[Math.min(13.28,x+dx),5.655,Math.min(3.47,z+dz)],'#101a20',1+rand()*1.3,'opacity=".6"');
}
body+=poly([[9.72,5.17,.02],[9.72,5.65,.02],[9.72,5.65,3.49],[9.72,5.17,3.49]],'url(#coal)','#758078');
for(let i=0;i<12;i++){const z=.12+i*.27;body+=line([9.73,5.19,z],[9.73,5.63,z+.07],i%3?'#7a817c':'#aaa292',1.3,'opacity=".4"');}
for(let i=0;i<18;i++){const x=9.65+rand()*3.7,y=5.7+rand()*.35;body+=poly([[x,y,.02],[x+.1,y,.12],[x+.2,y+.15,.01],[x+.03,y+.15,.015]],i%2?'#263238':'#4a5658','#172731',.6);}
body+=`</g>`;

// Twin-drum shearer: traction body, motors, articulated ranging arms and picks.
const drum=(x,y,z,r)=>{
  const ring=(dy,dr=0)=>Array.from({length:64},(_,i)=>{const t=i/64*Math.PI*2;return [x+(r+dr)*Math.cos(t),y+dy,z+(r+dr)*Math.sin(t)]});
  let d=poly(ring(0),'#4f626c','#b2c3ca',1.5);
  for(let i=0;i<24;i++){
    const t=i/24*Math.PI*2,next=t+Math.PI/12;
    d+=poly([[x+r*Math.cos(t),y,z+r*Math.sin(t)],[x+r*Math.cos(next),y,z+r*Math.sin(next)],[x+r*Math.cos(next),y+.66,z+r*Math.sin(next)],[x+r*Math.cos(t),y+.66,z+r*Math.sin(t)]],i%2?'#6b818b':'#435c69','#7a929d',.5);
  }
  for(let phase=0;phase<2;phase++){
    const helix=Array.from({length:48},(_,i)=>{const t=i/47*Math.PI*2+phase*Math.PI;return xy([x+(r+.035)*Math.cos(t),y+.66*i/47,z+(r+.035)*Math.sin(t)])});
    d+=`<path d="M${helix.join('L')}" fill="none" stroke="#d0dcdf" stroke-width="4" stroke-linejoin="round"/>`;
  }
  d+=poly(ring(.66),'url(#steelTop)','#d3dfe0',2);
  d+=poly(ring(.673,-r*.48),'#364f61','#879eab',1.5);
  d+=dot([x,y+.681,z],7,'#c8d9df','#526b7b');
  for(let i=0;i<16;i++){
    const t=i/16*Math.PI*2;
    const pick=[[x+(r-.02)*Math.cos(t-.07),y+.7,z+(r-.02)*Math.sin(t-.07)],[x+(r+.13)*Math.cos(t),y+.72,z+(r+.13)*Math.sin(t)],[x+(r-.02)*Math.cos(t+.07),y+.7,z+(r-.02)*Math.sin(t+.07)]];
    d+=poly(pick,'#d9e2df','#708590',.6);
  }
  return d;
};
body+=`<g id="shearer">`;
body+=box(3.62,3.79,.62,3.55,.85,.3,'#7f949d','#324d5f');
for(const x of [3.92,6.53])body+=box(x,3.87,.5,.4,.71,.24,'#486579','#223a4c');
body+=box(3.67,3.73,.94,3.45,.89,.6,'url(#yellowTop)','url(#yellowSide)','#ab7b2c');
body+=box(4.2,3.77,1.54,1.19,.72,.11,'#f9d876','#9c742a');
for(let i=0;i<6;i++)body+=line([5.6+i*.18,4.64,1.06],[5.6+i*.18,4.64,1.42],'#5d4b2a',2.2);
for(const x of [3.81,4.12,5.42,6.99])body+=dot([x,4.635,1.43],2.7,'#f5e0a1','#815c26');
body+=cylinder([3.9,4.02,1.27],[2.73,4.05,1.96],12,'url(#yellowTop)');
body+=cylinder([6.9,4.04,1.28],[8.05,4.07,1.02],12,'url(#yellowTop)');
body+=cylinder([4,4.31,1.06],[3.05,4.31,1.61],5);
body+=cylinder([6.92,4.31,1.02],[7.74,4.31,.89],5);
body+=line([4.12,4.62,1.58],[3.35,4.64,1.67],'#142b3b',4);
body+=line([6.91,4.62,1.56],[7.8,4.65,1.31],'#142b3b',4);
body+=drum(2.58,3.88,1.96,.68)+drum(8.18,3.9,1.04,.63);
body+=`</g>`;

// One proposed sensing unit beneath a canopy. Cone is intentionally conceptual.
body+=`<g id="sensing-unit">`;
const sensor=[9.78,3.16,2.87];
body+=poly([sensor,[7.8,4.6,.58],[11.0,4.6,.58]],'#68d9e6','none');
// Keep the light transparent rather than presenting synthetic measured points.
body=body.replace('fill="#68d9e6" stroke="none"','fill="#68d9e6" fill-opacity=".075" stroke="none"');
body+=line(sensor,[7.8,4.6,.58],'#6cd6de',1.1,'opacity=".42" stroke-dasharray="5 6"');
body+=line(sensor,[11,4.6,.58],'#6cd6de',1.1,'opacity=".42" stroke-dasharray="5 6"');
body+=box(9.62,2.96,2.76,.34,.4,.18,'#97e0bc','#398668','#285748');
body+=dot(sensor,10,'#58c99b','#c9eced')+dot([9.78,3.17,2.885],4,'#154f41','#9aedcd');
body+=line([9.79,2.98,2.93],[9.79,3,3.03],'#d9e2e2',3);
body+=`</g>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1600" height="600" viewBox="0 0 1600 600" role="img"><title>Original illustrated cutaway of a longwall mining face</title><desc>Level view of hydraulic shield supports, a twin-drum shearer, an armoured face conveyor, an exposed section of coal seam and a proposed sensing unit. The foreground coal seam is cut away to reveal the equipment. Illustrative geometry, not a photograph or measured research result.</desc>${defs}${body}</svg>`;
await writeFile(resolve(out,'longwall-story.svg'),svg);
console.log('Created original longwall cutaway artwork.');
