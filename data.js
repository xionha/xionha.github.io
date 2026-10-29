// ============================================================================
// Données du jeu partagées par index.html (simulateur) et abilities.html (encyclopédie).
// Modifier une valeur ici la met à jour sur les deux pages.
// ============================================================================

// ---- Attributs ----
// Les effets sur les caractéristiques sont définis dans STAT_FORMULAS (plus bas) et recopiés
// automatiquement dans attr.effects : effet: [min, max] gain par point investi dans l'attribut
const ATTRIBUTES = [
  { key: 'force', label: 'Force' },
  { key: 'analyse', label: 'Analyse' },
  { key: 'addresse', label: 'Adresse' },
  { key: 'endurance', label: 'Endurance' },
  { key: 'resilience', label: 'Résilience', desc: 'Diminue les dégâts pris en début de tour des statuts Saignement et Brûlure.' },
  { key: 'volonte', label: 'Volonté' },
  { key: 'perceptionMagique', label: 'Perception Magique' },
  { key: 'vitesse', label: 'Vitesse' },
  { key: 'perception', label: 'Perception' },
  // Sous-attributs sans effet sur les caractéristiques calculées : utiles uniquement pour les jets de rôle-play
  { key: 'metabolisme', label: 'Métabolisme', rp: true, desc: 'Diminue les dégâts pris en début de tour du statut Poison.' },
  { key: 'enseignement', label: 'Esoterisme' },
  { key: 'discretion', label: 'Discrétion', rp: true },
  { key: 'convaincre', label: 'Convaincre', rp: true },
  { key: 'commerce', label: 'Commerce', rp: true },
  { key: 'commandement', label: 'Commandement' },
  { key: 'deguisement', label: 'Déguisement', rp: true },
  { key: 'metier1', label: 'Metier 1', rp: true },
  { key: 'metier2', label: 'Metier 2', rp: true },
];

// ---- Formules des caractéristiques, telles que dans l'éditeur du jeu (onglet Stats) ----
// valeur = base + (Σ ROUNDDOWN(attribut × poids)) × finalMultiplier   (fonction « Sum »)
// 0.062 vérifié en jeu : Force 1 + Endurance 1 + Adresse 1 → Parade = 16 × 0.062 = 0.992 → 0 (0.0625 donnerait 1).
// Exception : Capacité de Combat à 0.0625 (l'éditeur affiche 0,062) car Force 3 + Adresse 3 → 3 en jeu (48 × 0.062 donnerait 2).
const STAT_FORMULAS = {
  pv:             { base: 100, finalMultiplier: 0.06, sources: { endurance: 50, volonte: 10, resilience: 40 } },
  mana:           { base: 50,  finalMultiplier: 0.05, sources: { perceptionMagique: 50, endurance: 50 } },
  corruption:     { base: 0, finalMultiplier: 5, sources: { volonte: 2, resilience: 1 } },
  initiative:     { base: 0, finalMultiplier: 0.062, sources: { vitesse: 14, volonte: 2 } },
  deplacement:    { base: 0, finalMultiplier: 0.36, sources: { vitesse: 0.7, endurance: 0.3 } },
  capCombat:      { base: 0, finalMultiplier: 0.0625, sources: { force: 8, addresse: 8 } },
  capTir:         { base: 0, finalMultiplier: 0.062, sources: { perception: 5, analyse: 3, addresse: 8 } },
  forceMentale:   { base: 0, finalMultiplier: 0.062, sources: { analyse: 3, volonte: 14, commandement: 1 } },
  incantation:    { base: 0, finalMultiplier: 0.062, sources: { volonte: 3, enseignement: 13, perceptionMagique: 1 } },
  esquive:        { base: 0, finalMultiplier: 0.062, sources: { vitesse: 14, addresse: 2 } },
  parade:         { base: 0, finalMultiplier: 0.062, sources: { addresse: 3, endurance: 5, force: 8 } },
  defense:        { base: 0, finalMultiplier: 0.25, sources: { resilience: 3, endurance: 2, addresse: 1 } },
  degatsPhysique: { base: 0, finalMultiplier: 0.25, sources: { force: 8, analyse: 2, addresse: 1 } },
  defenseMagique: { base: 0, finalMultiplier: 0.25, sources: { perceptionMagique: 2, volonte: 3, endurance: 1 } },
  degatsMagique:  { base: 0, finalMultiplier: 0.25, sources: { perceptionMagique: 4, volonte: 5, analyse: 2 } },
  // Stat d'équipement (EXTRA_STATS), alimentée elle aussi par les attributs
  puissanceTroupe: { base: 0, finalMultiplier: 0.02, sources: { commandement: 60, analyse: 40 } },
};

// Recopie des formules dans attr.effects : gain par point = poids × finalMultiplier
ATTRIBUTES.forEach(a => { a.effects = {}; });
Object.entries(STAT_FORMULAS).forEach(([statKey, f]) => {
  Object.entries(f.sources).forEach(([attrKey, weight]) => {
    const coef = weight * f.finalMultiplier;
    ATTRIBUTES.find(a => a.key === attrKey).effects[statKey] = [coef, coef];
  });
});

const STATS = {
  pv: 'PV', mana: 'Mana', corruption: 'Corruption', initiative: 'Initiative', deplacement: 'Déplacement',
  capCombat: 'Capacité de Combat', capTir: 'Capacité de Tir', forceMentale: 'Force Mentale',
  incantation: 'Incantation',
  esquive: 'Esquive', parade: 'Parade', defense: 'Défense', degatsPhysique: 'Dégâts Physique',
  defenseMagique: 'Défense Magique', degatsMagique: 'Dégâts Magique'
};

// ---- Tempéraments : bonus/malus sur les stats parentes ----
// Une stat parente donne son plein montant à CHACUNE de ses sous-stats (pas de répartition)
const TEMPERAMENTS = {
  "Impetueux": { conditionPhysique: 1, presence: 2, savoirFaire: 1, reflexes: 1 },
  "Physique":  { conditionPhysique: 2, savoirFaire: 3 },
  "Ingenieux": { esprit: 1, savoirFaire: 4 },
  "Savant":    { conditionPhysique: -1, esprit: 2, savoirFaire: 4 },
};

// Sous-stats de chaque stat parente qui existent dans ce simulateur
// (Métabolisme, Discrétion, Convaincre, Commerce, Déguisement et Savoir Faire
// n'affectent aucune caractéristique dérivée du tableau et ne sont donc pas calculés ici)
const PARENT_TO_ATTR = {
  conditionPhysique: ['endurance', 'force', 'metabolisme', 'resilience'],
  esprit: ['analyse', 'enseignement', 'perceptionMagique', 'volonte'],
  reflexes: ['addresse', 'discretion', 'perception', 'vitesse'],
  presence: ['convaincre', 'commerce', 'commandement', 'deguisement'],
};

// Structure d'affichage : stat parente -> sous-attributs correspondants dans ce simulateur
const PARENT_GROUPS = [
  { key: 'savoirFaire', label: 'Savoir Faire', children: ['metier1', 'metier2'] },
  { key: 'conditionPhysique', label: 'Condition Physique', children: ['endurance', 'force', 'metabolisme', 'resilience'] },
  { key: 'esprit', label: 'Esprit', children: ['analyse', 'enseignement', 'perceptionMagique', 'volonte'] },
  { key: 'reflexes', label: 'Réflexes', children: ['addresse', 'discretion', 'perception', 'vitesse'] },
  { key: 'presence', label: 'Présence', children: ['convaincre', 'commerce', 'commandement', 'deguisement'] },
];

// ---- Morphologie : bonus fixes sur les stats parentes ----
const MORPHOLOGIES = {
  "Corps gracieux": { presence: 1 },
  "Corps nerveux": { reflexes: 1 },
  "Corps massif": { conditionPhysique: 1 },
};

// ---- Espèce : bonus sur les stats parentes + bonus fixes sur certaines caractéristiques ----
// flatStats utilise directement les clés de STATS (pv, defense, deplacement, ...)
// notes = éléments purement descriptifs (aptitudes, résistances) sans impact sur les calculs
const SPECIES = {
  "Humain": { parents: { savoirFaire: 1, conditionPhysique: 1, esprit: 1, reflexes: 1, presence: 1 }, flatStats: {}, elemental: {}, notes: [] },
  "Géant": { parents: { conditionPhysique: 3 }, flatStats: { defense: 2 }, elemental: {}, notes: ['Octroie : Frappe de Géant'] },
  "Drow": { parents: { conditionPhysique: 2, reflexes: 1, esprit: 1, presence: 1 }, flatStats: {}, elemental: {}, notes: [] },
  "Céleste": { parents: { esprit: 2, reflexes: 1, presence: 1, conditionPhysique: 1 }, flatStats: {}, elemental: { sang: -10 }, notes: [] },
  "Esprit": { parents: { esprit: 2, presence: 2, savoirFaire: 1 }, flatStats: {}, elemental: {}, notes: [] },
  "Sirène": { parents: { esprit: 1, reflexes: 1, presence: 2 }, flatStats: {}, elemental: { air: -5, eau: 5 }, notes: ['Octroie : Charme-Personne', 'Octroie : Frappe Télékinétique'] },
  "Nain": { parents: { savoirFaire: 2, conditionPhysique: 3 }, flatStats: {}, elemental: {}, notes: [] },
  "Gobelin": { parents: { savoirFaire: 3, reflexes: 2 }, flatStats: { pv: -25 }, elemental: {}, notes: [] },
  "Orc": { parents: { conditionPhysique: 3 }, flatStats: { defense: 5 }, elemental: {}, notes: [] },
  "Drakheide": { parents: { conditionPhysique: 3 }, flatStats: { defense: 5 }, elemental: {}, notes: ['Octroie : Coup de griffes', 'Octroie : Coup de caudale'] },
  "Elfe": { parents: { esprit: 2, reflexes: 1, presence: 2 }, flatStats: {}, elemental: {}, notes: [] },
  "Semi-Hommes": { parents: { savoirFaire: 1, conditionPhysique: 1, esprit: 2, reflexes: 1, presence: 1 }, flatStats: {}, elemental: {}, notes: [] },
};

const STAT_LABELS_SHORT = { pv: 'PV', defense: 'Défense', deplacement: 'Déplacement' };
const PARENT_LABELS_SHORT = { conditionPhysique: 'Condition Physique', esprit: 'Esprit', reflexes: 'Réflexes', presence: 'Présence', savoirFaire: 'Savoir Faire' };

// ---- Malédiction : effets directs sur les attributs de base + bonus fixes sur certaines caractéristiques ----
// attrDelta agit DIRECTEMENT sur les attributs (pas via les stats parentes, contrairement à Tempérament/Morphologie/Espèce)
const CURSES = {
  "Démon": { attrDelta: {}, flatStats: {}, elemental: { lumiere: -10 }, notes: ['Octroie : Charme-Personne', 'Octroie : Pacte Démoniaque', 'Octroie : Transformation Démoniaque'] },
  "Vampire": { attrDelta: {}, flatStats: { forceMentale: 1, capCombat: 1 }, elemental: { sang: 10, lumiere: -10, feu: -20 }, notes: ['Octroie : Frappe Télékinétique', 'Octroie : Charme-Personne', 'Octroie : Sucer le Sang'] },
  "Lycan": { attrDelta: {}, flatStats: {}, elemental: { lumiere: -20, sang: 10 }, notes: ['Octroie : Transformation Lycanthrope I'] },
  "Mort Vivant": { attrDelta: {}, flatStats: {}, elemental: { lumiere: -30, feu: -30 }, notes: ['Immunisé au Saignement', 'Immunisé au Poison'] },
};

// ---- Corruption : un seul niveau actif à la fois (paliers non cumulables) ----
// attrDelta agit DIRECTEMENT sur les attributs, comme la Malédiction
const CORRUPTION = {
  "Niveau I – Souillure": {
    description: "Les premiers stigmates apparaissent. La peau se décolore, les yeux deviennent anormalement brillants et une sensation de froid accompagne désormais le personnage.",
    attrDelta: { endurance: -1 },
    flatStats: { incantation: 1, degatsMagique: 2, corruption: 10 },
    elemental: { lumiere: -1 },
    notes: [],
  },
  "Niveau II – Altération": {
    description: "Les veines s'assombrissent et une aura malsaine devient perceptible. Le corps commence à peiner à suivre la puissance qu'il canalise.",
    attrDelta: { endurance: -2 },
    flatStats: { incantation: 2, degatsMagique: 4, corruption: 20 },
    elemental: { lumiere: -2 },
    notes: [],
  },
  "Niveau III – Déchéance": {
    description: "Les traits se déforment, le sommeil devient agité et le personnage inspire instinctivement la méfiance. Son esprit s'élève tandis que son corps s'affaiblit.",
    attrDelta: { endurance: -3, resilience: -1, metabolisme: -1, vitesse: -2 },
    flatStats: { incantation: 3, degatsMagique: 6, corruption: 30 },
    elemental: { lumiere: -6 },
    notes: ['Octroie le statut : Corruption Visible'],
  },
  "Niveau IV – Dégradation": {
    description: "La corruption est visible au premier regard. La chair porte les marques de la magie noire et le corps commence à céder sous son propre pouvoir.",
    attrDelta: { endurance: -4, resilience: -2, metabolisme: -2, vitesse: -3 },
    flatStats: { incantation: 4, degatsMagique: 8, corruption: 40 },
    elemental: { lumiere: -8 },
    notes: ['Octroie le statut : Corruption Visible'],
  },
  "Niveau V – Transcendance profane": {
    description: "Le personnage n'est plus tout à fait mortel. Sa puissance magique atteint son apogée, mais son corps est devenu un simple réceptacle sur le point de céder sous les forces qui le traversent.",
    attrDelta: { endurance: -5, resilience: -3, metabolisme: -3, vitesse: -5 },
    flatStats: { incantation: 5, degatsMagique: 10, corruption: 50 },
    elemental: { lumiere: -10 },
    notes: ['Octroie le statut : Corruption Visible'],
  },
};

// ---- Élémentaires : bascule unique, effets directs sur les stats élémentaires ----
const ELEMENTAIRES = {
  "Elementaire de feu":  { elemental: { feu: 15, eau: -15 } },
  "Elementaire d'eau":   { elemental: { eau: 15, air: -15 } },
  "Elementaire de terre": { elemental: { terre: 15, feu: -15 } },
  "Elementaire d'air":   { elemental: { air: 15, terre: -15 } },
};

// ---- Statut Esclave : bascule Oui/Non, effets directs sur les attributs ----
// ---- Transformation : bascule unique parmi les formes disponibles (Démoniaque / Lycanthrope I) ----
const TRANSFORMATIONS = {
  "Démoniaque": { flatStats: { parade: 1, defenseMagique: 2, degatsMagique: 2, degatsPhysique: 2, defense: 2, forceMentale: 1 }, elemental: { lumiere: -20 }, notes: ['Octroie : Frappe Télékinétique', 'Octroie : Reprendre Forme Humaine'] },
  "Lycanthrope I": { flatStats: { defenseMagique: 15 }, extraStats: { degTranchant: 30, degPerforant: 30, degContondant: 30, defTranchante: 17, defPerforante: 17, defContondante: 17 }, elemental: { lumiere: -20 }, notes: ['Octroie : Coup de Griffes', 'Octroie : Bond Puissant', 'Octroie : Morsure', 'Octroie : Reprendre Forme Humaine', 'Octroie : Faire Saigner'] },
};

// ---- Transformation Changeforme : bascule unique parmi les formes disponibles, nécessite le talent "ChangeForme" ----
const TRANSFORMATIONS_CHANGEFORME = {
  "Aquatique": { flatStats: {}, elemental: { air: -5, eau: 5 }, notes: ['Octroie : Coup de Caudale', 'Octroie : Reprendre Forme Humaine', 'Octroie : Crachat Puissant'] },
  "Araignée": { flatStats: { deplacement: 1 }, elemental: {}, notes: ['Octroie : Reprendre Forme Humaine', 'Octroie : Produire Toxine', 'Octroie : Tisser Toile'] },
  "Aviaire": { flatStats: {}, elemental: {}, notes: ['Octroie : Coup de griffes', 'Octroie : Reprendre forme Humaine', 'Octroie : Bond Ailé'] },
  "Dragon": { flatStats: {}, elemental: {}, notes: ['Octroie : Bond', 'Octroie : Reprendre Forme Humaine', 'Octroie : Souffle Enflammé'] },
  "Canidé": { flatStats: { capCombat: 1 }, elemental: {}, notes: ['Octroie : Bond', 'Octroie : Morsure', 'Octroie : Reprendre Forme Humaine'] },
  "Cervidé": { flatStats: { esquive: 1 }, elemental: {}, notes: ['Octroie : Bond', 'Octroie : Reprendre Forme Humaine', 'Octroie : Empaler'] },
  "Félin": { flatStats: { esquive: 1 }, elemental: {}, notes: ['Octroie : Coup de Griffes', 'Octroie : Bond', 'Octroie : Reprendre Forme Humaine'] },
  "Vulpes": { flatStats: { esquive: 1 }, elemental: {}, notes: ['Octroie : Bond', 'Octroie : Morsure', 'Octroie : Reprendre Forme Humaine'] },
  "Lagomorphe": { flatStats: { initiative: 1 }, elemental: {}, notes: ['Octroie : Bond Puissant', 'Octroie : Reprendre Forme Humaine'] },
  "Urside": { flatStats: { defense: 2 }, elemental: {}, notes: ['Octroie : Reprendre Forme Humaine', 'Octroie : Empaler', 'Octroie : Renverser'] },
  "Reptile": { flatStats: {}, elemental: {}, notes: ['Octroie : Coup de Caudale', 'Octroie : Reprendre Forme Humaine', 'Octroie : Produire Toxine'] },
};

// ---- Posture : bascule unique parmi les postures de combat ----
const POSTURES = {
  "Posture Offensive": { flatStats: { degatsPhysique: 5, defense: -5, capCombat: 3, esquive: -3 } },
  "Posture Defensive": { flatStats: { defense: 5, degatsPhysique: -5, parade: 3, deplacement: -1 } },
  "Posture Technique": { flatStats: { capCombat: 3, esquive: -3, parade: 3, defense: -2 } },
  "Posture Mobile": { flatStats: { deplacement: 1, esquive: 3, capCombat: -3, parade: -3, degatsPhysique: -5 } },
};

const ESCLAVE = {
  attrDelta: { addresse: -3, vitesse: -3, force: -3, endurance: 1, resilience: 1, metabolisme: 1 },
  parentDelta: { savoirFaire: 3 },
  flatStats: {},
  elemental: {},
  notes: ['Octroie le statut : Esclave'],
};

// ---- Buff Ténériffe : bascule Oui/Non ----
const TENERIFFE = {
  attrDelta: { perception: 1 },
  flatStats: { defense: 2, defenseMagique: 2, pv: 50 },
  elemental: {},
  notes: ['Octroie : Sentir Proie', 'Octroie : Chœur de Ténériffe', 'Octroie : Coup de Griffes', 'Octroie : Coup de Caudale'],
};

// ---- Voie Jumelle : bascule Oui/Non ----
// ---- Buffs de consommation : cumulables, sans limite de sélection ----
// parentDelta -> cascade sur les sous-attributs via PARENT_TO_ATTR (comme le Tempérament/l'Espèce)
// attrDelta -> effet direct sur un attribut précis
// flatStats -> effet direct sur une caractéristique finale déjà calculée
const CONSUMABLES = {
  "Cosmétique (Maquillage)": { parentDelta: {}, attrDelta: { commerce: 2, convaincre: 2, deguisement: 2 }, flatStats: {}, otherStats: { representationArtistique: 2 }, notes: ['Octroie le statut : Maquillé(e)'] },
  "Parfum (Sent Bon)": { parentDelta: {}, attrDelta: { commerce: 1, convaincre: 1 }, flatStats: {}, notes: ['Octroie le statut : Parfum'] },
  "Savon (Propre)": { parentDelta: {}, attrDelta: { convaincre: 1, commerce: 1 }, flatStats: {}, otherStats: { representationArtistique: 1 }, notes: [] },
  "Bon repos": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 5, mana: 5 }, notes: [], category: null },
  "Repas": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 5, mana: 5, defense: 1, defenseMagique: 1 }, notes: [], category: 'nourriture' },
  "Casse-Croûte": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 5, mana: 5 }, notes: [], category: 'nourriture' },
  "Jus": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 5, mana: 5 }, notes: [], category: 'boisson' },
  "Alcool doux": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 5, mana: 5, defense: 1, degatsPhysique: 1, initiative: -1, esquive: -1 }, notes: [], category: 'boisson' },
  "Spiritueux (Alcool Fort)": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 10, mana: 10, defense: 2, degatsPhysique: 2, esquive: -3, initiative: -3 }, notes: [], category: 'boisson' },
  "Lait au miel": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 10, degatsPhysique: 2 }, notes: [], category: null },
  "Lait riche en protéine": { parentDelta: {}, attrDelta: {}, flatStats: { mana: 10, degatsMagique: 2 }, notes: [], category: null },
  "Lait riche en protéine au miel": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 10, mana: 10 }, notes: [], category: null },
  "Dopant Physique": { parentDelta: {}, attrDelta: {}, flatStats: { pv: 25, defense: 10, degatsPhysique: 10 }, notes: [], category: null },
  "Dopant Psychique": { parentDelta: {}, attrDelta: {}, flatStats: { mana: 25, degatsMagique: 10, defenseMagique: 10 }, notes: [], category: null },
  "Arme Entretenue": { parentDelta: {}, attrDelta: {}, flatStats: {}, extraStats: { degContondant: 10, degPerforant: 10, degTranchant: 10 }, notes: [], category: null },
  "Armure Entretenue": { parentDelta: {}, attrDelta: {}, flatStats: {}, extraStats: { defTranchante: 10, defPerforante: 10, defContondante: 10 }, notes: [], category: null },
  "Récréatif": { parentDelta: {}, attrDelta: { metabolisme: -2, resilience: 2, analyse: -2, perceptionMagique: 2, perception: 2, vitesse: -2, volonte: -2 }, flatStats: {}, notes: [] },
};

const VOIE_JUMELLE = {
  flatStats: { capCombat: 1, parade: 1, degatsPhysique: 2, defense: 2 },
};

// ---- Statuts : effets cumulables (plusieurs actifs en même temps), sans limite de sélection ----
const STATUSES = {
  "Ralenti": { flatStats: { deplacement: -2, esquive: -3 }, elemental: {}, notes: ['Octroie : Couper les Liens'] },
  "Immobile": { flatStats: { deplacement: -1, esquive: -10 }, elemental: {}, notes: [] },
  "Brûlure": { flatStats: { esquive: -1, deplacement: -1, parade: -1, defense: -5 }, elemental: {}, notes: [] },
  "Poison": { flatStats: { capCombat: -1, forceMentale: -1, esquive: -1, parade: -1, capTir: -1 }, elemental: {}, notes: [] },
  "Poison de Mana": { flatStats: { defenseMagique: -3, degatsMagique: -3, forceMentale: -3 }, elemental: {}, notes: [] },
  "Saignement": { flatStats: { parade: -1, capCombat: -1, capTir: -1, esquive: -1 }, elemental: { sang: 10 }, notes: [] },
  "Bouclier Magique": { flatStats: { defenseMagique: 10, defense: 10 }, elemental: {}, notes: [] },
  "Bouclier Magique (M)": { flatStats: { defenseMagique: 10, defense: 10 }, elemental: {}, notes: [] },
  "Bouclier Magique (P)": { flatStats: { defenseMagique: 10, defense: 10 }, elemental: {}, notes: [] },
  "Vulnérable": { flatStats: { defenseMagique: -6, defense: -10 }, elemental: {}, notes: [] },
  "Diverti": { parentDelta: { esprit: 1 }, flatStats: {}, elemental: {}, notes: [] },
  "Visage Trouble": { attrDelta: { discretion: 3 }, flatStats: {}, elemental: {}, notes: [] },
  "Ému": { parentDelta: { presence: 1 }, flatStats: {}, elemental: {}, notes: [] },
  "En mouvement": { flatStats: { capTir: -5 }, elemental: {}, notes: ['Octroie : Désarçonner'] },
  "Flamboiement": { flatStats: { deplacement: 2, esquive: 2, parade: 2 }, elemental: {}, notes: [] },
  "Bio-Electricite": { flatStats: { deplacement: 2, esquive: 2, parade: 2 }, elemental: {}, notes: [] },
  "Controle": { flatStats: { pointsAction: -2, pointsMouvement: -2, actionSpeciale: -2, esquive: -10, parade: -10 }, elemental: {}, notes: ['Octroie : Terminer tour (Controle)'] },
};

// ---- Blessure : une seule active à la fois (non localisée) ----
const INJURIES = {
  blessure: { label: 'Blessure', parentDelta: { conditionPhysique: -1, esprit: -1, reflexes: -1, presence: -1, savoirFaire: -1 }, flatStats: {}, notes: ['Octroie le statut : Blessure'] },
  majeure: { label: 'Majeure', parentDelta: { conditionPhysique: -2, esprit: -2, reflexes: -2, presence: -2, savoirFaire: -2 }, flatStats: {}, notes: ['Octroie le statut : Blessure majeure'] },
  grave: { label: 'Grave', parentDelta: { conditionPhysique: -4, esprit: -4, reflexes: -4, presence: -4, savoirFaire: -4 }, flatStats: {}, notes: ['Octroie le statut : Blessure grave'] },
  critique: { label: 'Critique', parentDelta: { conditionPhysique: -9, esprit: -9, reflexes: -9, presence: -9, savoirFaire: -9 }, flatStats: {}, notes: ['Octroie le statut : Blessure critique'] },
};

// ---- Environnement : effets cumulables selon le lieu/contexte, sans limite de sélection ----
const ENVIRONMENTS = {
  "Jour": { flatStats: {}, elemental: { lumiere: 5, sang: -5 }, notes: [] },
  "Nuit": { flatStats: {}, elemental: { sang: 5, lumiere: -5 }, notes: [] },
  "Chaud": { flatStats: {}, elemental: { feu: 5, eau: -5 }, notes: ['Octroie le Perk : Chaleur Insupportable'] },
  "Froid": { flatStats: {}, elemental: { eau: 5, feu: -5 }, notes: [] },
  "Eau": { flatStats: { capCombat: -3 }, elemental: { eau: 20, air: -20 }, notes: ['Octroie le Perk : Baignade'] },
  "Extérieur": { flatStats: {}, elemental: { terre: 5 }, notes: ['Octroie le Perk : Extérieur'] },
  "Vampire (Jour)": { parentDelta: { conditionPhysique: -2 }, flatStats: {}, elemental: {}, notes: [] },
};

// ---- Stats élémentaires : suivies séparément des caractéristiques de combat ----
const ELEMENTAL_STATS = { lumiere: 'Lumière', feu: 'Feu', sang: 'Sang', air: 'Air', eau: 'Eau', terre: 'Terre', arcane: 'Arcane' };

// ---- Stats supplémentaires apportées uniquement par l'équipement ----
const EXTRA_STATS = {
  puissanceTroupe: 'Puissance de Troupe',
  defTranchante: 'Défense Tranchante',
  defPerforante: 'Défense Perforante',
  defContondante: 'Défense Contondante',
  degTranchant: 'Dégâts Tranchants',
  degPerforant: 'Dégâts Perforants',
  degContondant: 'Dégâts Contondants',
  carquois: 'Carquois',
};

// ---- Stats ERP (jeu de rôle érotique) : sans effet sur le combat ----
const ERP_STATS = {
  stimulation: 'Stimulation',
  dominance: 'Dominance',
  inhibition: 'Inhibition',
};

// ---- Stats indépendantes, sans lien avec un attribut ou une stat parente ----
const OTHER_STATS = {
  representationArtistique: 'Représentation Artistique',
};

// ---- Équipement : un seul objet équipable par emplacement ----
const SLOT_LABELS = {
  troupe: 'Troupe', amulette: 'Amulette', armure: 'Armure', cape: 'Cape',
  gants: 'Gants', ceinture: 'Ceinture', bottes: 'Bottes', arme: 'Arme', deuxH: '2H',
};
const EQUIPMENT = {
  troupe: {
    "Bête Elite": { flatStats: { pv: 50 }, extraStats: { puissanceTroupe: 30 }, notes: ['Octroie : Morsure de Bête', 'Débloque : Action de Troupe', 'Octroie le statut : Bête', 'Débloque : Puissance de Troupe'] },
    "Garde Elite": { flatStats: { pv: 100 }, extraStats: { puissanceTroupe: 25 }, notes: ['Octroie : Salve de Flèches', 'Octroie : Cache de Bien', 'Octroie : Sacrifice de Troupe', 'Débloque : Action de Troupe', 'Octroie le statut : Garde', 'Débloque : Puissance de Troupe'] },
    "Armée d'Elite": { flatStats: {}, extraStats: {}, notes: ["Octroie : Mettre en Marche (Elite)"] },
    "Invocation Occulte": { flatStats: { pv: 100 }, extraStats: {}, notes: ['Octroie le Perk : Invocation Occulte', 'Octroie : Salve de Flèches (Occulte)', 'Débloque : Action de Troupe', 'Octroie le statut : Invocation Occulte', 'Octroie : Sacrifice Invocation Occulte'] },
    "Golem Elite": { flatStats: { pv: 100 }, extraStats: { puissanceTroupe: 30 }, notes: ['Octroie : Salve de Flèches', 'Octroie : Cache de Bien', 'Débloque : Action de Troupe', 'Débloque : Puissance de Troupe', 'Octroie le statut : Golem'] },
  },
  amulette: {
    "Amulette de Vigueur": { flatStats: { pv: 20 }, extraStats: {}, notes: [] },
    "Joyau de Réserve": { flatStats: { mana: 20 }, extraStats: {}, notes: [] },
    "Amulette de concentration": { flatStats: { forceMentale: 1 }, extraStats: {}, notes: [] },
  },
  armure: {
    "Armure Légère": { flatStats: { defenseMagique: 17 }, extraStats: { defTranchante: 12, defPerforante: 12, defContondante: 12 }, notes: ['Octroie le Perk : Armure', 'Octroie le statut : Armure Légère'] },
    "Armure Intermédiaire": { flatStats: { esquive: -1, initiative: -1, defenseMagique: 15 }, extraStats: { defTranchante: 12, defPerforante: 15, defContondante: 15 }, notes: ['Octroie le Perk : Armure', 'Octroie le statut : Armure Intermédiaire'] },
    "Armure Lourde": { flatStats: { esquive: -3, deplacement: -1, initiative: -3, defenseMagique: 12 }, extraStats: { defTranchante: 19, defPerforante: 19, defContondante: 15 }, notes: ['Octroie le Perk : Armure', 'Octroie le statut : Armure Lourde'] },
    "Vêtement Renforcé": { flatStats: { defenseMagique: 17 }, extraStats: { defTranchante: 12, defPerforante: 12, defContondante: 12 }, notes: ['Octroie le Perk : Armure'] },
    "Combinaison de la Dépravation Tentaculai": { flatStats: { esquive: -1, initiative: -1, defenseMagique: 12 }, extraStats: { defTranchante: 12, defPerforante: 15, defContondante: 15 }, erpStats: { stimulation: 10, dominance: 1, inhibition: 1 }, notes: ['Octroie le Perk : Chaos Entrave', 'Octroie : Ouvrir Tome de Conjuration Obscène', 'Octroie le Perk : Tenue Obscene'] },
  },
  cape: {
    "Manteau Lourd": { flatStats: { defense: 5 }, extraStats: {}, notes: [] },
    "Cape en soie": { flatStats: { defenseMagique: 5 }, extraStats: {}, notes: [] },
  },
  gants: {
    "Bracelets de Force": { flatStats: { capCombat: 1 }, extraStats: {}, notes: [] },
    "Gant de Lanceur de Sorts": { flatStats: { incantation: 1 }, extraStats: {}, notes: [] },
    "Gants de Visée": { flatStats: { capTir: 1 }, extraStats: {}, notes: [] },
  },
  ceinture: {
    "Ceinture de Potion Enchantée": { flatStats: {}, extraStats: {}, notes: ['Octroie le Perk : Sac de Potions Sans Fond', 'Octroie : Remplir Ceinture de Potion'] },
    "Ceinture de Potion": { flatStats: {}, extraStats: {}, notes: ['Octroie le Perk : Sac de Potions', 'Octroie : Remplir Ceinture de Potion'] },
  },
  bottes: {
    "Bottes de rapidité": { flatStats: { deplacement: 1 }, extraStats: {}, notes: [] },
    "Bottes de vivacité": { flatStats: { esquive: 1 }, extraStats: {}, notes: [] },
  },
  arme: {
    "Lame de Qualité": { flatStats: {}, extraStats: { degContondant: 10, degPerforant: 15, degTranchant: 20 }, notes: ['Octroie le Perk : Lames 1M de Bonne Facture', 'Octroie : Coup de Lame', 'Octroie : Faire Saigner', 'Octroie : Coup de Pommeau', 'Octroie le Perk : Arme'] },
    "Hache de Qualité": { flatStats: {}, extraStats: { degTranchant: 25 }, notes: ['Octroie le Perk : Haches 1M de Bonne Facture', 'Octroie : Coup de Lame (Hache)', 'Octroie : Faire Saigner (Hache)', 'Octroie : Lancer de Hache', 'Octroie le Perk : Arme'] },
    "Espadon de Qualité": { flatStats: {}, extraStats: { degContondant: 15, degPerforant: 20, degTranchant: 25 }, notes: ['Octroie le Perk : Lames 2M de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Coup Tourbillonnant', 'Octroie : Empaler (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)", 'Octroie : Mordhau'] },
    "Hache à deux mains de Qualité": { flatStats: {}, extraStats: { degContondant: 15, degTranchant: 25 }, notes: ['Octroie le Perk : Haches 2M de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Balayage', 'Octroie : Fracassement (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)", 'Octroie : Mordhau'] },
    "Matraque de Qualité": { flatStats: {}, extraStats: { degContondant: 20 }, notes: ['Octroie le Perk : Masse 1M de Bonne Facture', 'Octroie : Coup de Masse', 'Octroie : Fracassement (1M)', 'Octroie : Coup Tourbillonnant', 'Octroie le Perk : Arme'] },
    "Lance de Qualité": { flatStats: {}, extraStats: { degContondant: 15, degPerforant: 20 }, notes: ['Octroie le Perk : Lance 1M de Bonne Facture', 'Octroie : Coup de Lance', 'Octroie : Empaler', 'Octroie : Coup de Hampe', 'Octroie le Perk : Arme', 'Octroie : Lancer de Javelot', 'Octroie : Désarçonner'] },
    "Pieu Argent": { flatStats: {}, extraStats: { degPerforant: 30 }, notes: ['Octroie le Perk : Pieu 1M', 'Octroie : Enfoncer un Pieu en Argent'] },
    "Dague de Qualité": { flatStats: {}, extraStats: { degPerforant: 20, degTranchant: 20 }, notes: ['Octroie le Perk : Dague de Bonne Facture', 'Octroie : Empaler', 'Octroie : Faire Saigner', 'Octroie : Coup de Lame', 'Octroie le Perk : Arme', 'Octroie : Coup Vicieux'] },
    "Masse de Qualité": { flatStats: {}, extraStats: { degContondant: 35 }, notes: ['Octroie le Perk : Masse 2M de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Coup Tourbillonnant', 'Octroie : Fracassement (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Contondante)", 'Octroie : Coup de Hampe (2M)'] },
    "Katana de Qualité": { flatStats: {}, extraStats: { degPerforant: 30, degTranchant: 30 }, notes: ['Octroie le Perk : Katana de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Balayage', 'Octroie : Empaler (2M)', 'Octroie : Faire Saigner (Katana)', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)"] },
    "Arc de Qualité": { flatStats: {}, extraStats: { degTranchant: 25 }, notes: ['Octroie le Perk : Arc de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Tir (Court)', 'Octroie : Tir Handicapant', 'Octroie : Triple Flèche', 'Octroie le Perk : Arme', 'Débloque : Carquois', 'Octroie : Tir (Long)', 'Octroie : Tir Empoisonné (Toxique)', 'Octroie : Tir Empoisonné (Mana)', 'Octroie : Tir Pointe Barbelée', 'Octroie : Viser'] },
    "Arbalète de Qualité": { flatStats: {}, extraStats: { degPerforant: 30 }, notes: ['Octroie le Perk : Arbalète de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Tir Arbalète (Court)', 'Octroie : Tir Ciblé (Arbalète)', 'Octroie : Tir Handicapant', 'Octroie le Perk : Arme', 'Octroie : Tir Arbalète (Long)', 'Octroie : Tir Empoisonné Ar. (Toxique)', 'Octroie : Tir Empoisonné Ar. (Mana)', 'Octroie : Tir Pointe Barbelée (Ar)', 'Octroie : Viser'] },
    "Mousquet de Qualité": { flatStats: {}, extraStats: { degPerforant: 35 }, notes: ['Octroie le Perk : Fusil de Bonne Facture', 'Octroie le Perk : Deux Mains', 'Octroie : Tir de Fusil (Long)', 'Octroie : Tir Ciblé (Fusil)', 'Octroie : Tir de Semonce', 'Octroie le Perk : Arme', 'Octroie : Tir Fusil (Court)', 'Octroie : Tir Balle Explosive'] },
    "Lame": { flatStats: {}, extraStats: { degContondant: 5, degPerforant: 10, degTranchant: 15 }, notes: ['Octroie le Perk : Lames 1M', 'Octroie : Coup de Lame', 'Octroie : Faire Saigner', 'Octroie : Coup de Pommeau', 'Octroie le Perk : Arme'] },
    "Hache": { flatStats: {}, extraStats: { degTranchant: 20 }, notes: ['Octroie le Perk : Haches 1M', 'Octroie : Coup de Lame (Hache)', 'Octroie : Faire Saigner (Hache)', 'Octroie : Lancer de Hache', 'Octroie le Perk : Arme'] },
    "Lance": { flatStats: {}, extraStats: { degContondant: 10, degPerforant: 15 }, notes: ['Octroie le Perk : Lance 1M', 'Octroie : Coup de Lance', 'Octroie : Empaler', 'Octroie : Coup de Hampe', 'Octroie le Perk : Arme', 'Octroie : Lancer de Javelot', 'Octroie : Désarçonner'] },
    "Arbalète": { flatStats: {}, extraStats: { degPerforant: 25 }, notes: ['Octroie le Perk : Arbalète', 'Octroie le Perk : Deux Mains', 'Octroie : Tir Arbalète (Court)', 'Octroie : Tir Ciblé (Arbalète)', 'Octroie : Tir Handicapant', 'Octroie le Perk : Arme', 'Octroie : Tir Arbalète (Long)', 'Octroie : Tir Empoisonné Ar. (Toxique)', 'Octroie : Tir Empoisonné Ar. (Mana)', 'Octroie : Tir Pointe Barbelée (Ar)', 'Octroie : Viser'] },
    "Arc": { flatStats: {}, extraStats: { degTranchant: 20 }, notes: ['Octroie le Perk : Arc', 'Octroie le Perk : Deux Mains', 'Octroie : Tir (Court)', 'Octroie : Tir Handicapant', 'Octroie : Triple Flèche', 'Octroie le Perk : Arme', 'Débloque : Carquois', 'Octroie : Tir (Long)', 'Octroie : Tir Empoisonné (Toxique)', 'Octroie : Tir Empoisonné (Mana)', 'Octroie : Tir Pointe Barbelée', 'Octroie : Viser'] },
    "Tromblon": { flatStats: {}, extraStats: { degPerforant: 30 }, notes: ['Octroie le Perk : Fusil', 'Octroie le Perk : Deux Mains', 'Octroie : Tir de Fusil (Long)', 'Octroie : Tir Ciblé (Fusil)', 'Octroie : Tir de Semonce', 'Octroie le Perk : Arme', 'Octroie : Tir Fusil (Court)', 'Octroie : Tir Balle Explosive'] },
    "Espadon": { flatStats: {}, extraStats: { degContondant: 10, degPerforant: 15, degTranchant: 20 }, notes: ['Octroie le Perk : Lames 2M', 'Octroie le Perk : Deux Mains', 'Octroie : Coup Tourbillonnant', 'Octroie : Empaler (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)", 'Octroie : Mordhau'] },
    "Matraque": { flatStats: {}, extraStats: { degContondant: 15 }, notes: ['Octroie le Perk : Masse 1M', 'Octroie : Coup de Masse', 'Octroie : Fracassement (1M)', 'Octroie : Coup Tourbillonnant', 'Octroie le Perk : Arme'] },
    "Masse": { flatStats: {}, extraStats: { degContondant: 20 }, notes: ['Octroie le Perk : Masse 2M', 'Octroie le Perk : Deux Mains', 'Octroie : Coup Tourbillonnant', 'Octroie : Fracassement (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Contondante)", 'Octroie : Coup de Hampe (2M)'] },
    "Hache à deux mains": { flatStats: {}, extraStats: { degContondant: 10, degTranchant: 20 }, notes: ['Octroie le Perk : Haches 2M', 'Octroie le Perk : Deux Mains', 'Octroie : Balayage', 'Octroie : Fracassement (2M)', 'Octroie : Faucher les Jambes', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)", 'Octroie : Mordhau'] },
    "Katana": { flatStats: {}, extraStats: { degPerforant: 25, degTranchant: 25 }, notes: ['Octroie le Perk : Katana', 'Octroie le Perk : Deux Mains', 'Octroie : Balayage', 'Octroie : Empaler (2M)', 'Octroie : Faire Saigner (Katana)', 'Octroie le Perk : Arme', "Octroie : Charge d'interception (Tranchante)"] },
    "Dague": { flatStats: {}, extraStats: { degPerforant: 15, degTranchant: 15 }, notes: ['Octroie le Perk : Dague', 'Octroie : Empaler', 'Octroie : Faire Saigner', 'Octroie : Coup de Lame', 'Octroie le Perk : Arme', 'Octroie : Coup Vicieux'] },
    "Focus": { flatStats: { degatsMagique: 15, incantation: 1 }, extraStats: {}, notes: ['Octroie le Perk : Deux Mains'] },
  },
  deuxH: {
    "Bouclier de Qualité": {
      flatStats: { parade: 3, defense: 6 },
      extraStats: {},
      elemental: { air: -10 },
      requiresOneHanded: true,
      notes: ['Octroie le Perk : Bouclier de Qualité', 'Octroie : Coup de Bouclier'],
    },
    "Lame (Main Gauche)": {
      flatStats: {},
      extraStats: {},
      elemental: {},
      notes: ['Octroie : Balayage (Deux Armes)', 'Octroie : Coup Vicieux (Deux Armes)'],
    },
    "Hache (Main Gauche)": {
      flatStats: {},
      extraStats: {},
      elemental: {},
      notes: ['Octroie : Fracassement (Deux Armes)', 'Octroie : Faucher les Jambes (Deux Armes)', 'Octroie : Double Fente (Deux Armes)'],
    },
    "Dague de Parade": {
      flatStats: {},
      extraStats: {},
      elemental: {},
      notes: ['Octroie : Double Fente (Deux Armes)', 'Octroie : Renversement (Deux Armes)'],
    },
    "Pistolet à Silex": {
      flatStats: {},
      extraStats: {},
      elemental: {},
      notes: ['Octroie : Tir de Pistolet', 'Octroie : Rechargement Pistolet', 'Octroie le Perk : Main Gauche'],
    },
  },
};

// ---- Talents : bonus fixes directs sur les caractéristiques, jusqu'à 3 choisis ----
const MAX_TALENT_POINTS = 3;
const TALENT_STAT_LABELS = {
  incantation: 'Incantation',
  degatsMagique: 'Dégâts Magiques', capCombat: 'Capacité de Combat', parade: 'Parade',
  capTir: 'Capacité de Tir', initiative: 'Initiative', esquive: 'Esquive',
  forceMentale: 'Force Mentale', degatsPhysique: 'Dégâts Physique', mana: 'Mana',
  defenseMagique: 'Défense Magique', deplacement: 'Déplacement', defense: 'Défense', pv: 'Points de Vie', corruption: 'Corruption',
  pointsAction: "Points d'Action", pointsMouvement: 'Points de Mouvement', actionSpeciale: 'Action Spéciale'
};
const TALENTS = [
  { name: 'ChangeForme', cost: 1, effects: {} },
  { name: 'Anomalie Magique', cost: 1, effects: { degatsMagique: 5 } },
  { name: 'Bagarreur', cost: 1, effects: { capCombat: 1, parade: 1 } },
  { name: "Œil d'aigle", cost: 1, effects: { capTir: 2 } },
  { name: 'Instinct de tueur', cost: 1, effects: { capCombat: 2 } },
  { name: 'Cascadeur', cost: 1, effects: { initiative: 1, esquive: 1 } },
  { name: 'Clairvoyant', cost: 1, effects: { incantation: 1, initiative: 1 } },
  { name: 'Destructeur', cost: 1, effects: { degatsPhysique: 5 } },
  { name: 'Éveil', cost: 1, effects: { mana: 10 } },
  { name: 'Sens aiguisés', cost: 1, effects: { capTir: 1, initiative: 1 } },
  { name: 'Pied agile', cost: 1, effects: { deplacement: 1 } },
  { name: 'Résistance à la magie', cost: 1, effects: { defenseMagique: 5 } },
  { name: 'Peau dure', cost: 1, effects: { defense: 5 } },
  { name: 'Réflexes de serpent', cost: 1, effects: { esquive: 2 } },
  { name: 'Robuste', cost: 1, effects: { pv: 10 } },
  { name: 'Vif', cost: 1, effects: { initiative: 2 } },
  { name: "Mental d'acier", cost: 1, effects: { forceMentale: 2 } },
  { name: 'Vol', cost: 1, effects: {}, notes: ['Octroie : Bond Ailé'] },
];
