// ============================================================================
// CHANGELOG : petit bouton « Changelog » sous le menu de navigation, qui ouvre la liste des
// modifications de la documentation. Pour ajouter une mise à jour : nouvelle entrée EN HAUT de CHANGELOG.
// Chaque section : { titre, items: ['texte', …] }  (le texte peut contenir <b>…</b>)
// ============================================================================
const CHANGELOG = [
  {
    date: '24 novembre 2026',
    titre: 'Mise à jour du jeu : arts martiaux, prothèses et équilibrage',
    sections: [
      { titre: 'Nouveautés', items: [
        "<b>Arts martiaux</b> : nouvelle Maîtrise <b>Voie du Poing et du Pied</b>. Elle donne Ciel Sans Nuages et Infusion de Chi, et débloque Pied Sauté, Double Pied et Bond. Jet d'attaque : 3d6 + la meilleure valeur entre Incantation et Capacité de combat.",
        "Nouvelle arme <b>Ceste</b> (+25 Dégâts contondants). Avec la Voie du Poing et du Pied, elle débloque Croc du Dragon de l'Ombre et Paume des trois souffles.",
        "<b>Prothèses</b> : nouvel objet (emplacement 2H) qui donne Coup de Lame (Prothèse) et Recharge Prothèse. Lance-Flamme, Lance-Filet et Tir (Prothèse) existent aussi, mais aucune source ne les donne encore.",
        "<b>Parchemins de Transport</b> (Home et Telith) : téléportation. Interdit de les utiliser pour fuir une capture.",
      ]},
      { titre: 'Magie', items: [
        "<b>Trait de Foudre, Foudroiement, Tornade</b> : coût en Mana de 20 à <b>15</b> (15 − Air/2).",
        "<b>Bourrasque</b> : coûte maintenant <b>1 PA</b> au lieu d'1 Action Spéciale, et <b>10 Mana</b> au lieu de 30.",
        "<b>Liens de sang</b> : le coût en Mana n'a plus de minimum de 5.",
        "<b>Bulle Curatrice</b> : soigne (Dégâts Magiques + Eau) × <b>0,8</b> au lieu de × 0,5.",
      ]},
      { titre: 'Combat', items: [
        "<b>Tir de Pistolet</b> : portée de 6 à <b>4 Tiles</b>.",
        "<b>Attrapper</b> et <b>Coup de tête</b> ne sont plus donnés automatiquement quand on est sans arme (l'ancien état « Désarmé » est devenu Artiste Martial).",
      ]},
      { titre: 'Corruption', items: [
        "<b>Divertir son auditoire</b> : rapporte <b>40</b> pièces de bronze au lieu de 20 et réduit la Corruption des spectateurs de 25.",
        "<b>Emouvoir son auditoire</b> : réduit la Corruption des spectateurs de 25.",
        "<b>Boire spiritueux</b> : réduit la Corruption de 20.",
      ]},
      { titre: 'Personnages', items: [
        "<b>Sirène</b> : ne donne plus Air −5 / Eau +5.",
      ]},
    ],
  },
];

(function(){
  const nav = document.querySelector('nav[aria-label="Pages"]');
  if (!nav || !CHANGELOG.length) return;

  const css = document.createElement('style');
  css.textContent = `
  .cl-wrap{ display:flex; justify-content:center; margin-top: 10px; }
  .cl-btn{
    font-family: var(--font-display, serif); font-size: 10.5px; letter-spacing: 2px; text-transform: uppercase;
    color: var(--text-faint, #8a7d68); background: transparent; cursor: pointer;
    border: 1px solid var(--border, #3a3226); border-radius: 999px; padding: 4px 12px;
    transition: color .15s, border-color .15s;
  }
  .cl-btn:hover, .cl-btn:focus-visible{ color: var(--gold, #d9a441); border-color: var(--bronze, #8c6a3c); outline: none; }
  .cl-dialog{
    width: min(680px, calc(100vw - 32px)); max-height: min(80vh, 760px); padding: 0;
    background: var(--surface, #1b1712); color: var(--text, #e8dcc4);
    border: 1px solid var(--border-bright, #5a4a34); border-radius: 10px;
    box-shadow: 0 20px 60px rgba(0,0,0,.6); font-family: var(--font-body, Georgia, serif);
    text-align: left;
  }
  .cl-dialog::backdrop{ background: rgba(0,0,0,.55); }
  .cl-head{
    position: sticky; top: 0; display:flex; align-items:center; justify-content:space-between;
    padding: 14px 20px; background: var(--surface, #1b1712); border-bottom: 1px solid var(--border, #3a3226);
  }
  .cl-head h2{ margin:0; font-family: var(--font-display, serif); font-size: 16px; letter-spacing: 2px; text-transform: uppercase; color: var(--gold, #d9a441); }
  .cl-close{ background:none; border:none; color: var(--text-dim, #b5a68a); font-size: 18px; cursor:pointer; padding: 2px 6px; }
  .cl-close:hover{ color: var(--text, #e8dcc4); }
  .cl-body{ padding: 6px 20px 20px; }
  .cl-entry + .cl-entry{ border-top: 1px solid var(--border, #3a3226); margin-top: 18px; }
  .cl-date{ margin: 16px 0 2px; font-family: var(--font-display, serif); font-size: 11px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-faint, #8a7d68); }
  .cl-title{ margin: 0 0 6px; font-size: 18px; font-weight: 600; color: var(--bronze-bright, #e0b46a); }
  .cl-sec{ margin: 12px 0 4px; font-family: var(--font-display, serif); font-size: 12px; letter-spacing: 1.5px; text-transform: uppercase; color: var(--text-dim, #b5a68a); }
  .cl-body ul{ margin: 0; padding-left: 20px; }
  .cl-body li{ margin: 4px 0; line-height: 1.45; font-size: 15.5px; }
  .cl-body b{ color: var(--text, #e8dcc4); font-weight: 600; }
  `;
  document.head.appendChild(css);

  const wrap = document.createElement('div');
  wrap.className = 'cl-wrap';
  wrap.innerHTML = '<button type="button" class="cl-btn" aria-haspopup="dialog">Changelog</button>';
  nav.insertAdjacentElement('afterend', wrap);

  const dlg = document.createElement('dialog');
  dlg.className = 'cl-dialog';
  dlg.setAttribute('aria-label', 'Changelog');
  dlg.innerHTML = `
    <div class="cl-head"><h2>Changelog</h2><button type="button" class="cl-close" aria-label="Fermer">✕</button></div>
    <div class="cl-body">${CHANGELOG.map(e => `
      <section class="cl-entry">
        <p class="cl-date">${e.date}</p>
        <h3 class="cl-title">${e.titre}</h3>
        ${e.sections.map(s => `<h4 class="cl-sec">${s.titre}</h4><ul>${s.items.map(i => `<li>${i}</li>`).join('')}</ul>`).join('')}
      </section>`).join('')}
    </div>`;
  document.body.appendChild(dlg);

  wrap.querySelector('.cl-btn').addEventListener('click', () => dlg.showModal());
  dlg.querySelector('.cl-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // clic sur le fond
})();
