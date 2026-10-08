import {readFile,access,readdir,stat} from 'node:fs/promises';
import {resolve} from 'node:path';
import {createHash} from 'node:crypto';
import vm from 'node:vm';
const context={window:{}};vm.createContext(context);
for(const name of ['repository-status.js','data.js','paper-figures.js','publications.js'])vm.runInContext(await readFile(`src/scripts/${name}`,'utf8'),context);
const {repositories,papers,stages,connections}=context.window.HUB;
const errors=[];const check=(condition,msg)=>{if(!condition)errors.push(msg)};
const scope=JSON.parse(await readFile('source-records/portfolio-scope.json','utf8'));
check(repositories.length===scope.repositories.length,'Repository count differs from the revised portfolio');check(new Set(repositories.map(r=>r.name)).size===repositories.length,'Duplicate repositories');check(new Set(scope.repositories).size===scope.repositories.length,'Duplicate portfolio entries');
check(scope.repositories.every(n=>repositories.some(r=>r.name===n)),'Repository list differs from the revised portfolio');check(papers.length===9,'Expected nine papers');check(stages.length===6,'Expected six interactive research stages');
const ids=new Set(papers.map(p=>p.id));const names=new Set(repositories.map(r=>r.name));
const summary=context.window.PUBLICATION_SUMMARY;
const summaryIds=Object.values(summary.groups).flat();
check(summaryIds.length===papers.length&&new Set(summaryIds).size===papers.length&&summaryIds.every(id=>ids.has(id)),'Publication summary must group each paper exactly once');
for(const j of Object.values(summary.journals))check(j.percentile===Math.max(...Object.values(j.category_percentiles))&&j.citescore_year===2025&&j.impact_factor>0&&j.citescore>0,'Invalid journal metric or best-category percentile: '+j.name);
for(const r of repositories){for(const p of r.papers)check(p==='synthesis'||ids.has(p),`Invalid paper ${p}`);for(const n of r.related)check(names.has(n),`Invalid related repository ${n}`);check(!!context.window.REPOSITORY_STATUS[r.name],`Missing verified status ${r.name}`)}
for(const c of connections){check(names.has(c.from)&&names.has(c.to),'Invalid connection endpoint');check(['interface','method','future'].includes(c.kind),'Invalid relationship kind');check(!!c.basis,'Missing relationship evidence')}
for(const p of papers)if(p.url)check(/^https:\/\//.test(p.url),'Invalid paper URL');
for(const s of stages){for(const n of s.repos)check(names.has(n),`Invalid stage repository ${n}`);check(s.paper==='synthesis'||ids.has(s.paper),`Invalid stage paper ${s.paper}`)}
check(Object.keys(context.window.REPOSITORY_STATUS).length===repositories.length,'Stale access records');
const app=await readFile('src/scripts/app.js','utf8');const index=await readFile('index.html','utf8');
for(const m of app.matchAll(/(?:repos:|sectionLinks\()\[([^\]]*)\]/g))for(const n of m[1].matchAll(/'([^']+)'/g))check(names.has(n[1]),`Invalid story or method repository ${n[1]}`);
for(const m of app.matchAll(/data-repo="([^"$]+)"/g))check(names.has(m[1]),`Invalid story button ${m[1]}`);
const assets=new Set([...app.matchAll(/(?:src|href)="((?:public|src|docs|source-records)\/[^"]+)"/g),...index.matchAll(/(?:src|href)="((?:public|src|docs|source-records)\/[^"]+)"/g)].map(m=>m[1]).filter(x=>!x.includes('${')));
for(const file of assets)try{await access(file)}catch{errors.push('Missing asset: '+file)}
for(const n of ['multi-camera-prototype','registration-validation','low-light-comparison','colourised-reconstruction'])try{await access(`public/assets/evidence/${n}.png`)}catch{errors.push('Missing evidence '+n)}
const css=await readFile('src/styles/main.css','utf8');check(css.includes('prefers-reduced-motion'),'Missing reduced-motion rule');check(css.includes('focus-visible'),'Missing keyboard focus');check(css.includes('max-width:700px'),'Missing mobile breakpoint');check(index.includes('Skip to content'),'Missing skip link');
const typography=await readFile('src/styles/typography.css','utf8');
const figureStyles=await readFile('src/styles/figures.css','utf8');
for(const [file,contents] of [['main.css',css],['typography.css',typography],['figures.css',figureStyles],['publications.css',await readFile('src/styles/publications.css','utf8')],['app.js',app]])for(const m of contents.matchAll(/font-size:\s*([.\d]+)(rem|px)/g))check(+m[1]>=(m[2]==='rem'?1.125:18),`Undersized interface text in ${file}: ${m[0]}`);
check(index.includes('src/styles/typography.css'),'Missing shared typography stylesheet');
check(index.includes('src/styles/figures.css'),'Missing paper figure stylesheet');
const register=JSON.parse(await readFile('source-records/public-source-register.json','utf8'));check(register.repositories.length===repositories.length&&register.repositories.every(r=>names.has(r.name)),'Public source register differs from the portfolio');const localAssets=JSON.parse(await readFile('source-records/asset-register.json','utf8'));const allowedAssets=localAssets.assets.filter(a=>a.display_permission==='public-and-private');check(register.assets.length===allowedAssets.length+6,'Public asset register does not match approved source assets and six authored SVGs');
for(const f of context.window.PAPER_FIGURES){check(register.assets.some(a=>a.id===f.id&&a.path===f.path),'Featured figure missing from public register: '+f.id);check(ids.has(f.paper_id),'Invalid figure paper: '+f.id);try{const bytes=await readFile(f.path);if(f.sha256)check(createHash('sha256').update(bytes).digest('hex')===f.sha256,'Scientific image changed: '+f.id)}catch{errors.push('Missing featured figure: '+f.id)}}
for(const m of app.matchAll(/paperFigure\('([^']+)'/g))check(context.window.PAPER_FIGURES.some(f=>f.id===m[1]),'Unregistered story figure '+m[1]);
check(index.includes('src/scripts/paper-figures.js'),'Missing manuscript figure data script');
const walk=async dir=>{let files=[];for(const n of await readdir(dir)){const p=dir+'/'+n;if((await stat(p)).isDirectory())files.push(...await walk(p));else files.push(p)}return files};
const dist=await walk('dist');check(!dist.some(p=>/verification|repositories\/|\.docx|\.pdf|\.py/.test(p)),'Private/review material included in dist');
const report={date:new Date().toISOString().slice(0,10),checks:[`${repositories.length} repository records matched to the revised Word portfolio, related endpoints and paper mappings`,'9 paper records and 6 research stages','Relationship kinds and evidence basis','Referenced static assets exist','Reduced motion, keyboard-focus styles, mobile rules and skip link','Interface typography floor: 1.125rem / 18px, with shared stylesheet loaded','Public asset register and build exclusion of review/source files'],passed:errors.length===0,errors,distribution_files:dist.length};
await import('node:fs/promises').then(fs=>fs.writeFile(resolve('verification/static-checks.json'),JSON.stringify(report,null,2)+'\n'));
if(errors.length){console.error(errors.join('\n'));process.exitCode=1}else console.log('Static checks passed: complete source mappings, assets, accessibility foundations and public-safe build.');
