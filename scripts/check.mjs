import {readFile,access,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import vm from 'node:vm';
const context={window:{}};vm.createContext(context);
for(const name of ['repository-status.js','data.js'])vm.runInContext(await readFile(`src/scripts/${name}`,'utf8'),context);
const {repositories,papers,stages,connections}=context.window.HUB;
const errors=[];const check=(condition,msg)=>{if(!condition)errors.push(msg)};
check(repositories.length===15,'Expected all 15 repositories');check(new Set(repositories.map(r=>r.name)).size===15,'Duplicate repositories');check(papers.length===9,'Expected nine papers');check(stages.length===6,'Expected six interactive research stages');
const ids=new Set(papers.map(p=>p.id));const names=new Set(repositories.map(r=>r.name));
for(const r of repositories){for(const p of r.papers)check(p==='synthesis'||ids.has(p),`Invalid paper ${p}`);for(const n of r.related)check(names.has(n),`Invalid related repository ${n}`);check(!!context.window.REPOSITORY_STATUS[r.name],`Missing verified status ${r.name}`)}
for(const c of connections){check(names.has(c.from)&&names.has(c.to),'Invalid connection endpoint');check(['interface','method','future'].includes(c.kind),'Invalid relationship kind');check(!!c.basis,'Missing relationship evidence')}
for(const p of papers)if(p.url)check(/^https:\/\//.test(p.url),'Invalid paper URL');
const app=await readFile('src/scripts/app.js','utf8');const index=await readFile('index.html','utf8');
const assets=new Set([...app.matchAll(/(?:src|href)="((?:public|src|docs|source-records)\/[^"]+)"/g),...index.matchAll(/(?:src|href)="((?:public|src|docs|source-records)\/[^"]+)"/g)].map(m=>m[1]).filter(x=>!x.includes('${')));
for(const file of assets)try{await access(file)}catch{errors.push('Missing asset: '+file)}
for(const n of ['multi-camera-prototype','registration-validation','low-light-comparison','colourised-reconstruction'])try{await access(`public/assets/evidence/${n}.png`)}catch{errors.push('Missing evidence '+n)}
const css=await readFile('src/styles/main.css','utf8');check(css.includes('prefers-reduced-motion'),'Missing reduced-motion rule');check(css.includes('focus-visible'),'Missing keyboard focus');check(css.includes('max-width:700px'),'Missing mobile breakpoint');check(index.includes('Skip to content'),'Missing skip link');
const register=JSON.parse(await readFile('source-records/public-source-register.json','utf8'));check(register.assets.length===8,'Expected four published figures, one licensed screenshot and three authored SVG assets');
const walk=async dir=>{let files=[];for(const n of await readdir(dir)){const p=dir+'/'+n;if((await stat(p)).isDirectory())files.push(...await walk(p));else files.push(p)}return files};
const dist=await walk('dist');check(!dist.some(p=>/verification|repositories\/|\.docx|\.pdf|\.py/.test(p)),'Private/review material included in dist');
const report={date:'2026-10-08',checks:['15 repository records, related endpoints and paper mappings','9 paper records and 6 research stages','Relationship kinds and evidence basis','Referenced static assets exist','Reduced motion, keyboard-focus styles, mobile rules and skip link','Public asset register and build exclusion of review/source files'],passed:errors.length===0,errors,distribution_files:dist.length};
await import('node:fs/promises').then(fs=>fs.writeFile(resolve('verification/static-checks.json'),JSON.stringify(report,null,2)+'\n'));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log('Static checks passed: complete source mappings, assets, accessibility foundations and public-safe build.');
