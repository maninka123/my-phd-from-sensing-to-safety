(() => {
  'use strict';
  // Replace these placeholder names, descriptions and avatar paths here.
  const avatar = 'public/assets/people/placeholder-avatar.svg';
  const groups = [
    { id: 'supervisors', title: 'Supervisors', members: [
      { name: 'Prof ABC ABC', description: 'Guides my research.', avatar },
      { name: 'Prof ABC ABC', description: 'Supports my methods.', avatar }
    ] },
    { id: 'collaborators', title: 'Research collaborators', members: [
      { name: 'ABC ABC', description: 'Helps with experiments.', avatar }
    ] },
    { id: 'acknowledgements', title: 'Acknowledgements', members: [
      { name: 'ABC ABC', description: 'Supports lab testing.', avatar },
      { name: 'ABC ABC', description: 'Helps collect my data.', avatar },
      { name: 'ABC ABC', description: 'Offers feedback and support.', avatar }
    ] }
  ];
  const esc = value => String(value).replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[character]));
  const card = person => `<article class="person-card"><img class="person-avatar" src="${esc(person.avatar)}" width="72" height="72" alt="" loading="lazy"><div class="person-copy"><h4>${esc(person.name)}</h4><p>${esc(person.description)}</p></div></article>`;
  const group = item => `<section class="people-group people-${item.id}" aria-labelledby="people-${item.id}-title"><h3 id="people-${item.id}-title">${esc(item.title)}</h3><div class="people-cards">${item.members.map(card).join('')}</div></section>`;
  function render() {
    return `<section class="people-section container" id="story-people" aria-labelledby="people-title"><div class="people-heading"><div><div class="eyebrow">Behind my research</div><h2 id="people-title">People & acknowledgements</h2></div></div><div class="people-contributors">${groups.slice(0, 2).map(group).join('')}</div>${group(groups[2])}</section>`;
  }
  window.PEOPLE = { groups, render };
})();
