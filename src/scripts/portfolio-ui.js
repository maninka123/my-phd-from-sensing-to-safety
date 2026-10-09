(() => {
  'use strict';
  const content=window.PORTFOLIO;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths={
    scan:'M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4M8 12a4 4 0 0 1 8 0m-6 0a2 2 0 0 1 4 0m-2 0v5',
    ruler:'m4 16 12-12 4 4L8 20Zm5-5 3 3m0-6 2 2m1-5 2 2',
    integrate:'M4 4h6v6H4Zm10 10h6v6h-6ZM10 7h7v7M7 10v7h7',
    cube:'m12 3 9 5v9l-9 5-9-5V8Zm-9 5 9 5 9-5M12 13v9m-5-7 5-3 5 3',
    shield:'m12 3 8 3v6c0 5-5 8-8 10-3-2-8-5-8-10V6Zm-4 9 3 3 5-6'
  };
  const icon=name=>`<svg class="portfolio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.scan}"/></svg>`;
  const research=id=>`#thesis/${id==='synthesis'?'appendices':id}`;
  function hero(figureCredit){
    const h=content.hero,f=window.PAPER_FIGURES.find(f=>f.id===h.figure);
    const summary=window.PUBLICATION_SUMMARY;
    const count=Object.values(summary.groups).reduce((n,g)=>n+g.length,0);
    return `<section class="portfolio-hero" aria-labelledby="portfolio-title"><div class="portfolio-opening"><div class="eyebrow">${esc(h.eyebrow)}</div><h1 id="portfolio-title">${esc(h.title)}</h1><p class="portfolio-subtitle">${esc(h.subtitle)}</p><p class="intro">${esc(h.description)}</p><ul class="research-tags" aria-label="Research themes">${h.tags.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div class="portfolio-stats" aria-label="Research portfolio"><button type="button" data-publications><strong>${count}</strong><span>Research Papers</span></button><a href="#tools"><strong>${window.HUB.repositories.length}</strong><span>Research Tools</span></a><button type="button" data-publications><strong>${summary.patents.length}</strong><span>Patent Applications</span></button></div><div class="actions"><a class="button" href="#story/context">Follow the story ↓</a><a class="text-link" href="#tools">Explore the tools ↗</a></div><div class="byline"><span class="byline-dot" aria-hidden="true"></span>Pasindu Ranasinghe · PhD research · UNSW Sydney</div></div><figure class="portfolio-main-visual"><div class="visual-heading"><span class="status-label">Simulated colourised point cloud</span><span>From geometry to scene context</span></div><a class="image-zoom" href="${f.path}" target="_blank" rel="noopener noreferrer" aria-label="Inspect the complete simulated single-unit point cloud"><img src="${f.path}" width="${f.width}" height="${f.height}" alt="${esc(f.story_description)}" fetchpriority="high"></a><figcaption><p>A single simulated sensing unit reveals the mining face, machinery and personnel. Array manuscript, Fig. ${f.figure}; complete figure, unchanged.</p><details><summary>Figure credit</summary><p>${figureCredit(f)}</p></details></figcaption></figure></section>`;
  }
  function progression(){return `<nav class="research-progression" aria-label="Research progression">${content.progression.map((s,i)=>`<a href="#story/${s.section}">${icon(s.icon)}<span>${esc(s.label)}</span>${i<content.progression.length-1?'<span class="progression-arrow" aria-hidden="true">→</span>':''}</a>`).join('')}</nav>`}
  function highlights(){return `<section class="research-highlights" aria-labelledby="highlights-title"><div class="highlights-heading"><h2 id="highlights-title">Research Highlights</h2><p>Evidence from separate studies, each with its own evaluation setting.</p></div><div class="highlight-grid">${content.highlights.map(h=>`<article class="highlight-card"><p class="highlight-number">${esc(h.value)}${h.unit?` <span>${esc(h.unit)}</span>`:''}</p><h3>${esc(h.label)}</h3><p class="highlight-study">${esc(h.study)}</p><details><summary>Study conditions</summary><p>${esc(h.conditions)}</p></details><a class="text-link" href="${research(h.paper)}">Read the study ↗</a></article>`).join('')}</div></section>`}
  function conceptual(kind){
    // Original geometric illustrations only: no plotted observations or application UI.
    const geometry={
      refraction:'<path d="M140 160a90 90 0 0 1 180 0" stroke="#99b9c1" stroke-width="12"/><path d="M44 45 164 110 287 136 347 177" stroke="#257a79"/><path d="m164 110 138 72" stroke-dasharray="7 7" stroke="#8b9eb5"/><circle cx="44" cy="45" r="7" fill="#315cd2"/>',
      timing:'<rect x="58" y="34" width="106" height="66" rx="8"/><circle cx="111" cy="67" r="18"/><rect x="220" y="34" width="106" height="66" rx="8"/><path d="M72 145h239m-175-17v35m53-35v35m-53-14h53"/><circle cx="270" cy="67" r="18"/><path d="m270 67 12-12"/>',
      integrate:'<rect x="47" y="62" width="80" height="76" rx="8"/><circle cx="87" cy="100" r="20"/><rect x="263" y="62" width="80" height="76" rx="8"/><path d="M127 100h45m46 0h45"/><rect x="172" y="77" width="46" height="46" rx="8"/>',
      coverage:'<path d="m88 162 77-114 70 114Zm118 0 70-114 77 114Z" fill="#e4f2f0"/><path d="M50 167h310"/><circle cx="165" cy="48" r="8" fill="#315cd2"/><circle cx="276" cy="48" r="8" fill="#257a79"/>',
      movement:'<rect x="55" y="47" width="112" height="105" rx="8" stroke-dasharray="6 6"/><rect x="94" y="47" width="112" height="105" rx="8"/><path d="M250 100h80m-20-20 20 20-20 20"/>',
      mesh:'<path d="m72 142 35-91 69 20 65-27 84 92-87 33-66-27Zm35-91 65 91 4-71 62 98 3-125 84 92m-253 6 104-71 149 65"/><g fill="#257a79"><circle cx="72" cy="142" r="5"/><circle cx="107" cy="51" r="5"/><circle cx="176" cy="71" r="5"/><circle cx="241" cy="44" r="5"/><circle cx="325" cy="136" r="5"/><circle cx="238" cy="169" r="5"/><circle cx="172" cy="142" r="5"/></g>'
    };
    return `<svg viewBox="0 0 400 200" fill="none" stroke="#315d85" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" role="img" aria-label="Conceptual ${esc(kind)} illustration; not a measured result">${geometry[kind]||geometry.integrate}</svg>`;
  }
  function visual(r,figureCredit,full=false){
    const t=content.tools[r.name];let image,caption,credits='';
    if(t.visual){const f=window.PAPER_FIGURES.find(f=>f.id===t.visual);image=`<a href="${f.path}" target="_blank" rel="noopener noreferrer" aria-label="Inspect complete figure for ${esc(r.title)}"><img src="${f.path}" width="${f.width}" height="${f.height}" loading="lazy" alt="${esc(f.story_description)}"></a>`;caption=t.note;credits=full?figureCredit(f):`<a href="#sources">Figure credits ↗</a>`;}
    else if(t.screenshot){image='<a href="public/assets/evidence/rotating-target-studio.png" target="_blank" rel="noopener noreferrer"><img src="public/assets/evidence/rotating-target-studio.png" width="520" height="489" loading="lazy" alt="Rotating Target Calibration Studio documentation screenshot showing simulated target geometry."></a>';caption='Studio screenshot · noise-free simulation, not measured timing accuracy.';credits='<a href="public/assets/evidence/rotating-target-studio.LICENSE.txt">MIT · Pasindu Ranasinghe, UNSW (2026)</a>';}
    else {image=conceptual(t.concept);caption='Conceptual illustration · not measured data.';}
    return `<figure class="tool-visual${full?' tool-visual-detail':''}"><div class="tool-visual-image">${image}</div><figcaption>${esc(caption)}${credits?` <span>${credits}</span>`:''}</figcaption></figure>`;
  }
  const accessLabel=v=>v.public?'Public source':'Private / unavailable';
  function access(r,v,ext){return `<section class="tool-access"><h3>Access & reuse</h3><p>${v.public?'Source and documentation were publicly accessible.':'Documentation-only profile in this hub. The supplied portfolio identifies the implementation as private; anonymous checks did not provide public access.'} Access snapshot: ${esc(v.reviewDate)}.</p><p><strong>Code terms:</strong> ${esc(v.licence)}${v.licenceUrl?` · ${ext(v.licenceUrl,'Licence record')}`:''}. Public access alone does not grant permission to reuse code.</p>${v.demo?'<p>A separately hosted interactive demo is linked below.</p>':''}</section>`}
  function explore(r,v){return `<section class="tool-explore"><h3>What You Can Explore</h3>${!v.public?'<p>These functions are described in the supplied documentation; the implementation is not publicly available in the access snapshot.</p>':''}<ul>${content.tools[r.name].explore.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${r.name==='Scene-Graph_Mine-Safety'?'<p>The single-frame demonstrator does not provide live sensing, temporal graph updates or the full memory pipeline.</p>':''}</section>`}
  window.PORTFOLIO_UI={hero,progression,highlights,visual,access,explore,accessLabel,research};
})();
