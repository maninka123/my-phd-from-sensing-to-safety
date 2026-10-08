import {mkdir, writeFile} from 'node:fs/promises';
import {dirname, resolve} from 'node:path';
import {fileURLToPath} from 'node:url';

// All three illustrations use the same authored geometry and orthographic view.
// Surface samples explain colourisation; they are not sensor measurements.
const output = resolve(dirname(fileURLToPath(import.meta.url)), '../public/assets/diagrams');
await mkdir(output, {recursive:true});
const project = ([u,v,z]) => [72 + u*1.04 + v*.82, 292 + u*.28 - v*.48 - z*.9];
const position = p => project(p).map(n=>n.toFixed(2)).join(',');
const polygon = vertices => vertices.map(position).join(' ');
const mix = (a,b,t) => a.map((n,i)=>n+(b[i]-n)*t);
const surfaces = [];
const face = (vertices, colour) => surfaces.push({vertices, colour});
function box(u,v,z,w,d,h,colour) {
  const a=[u,v,z], b=[u+w,v,z], c=[u+w,v+d,z], e=[u,v,z+h], f=[u+w,v,z+h], g=[u+w,v+d,z+h], k=[u,v+d,z+h];
  face([a,b,f,e],colour[0]);
  face([b,c,g,f],colour[1]);
  face([e,f,g,k],colour[2]);
}

// Ground slab, four roof supports, twin hydraulic legs and a front conveyor.
box(0,-25,-8,330,205,8,['#4d687f','#354d65','#60788a']);
for (const u of [15,94,173,252]) {
  box(u,36,0,59,116,9,['#5c8194','#3d6176','#91afbc']);
  for (const v of [48,120]) {
    box(u+18,v,9,15,15,69,['#66899f','#456b84','#bed2dc']);
    box(u+21,v+3,78,9,9,61,['#c1d3df','#7d9eb4','#ecf3f7']);
    box(u+14,v-4,63,23,23,12,['#6a91ab','#507992','#a6c3d4']);
  }
  box(u-3,26,139,66,141,12,['#8e9488','#6e827e','#c9c4a9']);
  box(u+2,32,151,56,127,3,['#9da597','#7b9087','#e0d9bb']);
}
box(3,-18,3,318,37,19,['#976a37','#6e522f','#cca15e']);
box(8,-12,22,308,25,3,['#987441','#765a36','#edd08c']);
box(48,-7,25,194,13,3,['#536a7b','#405765','#a6bac7']);

function sample({vertices,colour}, mode) {
  const [a,b,,d]=vertices;
  const length=p=>Math.hypot(...p);
  const stepsU=Math.max(2,Math.ceil(length(b.map((n,i)=>n-a[i]))/4.5));
  const stepsV=Math.max(2,Math.ceil(length(d.map((n,i)=>n-a[i]))/4.5));
  let dots='';
  for(let i=0;i<=stepsU;i++)for(let j=0;j<=stepsV;j++) {
    const t=i/stepsU, s=j/stepsV;
    const point=mix(mix(a,b,t),mix(d,vertices[2],t),s);
    const [x,y]=project(point);
    dots+=`M${x.toFixed(2)} ${y.toFixed(2)}h.01`;
  }
  return `<path d="${dots}" fill="none" stroke="${mode==='lidar'?'#8acffa':colour}" stroke-width="${mode==='lidar'?2.24:2.56}" stroke-linecap="round" opacity=".86"/>`;
}
const grid = Array.from({length:12},(_,i)=>{
  const u=i*30;
  return `<path d="M${position([u,-40,-9])}L${position([u,205,-9])}"/>`;
}).join('') + Array.from({length:9},(_,i)=>`<path d="M${position([-15,i*30-40,-9])}L${position([350,i*30-40,-9])}"/>`).join('');
const descriptions={
  camera:'Shaded isometric illustration of four twin-leg roof supports beside a conveyor, showing colour and appearance.',
  lidar:'The same roof-support and conveyor geometry represented by blue surface points, illustrating LiDAR distance measurements.',
  fusion:'The same surface points coloured by the matching illustrated camera view, combining geometry and appearance.'
};
for(const mode of Object.keys(descriptions)) {
  const body=surfaces.map(surface=>mode==='camera'
    ? `<polygon points="${polygon(surface.vertices)}" fill="${surface.colour}" stroke="#d9e8ec" stroke-opacity=".23" stroke-width=".7" stroke-linejoin="round"/>`
    : `<polygon points="${polygon(surface.vertices)}" fill="#14273c" stroke="${mode==='lidar'?'#6aabd2':surface.colour}" stroke-opacity=".23" stroke-width=".6"/>${sample(surface,mode)}`
  ).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="640" height="440" viewBox="0 0 640 440" role="img" aria-labelledby="title desc">
<title id="title">${mode==='camera'?'Camera appearance':mode==='lidar'?'LiDAR geometry':'Colourised geometry'} — original explanatory illustration</title>
<desc id="desc">${descriptions[mode]} Authored geometry, not measured scientific data or a field photograph.</desc>
<defs><linearGradient id="background" x2=".8" y2="1"><stop stop-color="#1b344e"/><stop offset="1" stop-color="#0c1c2e"/></linearGradient><radialGradient id="light"><stop stop-color="#477998" stop-opacity=".3"/><stop offset="1" stop-color="#233e56" stop-opacity="0"/></radialGradient><radialGradient id="shadow"><stop stop-color="#040d19" stop-opacity=".7"/><stop offset="1" stop-color="#040d19" stop-opacity="0"/></radialGradient></defs>
<rect width="640" height="440" rx="20" fill="url(#background)"/><ellipse cx="335" cy="175" rx="310" ry="210" fill="url(#light)"/>
<g fill="none" stroke="#8ab3ce" stroke-width=".7" opacity=".13">${grid}</g><ellipse cx="332" cy="326" rx="262" ry="69" fill="url(#shadow)"/>
${body}
<g fill="none" stroke="#9ebcd1" stroke-width="1" opacity=".45"><path d="M28 54V28h26M586 28h26v26M28 386v26h26M586 412h26v-26"/></g>
</svg>`;
  await writeFile(resolve(output,`fusion-${mode==='fusion'?'colourised':mode}.svg`),svg);
}
console.log('Created three matching, original fusion illustrations.');
