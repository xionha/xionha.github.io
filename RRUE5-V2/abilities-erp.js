// ============================================================================
// DOCUMENTATION DES APTITUDES ERP (catégorie « ERP » de l'encyclopédie)
// Même format que DETAILS dans abilities.js (voir la liste des champs là-bas).
// Ces fiches sont fusionnées dans DETAILS au chargement de l'encyclopédie.
// ============================================================================

// Catégorie et groupes des aptitudes ERP (affichés sur abilities-erp.html)
const CATEGORY_ERP = {
  key: 'erp', label: 'ERP', color: 'var(--erp)',
  desc: 'Aptitudes liées au jeu de rôle érotique.',
  groups: [
    { label: 'Menus ERP', abilities: [
      [1976, 'Menu ERP'], [2288, 'Statistiques ERP'],
    ]},
    { label: 'Actions', abilities: [
      [1603, 'Orgasme (F)'], [1605, 'Orgasme (M)'], [2436, 'Pudeur Renversée'], [2411, 'Jeter culotte sale'],
      [2167, 'Transformer en concubi'],
    ]},
    { label: 'Consommables ERP', abilities: [
      [1041, 'Consommer Aphrodisiaque'], [1042, 'Consommer Philtre de fertilité'],
      [1043, "Consommer Philtre d'infertilité"], [1883, 'Boire Serum de lactation'], [2431, 'Boire Gokkun'],
    ]},
    { label: 'Accessoires', abilities: [
      [2130, 'Mettre Plug Vaginal S'], [2131, 'Mettre Plug Vaginal M'], [2132, 'Mettre Plug Vaginal L'],
      [2133, 'Mettre Plug Vaginal XL'], [2134, 'Mettre Plug Vaginal XXL'], [2143, 'Retirer Plug Vaginal'],
      [2135, 'Mettre Plug Anal S'], [2139, 'Mettre Plug Anal M'], [2138, 'Mettre Plug Anal L'],
      [2140, 'Mettre Plug Anal XL'], [2141, 'Mettre Plug Anal XXL'], [2142, 'Retirer Plug Anal'],
      [2432, 'Enfiler perles anales'], [2424, 'Utiliser sac de bondage'], [2425, 'Utiliser sac de jouets'],
    ]},
    { label: 'Tomes', abilities: [
      [2422, 'Ouvrir Tome Succubique'], [2423, 'Ouvrir Tome de Métamorphose Charnelle'],
      [2470, 'Ouvrir Tome de Domination'], [2471, 'Ouvrir Tome de Conjuration Obscène'],
      [2472, "Ouvrir Tome D'Impudicité"],
    ]},
  ],
};

const DETAILS_ERP = {
  1976: { // Menu ERP
    desc: 'Ouvre le menu des actions lubriques que le personnage peut effectuer.',
    menus: ['Orgasmes', 'Stimulations', 'BDSM', 'Souillures', 'Exhibitionnisme'],
  },
  2288: { // Statistiques ERP
    desc: 'Affiche les statistiques générales et de Corps du système Désir lubrique.',
    affiche: {
      'Stats Générales': ['Luxure', 'XP Luxure', 'Inhibition', 'Stimulation', 'Essence de désir', 'Dominance', 'Douleur', 'Humiliation'],
      'Corps': ['Oral', 'Dilatation Anale', 'Gaping Anal'],
    },
  },
};
