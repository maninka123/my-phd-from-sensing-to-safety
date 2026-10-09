import {writeFile,mkdir} from 'node:fs/promises';
import {resolve} from 'node:path';
const out=resolve('public/assets/diagrams'); await mkdir(out,{recursive:true});
const svg=(w,h,body)=>`<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img"><title>Original explanatory schematic, not measured scientific data</title>${body.replace(/<text\b[^>]*>[\s\S]*?<\/text>/g,'').replace(/<g fill="none" stroke="#8da7bd"[\s\S]*?<\/g>/g,'').replace(/<g fill="#88b9df">[\s\S]*?<\/g>/g,'').replace(/<g stroke="#5a7ca3"[\s\S]*?<\/g>/g,'')}</svg>`;
await import('./create-longwall-diagram.mjs');
await import('./create-unit-diagram.mjs');
await writeFile(resolve(out,'favicon.svg'),svg(64,64,'<rect width="64" height="64" rx="18" fill="#1959c7"/><path d="M12 40l12-17 15 20 13-19" fill="none" stroke="white" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>'));
console.log('Created 3 editable explanatory SVGs.');
