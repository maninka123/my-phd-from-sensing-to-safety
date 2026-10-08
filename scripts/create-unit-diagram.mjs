import {writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';

// Original vector illustration. Product form reference: https://www.livoxtech.com/avia
// The enclosure arrangement is explanatory, not a dimensioned engineering model.
const out=resolve('public/assets/diagrams');
await mkdir(out,{recursive:true});
const fins=Array.from({length:9},(_,i)=>{
  const y=267+i*13;
  return `<path d="M551 ${y}l43-17v5l-43 17z" fill="#536577"/><path d="M551 ${y}l43-17" stroke="#f5f8fb" stroke-width="2"/>`;
}).join('');
const bolts=[270,330,450,570,630].map((x,i)=>`<ellipse cx="${x}" cy="${i===0||i===4?454:477}" rx="5" ry="3" fill="#647b91"/><path d="M${x-2} ${i===0||i===4?454:477}h4" stroke="#dbe5ed"/>`).join('');
export const unitDiagram=`<svg xmlns="http://www.w3.org/2000/svg" width="900" height="620" viewBox="0 0 900 620" role="img" aria-labelledby="title description">
<title id="title">Protected sensing unit with an Avia-inspired LiDAR</title>
<desc id="description">Original illustrative cutaway. A silver rectangular LiDAR has a green optical window, side cooling fins and a connector. A separate camera and embedded processing module share a metal enclosure beneath a transparent dome. Numbered HTML labels accompany the illustration.</desc>
<defs>
  <linearGradient id="unit-bg" x2="0" y2="1"><stop stop-color="#f4f8fc"/><stop offset="1" stop-color="#e6eef6"/></linearGradient>
  <linearGradient id="unit-metal" x2=".7" y2="1"><stop stop-color="#f7fafc"/><stop offset=".4" stop-color="#c5d2dc"/><stop offset="1" stop-color="#8ea1b3"/></linearGradient>
  <linearGradient id="unit-side" x2="1" y2=".4"><stop stop-color="#acbccb"/><stop offset=".65" stop-color="#e4ebf1"/><stop offset="1" stop-color="#8b9eb1"/></linearGradient>
  <linearGradient id="unit-window" x2="1" y2=".4"><stop stop-color="#87e4cd"/><stop offset=".5" stop-color="#44ac9d"/><stop offset="1" stop-color="#176a65"/></linearGradient>
  <linearGradient id="unit-dome" x2="1" y2=".2"><stop stop-color="#bcdcf2" stop-opacity=".25"/><stop offset=".35" stop-color="#eaf6fd" stop-opacity=".06"/><stop offset="1" stop-color="#81a9ca" stop-opacity=".23"/></linearGradient>
  <linearGradient id="unit-base" x2="0" y2="1"><stop stop-color="#c4d3e0"/><stop offset="1" stop-color="#8b9fb3"/></linearGradient>
  <radialGradient id="unit-lens"><stop stop-color="#7fb6da"/><stop offset=".4" stop-color="#203b58"/><stop offset="1" stop-color="#091b2b"/></radialGradient>
</defs>
<rect width="900" height="620" rx="28" fill="url(#unit-bg)"/>
<ellipse cx="450" cy="550" rx="278" ry="30" fill="#3d5c7c" opacity=".09"/>
<!-- Back of the optical dome and enclosure deck. -->
<path d="M235 437V299c0-115 94-209 215-209s215 94 215 209v138" fill="url(#unit-dome)" stroke="#94aec5" stroke-width="2.5"/>
<ellipse cx="450" cy="441" rx="235" ry="67" fill="url(#unit-metal)" stroke="#8fa4b8" stroke-width="2"/>
<path d="M215 441v63c0 89 470 89 470 0v-63c0 89-470 89-470 0z" fill="url(#unit-base)" stroke="#859caf" stroke-width="2"/>
<path d="M216 478c42 68 420 69 468 0" fill="none" stroke="#e1eaf2" stroke-width="2" opacity=".8"/>
${bolts}
<!-- Embedded processing module and mounting platform. -->
<path d="M342 402l49-24 187 9-47 25z" fill="#637c90" stroke="#3c566c"/>
<path d="M342 402l189 10v56l-189-10z" fill="#304b61"/>
<path d="M531 412l47-25v54l-47 27z" fill="#263f53"/>
${Array.from({length:8},(_,i)=>`<path d="M${358+i*20} 405v48" stroke="#7992a6" stroke-width="3" opacity=".55"/>`).join('')}
<rect x="372" y="439" width="30" height="9" rx="2" fill="#192f43"/><rect x="410" y="441" width="19" height="9" rx="2" fill="#192f43"/>
<circle cx="502" cy="445" r="3" fill="#71c8ae"/>
<!-- A recognizable Avia-inspired silver housing with its large green window. -->
<path d="M400 243l59-25 141 8-58 24z" fill="#edf2f6" stroke="#a5b5c3" stroke-width="2"/>
<path d="M542 250l58-24v152l-58 26z" fill="url(#unit-side)" stroke="#8398ab" stroke-width="2"/>
<path d="M400 243l142 7v154l-142-7z" fill="url(#unit-metal)" stroke="#879cad" stroke-width="2"/>
<path d="M411 274q0-9 10-8l101 5q9 0 9 10v95q0 10-10 9l-100-5q-10 0-10-10z" fill="url(#unit-window)" stroke="#366d70" stroke-width="2.5"/>
<path d="M418 273l107 5M418 280v85" fill="none" stroke="#d3fff1" stroke-width="2" opacity=".5"/>
<path d="M421 355l93-63" stroke="#b0f3df" stroke-width="18" opacity=".09"/>
${fins}
<path d="M592 323l18-7v29l-18 8z" fill="#4c6274" stroke="#9faebb"/>
<path d="M610 322l19 3v19l-19-1z" fill="#a8b7c4" stroke="#566d80"/>
<ellipse cx="630" cy="334" rx="5" ry="10" fill="#203c50" stroke="#c2ccd5" stroke-width="2"/>
<path d="M615 325v18m4-17v18m4-17v17" stroke="#60788b" stroke-width="2"/>
<g fill="#708799">${[[408,252],[534,258],[408,389],[534,396]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.5"/>`).join('')}</g>
<!-- Separate camera lens and mount. -->
<path d="M297 337l25-12 67 6-23 13z" fill="#5f7c93"/>
<path d="M366 344l23-13v57l-23 13z" fill="#1d354b"/>
<path d="M297 337l69 7v57l-69-7z" fill="#2e4c65" stroke="#6b8499" stroke-width="2"/>
<path d="M310 395v17l41 2v-17" fill="#6c8295"/>
<ellipse cx="331" cy="368" rx="24" ry="23" fill="#091c2e" stroke="#a8bdce" stroke-width="4"/>
<ellipse cx="331" cy="368" rx="17" ry="16" fill="url(#unit-lens)" stroke="#526b80" stroke-width="2"/>
<ellipse cx="325" cy="362" rx="5" ry="4" fill="#b1d7ee" opacity=".65"/>
<!-- Front dome highlights leave the internal components visible. -->
<path d="M235 437V299c0-115 94-209 215-209s215 94 215 209v138" fill="url(#unit-dome)" stroke="#94aec5" stroke-width="2.5"/>
<path d="M267 302c0-85 50-151 120-176" fill="none" stroke="white" stroke-width="9" opacity=".58" stroke-linecap="round"/>
<path d="M620 235c20 35 26 71 26 107" fill="none" stroke="#d6eaf7" stroke-width="4" opacity=".8" stroke-linecap="round"/>
<path d="M235 437c33 64 390 64 430 0" fill="none" stroke="#9cb4c9" stroke-width="2"/>
<!-- Leader lines to fixed-size HTML number badges. -->
<g fill="none" stroke="#6e88a0" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
<path d="M520 310h164v-75h85"/><path d="M310 368H157"/><path d="M377 443H192v47h-35"/><path d="M546 114V66h223"/><path d="M650 501h119"/>
</g>
<g fill="#6e88a0"><circle cx="520" cy="310" r="3"/><circle cx="310" cy="368" r="3"/><circle cx="377" cy="443" r="3"/><circle cx="546" cy="114" r="3"/><circle cx="650" cy="501" r="3"/></g>
</svg>`;
await writeFile(resolve(out,'protected-unit.svg'),unitDiagram);
console.log('Created the editable protected-unit SVG with an Avia-inspired sensor.');
