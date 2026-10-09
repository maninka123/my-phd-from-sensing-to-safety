(() => {
  'use strict';
  const parts=[
    {id:'supports',name:'Roof supports',description:'Hydraulic supports hold up the roof above the working area.',x:470,y:180,area:'195,127 1238,127 1320,218 1300,475 208,475'},
    {id:'shearer',name:'Shearer',description:'Rotating cutting drums remove coal as the machine travels along the face.',x:740,y:366,area:'460,259 572,270 641,315 867,313 1023,345 1037,465 920,475 873,426 609,421 463,401'},
    {id:'conveyor',name:'Face conveyor',description:'A chain conveyor carries the cut coal along the face.',x:420,y:480,area:'280,428 1385,428 1390,504 300,504'},
    {id:'face',name:'Coal face',description:'The exposed coal seam where the shearer cuts.',x:1290,y:375,area:'1106,225 1395,225 1406,237 1406,518 1118,518 1106,507'},
    {id:'sensor',name:'Sensing unit',description:'LiDAR and a camera observe the space beneath the canopy.',x:1085,y:108,area:'1043,213 1082,213 1082,245 1043,245'}
  ];
  const render=()=>`<figure class="hero-visual longwall-explorer" id="story-longwall"><div class="visual-topline"><span>Inside the longwall face</span><span>Interactive cutaway</span></div><div class="longwall-scene" role="group" aria-label="Explore the longwall illustration"><img src="public/assets/diagrams/longwall-story.svg" width="1600" height="600" alt="Original cutaway illustration with hydraulic shield supports, a twin-drum shearer, a face conveyor, an exposed coal seam and a proposed sensing unit. The coal face is partly removed to reveal the machinery."><svg class="longwall-hitareas" viewBox="0 0 1600 600" aria-hidden="true"><path class="longwall-leader" d="M1085 108L1063 226"/>${[parts[0],parts[2],parts[1],parts[3],parts[4]].map(p=>`<polygon class="longwall-hitarea" points="${p.area}" data-longwall-item="${p.id}"/>`).join('')}</svg>${parts.map((p,i)=>`<button type="button" class="longwall-marker" style="left:${p.x/16}%;top:${p.y/6}%" data-longwall-item="${p.id}" aria-label="${p.name}" aria-pressed="false" aria-controls="longwall-detail"><span aria-hidden="true">${i+1}</span></button>`).join('')}</div><figcaption class="visual-caption longwall-caption"><div class="longwall-caption-top"><p><strong>See the space. Understand the relationships.</strong>Original illustrative cutaway; equipment and sensing positions are not to scale.</p><div class="longwall-detail" id="longwall-detail" aria-live="polite" aria-atomic="true"><strong id="longwall-part-name">Explore the mining face</strong><p id="longwall-part-description">Select an item for a short description.</p></div></div><div class="longwall-parts" role="group" aria-label="Mining face items">${parts.map((p,i)=>`<button type="button" data-longwall-item="${p.id}" aria-controls="longwall-detail" aria-pressed="false"><span aria-hidden="true">${i+1}</span>${p.name}</button>`).join('')}</div></figcaption></figure>`;
  document.addEventListener('click',event=>{
    const target=event.target.closest('[data-longwall-item]');
    if(!target)return;
    const figure=target.closest('.longwall-explorer');
    const part=parts.find(p=>p.id===target.dataset.longwallItem);
    if(!figure||!part)return;
    figure.querySelectorAll('button[data-longwall-item]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.longwallItem===part.id)));
    figure.querySelectorAll('.longwall-hitarea').forEach(a=>a.setAttribute('data-selected',String(a.dataset.longwallItem===part.id)));
    figure.querySelector('#longwall-part-name').textContent=part.name;
    figure.querySelector('#longwall-part-description').textContent=part.description;
  });
  window.LONGWALL_SCENE={render};
})();
