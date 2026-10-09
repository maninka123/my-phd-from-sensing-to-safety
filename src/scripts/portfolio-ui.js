(() => {
  'use strict';
  const content=window.PORTFOLIO;
  const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const paths={
    challenge:'M4 19V9l5-5 5 5v10Zm10-7 3-3 3 3v7M8 19v-5h3v5M3 19h18',
    scan:'M4 8V4h4m8 0h4v4m0 8v4h-4M8 20H4v-4M8 12a4 4 0 0 1 8 0m-6 0a2 2 0 0 1 4 0m-2 0v5',
    ruler:'m4 16 12-12 4 4L8 20Zm5-5 3 3m0-6 2 2m1-5 2 2',
    integrate:'M4 4h6v6H4Zm10 10h6v6h-6ZM10 7h7v7M7 10v7h7',
    cube:'m12 3 9 5v9l-9 5-9-5V8Zm-9 5 9 5 9-5M12 13v9m-5-7 5-3 5 3',
    shield:'m12 3 8 3v6c0 5-5 8-8 10-3-2-8-5-8-10V6Zm-4 9 3 3 5-6'
  };
  const icon=name=>`<svg class="portfolio-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name]||paths.scan}"/></svg>`;
  const research=id=>`#thesis/${id==='synthesis'?'appendices':id}`;
  function hero(){
    const h=content.hero,summary=window.PUBLICATION_SUMMARY;
    const count=Object.values(summary.groups).reduce((n,g)=>n+g.length,0);
    return `<section class="portfolio-hero" aria-labelledby="portfolio-title"><div class="portfolio-opening"><div class="eyebrow">${esc(h.eyebrow)}</div><h1 id="portfolio-title">${esc(h.title)}</h1><p class="portfolio-subtitle">${esc(h.subtitle)}</p><p class="intro">${esc(h.description)}</p><ul class="research-tags" aria-label="Research themes">${h.tags.map(t=>`<li>${esc(t)}</li>`).join('')}</ul><div class="byline"><span class="byline-dot" aria-hidden="true"></span>Pasindu Ranasinghe \u00b7 PhD research \u00b7 UNSW Sydney <span class="people-separator" aria-hidden="true">|</span><a class="people-jump" href="#story/people">People &amp; acknowledgements</a></div></div><div class="portfolio-overview"><div class="portfolio-stats" aria-label="Research portfolio"><button type="button" data-publications><strong>${count}</strong><span>Research Papers</span></button><a href="#tools"><strong>${window.HUB.repositories.length}</strong><span>Research Tools</span></a><button type="button" data-publications><strong>${summary.patents.length}</strong><span>Patent Applications</span></button></div><div class="actions"><a class="button" href="#story/context">Follow the story \u2193</a><a class="text-link" href="#tools">Explore the tools \u2197</a></div></div></section>`;
  }
  function progression(){return `<nav class="research-progression" aria-label="Research progression">${content.progression.map((s,i)=>`<a href="#story/${s.section}">${icon(s.icon)}<span>${esc(s.label)}</span>${i<content.progression.length-1?'<span class="progression-arrow" aria-hidden="true">→</span>':''}</a>`).join('')}</nav>`}
  function visual(r,figureCredit,full=false){
    const t=content.tools[r.name];let image,caption,credits='';
    if(!full||(!t.visual&&!t.screenshot)){image=window.TOOL_ILLUSTRATIONS.render(content.toolDrawings[r.name]);caption='Original concept illustration.';}
    else if(t.visual){const f=window.PAPER_FIGURES.find(f=>f.id===t.visual);image=`<a href="${f.path}" target="_blank" rel="noopener noreferrer" aria-label="Inspect complete figure for ${esc(r.title)}"><img src="${f.path}" width="${f.width}" height="${f.height}" loading="lazy" alt="${esc(f.story_description)}"></a>`;caption=t.note;credits=full?figureCredit(f):`<a href="#sources">Figure credits ↗</a>`;}
    else if(t.screenshot){image='<a href="public/assets/evidence/rotating-target-studio.png" target="_blank" rel="noopener noreferrer"><img src="public/assets/evidence/rotating-target-studio.png" width="520" height="489" loading="lazy" alt="Rotating Target Calibration Studio documentation screenshot showing simulated target geometry."></a>';caption='Studio screenshot · noise-free simulation, not measured timing accuracy.';credits='<a href="public/assets/evidence/rotating-target-studio.LICENSE.txt">MIT · Pasindu Ranasinghe, UNSW (2026)</a>';}
    if(!full){const category=({calibration:'Calibration',sensing:'Sensing',reconstruction:'Reconstruction',interpretation:'Safety',extensions:'Further applications'})[r.group];return `<figure class="tool-visual"><div class="tool-visual-image">${image}</div><figcaption class="tool-card-heading"><span class="repo-category">${category}</span><h3>${esc(r.title)}</h3></figcaption></figure>`;}
    return `<figure class="tool-visual${full?' tool-visual-detail':''}"><div class="tool-visual-image">${image}</div><figcaption>${esc(caption)}${credits?` <span>${credits}</span>`:''}</figcaption></figure>`;
  }
  const accessLabel=v=>v.public?'Public source':'Private / unavailable';
  function access(r,v,ext){return `<section class="tool-access"><h3>Access & reuse</h3><p>${v.public?'Source and documentation were publicly accessible.':'Documentation-only profile in this hub. The supplied portfolio identifies the implementation as private; anonymous checks did not provide public access.'} Access snapshot: ${esc(v.reviewDate)}.</p><p><strong>Code terms:</strong> ${esc(v.licence)}${v.licenceUrl?` · ${ext(v.licenceUrl,'Licence record')}`:''}. Public access alone does not grant permission to reuse code.</p>${v.demo?'<p>A separately hosted interactive demo is linked below.</p>':''}</section>`}
  function explore(r,v){return `<section class="tool-explore"><h3>What You Can Explore</h3>${!v.public?'<p>These functions are described in the supplied documentation; the implementation is not publicly available in the access snapshot.</p>':''}<ul>${content.tools[r.name].explore.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>${r.name==='Scene-Graph_Mine-Safety'?'<p>The single-frame demonstrator does not provide live sensing, temporal graph updates or the full memory pipeline.</p>':''}</section>`}
  window.PORTFOLIO_UI={hero,progression,visual,access,explore,accessLabel,research};
})();
