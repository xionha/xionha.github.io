// ============================================================
// Métiers : liste des crafts de chaque métier et leur coût en points de projets.
// Pour ajouter un métier : { nom, crafts: [[objet, coût], …] }, ou { nom, groupes: [{ titre, crafts }] } pour des sous-catégories.
// Coût inconnu : null. Un 3e élément optionnel ajoute une note sous l'objet (ex. matériaux nécessaires).
// ============================================================
const METIERS = [
  {
    nom: 'Enchanteur',
    crafts: [
      ['Focus', 25],
      ['Amulette de vigueur', 25],
      ['Joyau de réserve', 25],
      ['Bracelets de force', 25],
      ['Gants de visée', 25],
      ["Bottes d'aventurier", 25],
      ['Chaussures en toile', 25],
      ['Cape Lourde', 25],
      ['Cape en soie', 25],
      ['Gants de lanceur de sort', 25],
      ['Ceinture de potion enchantée', 10],
      ['Amulette de concentration', 25],
      ['Tomes Magie', 25],
      ['Infusion', 15],
    ],
  },
  {
    nom: 'Forgeron armurier',
    groupes: [
      { titre: 'Armes', crafts: [
        ['Lame', 18], ['Espadon', 27], ['Hache', 18], ['Grande Hache', 27], ['Matraque', 18],
        ['Masse', 27], ['Lance', 18], ['Dague', 27], ['Katana', 18],
      ] },
      { titre: 'Armes de qualité', crafts: [
        ['Lame de qualité', 36], ['Espadon de qualité', 66], ['Hache de qualité', 36], ['Grande Hache de qualité', 66], ['Matraque de qualité', 36],
        ['Masse de qualité', 66], ['Lance de qualité', 36], ['Dague de qualité', 66], ['Katana de qualité', 36],
      ] },
      { titre: 'Boucliers, armes secondaires et munitions', crafts: [
        ['Pieu Argent', 9], ['Bouclier', 15], ['Bouclier de qualité', 30], ['Lame de lancer', 3],
        ['Lame (Main Gauche)', 30], ['Hache (Main Gauche)', 30], ['Dague de Parade', 30], ['Flèches à pointes barbelées', 2],
      ] },
      { titre: 'Armures et équipement', crafts: [
        ['Armure légère', 27], ['Armure intermédiaire', 42], ['Armure lourde', 66], ['Ceinture de potion', 9], ['Vêtement renforcé', 66],
      ] },
      { titre: 'Entretien', crafts: [
        ['Entretenir armes', 5], ['Entretenir armure', 5],
      ] },
    ],
  },
  {
    nom: 'Ingénieur',
    groupes: [
      { titre: 'Armes à distance', crafts: [
        ['Arc', 6], ['Arbalète', 9], ['Tromblon', 13],
      ] },
      { titre: 'Armes à distance de qualité', crafts: [
        ['Arc de qualité', 9], ['Arbalète de qualité', 13], ['Tromblon de qualité', 16],
      ] },
      { titre: 'Grands projets', crafts: [
        ['Dynamite', 100], ['Canon', 100], ['Installations', 10], ['Corde', 100],
      ] },
      { titre: 'Mécanismes et consommables', crafts: [
        ['Siphon mécanique', 7], ['Filet de capture', 3], ["Pierre d'éclat", 7], ['Pistolet à silex', 8],
        ['Golem', 23], ["Golem d'Elite", 35], ['Bombe Incendiaire', 2], ['Munitions', 2],
        ['Munitions explosives', 2], ['Fumigène', 2], ['Pièges', 2],
      ] },
      { titre: 'Véhicules', crafts: [
        ['Bateaux', 100], ['Chariots', 50],
      ] },
      { titre: 'Bâtiments', crafts: [
        ['Dispensaire', 100], ["Salle d'étude", 100], ['Forge de campagne', 100], ['Bains privés', 100], ['Zone Récolte', 100],
      ] },
    ],
  },
  {
    nom: 'Alchimiste',
    groupes: [
      { titre: 'Poisons et antidotes', crafts: [
        ['Poison de Mana', 10], ['Antidote Poison de Mana', 5], ['Poison Toxique', 10], ['Antidote Poison Toxique', 5],
      ] },
      { titre: 'Potions et remèdes', crafts: [
        ['3× Potion de Mana', 4], ['Baume cicatrisant', 3], ['Baume anti brûlure', 3], ['3× Potion de vie', 4],
        ['Philtre de fertilité', 3], ["Philtre d'infertilité", 3], ['Remède Brume Ecarlate', 4],
        ['Remède Langueur des tombes', 4], ['Remède Lenteur du sang', 4],
      ] },
      { titre: 'Dopants et produits divers', crafts: [
        ['Dopant Mystique', 6], ['Dopant Physique', 6], ['Recreatif', 3], ['Aphrodisiaque', 6],
        ['Parfum', 1], ['Savon', 1], ['Comsétiques', 1], ["Flasque d'acide", 3], ['Potion de Lactation', 1],
      ] },
      { titre: 'Essences', crafts: [
        ['Essence de feu', 5], ["Essence d'eau", 5], ["Essence d'air", 5], ['Essence de terre', 5],
        ['Essence de lumière', 5], ['Essence Sanguine', 5], ['Essence Arcanique', 5],
      ] },
    ],
  },
  {
    nom: 'Tavernier',
    crafts: [
      ['Casse-croûte', 2], ['Repas', 3], ['Jus', 3], ['Alcool doux', 4], ['Spiritueux', 7],
      ['Dés pour jeux', 1], ['Rations de guerres', 8], ['Plat Préparé', 5], ['Boisson Préparée', 5],
    ],
  },
  {
    nom: 'Maître des bêtes',
    crafts: [
      ['Bête', 20], ['Bête Féroce', 35], ['Monture', 18], ['Flèches/Carreaux', 1],
    ],
  },
  {
    nom: 'Esclavagiste',
    crafts: [
      ['Garde', 3, 'Nécessite : Lame, Armure légère'],
      ['Garde de qualité', 6, 'Nécessite : Lame de qualité, Armure intermédiaire'],
      ['Escouade', 11, 'Nécessite : 4 Gardes'],
      ['Escouade surentraînée', 19, 'Nécessite : 4 Gardes de qualité'],
    ],
  },
  {
    nom: 'Médecin',
    crafts: [
      ['Baume cicatrisant', 3], ['Baume anti brûlure', 3], ['3× Potion de vie', 4],
      ['Remède Brume Ecarlate', 4], ['Remède Langueur des tombes', 4], ['Remède Lenteur du sang', 4],
    ],
  },
];

(function render(){
  const root = document.getElementById('metiers');
  const tabs = document.getElementById('metiers-tabs');
  const search = document.getElementById('search');
  const status = document.getElementById('search-status');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;' }[c]));
  const slug = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const norm = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

  const groupsOf = m => m.groupes || [{ titre: null, crafts: m.crafts }];
  const countOf = m => groupsOf(m).reduce((n, g) => n + g.crafts.length, 0);
  // Affichage du métier qui a le plus de crafts à celui qui en a le moins
  METIERS.sort((x, y) => countOf(y) - countOf(x));
  const costHTML = c => c == null ? '<span class="pts unknown" title="Coût inconnu">?</span>' : `<span class="pts">${c}</span>`;

  const total = METIERS.reduce((n, m) => n + countOf(m), 0);
  tabs.innerHTML = `<button type="button" role="tab" data-id="tous" aria-selected="false">Tous <span>${total}</span></button>` + METIERS.map(m => `<button type="button" role="tab" data-id="${slug(m.nom)}" aria-selected="false">${esc(m.nom)} <span>${countOf(m)}</span></button>`).join('');
  root.innerHTML = METIERS.map(m => {
    const gs = groupsOf(m);
    const single = gs.length === 1;
    return `
    <section class="metier${single ? ' single' : ''}" id="${slug(m.nom)}" data-id="${slug(m.nom)}" role="tabpanel">
      <h2>${esc(m.nom)}</h2>
      ${m.desc ? `<p class="metier-desc">${esc(m.desc)}</p>` : ''}
      <div class="groups">
        ${gs.map(g => `<div class="group">
          ${g.titre ? `<h3>${esc(g.titre)}</h3>` : ''}
          <ul class="crafts">
            ${g.crafts.map(([obj, cout, note]) => `<li data-q="${esc(norm(obj + ' ' + m.nom + ' ' + (note || '')))}"><span class="obj">${esc(obj)}${note ? `<span class="craft-note">${esc(note)}</span>` : ''}</span>${costHTML(cout)}</li>`).join('')}
          </ul>
        </div>`).join('')}
      </div>
    </section>`;
  }).join('');

  const ids = METIERS.map(m => slug(m.nom));
  let current = ids.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'tous';

  function show(){
    const q = norm(search.value.trim());
    let total = 0;
    root.querySelectorAll('.metier').forEach(sec => {
      let n = 0;
      sec.querySelectorAll('li').forEach(li => { const ok = !q || li.dataset.q.includes(q); li.hidden = !ok; if (ok) n++; });
      sec.querySelectorAll('.group').forEach(g => { g.hidden = !g.querySelector('li:not([hidden])'); });
      sec.hidden = q ? n === 0 : (current !== 'tous' && sec.dataset.id !== current);
      total += n;
    });
    tabs.querySelectorAll('button').forEach(b => b.setAttribute('aria-selected', String(!q && b.dataset.id === current)));
    root.classList.toggle('searching', !!q);
    status.hidden = !q;
    status.textContent = q ? (total ? `${total} objet${total > 1 ? 's' : ''} trouvé${total > 1 ? 's' : ''} dans tous les métiers` : 'Aucun objet ne correspond.') : '';
  }

  tabs.addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    current = b.dataset.id;
    history.replaceState(null, '', current === 'tous' ? location.pathname : '#' + current);
    search.value = '';
    show();
  });
  search.addEventListener('input', show);
  document.addEventListener('keydown', e => {
    if (e.key === '/' && document.activeElement !== search) { e.preventDefault(); search.focus(); }
    if (e.key === 'Escape' && document.activeElement === search) { search.value = ''; show(); }
  });
  show();
})();
