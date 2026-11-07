// ============================================================================
// DONNÉES
// Chaque aptitude : [n° en jeu, 'Nom en jeu', { options }]
// options possibles :
//   verify: true   -> classement incertain, à confirmer
// La documentation détaillée se remplit dans DETAILS (plus bas), indexée par n°.
// ============================================================================
const ALL_CATEGORIES = [
  {
    key: 'combat', label: 'Combat', color: 'var(--combat)',
    desc: 'Aptitudes utilisées pendant un affrontement : déroulé du tour, déplacements, attaques et postures.',
    groups: [
      { label: 'Gestion du combat', abilities: [
        [75, 'Initiative'], [76, 'Commencer le tour'], [77, 'Terminer le tour'],
        [78, 'Terminer tour (Controle)'], [79, 'Terminer le combat'], [1989, 'Regle'],
      ]},
      { label: 'Mobilité', abilities: [
        [81, 'Deplacement'], [82, 'Deplacement Monture'], [83, 'Deplacement supplémentaire'],
        [86, 'Fuir'], [1986, 'Remonter à Cheval'],
      ]},
      { label: 'Actions de mêlée', abilities: [
        [1987, "Changer d'arme"], [1724, 'Attrapper'], [1988, 'Couper liens'],
      ]},
      { label: 'Frappes de base', desc: "L'attaque standard de chaque type d'arme.", abilities: [
        [1725, 'Coup de tête'], [596, 'Coup de Lame'], [2409, 'Coup de Lame (Bottes Dagues)'],
        [1785, 'Coup de Lance'], [710, 'Coup de masse'],
        [720, 'Coup de hampe'], [2003, 'Coup de hampe (2M)'], [721, 'Coup de pommeau'],
        [616, 'Coup de bouclier'],
      ]},
      { label: 'Techniques de mêlée', abilities: [
        [711, 'Balayage'], [712, 'Coup Tourbillonnant'], [713, 'Empaler'],
        [716, 'Fracassement (1M)'], [2292, 'Fracassement (2M)'], [1817, 'Coup Vicieux'],
        [717, 'Faire Saigner'],
        [718, 'Renverser'], [1984, 'Désarçonner'], [719, 'Faucher les jambes'], [2004, 'Mordhau'],
        [2433, 'Fouettement'], [2434, 'Emprise'],
      ]},
      { label: 'Combat à deux armes', abilities: [
        [1939, 'Balayage (Deux armes)'], [1940, 'Fracassement (Deux Armes)'],
        [1938, 'Coup Vicieux (Deux armes)'], [1946, 'Renversement (Deux armes)'],
        [1941, 'Faucher les jambes (Deux armes)'], [1942, 'Double fente (Deux armes)'],
      ]},
      { label: "Charges d'interception", abilities: [
        [1999, "Charge d'interception (Tranchante)"], [2000, "Charge d'interception (Perçante)"],
        [2001, "Charge d'interception (Contondante)"],
      ]},
      { label: 'Frappes élémentaires & spéciales', abilities: [
        [2341, 'Frappe Flamboyante'], [2342, "Lame d'air"],
        [2345, 'Frappe Foudroyante'], [2346, 'Frappe Vampirique'], [1034, 'Enfoncer un pieu en argent'],
      ]},
      { label: 'Armes de lancer', abilities: [
        [1013, 'Lancer de couteau'], [1943, 'Lancer de couteau (Toxique)'],
        [1944, 'Lancer de couteau (Poison de Mana)'], [722, 'Lancer de hache'], [723, 'Lancer de javelot'],
      ]},
      { label: 'Tir — Arc', abilities: [
        [724, 'Tir (Court)'], [1982, 'Tir (Long)'], [747, 'Tir Handicapant'], [748, 'Triple fleche'],
        [2311, 'Tir Empoisonné (Toxique)'], [2312, 'Tir Empoisonné (Mana)'], [2335, 'Tir Pointe Barbelée'],
        [2336, 'Viser'],
      ]},
      { label: 'Tir — Arbalète', abilities: [
        [1983, 'Tir Arbalète (Court)'], [1756, 'Tir Arbalète (Long)'], [2337, 'Tir Ciblé (Arbalète)'],
        [2313, 'Tir Empoisonné Ar. (Toxique)'], [2314, 'Tir Empoisonné Ar. (Mana)'],
        [2339, 'Tir Pointe Barbelée (Ar)'],
      ]},
      { label: 'Armes à feu', abilities: [
        [1991, 'Tir Fusil (Court)'], [1014, 'Tir de Fusil (Long)'], [1015, 'Tir Ciblé (Fusil)'],
        [1017, 'Tir de semonce'], [2338, 'Tir balle explosive'], [1460, 'Tir de Pistolet'],
        [1892, 'Rechargement Pistolet'],
      ]},
      { label: 'Postures', abilities: [
        [1919, 'Utiliser posture offensive'], [1920, 'Utiliser posture defensive'],
        [1921, 'Utiliser posture technique'], [1922, 'Utiliser posture mobile'],
      ]},
    ],
  },
  {
    key: 'magie', label: 'Magie', color: 'var(--magie)',
    desc: 'Sorts des différentes écoles de magie, et magie utilitaire.',
    groups: [
      { label: 'Pyromancie', abilities: [
        [1451, 'Boule de Feu'], [1510, 'Embrasement'], [1511, "Feu d'artifice"], [1517, 'Flamboiement'],
        [1597, 'Voile Ignite'], [1512, 'Chaleur Suffocante'],
      ]},
      { label: 'Hydromancie', abilities: [
        [1546, "Fouet d'eau"], [1495, 'Ecume Apaisante'], [1514, 'Bulle Curatrice'], [1497, 'Gel'],
        [1498, 'Glaciation'], [1499, 'Blizzard'], [1496, 'Geyser'],
      ]},
      { label: 'Aéromancie', abilities: [
        [1503, 'Trait de Foudre'], [1548, 'Foudroiement'], [1765, 'Tornade'], [1509, 'Eclair Paralysant'],
        [1507, 'Vent Toxique'], [1588, 'Bio-Electricite'], [1595, "Chaine d'éclairs"],
      ]},
      { label: 'Géomancie', abilities: [
        [1492, 'Enchevetrement'], [1493, 'Peau de Pierre'], [1519, 'Toxines Etherique'], [1490, 'Ronce toxique'],
        [1491, 'Chemin de lianes'], [1515, 'Anti-Toxines'], [1489, 'Photosynthese'], [1550, 'Lame de Roche'],
      ]},
      { label: 'Hématomancie', abilities: [
        [1486, 'Projectile Sanglant'], [1478, 'Scarification'], [1488, 'Marionette Macabre'],
        [1487, 'Liens de sang'], [1484, 'Suture'], [1589, 'Cicatrisation'],
      ]},
      { label: 'Luminomancie', abilities: [
        [1513, 'Flash'], [1656, 'Salve de soin'], [1522, 'Bouclier Lumineux'], [1540, 'Rayonnement'],
        [1541, 'Lames du jugement'], [1657, 'Terreur Diurne'], [1659, 'Trou Noir'],
      ]},
      { label: 'Arcane', abilities: [
        [1665, 'Bouclier Arcanique'], [2363, 'Visage trouble'], [1554, 'Vision troublantes'],
        [2496, 'Disruption Toxique'], [1555, 'Vol Etherique'], [1556, 'Liens Magiques'], [1557, 'Poids Arcanique'],
        [1632, 'Visions'], [9003, 'Désorientation Synaptique'],
      ]},
      { label: 'Sorcellerie', abilities: [
        [1624, 'Aura inquiétante'], [1630, 'Se mutiler'], [1631, 'Invocation'],
        [1961, 'Visions (Sorcier)'], [1639, "Poids de l'âme"], [1642, 'Bouclier de corruption'],
        [1643, 'Camoufler Corruption'],
      ]},
      { label: 'Magie utilitaire', abilities: [
        [1367, 'Meditation'], [1771, 'Transfert de Mana'], [1772, 'Sort Utilitaire'],
      ]},
    ],
  },
  {
    key: 'quotidien', label: 'Quotidien', color: 'var(--mobilite)',
    desc: 'Aptitudes hors-combat : vie courante, métiers et rôles.',
    groups: [
      { label: 'Repos & hygiène', abilities: [
        [328, 'Repos long'], [329, 'Repos court'], [1601, 'Se laver'], [1893, 'Se laver sans savon'],
        [1602, "S'apprêter"], [1604, 'Cracher'],
      ]},
      { label: 'Discrétion & social', abilities: [
        [1889, 'Vol à la tire'], [1995, 'Se dissimuler'], [1786, 'Détecter le mensonge'],
        [2437, 'Observer en coin'], [1998, 'Jeu à Boire'],
      ]},
      { label: 'Prêtre / Foi — Prières', abilities: [
        [349, 'Prier'], [1784, 'Stimulation de soin'], [355, 'Malediction'], [347, 'Apaisement'],
        [348, 'Rompre une malediction'], [1622, 'Ferveur guerrière'],
      ]},
      { label: 'Prêtre / Foi — Cérémonies', abilities: [
        [9001, 'Cérémonies'], [9002, 'Rituels de grâces'], [2215,'Cérémonies de Grâces'], [2217, 'Cérémonies de châtiment'],
        [2218, 'Rupture de contrôle mental'], [2219, 'Exorciser Maledictions'], [2222, 'Restauration Arcanique'],
        [2227, 'Mets-Cendres'], [2244, 'Flétrissement de potions'], [2225, 'Purification'],
        [2280, "Restauration d'âme"],
      ]},
      { label: 'Médecine', abilities: [
        [476, 'Chirurgie'], [1385, 'Premiers Secours'], [1386, 'Chercher maladies'],
        [1545, "Stabilisation d'urgence", { verify: true }], [478, 'Avortement'], [1887, 'Accoucher'],
      ]},
      { label: 'Artiste', abilities: [
        [1780, 'Concert'], [479, 'Divertir son auditoire'], [480, 'Emouvoir son auditoire'],
        [481, 'Humilier ses ennemis'],
      ]},
      { label: 'Esclavagiste', abilities: [
        [1477, 'Briser esprit'], [1693, 'Faire Esclave'],
      ]},
      { label: 'Récolte', abilities: [
        [2213, 'Recolter Essence'], [2267, 'Prélever du sang'],
      ]},
    ],
  },
  {
    key: 'formes', label: 'Formes & Pouvoirs', color: 'var(--vitales)',
    desc: 'Transformations, aptitudes raciales et pouvoirs liés aux malédictions et à la corruption.',
    groups: [
      { label: 'Changeforme', abilities: [
        [333, 'Reprendre forme Humaine'], [334, 'Transformation Araignee'], [565, 'Transformation Cervide'],
        [566, 'Transformation Lagomorphe'], [567, 'Transformation Felin'], [568, 'Transformation Canide'],
        [569, 'Transformation Aviaire'], [570, 'Transformation Vulpes'], [571, 'Transformation Urside'],
        [572, 'Transformation Aquatique'], [573, 'Transformation Reptile'], [575, 'Transformation Dragon'],
        [576, 'Transformation Lycanthrope I'], [577, 'Transformation Demoniaque'],
      ]},
      { label: 'Aptitudes animales & raciales', abilities: [
        [466, 'Tisser Toile'], [467, 'Bond'], [469, 'Bond Puissant'], [2002, 'Bond Ailé'],
        [471, 'Coup de caudale'], [470, 'Coup de griffes'], [1867, 'Frappe de Geant'], [553, 'Morsure'],
        [1787, 'Morsure de Bête'], [472, 'Crachat puissant'], [507, 'Produire Toxine'], [473, 'Souffle Enflammé'],
      ]},
      { label: 'Emprise & charme', abilities: [
        [504, 'Frappe Télékinetique'], [503, 'Charme-Personne'], [2487, 'Commandement'],
        [2412, 'Domination'], [2413, 'Suggestion'], [2414, 'Marionnetiste'],
      ]},
      { label: 'Maudits — Vampire, Démon, Lycan', abilities: [
        [555, 'Sucer le sang'], [1069, "Boire sang de l'ainé"], [1096, 'Morsure Lycanthrope'],
        [1428, 'Prendre essence'], [1408, 'Pacte Demoniaque'],
      ]},
      { label: 'Ténériffe', desc: 'En chantier.', abilities: [
        [1702, 'Choeur de Teneriffe'], [1371, 'Sentir proie'],
      ]},
    ],
  },
  {
    key: 'consommables', label: 'Consommables', color: 'var(--gold)',
    desc: "Aptitudes octroyées par l'utilisation d'un objet.",
    groups: [
      { label: 'Nourriture & boissons', abilities: [
        [637, 'Manger casse-croute'], [638, 'Manger repas'], [639, 'Boire jus'], [640, 'Boire alcool doux'],
        [642, 'Boire spiritueux'], [1061, 'Boire Lait'],
      ]},
      { label: 'Potions & soins', abilities: [
        [619, 'Boire Potion de vie'], [620, 'Boire potion de Mana'], [1039, 'Consommer Antidote'],
        [1040, 'Consommer anti poison de mana'], [621, 'Utiliser Baume'], [1036, 'Utiliser baume cicatrisant'],
        [626, 'Boire remede Brume Ecarlate'], [1644, 'Boire Langueur des Tombes'], [1645, 'Boire Lenteur du Sang'],
      ]},
      { label: 'Drogues & infusions', abilities: [
        [622, 'Consommer drogue récréative'], [623, 'Consommer drogue mystique'], [624, 'Consommer drogue physique'],
        [2359, 'Infusion Incandescente'], [2360, 'Infusion de Tempête'], [2361, 'Infusion sanglante'],
      ]},
      { label: 'Cristaux & gemmes', abilities: [
        [2253, 'Consommer Crystal de Feu'], [2260, 'Consommer Crystal Eau'], [2261, 'Consommer Crystal Terre'],
        [2262, 'Consommer Crystal Air'], [2263, 'Consommer Crystal Sang'], [2264, 'Consommer Crystal  Lumiere'],
        [2265, 'Consommer Gemme Arcanique'],
      ]},
      { label: 'Apparence', abilities: [
        [1044, 'Utiliser Parfum'], [1885, 'Utiliser Cosmétiques'],
      ]},
      { label: 'Poisons & enchantements', abilities: [
        [2309, 'Enduire Poison Toxique'], [2310, 'Enduire Poison de Mana'], [633, 'Activer Siphon de Mana'],
      ]},
      { label: 'Projectiles & explosifs', abilities: [
        [634, 'Lancer filet'], [869, 'Bombe incendiaire'], [1459, "Pierre d'éclat"], [1821, "Lancer flasque d'acide"],
        [9004, 'Lancer Fumigene'],
      ]},
      { label: 'Tomes & parchemins', abilities: [
        [1871, 'Tome de malédictions'], [9007, 'Mot de "La Peste"'], [9010, 'Mot de "Don ravi"'], [9006, 'Mot de "Pas incertain"'], [9008, 'Mot de "Vague Nacrée"'], [9009, 'Mot de "Puanteur de l\'Âme"'], [2157, 'Parchemin de Commandement', { verify: true }],
      ]},
    ],
  },
  {
    key: 'armees', label: 'Armées', color: 'var(--defense)',
    desc: 'Commandement de troupes, logistique et sacrifices.',
    groups: [
      { label: 'Ordres de troupe', abilities: [
        [1789, 'Mettre en marche'], [1790, 'Mettre en marche (Elite)'], [1847, 'Levée de bouclier'],
        [1848, 'Assaut Mêlée'], [382, 'Attaque bête'], [383, 'Salve de fleches'], [1981, 'Soin de troupe'],
      ]},
      { label: 'Logistique', abilities: [
        [384, 'Cache de bien'], [1992, 'Poser Canon'], [1993, 'Retirer Canon'], [9005, 'Tirer avec Canon'],
      ]},
      { label: 'Sacrifices', abilities: [
        [860, 'Sacrifice de troupe'], [1737, 'Sacrifice de troupe (élite)'],
        [2298, 'Sacrifice de troupe (Invocation Occulte)'], [1990, 'Sacrifice Escouade'],
        [1738, 'Sacrifice Escouade (Elite)'],
      ]},
    ],
  },
  {
    key: 'systeme', label: 'Système', color: 'var(--text-faint)',
    desc: 'Menus, validation de fiche et aptitudes déclenchées automatiquement par le jeu.',
    groups: [
      { label: 'Fiche & menus', abilities: [
        [1739, 'Valider ma fiche !'], [475, 'Menu Artisanat'],
      ]},
      { label: 'Automatiques', desc: 'Déclenchées par le jeu, pas par le joueur.', abilities: [
        [750, 'Infliger Blessure'], [1379, 'Régénerer blessure'], [1462, 'Remplir ceinture de potion'],
      ]},
    ],
  },
];
// Catégorie ERP : définie dans abilities-erp.js, affichée sur sa propre page (abilities-erp.html)
if (typeof CATEGORY_ERP !== 'undefined') ALL_CATEGORIES.splice(ALL_CATEGORIES.findIndex(c => c.key === 'systeme'), 0, CATEGORY_ERP);
const PAGE_MODE = window.ENCYCLO_MODE === 'erp' ? 'erp' : 'main';
const CATEGORIES = ALL_CATEGORIES.filter(c => (c.key === 'erp') === (PAGE_MODE === 'erp'));
const OTHER_PAGE = PAGE_MODE === 'erp' ? 'abilities.html' : 'abilities-erp.html';
const ON_THIS_PAGE = new Set();
CATEGORIES.forEach(c => c.groups.forEach(g => g.abilities.forEach(([id]) => ON_THIS_PAGE.add(id))));
// Lien vers une fiche : sur cette page, ou sur l'autre encyclopédie (ERP / principale)
const abilityHref = id => ON_THIS_PAGE.has(id) ? `#a${id}` : `${OTHER_PAGE}#a${id}`;

// ============================================================================
// DOCUMENTATION DÉTAILLÉE, indexée par n° d'aptitude. Tous les champs sont facultatifs :
//   type    : 'Attaque', 'Soin', 'Buff'…               (affiché à côté de la portée)
//   cout    : { PA: 1, PS: 1, PM: 2, Mana: 10, PV: 5 }  (pastilles colorées dans l'en-tête)
//             un objet consommé s'ajoute aussi au coût : { PA: 1, "Pierre d'éclat": 1 }
//   recharge: { PA: 1, AT: '1/1 · 3/3 avec armée' }   (ressources remises au maximum ; texte libre accepté)
//   gain    : { Mana: 50 }                             (ressources rendues)
//   perte   : { Hygiène: 10 }                          (ressources retirées à la cible)
//   cooldown: '5 h'                                    (délai avant réutilisation)
//   portee  : '1 Tile'
//   cible   : '1 cible'
//   degats  : ['Tranchants']                           (types de dégâts ; « Physiques » est ajouté d'office aux dégâts d'arme, sauf « … fixes »)
//   resistance: [['Poison de Mana', 'Métabolisme']]    (jet de résistance explicite : 3d6 + attribut contre 15)
//   physiques: false                                   (les Dégâts Physiques ne comptent pas : « Physiques » n'est pas ajouté)
//   statuts : ['Confus']                               (statuts appliqués à la cible)
//   retire  : ['Immobile']                             (statuts retirés)
//   jet     : '3d6 + Capacité de Combat'
//   conditions : ['Points de Mouvement > 0']           (prérequis pour lancer l'aptitude)
//   desc    : 'Description libre'
//   effets  : ['Autre effet', ['Effet avec sous-liste :', ['Sous-point 1', 'Sous-point 2']]]
//   sources : ['Source supplémentaire']   (les sources connues du simulateur sont ajoutées automatiquement)
//   menus   : ['Sous-menu 1', 'Sous-menu 2']          (catégories d'un menu)
//   affiche : { 'Onglet': ['Info 1', 'Info 2'] }       (informations affichées, par onglet)
//   notes   : 'Remarques diverses'
//   premierTour: true                                  (utilisable au Premier Tour même si elle applique Immobile ou Controle)
// ============================================================================
const PREMIER_TOUR_COND = 'Ne pas avoir le statut Premier Tour';
// Jets de résistance automatiques (3d6 + attribut contre 15), seulement si l'aptitude fait aussi des dégâts ou touche une zone
const RESIST_RULES = [['Brûlure', 'Résilience'], ['Saignement', 'Résilience'], ['Poison', 'Métabolisme'], ['Poison de Mana', 'Métabolisme']];
const DETAILS = {
  475: { // Menu Artisanat
    desc: "Ouvre le menu d'artisanat du personnage.",
    effets: [
      'Fabriquer certains objets selon son ou ses métiers',
      'Avancer ses points de projet, une fois toutes les 20 h (selon son Savoir-Faire et les points alloués à ses métiers)',
      "Ou Aider quelqu'un : lui offrir ses points de projet de la journée à la place (même délai de 20 h)",
    ],
  },
  1739: { // Valider ma fiche !
    desc: 'Marque le personnage comme validé et lui débloque les menus d\'actions (quotidiennes et autres) ainsi que sa barre de Projet.',
  },
  1871: { // Tome de malédictions
    desc: 'Ouvre un menu pour choisir un sort de malédiction à lancer.',
    cible: 'Soi',
    menus: ['Mot de "La Peste"', 'Mot de "Don ravi"', 'Mot de "Pas incertain"', 'Mot de "Vague Nacrée"', 'Mot de "Puanteur de l\'Âme"'],
    conditions: ['Avoir Sorcier ou Pretre'],
  },
  9007: { // Mot de "La Peste" (n° provisoire : n° en jeu inconnu)
    cout: { 'Échantillon de sang': 1 },
    cible: "1 cible · le propriétaire de l'Échantillon de sang",
    statuts: ['Fatigue (3 jours)', 'Courbatures (3 jours)', 'Fièvre (3 jours)', 'Teint livide (3 jours)', 'Respiration sifflante (3 jours)'],
    effets: ['Inflige une maladie au hasard, qui applique une partie des statuts listés', 'Les statuts prennent effet 24 h après le lancement'],
    notes: 'Les statuts peuvent être soignés avec des Remèdes.',
    sources: ['Tome de malédictions (menu)'],
  },
  9006: { // Mot de "Pas incertain" (n° provisoire : n° en jeu inconnu)
    cout: { 'Échantillon de sang': 1 },
    cible: "1 cible · le propriétaire de l'Échantillon de sang",
    statuts: ['Pied-Bot (7 jours)'],
    effets: ['Applique le statut Malediction au propriétaire du sang, qui lui octroie le perk Pied-Bot pendant 7 jours'],
    sources: ['Tome de malédictions (menu)'],
  },
  9008: { // Mot de "Vague Nacrée" (n° provisoire : n° en jeu inconnu)
    cout: { 'Semence': 1 },
    cible: '1 cible · le propriétaire de la Semence',
    effets: ['Fait jouir en public le propriétaire de la Semence'],
    sources: ['Tome de malédictions (menu)'],
  },
  9009: { // Mot de "Puanteur de l'Âme" (n° provisoire : n° en jeu inconnu)
    cout: { 'Échantillon de sang': 1 },
    cible: "1 cible · le propriétaire de l'Échantillon de sang",
    statuts: ['Puanteur Surnaturelle (7 jours)'],
    effets: ['Applique le statut Malediction, qui donne le statut visible Puanteur Surnaturelle pendant 7 jours'],
    sources: ['Tome de malédictions (menu)'],
  },
  9010: { // Mot de "Don ravi" (n° provisoire : n° en jeu inconnu)
    cout: { 'Échantillon de sang': 1 },
    cible: "1 cible · le propriétaire de l'Échantillon de sang",
    statuts: ['Incantation Interdite (Feu) (7 jours)', 'Incantation Interdite (Eau) (7 jours)', 'Incantation Interdite (Air) (7 jours)', 'Incantation Interdite (Terre) (7 jours)', 'Incantation Interdite (Lumière) (7 jours)', 'Incantation Interdite (Sang) (7 jours)', 'Incantation Interdite (Arcane) (7 jours)'],
    effets: [
      'Vole une Magie au propriétaire du sang',
      'Crée des Cristaux de la magie volée',
      "Le propriétaire reçoit l'Incantation Interdite correspondant à la magie volée pendant 7 jours",
    ],
    sources: ['Tome de malédictions (menu)'],
  },
  555: { // Sucer le sang
    cooldown: '20 h',
    portee: '1 Tile',
    cible: '1 cible',
    perte: { PV: 25 },
    effets: ['Le lanceur récupère 50 PV'],
    conditions: ['Ne pas avoir le statut En Combat'],
    notes: 'En chantier.',
  },
  1069: { // Boire sang de l'ainé
    notes: 'En chantier.',
  },
  1642: { // Bouclier de corruption
    cout: { PS: 1, Corruption: 10 },
    cible: 'Soi',
    statuts: ["Bouclier Magique (jusqu'au prochain Commencer le tour)"],
    conditions: ['Ne pas avoir le statut En mouvement'],
  },
  1631: { // Invocation
    cout: { Corruption: 100 },
    cooldown: '48 h',
    cible: 'Soi',
    effets: ["Produit une Invocation Occulte (troupe) et la place dans l'inventaire"],
    conditions: ['Avoir Déchéance corruptrice'],
  },
  1632: { // Visions
    cout: { Mana: 5 },
    cooldown: '30 min',
    cible: 'Un personnage (désigné dans le texte)',
    desc: 'Permet d\'envoyer une vision à un personnage : le lanceur décrit par écrit la vision qu\'il souhaite envoyer.',
    conditions: ['Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
    notes: 'Une vision reste une manifestation mentale et illusoire : elle ne peut provoquer aucune blessure, séquelle physique ou psychologique réelle, ni imposer de conséquences permanentes au personnage qui la reçoit.',
  },
  1961: { // Visions (Sorcier)
    cout: { Corruption: 5 },
    cooldown: '30 min',
    cible: 'Un personnage (désigné dans le texte)',
    desc: 'Permet d\'envoyer une vision à un personnage : le lanceur décrit par écrit la vision qu\'il souhaite envoyer.',
    notes: 'Une vision reste une manifestation mentale et illusoire : elle ne peut provoquer aucune blessure, séquelle physique ou psychologique réelle, ni imposer de conséquences permanentes au personnage qui la reçoit.',
  },
  1477: { // Briser esprit
    cooldown: '2 h',
    portee: '1 Tile',
    cible: '1 cible',
    effets: ['Fait perdre de la Santé mentale à la cible'],
    conditions: ['Hors combat'],
  },
  1693: { // Faire Esclave
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Esclave (si le jet réussit)'],
    conditions: ['Hors combat', 'La cible doit avoir le statut C.Esclave (consentement esclave)'],
  },
  1643: { // Camoufler Corruption
    cout: { PV: 10 },
    cooldown: '20 h',
    cible: 'Soi',
    effets: ['Descend d\'un stade de corruption'],
  },
  1630: { // Se mutiler
    cout: { PV: 10 },
    cible: 'Soi',
    gain: { Corruption: 5 },
  },
  1624: { // Aura inquiétante
    cout: { PS: 1, Corruption: 5 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Confus'],
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Ne fait pas de dégâts.',
  },
  1639: { // Poids de l'âme
    cout: { PS: 1, Corruption: 5 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Ralenti'],
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Ne fait pas de dégâts.',
  },
  634: { // Lancer filet
    cout: { PS: 1, 'Filet de Capture': 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Ralenti'],
    notes: 'Ne fait pas de dégâts.',
  },
  1514: { // Bulle Curatrice
    type: 'Soin',
    cout: { PA: 1, Mana: 10 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Eau'],
    effets: ['Soigne la cible selon les Dégâts Magiques et la stat Eau du lanceur'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
  },
  1495: { // Ecume Apaisante
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '4 Tiles',
    cible: '1 cible',
    retire: ['Brûlure'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1512: { // Chaleur Suffocante
    type: 'Attaque',
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    degats: ['Magiques', 'Feu'],
    statuts: ['Brûlure'],
    conditions: ['Être dans une zone chaude', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
    notes: 'Si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1597: { // Voile Ignite
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ["Bouclier Magique (M) (jusqu'au prochain Commencer le tour)"],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
  },
  1517: { // Flamboiement
    cout: { PS: 1, Mana: 10 },
    cible: 'Soi',
    statuts: ["Flamboiement (jusqu'au prochain Commencer le tour)"],
    retire: ['En mêlée'],
    effets: ['Fait reculer le lanceur de 1.5 Tiles'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir de Posture', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
  },
  1451: { // Boule de Feu
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Zone · 1.5 Tiles de rayon autour du point choisi',
    degats: ['Magiques', 'Feu'],
    statuts: ['Brûlure'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
    notes: 'Le lanceur peut être touché s\'il est dans la zone. Si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1510: { // Embrasement
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Brûlure'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
    notes: 'Brûlure appliquée sans jet de Résilience. Ne fait pas de dégâts, sauf si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1511: { // Feu d'artifice
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Magiques', 'Feu'],
    statuts: ['Brûlure'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Feu)'],
    sources: ['Pyromancie'],
    notes: 'Si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1498: { // Glaciation
    cout: { PS: 1, Mana: 20 },
    portee: '6 Tiles',
    cible: 'Zone · 2 Tiles de rayon autour du point choisi',
    statuts: ["Ralenti (si la cible ne l'est pas déjà)", 'Controle (si la cible est déjà Ralentie)'],
    conditions: ['Avoir le statut En Combat', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Eau)', 'Ne pas avoir le statut Premier Tour'],
    sources: ['Hydromancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1499: { // Blizzard
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '5 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    degats: ['Magiques', 'Eau'],
    conditions: ['Être dans une zone froide', 'Ne pas être transformé', 'Ne pas avoir le statut En mouvement', 'Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
  },
  1497: { // Gel
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    statuts: ['Immobile'],
    conditions: ['Être dans une zone froide', 'Ne pas être transformé', 'Ne pas avoir le statut En mouvement', 'Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1496: { // Geyser
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Magiques', 'Eau'],
    conditions: ["Avoir le statut Dans l'eau", 'Ne pas être transformé', 'Ne pas avoir le statut En mouvement', 'Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
  },
  1546: { // Fouet d'eau
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '4 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Eau'],
    conditions: ['Ne pas avoir le statut Incantation Interdite (Eau)'],
    sources: ['Hydromancie'],
  },
  1507: { // Vent Toxique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Zone · 1.5 Tiles de rayon autour du point choisi',
    statuts: ['Poison'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
    notes: "Ne fait pas de dégâts, sauf si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme. Le lanceur peut être touché s'il est dans la zone.",
  },
  1595: { // Chaine d'éclairs
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Magiques', 'Air'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
  },
  1588: { // Bio-Electricite
    cout: { PS: 1, Mana: 10 },
    cible: 'Soi',
    statuts: ["Bio-Electricite (jusqu'au prochain Commencer le tour)"],
    retire: ['En mêlée'],
    effets: ['Fait reculer le lanceur de 1.5 Tiles'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir de Posture', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
  },
  504: { // Frappe Télékinetique
    cout: { PA: 1, PS: 1, Mana: 5 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Controle'],
    conditions: ['Avoir le statut En Combat'],
    effets: ['Fait tomber la cible en arrière'],
  },
  1509: { // Eclair Paralysant
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Controle'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1765: { // Tornade
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Zone · 2 Tiles de rayon autour du point choisi',
    statuts: ['Confus'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
    notes: "Ne fait pas de dégâts. Le lanceur peut être touché s'il est dans la zone.",
  },
  1548: { // Foudroiement
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Zone · 1.5 Tiles de rayon autour du point choisi',
    degats: ['Magiques', 'Air'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
    notes: "Le lanceur peut être touché s'il est dans la zone.",
  },
  1503: { // Trait de Foudre
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Air'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Air)'],
    sources: ['Aéromancie'],
  },
  1657: { // Terreur Diurne
    cout: { PA: 1, PS: 1, Mana: 20 },
    portee: '6 Tiles',
    cible: '3 cibles · Maudits uniquement',
    statuts: ['Controle'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)', 'La cible doit avoir une malédiction Démon, Vampire ou Lycan (pas Mort Vivant)'],
    sources: ['Luminomancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1659: { // Trou Noir
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Zone · 1.5 Tiles de rayon autour du point choisi',
    statuts: ['Confus'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
    notes: "Ne fait pas de dégâts. Le lanceur peut être touché s'il est dans la zone.",
  },
  1541: { // Lames du jugement
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Magiques', 'Lumière'],
    statuts: ['Brûlure'],
    conditions: ['Être de jour', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
    notes: 'Si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1540: { // Rayonnement
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Lumière'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
  },
  1522: { // Bouclier Lumineux
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ["Bouclier Magique (jusqu'au prochain Commencer le tour)"],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
  },
  1656: { // Salve de soin
    type: 'Soin',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Magiques', 'Lumière'],
    effets: ['Soigne les cibles selon les Dégâts Magiques et la stat Lumière du lanceur', 'Une cible Maudite subit à la place des dégâts Magiques + Lumière'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
  },
  1513: { // Flash
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    statuts: ['Confus'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Lumière)'],
    sources: ['Luminomancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1489: { // Photosynthese
    type: 'Soin',
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Terre'],
    effets: ['Soigne la cible selon les Dégâts Magiques et la stat Terre du lanceur'],
    conditions: ['Être de jour', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
  },
  1515: { // Anti-Toxines
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    retire: ['Poison', 'Poison de Mana'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
  },
  1491: { // Chemin de lianes
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ['Ralenti'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1490: { // Ronce toxique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Poison'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
    notes: 'Ne fait pas de dégâts, sauf si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme.',
  },
  1519: { // Toxines Etherique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Poison de Mana'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
    notes: 'Ne fait pas de dégâts. Si la cible a déjà le Poison de Mana : Poison de Mana aggravé, qui retire du Mana (pas des PV), résisté par le Métabolisme.',
  },
  1493: { // Peau de Pierre
    cout: { PS: 1, Mana: 10 },
    cible: 'Soi',
    statuts: ["Bouclier Magique (P) (jusqu'au prochain Commencer le tour)"],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
  },
  1492: { // Enchevetrement
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Immobile'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],

    notes: 'Ne fait pas de dégâts.',
  },
  1488: { // Marionette Macabre
    cout: { PS: 1, Mana: 10 },
    portee: '5 Tiles',
    cible: '1 cible',
    jet: '3d6 + Résilience (cible et lanceur, chacun le sien)',
    statuts: ['Blessure (Normale, Majeure, Grave ou Critique selon le jet)'],
    effets: ['Le lanceur reçoit aussi une Blessure, selon son propre jet'],
    conditions: ['Avoir le statut Saignement', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
    notes: 'Ne fait pas de dégâts.',
  },
  1487: { // Liens de sang
    type: 'Attaque',
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    degats: ['Magiques', 'Sang'],
    effets: ['Absorbe la vie des cibles : le lanceur récupère 15 PV par cible touchée'],
    conditions: ['Avoir le statut Saignement', 'Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
  },
  1589: { // Cicatrisation
    type: 'Soin',
    cout: { PS: 1, Mana: 10 },
    cible: 'Soi',
    retire: ['Blessure Normale'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
    notes: 'Soigne uniquement une Blessure normale : sans effet sur les blessures Majeure, Grave ou Critique.',
  },
  1484: { // Suture
    cout: { PS: 1, Mana: 10 },
    cible: 'Soi',
    retire: ['Saignement'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
  },
  1478: { // Scarification
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ['Saignement'],
    effets: ['Le lanceur reçoit aussi Saignement'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
    notes: 'Ne fait pas de dégâts, sauf si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.',
  },
  1486: { // Projectile Sanglant
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Sang'],
    effets: ['Rend au lanceur la moitié des dégâts infligés en PV'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Sang)'],
    sources: ['Hématomancie'],
  },
  1550: { // Lame de Roche
    type: 'Attaque',
    cout: { PA: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Magiques', 'Terre'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Terre)'],
    sources: ['Géomancie'],
  },
  1556: { // Liens Magiques
    cout: { PA: 1, PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Immobile'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
    notes: 'Ne fait pas de dégâts.',
  },
  633: { // Activer Siphon de Mana
    cout: { PA: 1, 'Siphon mécanique': 1 },
    portee: '6 Tiles',
    cible: 'Tout le monde (lanceur compris)',
    statuts: ['Poison de Mana'],
    effets: ['Divise par deux le Mana actuel de chaque cible touchée'],
    conditions: ['Avoir le statut En Combat'],
    notes: 'Le lanceur est lui aussi touché : son Mana est également divisé par deux. Si la cible a déjà le Poison de Mana : Poison de Mana aggravé, qui retire du Mana (pas des PV), résisté par le Métabolisme.',
  },
  2310: { // Enduire Poison de Mana
    cout: { 'Flèches/Carreaux ou Lames de jet': 1, 'Poison de Mana': 1 },
    effets: ['Produit 1 Flèches/Carreaux (Poison de Mana) ou 1 Lames de jet empoisonnés (Poison de Mana), selon la munition consommée'],
  },
  2309: { // Enduire Poison Toxique
    cout: { 'Flèches/Carreaux ou Lames de jet': 1, 'Poison toxique': 1 },
    effets: ['Produit 1 Flèches/Carreaux (Toxique) ou 1 Lames de jet empoisonnés (Toxique), selon la munition consommée'],
  },
  9003: { // Désorientation Synaptique
    cout: { PA: 1, PS: 1, Mana: 15 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Controle'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
  },
  1557: { // Poids Arcanique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Ralenti'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
    notes: 'Ne fait pas de dégâts.',
  },
  1555: { // Vol Etherique
    cout: { PS: 1, PV: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    perte: { Mana: 15 },
    gain: { Mana: 15 },
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
  },
  2496: { // Disruption Toxique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Poison'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
    notes: 'Ne fait pas de dégâts, sauf si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme.',
  },
  1554: { // Vision troublantes
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Confus'],
    conditions: ['Ne pas être transformé', 'Ne pas avoir le statut Incantation Interdite (Arcane)'],
    sources: ['Arcaniste'],
    notes: 'Ne fait pas de dégâts.',
  },
  2363: { // Visage trouble
    cout: { Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ['Visage Trouble (7 h 20)'],
    conditions: ['Ne pas avoir le statut Incantation Interdite (Arcane)', 'Ne pas avoir le statut Visage Trouble'],
    sources: ['Arcaniste'],
  },
  1665: { // Bouclier Arcanique
    cout: { PS: 1, Mana: 10 },
    portee: '6 Tiles',
    cible: '3 cibles',
    statuts: ["Bouclier Magique (jusqu'au prochain Commencer le tour)"],
    conditions: ['Ne pas être transformé', "Ne pas avoir le statut Incantation Interdite (Arcane)"],
    sources: ['Arcaniste'],
  },
  1604: { // Cracher
    portee: '4 Tiles',
    cible: '1 cible',
    perte: { Hygiène: 10 },
  },
  620: { // Boire potion de Mana
    cout: { PS: 1, 'Potion de Mana': 1, 'Ceinture de potion': 1 },
    cible: 'Soi',
    gain: { Mana: 30 },
  },
  619: { // Boire Potion de vie
    cout: { PS: 1, 'Potion de Vie': 1, 'Ceinture de potion': 1 },
    cible: 'Soi',
    gain: { PV: 30 },
  },
  1039: { // Consommer Antidote
    cout: { PS: 1, 'Antidote poison toxique': 1 },
    cible: 'Soi',
    retire: ['Poison'],
  },
  1040: { // Consommer anti poison de mana
    cout: { PS: 1, 'Antidote poison de mana': 1 },
    cible: 'Soi',
    retire: ['Poison de Mana'],
  },
  621: { // Utiliser Baume
    cout: { PS: 1, 'Baume apaisant': 1 },
    cible: 'Soi',
    retire: ['Brûlure'],
  },
  1036: { // Utiliser baume cicatrisant
    cout: { PS: 1, 'Baume cicatrisant': 1 },
    cible: 'Soi',
    retire: ['Saignement'],
  },
  626: { // Boire remede Brume Ecarlate
    cout: { 'Remède brume écarlate': 1 },
    cible: 'Soi',
    retire: ['Brume Écarlate (maladie)'],
  },
  1644: { // Boire Langueur des Tombes
    cout: { 'Remède langueur des tombes': 1 },
    cible: 'Soi',
    retire: ['Langueur des Tombes (maladie)'],
  },
  1645: { // Boire Lenteur du Sang
    cout: { 'Remède lenteur du sang': 1 },
    cible: 'Soi',
    retire: ['Lenteur du Sang (maladie)'],
  },
  622: { // Consommer drogue récréative
    cout: { 'Drogue récréative': 1 },
    cible: 'Soi',
  },
  623: { // Consommer drogue mystique (effets : consommable Dopant Psychique de data.js)
    cout: { 'Dopant mystique': 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Mets-Cendre'],
  },
  624: { // Consommer drogue physique (effets : consommable Dopant Physique de data.js)
    cout: { 'Dopant physique': 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Mets-Cendre'],
  },
  2359: { // Infusion Incandescente
    cout: { "Rouleau d'infusion incandescent": 1 },
    cible: 'Soi',
    statuts: ['Infusion Feu', 'Infusion (7 jours)'],
    conditions: ["Ne pas avoir le statut Infusion"],
    notes: 'Le statut Infusion Feu octroie l\'aptitude Frappe Flamboyante. Le statut Infusion dure 7 jours : tant qu\'il est actif, Infusion Incandescente ne peut pas être réutilisée.',
  },
  2361: { // Infusion sanglante
    cout: { "Rouleau d'infusion sanglant": 1 },
    cible: 'Soi',
    statuts: ['Infusion Sang', 'Infusion (7 jours)'],
    conditions: ["Ne pas avoir le statut Infusion"],
    notes: 'Le statut Infusion Sang octroie l\'aptitude Frappe Vampirique. Le statut Infusion dure 7 jours : tant qu\'il est actif, Infusion sanglante ne peut pas être réutilisée.',
  },
  2360: { // Infusion de Tempête
    cout: { "Rouleau d'infusion de tempête": 1 },
    cible: 'Soi',
    statuts: ['Infusion Air', 'Infusion (7 jours)'],
    conditions: ["Ne pas avoir le statut Infusion"],
    notes: 'Le statut Infusion Air octroie les aptitudes Frappe Foudroyante et Lame d\'air. Le statut Infusion dure 7 jours : tant qu\'il est actif, Infusion de Tempête ne peut pas être réutilisée.',
  },
  2213: { // Recolter Essence
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Assouvissement Pris (3 h 20)'],
    conditions: ['Ne pas avoir le statut Assouvissement Pris'],
    effets: ['Récolte X Essences de désir, selon combien la cible en a'],
  },
  2267: { // Prélever du sang
    portee: '1 Tile',
    cible: '1 cible',
    cooldown: '14 jours',
    statuts: ['Transfusion Faite (14 jours)'],
    conditions: ['La cible doit avoir mis elle-même le statut Transfusion', 'La cible ne doit pas avoir le statut Transfusion Faite'],
    effets: ['Donne 2 Échantillons de sang au lanceur'],
  },
  1780: { // Concert
    cible: 'Soi',
    cooldown: '72 h',
    statuts: ['Concert Fait'],
    conditions: ['Ne pas avoir le statut Concert Fait'],
    effets: ['Donne des pièces de bronze si 6 cibles ou plus autour'],
    sources: ['Artiste'],
  },
  479: { // Divertir son auditoire
    cout: { Projet: 2 },
    portee: '10.5 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    gain: { 'Pièces de bronze': 20 },
    sources: ['Artiste'],
    notes: 'Les pièces de bronze sont gagnées par le lanceur.',
  },
  480: { // Emouvoir son auditoire
    cout: { Projet: 1 },
    portee: '10.5 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    gain: { 'Pièces de bronze': 10 },
    statuts: ['Ému'],
    sources: ['Artiste'],
    notes: 'Les pièces de bronze sont gagnées par le lanceur ; le statut Ému est appliqué aux cibles.',
  },
  481: { // Humilier ses ennemis
    cout: { PS: 1 },
    portee: '10 Tiles',
    cible: '9 cibles',
    statuts: ['Humiliation publique (4 h)'],
    sources: ['Artiste'],
  },
  1061: { // Boire Lait
    cout: { PA: 1, 'Lait': 1, 'Ceinture de potion': 1 },
    cible: 'Soi',
    gain: { PV: 40 },
    conditions: ['Ne pas avoir le statut Faim surnaturelle'],
  },
  1044: { // Utiliser Parfum (statut Parfum et ses effets : consommable Parfum (Sent Bon) de data.js)
    cout: { Parfum: 1 },
    cible: 'Soi',
    gain: { 'Santé mentale': 5 },
  },
  1885: { // Utiliser Cosmétiques (le statut Maquillé(e) et ses effets viennent du consommable lié)
    cout: { 'Cosmétiques': 1 },
    cible: 'Soi',
    gain: { 'Santé mentale': 5 },
  },
  1602: { // S'apprêter (le statut Maquillé(e) et ses effets viennent du consommable lié)
    cout: { 'Cosmétiques': 1 },
    cible: 'Soi',
    gain: { 'Santé mentale': 5 },
  },
  1601: { // Se laver
    cout: { Savon: 1 },
    gain: { 'Hygiène': 100, 'Santé mentale': 5 },
    statuts: ['Propre'],
    conditions: ["Avoir le statut Dans l'eau"],
  },
  1893: { // Se laver sans savon
    gain: { 'Hygiène': 25 },
    conditions: ["Avoir le statut Dans l'eau"],
  },
  328: { // Repos long
    cooldown: '20 h',
    recharge: { PV: 'au maximum' },
    statuts: ['Bon repos (20 h)'],
    conditions: ['Hors combat', "Être à l'intérieur"],
  },
  329: { // Repos court
    cooldown: '5 h',
    gain: { PV: 50, Mana: 50 },
    conditions: ['Hors combat'],
  },
  1367: { // Meditation
    cooldown: '5 h',
    gain: { Mana: 50 },
    conditions: ['Hors combat'],
    sources: ['Avoir débloqué au moins une magie'],
  },
  1771: { // Transfert de Mana
    cout: { PA: 1, Mana: 20 },
    portee: '6 Tiles',
    cible: '1 cible',
    gain: { Mana: 20 },
    notes: 'Le lanceur perd 20 Mana et la cible en gagne 20.',
  },
  869: { // Bombe incendiaire
    cout: { PA: 1, 'Bombe Incendiaire': 1 },
    portee: '6 Tiles',
    cible: 'Zone · 1 Tile de rayon autour du point choisi',
    statuts: ['Brûlure'],
    notes: 'Le lanceur peut être touché s\'il est dans la zone. Ne fait pas de dégâts, sauf si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1821: { // Lancer flasque d'acide
    cout: { PA: 1, "Flasque d'acide": 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Vulnérable'],
    notes: 'Ne fait pas de dégâts.',
  },
  9004: { // Lancer Fumigene (n° provisoire : n° en jeu inconnu)
    cout: { PA: 1, 'Fumigène': 1 },
    portee: '6 Tiles',
    cible: 'Zone · 1.5 Tiles de rayon autour du point choisi',
    statuts: ['Confus'],
    notes: 'Ne fait pas de dégâts. Le lanceur n\'est pas touché, même s\'il est dans la zone.',
  },
  384: { // Cache de bien
    cout: { AT: 1 },
    cooldown: '20 h',
    cible: 'Soi',
    recharge: { 'Ceinture de potion': '5/5' },
    conditions: ['Avoir le statut En Combat'],
  },
  1462: { // Remplir ceinture de potion
    cible: 'Soi',
    recharge: { 'Ceinture de potion': '5/5' },
    conditions: ['Ne pas avoir le statut En Combat'],
  },
  2253: { // Consommer Crystal de Feu
    cout: { 'Cristal élémentaire de feu': 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Pyromancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2260: { // Consommer Crystal Eau
    cout: { "Cristal élémentaire d'eau": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Hydromancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2261: { // Consommer Crystal Terre
    cout: { "Cristal élémentaire de terre": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Géomancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2262: { // Consommer Crystal Air
    cout: { "Cristal élémentaire d'air": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Aéromancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2263: { // Consommer Crystal Sang
    cout: { "Cristal élémentaire de sang": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Hématomancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2264: { // Consommer Crystal  Lumiere
    cout: { "Cristal élémentaire de lumière": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Luminomancie pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  2265: { // Consommer Gemme Arcanique
    cout: { "Cristal élémentaire d'arcane": 1 },
    cible: 'Soi',
    statuts: ['Magie Contrefaite (1 h)'],
    retire: ['Magie Contrefaite (autre élément)'],
    effets: ['Octroie Arcane pendant 1 h'],
    conditions: ['Avoir Déchéance corruptrice, Dégradation corruptrice ou Transcendance profane'],
  },
  1992: { // Poser Canon
    cout: { 'Canon': 1 },
    cible: 'Soi',
    effets: ['Place un Canon sur la position actuelle du lanceur : il devient possible d\'y utiliser Tirer avec Canon'],
    conditions: ['Être Ingénieur ou Chef de faction'],
  },
  1993: { // Retirer Canon
    gain: { Canon: 1 },
    effets: ['Retire un Canon posé par le personnage (voir Poser Canon) et le récupère dans son inventaire'],
  },
  9005: { // Tirer avec Canon (n° provisoire : n° en jeu inconnu)
    type: 'Attaque',
    cooldown: '30 min',
    portee: '20 Tiles',
    cible: 'Zone · 1 Tile de rayon autour du point choisi',
    degats: ['Fixes'],
    effets: ['Inflige 3d20 + 30 dégâts fixes à toutes les cibles dans la zone sauf au lanceur'],
    sources: ['Être à l\'emplacement d\'un Canon posé (voir Poser Canon)'],
    notes: 'Dégâts fixes : ne sont résistés par rien. En cas d\'échec critique sur le jet, c\'est le lanceur qui prend les dégâts.',
  },
  860: { // Sacrifice de troupe
    cout: { 'Garde': 1 },
    cooldown: '4 h',
    cible: 'Soi',
    effets: [
      'Les troupes se battent jusqu\'à la mort pour couvrir la fuite du lanceur : la troupe Garde est perdue',
      'Permet de fuir pendant 10 minutes sans que les adversaires puissent intervenir',
    ],
    conditions: ['Avoir le statut En Combat', 'Ne pas avoir le statut Controle'],
    notes: 'Pendant la fuite, interdiction d\'utiliser le vol ou un téléporteur.',
  },
  2298: { // Sacrifice de troupe (Invocation Occulte)
    cout: { 'Invocation occulte': 1 },
    cooldown: '4 h',
    cible: 'Soi',
    effets: [
      'Les troupes se battent jusqu\'à la mort pour couvrir la fuite du lanceur : la troupe Invocation occulte est perdue',
      'Permet de fuir pendant 10 minutes sans que les adversaires puissent intervenir',
    ],
    conditions: ['Avoir le statut En Combat', 'Ne pas avoir le statut Controle'],
    notes: 'Pendant la fuite, interdiction d\'utiliser le vol ou un téléporteur.',
  },
  1737: { // Sacrifice de troupe (élite)
    cout: { 'Garde de qualité': 1 },
    cooldown: '4 h',
    cible: 'Soi',
    effets: [
      'Les troupes se battent jusqu\'à la mort pour couvrir la fuite du lanceur : la troupe Garde de qualité est perdue',
      'Permet de fuir pendant 10 minutes sans que les adversaires puissent intervenir',
    ],
    conditions: ['Avoir le statut En Combat', 'Ne pas avoir le statut Controle'],
    notes: 'Pendant la fuite, interdiction d\'utiliser le vol ou un téléporteur.',
  },
  1984: { // Désarçonner
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Controle (si la cible a le statut Monture)'],
    retire: ['Monture'],
    effets: ['Fait descendre la cible de sa monture'],
    conditions: ['Avoir le statut En Combat'],
    premierTour: true,
    notes: 'Utilisable dès le Premier Tour. Sans effet si la cible n\'est pas montée.',
  },
  1459: { // Pierre d'éclat
    cout: { PA: 1, PS: 1, "Pierre d'éclat": 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Controle'],
  },
  717: { // Faire Saigner
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Saignement'],
    notes: 'Ne fait pas de dégâts, sauf si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.',
  },
  1817: { // Coup Vicieux
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Vulnérable'],
    notes: 'Ne fait pas de dégâts.',
  },
  722: { // Lancer de hache
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Tranchants'],
    statuts: ['Immobile'],
  },
  719: { // Faucher les jambes
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '3 cibles',
    statuts: ['Controle'],
    effets: ['Pousse la cible de 1.3 Tiles'],
    notes: 'Ne fait pas de dégâts.',
  },
  349: { // Prier
    cooldown: '20 h',
    portee: '5 Tiles',
    cible: '1 cible',
    gain: { Foi: 20 },
    statuts: ['Benediction (40 h)'],
    conditions: ['Ne pas avoir le statut Priere', 'La cible doit être un Prêtre (le lanceur peut se cibler lui-même s\'il est Prêtre)'],
    notes: 'Le buff Benediction s\'applique au lanceur et à la cible.',
  },
  347: { // Apaisement
    cout: { Foi: 5 },
    portee: '3 Tiles',
    cible: '1 cible',
    gain: { 'Santé mentale': 10 },
  },
  1622: { // Ferveur guerrière
    cout: { Foi: 50 },
    portee: '10.5 Tiles',
    cible: 'Tout le monde sauf le lanceur',
    effets: ['Donne +10 Puissance de Troupe pendant 20 h'],
    conditions: ['Avoir le statut Pretre'],
  },
  2244: { // Flétrissement de potions
    cout: { Foi: 5 },
    portee: '5 Tiles',
    cible: '1 cible',
    perte: { 'Ceinture de potion': 1 },
  },
  2225: { // Purification
    cout: { Foi: 'X' },
    portee: '5 Tiles',
    cible: '1 cible',
    perte: { Corruption: 'X' },
    notes: 'Retire X Corruption à la cible en consommant X Foi.',
  },
  503: { // Charme-Personne
    cooldown: '15 min',
    portee: '5 Tiles',
    cible: '1 cible',
    jet: '3d6 + Force Mentale contre 3d6 + Force Mentale de la cible',
    statuts: ['Charme Personne (30 min)'],
    conditions: ['Avoir le statut C.Controle Mental', 'Hors combat'],
    effets: ["La cible devient amicale envers le lanceur : il ne peut pas lui donner d'ordre, mais elle ne peut pas lui être hostile"],
  },
  2487: { // Commandement
    cooldown: '15 min',
    portee: '5 Tiles',
    cible: '1 cible',
    jet: '3d6 + Force Mentale contre 3d6 + Force Mentale de la cible',
    conditions: ['Avoir le statut C.Controle Mental', 'Hors combat'],
    effets: ['Permet de donner un ordre unique à la cible'],
  },
  2218: { // Rupture de contrôle mental
    cout: { Foi: 20 },
    portee: '5 Tiles',
    retire: ['Domination', 'Charme Personne'],
  },
  2412: { // Domination
    cooldown: '45 min',
    portee: '5 Tiles',
    cible: '1 cible',
    jet: '3d6 + Force Mentale contre 3d6 + Force Mentale de la cible',
    statuts: ['Domination (30 min)', 'Controle Mental (statut visible, 30 min)'],
    conditions: ['Avoir le statut C.Controle Mental', 'Hors combat'],
    effets: ['Permet de prendre le contrôle de la cible'],
  },
  9001: { // Cérémonies (n° provisoire : n° en jeu inconnu)
    cible: 'Soi',
    statuts: ['Celebration Faite (20 h)'],
    conditions: ['Ne pas avoir le statut Celebration Faite', 'Avoir le statut Pretre'],
    effets: [
      'Permet de choisir entre deux célébrations :',
      ['Célébration de châtiments : Colère divine, qui octroie :', ['Rituels de Châtiment']],
      ['Célébrations de grâces : Grâces Divine, qui octroie :', ['Stimulation de soin', 'Apaisement', 'Ferveur guerrière', 'Rituels de grâces']],
    ],
  },
  9002: { // Rituels de grâces (n° provisoire : n° en jeu inconnu)
    cible: 'Soi',
    conditions: ['Avoir le statut Pretre'],
    effets: [
      ['Permet de choisir de lancer un de ces sorts :', ['Rupture de Contrôle Mental', 'Exorciser Malédictions', 'Restauration Arcanique', 'Purification', "Restauration d'âme"]],
    ],
    sources: ['Grâces Divine (Cérémonies)'],
  },
  1995: { // Se dissimuler
    portee: '10 Tiles',
    cible: 'Tout le monde à portée',
    jet: '3d6 + Discrétion contre 3d6 + Perception de chaque personne à portée',
    desc: 'À utiliser pour espionner discrètement, sans être vu.',
    effets: [
      'Le message « Vous tentez un jet de Discrétion contre : Votre cible. » s\'affiche à l\'espion, qui doit en fournir un screen en cas de litige',
      'Une personne qui réussit voit le message « Vous sentez la présence de quelqu\'un qui se dissimule aux alentours. »',
      'L\'espion fait aussi un jet de Perception contre une difficulté de 14. S\'il réussit et qu\'au moins une personne l\'a repéré, il voit le message « Vous sentez que votre infiltration a été repérée »',
    ],
    notes: 'Tous les jets sont cachés, pour limiter le méta.',
  },
  2437: { // Observer en coin
    cooldown: '15 min',
    portee: '2 Tiles',
    cible: '1 cible',
    jet: '3d6 + Perception contre 3d6 + Déguisement de la cible',
    effets: ["Permet d'obtenir des informations sur la cible : son espèce, son tempérament, sa morphologie, sa corruption et ses Talents"],
  },
  1999: { // Charge d'interception (Tranchante)
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Tranchants'],
    statuts: ['Immobile'],
    effets: ['Projette son personnage de 3 Tiles en avant vers la cible'],
  },
  2000: { // Charge d'interception (Perçante)
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Perforants'],
    statuts: ['Immobile'],
    effets: ['Projette son personnage de 3 Tiles en avant vers la cible'],
  },
  2001: { // Charge d'interception (Contondante)
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Contondants'],
    statuts: ['Immobile'],
    effets: ['Projette son personnage de 3 Tiles en avant vers la cible'],
  },
  718: { // Renverser
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Controle'],
    notes: 'Ne fait pas de dégâts.',
  },
  1938: { // Coup Vicieux (Deux armes)
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Vulnérable'],
    conditions: ['Avoir le statut En Combat', 'Avoir Voie Jumelle', 'Ne pas avoir une arme à deux mains équipée'],
    notes: 'Ne fait pas de dégâts.',
  },
  1946: { // Renversement (Deux armes)
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Controle'],
    conditions: ['Ne pas avoir une arme à deux mains équipée'],
    effets: ['Fait tomber la cible en arrière'],
    notes: 'Ne fait pas de dégâts.',
  },
  1939: { // Balayage (Deux armes)
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '3 cibles',
    degats: ['Tranchants fixes', 'Physiques'],
    conditions: ['Avoir Voie Jumelle', 'Ne pas avoir une arme à deux mains équipée'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques.",
  },
  1940: { // Fracassement (Deux Armes)
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Vulnérable'],
    conditions: ['Avoir Voie Jumelle', 'Ne pas avoir une arme à deux mains équipée'],
    notes: 'Ne fait pas de dégâts.',
  },
  1941: { // Faucher les jambes (Deux armes)
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '3 cibles',
    statuts: ['Controle'],
    conditions: ['Ne pas avoir une arme à deux mains équipée'],
    notes: 'Ne fait pas de dégâts.',
  },
  1942: { // Double fente (Deux armes)
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
    statuts: ['Confus'],
    conditions: ['Avoir Voie Jumelle','Ne pas avoir une arme à deux mains équipée'],
  },
  1725: { // Coup de tête
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
    notes: 'Les bonus de Dégâts Contondants (arme, consommables…) ne sont pas pris en compte.',
  },
  1919: { // Utiliser posture offensive
    cout: { PP: 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Buff Magique'],
  },
  1920: { // Utiliser posture defensive
    cout: { PP: 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Buff Magique'],
  },
  1921: { // Utiliser posture technique
    cout: { PP: 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Buff Magique'],
  },
  1922: { // Utiliser posture mobile
    cout: { PP: 1 },
    cible: 'Soi',
    conditions: ['Ne pas avoir le statut Buff Magique'],
  },
  471: { // Coup de caudale
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants fixes', 'Physiques'],
    notes: "30 dégâts Contondants fixes (pas influencés par l'arme ni par les bonus Contondants) + les Dégâts Physiques.",
  },
  1867: { // Frappe de Geant
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants fixes', 'Physiques'],
    notes: "30 dégâts Contondants fixes (pas influencés par l'arme ni par les bonus Contondants) + les Dégâts Physiques.",
  },
  467: { // Bond
    cout: { PS: 1 },
    cible: 'Soi',
    retire: ['En mêlée'],
    effets: ['Fait reculer automatiquement le personnage en arrière de 2.68 Tiles'],
  },
  2002: { // Bond Ailé
    cout: { PS: 1 },
    cible: 'Soi',
    effets: ['Permet de se déplacer d\'autant de Tiles que la stat Déplacement du personnage'],
  },
  1724: { // Attrapper
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Immobile'],
    notes: 'Ne fait pas de dégâts.',
  },
  1013: { // Lancer de couteau
    type: 'Attaque',
    cout: { PS: 1, 'Lames de jet': 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Tranchants fixes', 'Physiques'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques.",
  },
  1943: { // Lancer de couteau (Toxique)
    type: 'Attaque',
    cout: { PS: 1, 'Lames de jet empoisonnés (Toxique)': 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Tranchants fixes', 'Physiques'],
    statuts: ['Poison'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques. Si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme.",
  },
  1944: { // Lancer de couteau (Poison de Mana)
    type: 'Attaque',
    cout: { PS: 1, 'Lames de jet empoisonnés (Poison de Mana)': 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Tranchants fixes', 'Physiques'],
    statuts: ['Poison de Mana'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques. Si la cible a déjà le Poison de Mana : Poison de Mana aggravé, qui retire du Mana (pas des PV), résisté par le Métabolisme.",
  },
  723: { // Lancer de javelot
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Perforants'],
    statuts: ['Immobile'],
  },
  724: { // Tir (Court)
    type: 'Attaque',
    cout: { PA: 1, 'Flèches/Carreaux': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1982: { // Tir (Long)
    type: 'Attaque',
    cout: { PA: 1, 'Flèches/Carreaux': 1 },
    portee: '10 Tiles',
    cible: '1 cible',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  748: { // Triple fleche
    type: 'Attaque',
    cout: { PA: 1, PS: 1, 'Flèches/Carreaux': 3 },
    portee: '6 Tiles',
    cible: '3 cibles',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  2311: { // Tir Empoisonné (Toxique)
    type: 'Attaque',
    cout: { PS: 1, 'Flèches/Carreaux (Toxique)': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    statuts: ['Poison'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme.',
  },
  2312: { // Tir Empoisonné (Mana)
    type: 'Attaque',
    cout: { PS: 1, 'Flèches/Carreaux (Poison de Mana)': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    statuts: ['Poison de Mana'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible a déjà le Poison de Mana : Poison de Mana aggravé, qui retire du Mana (pas des PV), résisté par le Métabolisme.',
  },
  2335: { // Tir Pointe Barbelée
    type: 'Attaque',
    cout: { PS: 1, 'Flèches Barbelées': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Tranchants', 'Adresse'],
    physiques: false,
    statuts: ['Saignement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.',
  },
  2336: { // Viser
    type: 'Buff',
    cout: { PA: 1 },
    cible: 'Soi',
    effets: ["Capacité de Tir +3 (jusqu'au prochain Commencer le tour)"],
  },
  747: { // Tir Handicapant
    cout: { PS: 1, 'Flèches/Carreaux': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Immobile'],
    notes: 'Ne fait pas de dégâts.',
  },
  1991: { // Tir Fusil (Court)
    type: 'Attaque',
    cout: { PA: 1, Munitions: 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1014: { // Tir de Fusil (Long)
    type: 'Attaque',
    cout: { PA: 1, Munitions: 1 },
    portee: '10 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1983: { // Tir Arbalète (Court)
    type: 'Attaque',
    cout: { PA: 1, 'Flèches/Carreaux': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1756: { // Tir Arbalète (Long)
    type: 'Attaque',
    cout: { PA: 1, 'Flèches/Carreaux': 1 },
    portee: '10 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  2313: { // Tir Empoisonné Ar. (Toxique)
    type: 'Attaque',
    cout: { PS: 1, 'Flèches/Carreaux (Toxique)': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Poison'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible est déjà empoisonnée : Poison aggravé, des dégâts supplémentaires résistés par le Métabolisme.',
  },
  2314: { // Tir Empoisonné Ar. (Mana)
    type: 'Attaque',
    cout: { PS: 1, 'Flèches/Carreaux (Poison de Mana)': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Poison de Mana'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible a déjà le Poison de Mana : Poison de Mana aggravé, qui retire du Mana (pas des PV), résisté par le Métabolisme.',
  },
  2339: { // Tir Pointe Barbelée (Ar)
    type: 'Attaque',
    cout: { PS: 1, 'Flèches Barbelées': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Saignement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.',
  },
  2337: { // Tir Ciblé (Arbalète)
    type: 'Attaque',
    cout: { PA: 1, PS: 1, 'Flèches/Carreaux': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Immobile'],
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1015: { // Tir Ciblé (Fusil)
    type: 'Attaque',
    cout: { PA: 1, PS: 1, Munitions: 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Immobile'],
    conditions: ['Ne pas avoir le statut En mouvement'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type.',
  },
  1017: { // Tir de semonce
    cout: { PA: 1, PS: 1, Munitions: 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    statuts: ['Controle'],
    notes: 'Ne fait pas de dégâts.',
  },
  2338: { // Tir balle explosive
    type: 'Attaque',
    cout: { PS: 1, 'Munitions explosives': 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants', 'Adresse'],
    physiques: false,
    statuts: ['Brûlure'],
    notes: 'Les Dégâts Physiques ne comptent pas : à la place, Dégâts d\'Adresse (Adresse × 2) en plus des dégâts de type. Si la cible brûle déjà : Brûlure aggravée, des dégâts supplémentaires résistés par la Résilience.',
  },
  1892: { // Rechargement Pistolet
    cout: { PS: 1 },
    gain: { Recharge: 1 },
    notes: 'Maximum 2 points de Recharge.',
  },
  1460: { // Tir de Pistolet
    type: 'Attaque',
    cout: { Recharge: 1, Munitions: 1 },
    portee: '6 Tiles',
    cible: '1 cible',
    degats: ['Perforants fixes', 'Adresse'],
    notes: "Dégâts Perforants fixes (pas influencés par l'arme) + les Dégâts d'Adresse (Adresse × 2). Les Dégâts Physiques ne comptent pas.",
  },
  616: { // Coup de bouclier
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Controle'],
    notes: 'Ne fait pas de dégâts.',
  },
  2292: { // Fracassement (2M)
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    statuts: ['Vulnérable'],
    notes: 'Ne fait pas de dégâts.',
  },
  711: { // Balayage
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '3 cibles',
    degats: ['Tranchants'],
  },
  383: { // Salve de fleches
    type: 'Attaque',
    cout: { AT: 1 },
    cible: 'Soi',
    conditions: ['Avoir le statut En Combat'],
    effets: ['Lance une attaque en ligne qui inflige des dégâts inesquivables, selon le Commandement du lanceur'],
  },
  1787: { // Morsure de Bête
    type: 'Attaque',
    cout: { AT: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    jet: '3d6 + (Commandement × 2) contre 3d6 + Esquive de la cible',
    statuts: ['Immobile', 'Saignement'],
    resistance: [['Saignement', 'Résilience']],
    conditions: ['Avoir le statut En Combat'],
    notes: 'Ne fait pas de dégâts, sauf si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.',
  },
  466: { // Tisser Toile
    cout: { PS: 1 },
    portee: '4 Tiles',
    cible: '1 cible',
    statuts: ['Ralenti'],
    conditions: ['Avoir le statut En Combat'],
  },
  507: { // Produire Toxine
    cooldown: '20 h',
    cible: 'Soi',
    effets: ['Produit un objet : 1x Poison toxique'],
  },
  576: { // Transformation Lycanthrope I
    cible: 'Soi',
    conditions: ["Ne pas avoir d'arme équipée", "Ne pas avoir d'armure équipée", 'Ne pas avoir de Monture', 'Ne pas être transformé', "Ne pas avoir d'objet en main gauche", 'Ne pas avoir de Bouclier', 'Ne pas avoir de Bouclier de qualité'],
  },
  333: { // Reprendre forme Humaine
    cible: 'Soi',
    effets: ['Retire la transformation en cours'],
  },
  469: { // Bond Puissant
    cout: { PS: 1 },
    portee: '2 Tiles',
    cible: '1 cible',
    statuts: ['Confus'],
    conditions: ['Avoir le statut En Combat'],
    effets: ["Fait sauter le personnage jusqu'à la cible"],
    notes: 'Ne doit être utilisé que pour se rapprocher, pas pour fuir.',
  },
  553: { // Morsure
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Perforants fixes', 'Physiques'],
    conditions: ['Avoir le statut En Combat'],
    notes: "Dégâts Perforants fixes (pas influencés par l'arme) + les Dégâts Physiques.",
  },
  470: { // Coup de griffes
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Tranchants fixes', 'Physiques'],
    statuts: ['Saignement'],
    conditions: ['Avoir le statut En Combat'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques. Si la cible saigne déjà : Saignement aggravé, des dégâts de Sang supplémentaires résistés par la Résilience.",
  },
  712: { // Coup Tourbillonnant
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '3 cibles',
    degats: ['Contondants'],
  },
  1785: { // Coup de Lance
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1.5 Tiles',
    cible: '1 cible',
    degats: ['Perforants'],
  },
  1989: { // Regle
    portee: '20 Tiles',
    desc: 'Affiche la distance en Tiles des autres personnages autour.',
  },
  713: { // Empaler
    type: 'Attaque',
    cout: { PA: 1, PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Perforants'],
    effets: ['Défense −10 sur la cible pendant le coup (à confirmer)'],
  },
  473: { // Souffle Enflammé
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '4 Tiles',
    cible: '1 cible',
    degats: ['Feu'],
    effets: ['Défense −25 sur la cible pendant le coup'],
    conditions: ['Avoir le statut En Combat'],
  },
  2433: { // Fouettement
    cout: { PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Confus'],
    conditions: ['Avoir le statut En Combat'],
    notes: 'Ne fait pas de dégâts.',
  },
  2434: { // Emprise
    cout: { PS: 1 },
    portee: '3 Tiles',
    cible: '1 cible',
    statuts: ['Immobile'],
    conditions: ['Avoir le statut En Combat', 'Ne pas avoir le statut Premier Tour'],
    notes: 'Ne fait pas de dégâts.',
  },
  472: { // Crachat puissant
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '4 Tiles',
    cible: '1 cible',
    degats: ['Eau', 'Perforants fixes'],
    conditions: ['Avoir le statut En Combat'],
    notes: "25 dégâts Perforants fixes (pas influencés par l'arme ni par les bonus Perforants) + les dégâts d'Eau.",
  },
  2004: { // Mordhau
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
    statuts: ['Confus'],
  },
  2341: { // Frappe Flamboyante
    type: 'Attaque',
    cout: { PA: 1, Mana: 20 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Meilleur type de dégâts d\'arme', 'Physiques ou Magiques (le plus élevé)', 'Feu'],
    statuts: ['Brûlure'],
    conditions: ['Avoir le statut En Combat'],
    sources: ['Statut Infusion Feu (Infusion Incandescente)'],
    notes: 'Dégâts du type le plus élevé du personnage parmi Tranchants, Perforants et Contondants + Dégâts Physiques ou Magiques (selon le plus élevé du personnage) + dégâts de Feu égaux à la stat Feu ÷ 2.',
  },
  2346: { // Frappe Vampirique
    type: 'Attaque',
    cout: { PA: 1, Mana: 15 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Meilleur type de dégâts d\'arme', 'Physiques ou Magiques (le plus élevé)', 'Sang'],
    effets: ['Rend au lanceur la moitié des dégâts infligés en PV'],
    conditions: ['Avoir le statut En Combat'],
    sources: ['Statut Infusion Sang (Infusion sanglante)'],
    notes: 'Dégâts du type le plus élevé du personnage parmi Tranchants, Perforants et Contondants + Dégâts Physiques ou Magiques (selon le plus élevé du personnage) + dégâts de Sang égaux à la stat Sang ÷ 2.',
  },
  2345: { // Frappe Foudroyante
    type: 'Attaque',
    cout: { PA: 1, Mana: 20 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Meilleur type de dégâts d\'arme', 'Physiques ou Magiques (le plus élevé)', 'Air'],
    effets: ['Ne peut pas être parée'],
    conditions: ['Avoir le statut En Combat'],
    sources: ['Statut Infusion Air (Infusion de Tempête)'],
    notes: 'Dégâts du type le plus élevé du personnage parmi Tranchants, Perforants et Contondants + Dégâts Physiques ou Magiques (selon le plus élevé du personnage) + dégâts d\'Air égaux à la stat Air ÷ 2.',
  },
  2342: { // Lame d'air
    type: 'Attaque',
    cout: { PA: 1, Mana: 30 },
    portee: '3 Tiles',
    cible: '1 cible',
    degats: ['Meilleur type de dégâts d\'arme', 'Physiques ou Magiques (le plus élevé)', 'Air'],
    effets: ['Ne peut pas être parée', 'Fait avancer le lanceur de 0.57 Tile'],
    conditions: ['Avoir le statut En Combat'],
    sources: ['Statut Infusion Air (Infusion de Tempête)'],
    notes: 'Dégâts du type le plus élevé du personnage parmi Tranchants, Perforants et Contondants + Dégâts Physiques ou Magiques (selon le plus élevé du personnage) + dégâts d\'Air égaux à la stat Air ÷ 2.',
  },
  710: { // Coup de masse
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
  },
  596: { // Coup de Lame
    type: 'Attaque',
    cout: { PA: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Tranchants'],
    conditions: ['Avoir le statut En Combat'],
  },
  2409: { // Coup de Lame (Bottes Dagues)
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Tranchants fixes', 'Physiques'],
    conditions: ['Avoir le statut En Combat'],
    notes: "Dégâts Tranchants fixes (pas influencés par l'arme) + les Dégâts Physiques.",
  },
  1988: { // Couper liens
    cout: { PM: 1 },
    cible: 'Soi',
    retire: ['Ralenti'],
  },
  1987: { // Changer d'arme
    cout: { PA: 1 },
    desc: 'Change en même temps son arme principale et son arme secondaire.',
  },
  1986: { // Remonter à Cheval
    cout: { PM: 1 },
    desc: 'Permet de remonter en selle sur sa monture.',
  },
  82: { // Deplacement Monture
    cout: { PM: 1 },
    jet: '(1d2 + Déplacement) × 3',
    statuts: ['En mouvement'],
    desc: 'Le résultat du jet donne le nombre de Tiles dont le personnage peut se déplacer.',
    conditions: ['Avoir le statut Monture (être réellement monté)'],
  },
  86: { // Fuir
    cout: { PM: 1 },
    portee: '20 Tiles',
    cible: "Tous les adversaires (jusqu'à 10)",
    desc: "Permet de sortir d'un combat.",
    notes: "Une seule tentative : en cas d'échec, impossible de relancer. Il faut alors fuir autrement (s'éloigner très loin ou sacrifier un garde).",
  },
  83: { // Deplacement supplémentaire
    cout: { PA: 1 },
    cible: 'Soi',
    desc: 'Permet de se déplacer de 3 Tiles.',
    statuts: ['En mouvement'],
  },
  81: { // Deplacement
    cout: { PM: 1 },
    cible: 'Soi',
    jet: '1d2 + Déplacement',
    desc: 'Le résultat du jet donne le nombre de Tiles dont le personnage peut se déplacer.',
    statuts: ['En mouvement'],
  },
  79: { // Terminer le combat
    cible: 'Soi',
    desc: "Met fin au combat uniquement pour le personnage qui l'utilise et lui retire les statuts temporaires liés au combat.",
    retire: ['Confus', 'Controle', 'Incontrolable', 'Immobile', 'Ralenti', 'En mouvement'],
    notes: 'Liste des statuts retirés non exhaustive.',
  },
  78: { // Terminer tour (Controle)
    desc: 'Termine son tour sans rien faire.',
    retire: ['Controle'],
    statuts: ['Incontrolable (3 tours)'],
  },
  77: { // Terminer le tour
    desc: 'Met fin au tour du personnage.',
    retire: ['Confus', 'Immobile', 'En mouvement'],
  },
  76: { // Commencer le tour
    desc: 'Déclare le début du tour du personnage et lui rend tous ses points.',
    recharge: { PA: 1, PM: 1, PS: 1, AT: '1/1 · 3/3 avec armée', PP: 1 },
    retire: ['Posture en cours', 'Flamboiement', 'Bio-Electricite', 'Bouclier Magique', 'Bouclier Magique (M)', 'Bouclier Magique (P)'],
  },
  75: { // Initiative
    portee: '~16 Tiles',
    cible: 'Tous les joueurs à portée',
    jet: '3d6 + Initiative',
    desc: "Marque le début d'un combat. Tous les joueurs à portée lancent un jet d'Initiative, basé sur leur statistique d'Initiative.",
  },
  721: { // Coup de pommeau
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
    statuts: ['Confus'],
  },
  720: { // Coup de hampe : équivalent du Coup de pommeau pour les lances
    type: 'Attaque',
    cout: { PS: 1 },
    portee: '1 Tile',
    cible: '1 cible',
    degats: ['Contondants'],
    statuts: ['Confus'],
  },
  1096: { // Morsure Lycanthrope
    notes: 'En chantier.',
  },
};
// Variantes qui fonctionnent exactement comme une autre aptitude
// fiches ERP documentées dans abilities-erp.js
if (typeof DETAILS_ERP !== 'undefined') Object.assign(DETAILS, DETAILS_ERP);
DETAILS[1885] = DETAILS[1602]; // Utiliser Cosmétiques = S'apprêter
DETAILS[2003] = DETAILS[720]; // Coup de hampe (2M) = Coup de hampe
DETAILS[716] = DETAILS[2292]; // Fracassement (1M) = Fracassement (2M)


// ============================================================================
// OUTILS
// ============================================================================
function esc(s){
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}
// recherche insensible aux accents et à la casse
function norm(s){
  return String(s).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
}
function slug(s){
  return norm(s).replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}
// Préférences d'affichage propres à ce navigateur (sans effet si le stockage est indisponible)
const STORE_PREFIX = PAGE_MODE === 'erp' ? 'aptitudes-erp:' : 'aptitudes:';
const store = {
  get(k, def){ try { const v = localStorage.getItem(STORE_PREFIX + k); return v === null ? def : JSON.parse(v); } catch (e) { return def; } },
  set(k, v){ try { localStorage.setItem(STORE_PREFIX + k, JSON.stringify(v)); } catch (e) { /* stockage indisponible */ } },
};

// ============================================================================
// LIENS AVEC LE SIMULATEUR (data.js)
// ============================================================================
// Aptitudes dont les effets sont décrits par une entrée du simulateur : [collection, clé]
const DATA_LINKS = {
  1919: ['POSTURES', 'Posture Offensive'], 1920: ['POSTURES', 'Posture Defensive'],
  1921: ['POSTURES', 'Posture Technique'], 1922: ['POSTURES', 'Posture Mobile'],
  334: ['TRANSFORMATIONS_CHANGEFORME', 'Araignée'], 565: ['TRANSFORMATIONS_CHANGEFORME', 'Cervidé'],
  566: ['TRANSFORMATIONS_CHANGEFORME', 'Lagomorphe'], 567: ['TRANSFORMATIONS_CHANGEFORME', 'Félin'],
  568: ['TRANSFORMATIONS_CHANGEFORME', 'Canidé'], 569: ['TRANSFORMATIONS_CHANGEFORME', 'Aviaire'],
  570: ['TRANSFORMATIONS_CHANGEFORME', 'Vulpes'], 571: ['TRANSFORMATIONS_CHANGEFORME', 'Urside'],
  572: ['TRANSFORMATIONS_CHANGEFORME', 'Aquatique'], 573: ['TRANSFORMATIONS_CHANGEFORME', 'Reptile'],
  575: ['TRANSFORMATIONS_CHANGEFORME', 'Dragon'],
  576: ['TRANSFORMATIONS', 'Lycanthrope I'], 577: ['TRANSFORMATIONS', 'Démoniaque'],
  637: ['CONSUMABLES', 'Casse-Croûte'], 638: ['CONSUMABLES', 'Repas'], 639: ['CONSUMABLES', 'Jus'],
  640: ['CONSUMABLES', 'Alcool doux'], 642: ['CONSUMABLES', 'Spiritueux (Alcool Fort)'],
  623: ['CONSUMABLES', 'Dopant Psychique'], 624: ['CONSUMABLES', 'Dopant Physique'],
  1044: ['CONSUMABLES', 'Parfum (Sent Bon)'], 1602: ['CONSUMABLES', 'Cosmétique (Maquillage)'], 1601: ['CONSUMABLES', 'Savon (Propre)'], 1885: ['CONSUMABLES', 'Cosmétique (Maquillage)'],
};
const DATA_COLLECTIONS = { POSTURES, TRANSFORMATIONS, TRANSFORMATIONS_CHANGEFORME, CONSUMABLES };

// Libellés des stats pour l'affichage des effets
const ATTR_LABELS = Object.fromEntries(ATTRIBUTES.map(a => [a.key, a.label]));
function statLabel(k){
  return TALENT_STAT_LABELS[k] || STATS[k] || PARENT_LABELS_SHORT[k] || ATTR_LABELS[k]
    || EXTRA_STATS[k] || OTHER_STATS[k] || ELEMENTAL_STATS[k] || k;
}

// Clé de comparaison des noms d'aptitude (accents, casse, ligatures et espaces ignorés)
function nameKey(s){
  return norm(String(s).replace(/œ/g, 'oe').replace(/Œ/g, 'Oe')).replace(/\s+/g, ' ').trim();
}
// Noms utilisés dans le simulateur qui diffèrent du nom en jeu
const NAME_ALIASES = {
  'couper les liens': 'couper liens',
  'sacrifice invocation occulte': 'sacrifice de troupe (invocation occulte)',
};

const ABILITY_BY_KEY = {};
ALL_CATEGORIES.forEach(c => c.groups.forEach(g => g.abilities.forEach(([id, name]) => { ABILITY_BY_KEY[nameKey(name)] = id; })));
function abilityIdFor(name){
  const k = nameKey(name);
  return ABILITY_BY_KEY[NAME_ALIASES[k] || k];
}

// Notes du simulateur : 'Octroie : X' (aptitude) et 'Octroie le statut : X'
function grantedAbilities(notes){ return (notes || []).map(n => /^Octroie\s*:\s*(.+)$/.exec(n)).filter(Boolean).map(m => m[1]); }
function grantedStatuses(notes){ return (notes || []).map(n => /^Octroie le statut\s*:\s*(.+)$/i.exec(n)).filter(Boolean).map(m => m[1]); }

// Index inverse : pour chaque aptitude, ce qui l'octroie dans le simulateur
const GRANTED_BY = {};
const UNMATCHED_GRANTS = new Set();
function addGrant(abilityName, kind, label){
  const id = abilityIdFor(abilityName);
  if (!id) { UNMATCHED_GRANTS.add(abilityName); return; }
  const list = GRANTED_BY[id] = GRANTED_BY[id] || [];
  if (!list.some(x => x.kind === kind && x.label === label)) list.push({ kind, label });
}
function indexSource(kind, entries){
  Object.entries(entries).forEach(([key, data]) => grantedAbilities(data.notes).forEach(a => addGrant(a, kind, key)));
}
Object.entries(EQUIPMENT).forEach(([slot, items]) => {
  Object.entries(items).forEach(([item, data]) => {
    // perk principal de l'objet (ex. « Lames 1M »), hors perks génériques ; les perks d'armure ne sont pas des noms d'objet
    const perk = !['armure', 'autre'].includes(slot) && (data.notes || []).map(n => /^Octroie le Perk\s*:\s*(.+)$/.exec(n)).filter(Boolean).map(m => m[1])
      .find(p => !['Arme', 'Deux Mains'].includes(p));
    const label = perk && perk !== item ? `${item} (${perk})` : item;
    grantedAbilities(data.notes).forEach(a => addGrant(a, SLOT_LABELS[slot] || slot, label));
  });
});
indexSource('Espèce', SPECIES);
indexSource('Malédiction', CURSES);
indexSource('Corruption', CORRUPTION);
indexSource('Transformation', TRANSFORMATIONS);
indexSource('Changeforme', TRANSFORMATIONS_CHANGEFORME);
indexSource('Statut', STATUSES);
indexSource('Consommable', CONSUMABLES);
indexSource('Environnement', ENVIRONMENTS);
grantedAbilities(TENERIFFE.notes).forEach(a => addGrant(a, 'Lignée', 'Ténériffe'));
grantedAbilities(ESCLAVE.notes).forEach(a => addGrant(a, 'Statut', 'Esclave'));
TALENTS.forEach(t => grantedAbilities(t.notes).forEach(a => addGrant(a, 'Talent', t.name)));
// les formes du Changeforme nécessitent le talent du même nom
Object.entries(DATA_LINKS).forEach(([id, [coll]]) => {
  if (coll === 'TRANSFORMATIONS_CHANGEFORME') (GRANTED_BY[id] = GRANTED_BY[id] || []).push({ kind: 'Talent', label: 'ChangeForme' });
});
if (UNMATCHED_GRANTS.size) console.warn('Aptitudes du simulateur introuvables dans l\'encyclopédie :', [...UNMATCHED_GRANTS]);

// Effets chiffrés d'une entrée du simulateur : [[libellé, valeur], …]
function dataEffects(data){
  const entries = [];
  ['parentDelta', 'attrDelta', 'flatStats', 'extraStats', 'otherStats', 'elemental'].forEach(field => {
    Object.entries(data[field] || {}).forEach(([k, v]) => { if (v) entries.push([statLabel(k), v, field === 'erpStats']); });
  });
  return entries;
}
function effectPills(entries){
  return entries.map(([label, v, erp]) =>
    `<span class="pill eff ${erp ? 'erp-' : ''}${v > 0 ? 'pos' : 'neg'}">${esc(label)} ${v > 0 ? '+' : ''}${esc(v)}</span>`).join('');
}

// ============================================================================
// COULEURS & PASTILLES
// ============================================================================
// Code couleur des statuts (les statuts inconnus reçoivent une teinte stable dérivée de leur nom)
const STATUS_COLORS = {
  'Confus': '#e8d25f',
  'Controle': '#ef7d5e',
  'Incontrolable': '#c9a0e8',
  'Immobile': '#6fa8e6',
  'Ralenti': '#8aa0c8',
  'En mouvement': '#5fd0b8',
  'Vulnérable': '#ec7fb6',
  'Saignement': '#e05555',
  'Poison': '#98cc5c',
  'Poison de Mana': '#a487f0',
  'Brûlure': '#f5a54a',
  'Bouclier Magique': '#6ccbee',
  'Bouclier Magique (M)': '#ff9f6b',
  'Bouclier Magique (P)': '#c9a777',
  'Bon repos': '#b4d48f',
  'Propre': '#7cc7b8',
  'Blessure': '#c76b6b',
  'Visage Trouble': '#b08ee0',
  'Flamboiement': '#ffb347',
  'Bio-Electricite': '#c79bf2',
  'En mêlée': '#d98c6a',
  'Maquillé': '#f2a9cf',
  'Parfum': '#f0c89a',
  'Posture en cours': '#c9a46e',
};
// Retire une durée finale « (20 h) », « (jusqu'au …) » ; garde un suffixe court qui fait partie du nom, ex. « Bouclier Magique (M) »
// Variantes affichées qui se rangent sous un même statut (couleur, filtre)
const STATUS_GROUPS = { 'blessure normale': 'Blessure' };
const statusBase = name => {
  const base = name.replace(/\s*\([^)]*\s[^)]*\)\s*$/, '');
  return STATUS_GROUPS[nameKey(base)] || base;
};
function statusColor(name){
  const k = nameKey(statusBase(name));
  const known = Object.entries(STATUS_COLORS).find(([n]) => nameKey(n) === k);
  if (known) return known[1];
  let h = 0;
  for (const ch of k) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return `hsl(${h} 62% 66%)`;
}
function statusPill(name, removed){
  const base = statusBase(name);
  return `<span class="pill status filt${removed ? ' removed' : ''}" data-status="${esc(nameKey(base))}" style="--c:${statusColor(name)}" title="${removed ? 'Retire' : 'Applique'} le statut ${esc(base)} — cliquer pour filtrer">${esc(name)}</span>`;
}
// Statut appliqué + ses effets s'il existe dans le simulateur (statuts, puis buffs de consommation).
function statusLine(name){
  const k = nameKey(statusBase(name));
  const src = [STATUSES, CONSUMABLES].map(c => Object.entries(c).find(([key]) => nameKey(key) === k)).find(Boolean);
  const effects = src ? effectPills(dataEffects(src[1])) : '';
  return `<div class="st-line">${statusPill(name, false)}${effects ? `<span class="eff-list">${effects}</span>` : ''}</div>`;
}
function abilityLink(name){
  const id = abilityIdFor(name);
  return id ? `<a class="tag link" href="${abilityHref(id)}">${esc(name)}</a>` : `<span class="tag">${esc(name)}</span>`;
}

const ICONS = {
  type: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14.5 17.5 3 6V3h3l11.5 11.5"/><path d="m13 19 6-6M16 16l4 4M19 21l2-2"/></svg>',
  heal: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
  range: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 12h18M3 12l4-4M3 12l4 4M21 12l-4-4M21 12l-4 4"/></svg>',
  cooldown: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 3h12M6 21h12M7 3c0 5 10 5 10 9s-10 4-10 9M17 3c0 5-10 5-10 9s10 4 10 9"/></svg>',
  target: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/></svg>',
  cost: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 8v8M9 12h6"/></svg>',
  compare: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 3 4 7l4 4M4 7h16M16 21l4-4-4-4M20 17H4"/></svg>',
};

// Ressources dépensées : libellé complet (infobulle) + couleur
const COSTS = {
  PA: { label: "Points d'Action", color: 'var(--gold)' },
  PS: { label: 'Action Spéciale', color: 'var(--ps)' },
  PM: { label: 'Points de Mouvement', color: 'var(--mobilite-bright)' },
  Mana: { label: 'Mana', color: 'var(--magie-bright)' },
  PV: { label: 'Points de Vie', color: 'var(--vitales-bright)' },
  AT: { label: 'Action de Troupe', color: 'var(--defense-bright)' },
  PP: { label: 'Points de Posture', color: 'var(--combat-bright)' },
  'Hygiène': { label: 'Hygiène', color: '#7cc7b8' },
  'Santé mentale': { label: 'Santé mentale', color: '#d79ad0' },
  Corruption: { label: 'Corruption', color: '#9c6fc4' },
  Foi: { label: 'Foi', color: '#e6d27a' },
};
// Coûts filtrables (les ressources d'action uniquement)
const COST_FILTER_KEYS = ['PA', 'PS', 'PM', 'AT', 'PP'];
// Types de dégâts : couleur par mot-clé (la première correspondance l'emporte)
const DAMAGE_COLORS = [
  [/^fixes$/i, '#d8c9a8'],
  [/magi/i, 'var(--magie-bright)'],
  [/physi/i, 'var(--combat-bright)'],
  [/adresse/i, '#5fc9a0'],
  [/contond/i, 'var(--dmg-contondant)'],
  [/tranch/i, 'var(--dmg-tranchant)'],
  [/per[cf]/i, 'var(--dmg-perforant)'],
  [/terre/i, '#c4955a'],
  [/feu/i, '#f2793f'],
  [/eau/i, '#5aaee8'],
  [/air/i, '#b7e0ee'],
  [/lumi/i, '#f3e08a'],
  [/sang/i, '#d84a5a'],
  [/arcane/i, '#b88cf0'],
];
const DMG_ORDER = ['Physiques', 'Adresse', 'Tranchants', 'Perforants', 'Contondants', 'Magiques', 'Terre', 'Feu', 'Eau', 'Air', 'Lumière', 'Sang', 'Arcane', 'Fixes'];
// Types de dégâts filtrables d'une étiquette : « Tranchants fixes » -> Tranchants + Fixes
function damageTypes(t){
  const base = t.replace(/\s*fixes?\s*$/i, '').trim();
  if (!base) return ['Fixes']; // dégâts fixes sans type
  return /fixe/i.test(t) ? [base, 'Fixes'] : [base];
}
function damageColor(t){
  const m = DAMAGE_COLORS.find(([re]) => re.test(t));
  return m ? m[1] : 'var(--text-dim)';
}
// Ciblage : classe d'une aptitude d'après son champ « cible »
const CIBLAGES = [
  ['soi',   { name: 'Soi',            color: '#9fd07a', title: 'Le lanceur uniquement' }, c => /^soi\b/i.test(c)],
  ['mono',  { name: 'Monocible',      color: '#e0b07a', title: 'Une seule cible choisie' }, c => /^1 cible\b/i.test(c)],
  ['multi', { name: 'Multicible',     color: '#e08a4f', title: 'Plusieurs cibles choisies une à une (ex. 3 cibles)' }, c => /^\d+ cibles\b/i.test(c)],
  ['zone',  { name: 'Zone',           color: '#6fb0d4', title: 'Toutes les cibles dans un rayon autour du point choisi' }, c => /^zone\b/i.test(c)],
  ['tous',  { name: 'Tous à portée',  color: '#b48ae0', title: 'Tout le monde à portée, sans choisir de cible' }, c => /^tou[ts]\b/i.test(c)],
];
function ciblageOf(c){
  if (!c) return null;
  const m = CIBLAGES.find(([, , test]) => test(c));
  if (!m) console.warn('Ciblage non classé :', c);
  return m ? m[0] : null;
}
const TYPE_COLORS = { Attaque: 'var(--combat-bright)', Soin: 'var(--pos)' };

// Pastille de ressource (coût, recharge, gain, perte). Un objet consommé s'affiche à part, en pointillés.
function resourcePill(k, text, filterable){
  const c = COSTS[k];
  if (!c) return `<span class="cost item" title="Objet consommé">${text}</span>`;
  return filterable && COST_FILTER_KEYS.includes(k)
    ? `<span class="cost filt" data-cout="${k}" style="--c:${c.color}" title="${esc(c.label)} — cliquer pour filtrer">${text}</span>`
    : `<span class="cost" style="--c:${c.color}" title="${esc(c.label)}">${text}</span>`;
}
const isResource = k => !!COSTS[k];

// ============================================================================
// MODÈLE : toutes les infos d'une aptitude, calculées une seule fois
// ============================================================================
function firstNumber(s){
  const m = /\d+(?:[.,]\d+)?/.exec(s || '');
  return m ? parseFloat(m[0].replace(',', '.')) : null;
}

function buildModel([id, name, opts = {}], cat, group){
  const d = DETAILS[id] || {};
  const link = DATA_LINKS[id];
  const linked = link ? DATA_COLLECTIONS[link[0]][link[1]] : null;

  // les dégâts d'arme (tranchants, perforants, contondants) sont toujours aussi des dégâts physiques
  const degats = [...(d.degats || [])];
  if (d.physiques !== false && degats.some(t => /contond|tranch|per[cf]/i.test(t) && !/fixe/i.test(t)) && !degats.some(t => /physi/i.test(t))) degats.push('Physiques');
  const statuts = [...(d.statuts || []), ...(linked ? grantedStatuses(linked.notes) : [])];
  const retire = [...(d.retire || [])];
  const grants = linked ? grantedAbilities(linked.notes) : [];
  const effects = linked ? dataEffects(linked) : [];
  const sources = [...(GRANTED_BY[id] || []), ...(d.sources || []).map(t => ({ kind: '', label: t }))];
  const cout = Object.entries(d.cout || {});
  const recharge = Object.entries(d.recharge || {});
  const gain = Object.entries(d.gain || {});
  const perte = Object.entries(d.perte || {});
  const effets = [...(d.effets || [])];

  // Règle du jeu : un statut posé par une aptitude qui fait aussi des dégâts ou qui touche une zone se résiste (3d6 + attribut contre 15)
  const resist = [...(d.resistance || [])];
  if (degats.length || /^zone\b/i.test(d.cible || '')) RESIST_RULES.forEach(([st, attr]) => {
    if ((d.statuts || []).some(x => nameKey(statusBase(x)) === nameKey(st)) && !resist.some(([r]) => nameKey(r) === nameKey(st))) resist.push([st, attr]);
  });
  // Règle du jeu : une aptitude qui applique Immobile ou Controle ne peut pas être lancée avec Premier Tour
  const conditions = [...(d.conditions || [])];
  if (!d.premierTour && (d.statuts || []).some(st => /^(Immobile|Controle(?! Mental))\b/.test(st)) && !conditions.includes(PREMIER_TOUR_COND)) conditions.push(PREMIER_TOUR_COND);

  // « Documentée » dès qu'il y a une description, un coût, un usage ou un effet connu
  const documented = !!(d.affiche || (d.menus && d.menus.length) || d.desc || d.type || d.portee || d.cible || d.cooldown
    || cout.length || recharge.length || gain.length || perte.length || retire.length || degats.length
    || effects.length || statuts.length || grants.length);
  // Fiche complète dès qu'il y a la moindre information à afficher (sinon : ligne compacte)
  const hasInfo = documented || !!(d.jet || conditions.length || effets.length || d.notes || resist.length);

  const applies = statuts.map(t => nameKey(statusBase(t)));
  const removes = retire.map(t => nameKey(statusBase(t)));
  const search = norm([name, id, d.desc, d.type, ...degats, ...statuts, ...retire, ...grants, ...effets.flat(2),
    ...cout.map(([k]) => k), ...sources.map(x => x.kind + ' ' + x.label)].filter(Boolean).join(' '));

  // Clés de tri du tableau
  const num = k => { const e = cout.find(([c]) => c === k); return e && typeof e[1] === 'number' ? e[1] : 0; };
  const costSort = cout.length ? (num('PA') + num('PS') + num('PM') + num('AT')) * 1000 + num('Mana') + num('PV') + num('Corruption') : null;

  return {
    id, name, verify: !!opts.verify, cat, group, d,
    degats, statuts, retire, grants, effects, sources, cout, recharge, gain, perte, effets, resist, conditions,
    documented, hasInfo, applies, removes, search,
    couts: cout.map(([k]) => k).filter(k => COST_FILTER_KEYS.includes(k)),
    ciblage: ciblageOf(d.cible),
    degatKeys: [...new Set(degats.flatMap(damageTypes).map(nameKey))],
    sortKeys: { name: name, id, cout: costSort, portee: firstNumber(d.portee) },
  };
}

const MODELS = [];
const MODEL_BY_ID = {};
CATEGORIES.forEach(cat => cat.groups.forEach(g => {
  g.gid = `${cat.key}-${slug(g.label)}`;
  g.models = g.abilities.map(a => buildModel(a, cat, g));
  g.models.forEach(m => {
    if (MODEL_BY_ID[m.id]) console.warn('N° d\'aptitude en double :', m.id);
    MODELS.push(m); MODEL_BY_ID[m.id] = m;
  });
}));

// ============================================================================
// FRAGMENTS HTML PARTAGÉS (fiches, tableau, comparaison)
// ============================================================================
const H = {
  type: m => m.d.type ? `<span class="badge-type" style="--c:${TYPE_COLORS[m.d.type] || 'var(--text-dim)'}">${m.d.type === 'Soin' ? ICONS.heal : ICONS.type}${esc(m.d.type)}</span>` : '',
  verify: m => m.verify ? `<span class="badge-type badge-verify" title="Le classement de cette aptitude reste à confirmer">Classement à vérifier</span>` : '',
  cout: m => m.cout.map(([k, v]) => isResource(k)
    ? resourcePill(k, `${esc(v)} ${esc(k)}`, true)
    : resourcePill(k, `<b>${esc(v)} ×</b> ${esc(k)}`, false)).join(''),
  // nombre -> « 1/1 » ; texte -> affiché tel quel (ex. maximum variable)
  recharge: m => m.recharge.map(([k, v]) => resourcePill(k, `${esc(k)} ${esc(typeof v === 'number' ? `${v}/${v}` : v)}`)).join(''),
  gain: m => m.gain.map(([k, v]) => resourcePill(k, `+${esc(v)} ${esc(k)}`)).join(''),
  perte: m => m.perte.map(([k, v]) => resourcePill(k, `−${esc(v)} ${esc(k)}`)).join(''),
  degats: m => m.degats.map(t => `<span class="pill dmg filt" data-degat="${esc(nameKey(damageTypes(t)[0]))}"${/fixe/i.test(t) ? ' data-fixe="1"' : ''} style="--c:${damageColor(t)}" title="Dégâts ${esc(t)} — cliquer pour filtrer">${esc(t)}</span>`).join(''),
  applique: m => m.statuts.map(statusLine).join(''),
  retire: m => m.retire.map(t => statusPill(t, true)).join(''),
  effects: m => effectPills(m.effects),
  octroie: m => m.grants.map(abilityLink).join(''),
  jet: m => m.d.jet ? esc(m.d.jet) : '',
  resist: m => m.resist.map(([st, attr]) => `<div class="resist">${esc(st)} : la cible lance <b>3d6 + ${esc(attr)}</b> contre <b>15</b></div>`).join(''),
  effets: m => m.effets.length ? `<ul class="bullets">${m.effets.map(e => Array.isArray(e)
    ? `<li>${esc(e[0])}<ul class="bullets">${e[1].map(s => `<li>${esc(s)}</li>`).join('')}</ul></li>`
    : `<li>${esc(e)}</li>`).join('')}</ul>` : '',
  conditions: m => m.conditions.length ? `<ul class="bullets cond">${m.conditions.map(c => `<li>${esc(c)}</li>`).join('')}</ul>` : '',
  sources: m => m.sources.map(x => `<span class="tag">${x.kind ? `<b>${esc(x.kind)}</b>` : ''}${esc(x.label)}</span>`).join(''),
  desc: m => m.d.desc ? esc(m.d.desc) : '',
  notes: m => m.d.notes ? `<span class="notes">${esc(m.d.notes)}</span>` : '',
  affiche: m => Object.entries(m.d.affiche || {}).map(([tab, items]) => [esc(tab), items.map(i => `<span class="tag">${esc(i)}</span>`).join('')]),
  menus: m => (m.d.menus || []).map(x => `<span class="tag">${esc(x)}</span>`).join(''),
  portee: m => m.d.portee ? esc(m.d.portee) : '',
  cible: m => m.d.cible ? esc(m.d.cible) : '',
  cooldown: m => m.d.cooldown ? esc(m.d.cooldown) : '',
  cmpBtn: (m, compact) => `<button type="button" class="cmp-btn" data-cmp="${m.id}" aria-pressed="false" title="Ajouter à la comparaison">${ICONS.compare}${compact ? '' : '<span>Comparer</span>'}</button>`,
};
const NONE = '<span class="none">—</span>';

// Lignes détaillées d'une fiche, dans un ordre fixe : [libellé, html]
function detailRows(m){
  const rows = [];
  const push = (label, html) => { if (html) rows.push([label, html]); };
  push('Dégâts', H.degats(m));
  push('Applique', H.applique(m));
  push('Retire', H.retire(m));
  push('Effets', H.effects(m));
  push('Rend', H.gain(m));
  push('Recharge', H.recharge(m));
  push('Fait perdre', H.perte(m));
  push('Jet', H.jet(m));
  push('Résistance', H.resist(m));
  push('Octroie', H.octroie(m));
  // effets en texte libre (« Autres effets » si des effets chiffrés sont déjà affichés)
  push(m.effects.length ? 'Autres effets' : 'Effets', H.effets(m));
  push('Conditions', H.conditions(m));
  push('Obtenue via', H.sources(m));
  H.affiche(m).forEach(([tab, html]) => push(tab, html));
  push('Sous-menus', H.menus(m));
  push('Notes', H.notes(m));
  return rows;
}

// ============================================================================
// VUE FICHES
// ============================================================================
function fact(cls, label, icon, html){
  return `<div class="fact ${cls}"><div class="fact-label">${icon || ''}${label}</div><div class="fact-val">${html || NONE}</div></div>`;
}
function cardHTML(m){
  const d = m.d;
  // Bandeau des données clés : Coût en haut, puis Portée · Cible (· Cooldown) toujours au même endroit
  const hasFacts = m.cout.length || d.portee || d.cible || d.cooldown;
  const facts = hasFacts ? `<div class="facts${d.cooldown ? ' cd3' : ''}">
      ${fact('full', 'Coût', ICONS.cost, H.cout(m))}
      ${fact('range first', 'Portée', ICONS.range, H.portee(m))}
      ${fact('target', 'Cible', ICONS.target, H.cible(m))}
      ${d.cooldown ? fact('cooldown', 'Cooldown', ICONS.cooldown, H.cooldown(m)) : ''}
    </div>` : '';
  const rows = detailRows(m);
  return `
    <article class="ability" id="a${m.id}" data-id="${m.id}" style="--cat:${m.cat.color}">
      <div class="ab-head">
        <div class="ab-title">
          <h4 class="ab-name">${esc(m.name)}</h4>
          <div class="ab-badges">${H.type(m)}${H.verify(m)}</div>
        </div>
        <div class="ab-tools"><a class="ab-id" href="#a${m.id}" title="Lien direct">#${m.id}</a>${H.cmpBtn(m)}</div>
      </div>
      ${facts}
      ${d.desc ? `<p class="ab-desc">${H.desc(m)}</p>` : ''}
      ${m.documented ? '' : `<p class="ab-todo">À documenter</p>`}
      ${rows.length ? `<dl class="rows">${rows.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>` : ''}
    </article>`;
}
function undocItemHTML(m){
  const src = m.sources.length
    ? `<span class="ui-src">via ${m.sources.map(x => `${x.kind ? `<b>${esc(x.kind)}</b>` : ''}${esc(x.label)}`).join(' · ')}</span>` : '';
  return `<li class="undoc-item" id="a${m.id}" data-id="${m.id}" style="--cat:${m.cat.color}">
      <span class="ui-name">${esc(m.name)}</span>${H.verify(m)}<a class="ab-id" href="#a${m.id}" title="Lien direct">#${m.id}</a>${src}
    </li>`;
}
function groupCardsHTML(g){
  const full = g.models.filter(m => m.hasInfo);
  const compact = g.models.filter(m => !m.hasInfo);
  return `${full.length ? `<div class="grid">${full.map(cardHTML).join('')}</div>` : ''}
    ${compact.length ? `<div class="undoc"><p class="undoc-title">À documenter · <span class="undoc-n">${compact.length}</span></p>
      <ul class="undoc-list">${compact.map(undocItemHTML).join('')}</ul></div>` : ''}`;
}

// ============================================================================
// VUE TABLEAU
// ============================================================================
const TABLE_COLS = [
  { key: 'name', label: 'Aptitude', width: '17%', sort: 'name' },
  { key: 'cout', label: 'Coût', width: '10%', sort: 'cout' },
  { key: 'portee', label: 'Portée', width: '7%', sort: 'portee' },
  { key: 'cible', label: 'Cible', width: '10%' },
  { key: 'degats', label: 'Dégâts', width: '10%' },
  { key: 'applique', label: 'Applique', width: '12%' },
  { key: 'retire', label: 'Retire', width: '9%' },
  { key: 'details', label: 'Effets & détails', width: '15%' },
  { key: 'conditions', label: 'Conditions', width: '10%' },
];
function mini(label, html){ return html ? `<div class="mini"><span class="mini-l">${label}</span>${html}</div>` : ''; }
function rowHTML(m){
  const nameCell = `<td><div class="t-name">${esc(m.name)}</div>
      <div class="t-sub"><a class="ab-id" href="#a${m.id}" title="Lien direct">#${m.id}</a>${H.type(m)}${H.verify(m)}${H.cmpBtn(m, true)}</div></td>`;
  if (!m.hasInfo) {
    const src = H.sources(m);
    return `<tr id="a${m.id}" data-id="${m.id}" style="--cat:${m.cat.color}">${nameCell}
      <td colspan="${TABLE_COLS.length - 1}"><span class="todo">À documenter</span>${src ? ` · <span class="mini-l" style="display:inline">Obtenue via</span> ${src}` : ''}</td></tr>`;
  }
  const details = [
    m.d.desc ? `<div class="mini">${H.desc(m)}</div>` : '',
    mini('Effets', H.effects(m)),
    mini('Rend', H.gain(m)),
    mini('Recharge', H.recharge(m)),
    mini('Fait perdre', H.perte(m)),
    mini('Cooldown', H.cooldown(m)),
    mini('Jet', H.jet(m)),
    mini('Résistance', H.resist(m)),
    mini('Octroie', H.octroie(m)),
    mini(m.effects.length ? 'Autres effets' : 'Effets', H.effets(m)),
    ...H.affiche(m).map(([tab, html]) => mini(tab, html)),
    mini('Sous-menus', H.menus(m)),
    mini('Notes', H.notes(m)),
    mini('Obtenue via', H.sources(m)),
    m.documented ? '' : '<div class="mini todo">À documenter</div>',
  ].join('');
  const cell = h => `<td>${h || NONE}</td>`;
  return `<tr id="a${m.id}" data-id="${m.id}" style="--cat:${m.cat.color}">${nameCell}
    ${cell(H.cout(m))}${cell(m.d.portee ? `<span class="t-big">${H.portee(m)}</span>` : '')}${cell(H.cible(m))}
    ${cell(H.degats(m))}${cell(H.applique(m))}${cell(H.retire(m))}${cell(details)}${cell(H.conditions(m))}</tr>`;
}
function sortedModels(list){
  const { key, dir } = state.sort;
  if (!key) return list;
  return [...list].sort((a, b) => {
    const va = a.sortKeys[key], vb = b.sortKeys[key];
    // les valeurs absentes restent toujours en bas
    if (va === null && vb === null) return 0;
    if (va === null) return 1;
    if (vb === null) return -1;
    const r = typeof va === 'string' ? va.localeCompare(vb, 'fr') : va - vb;
    return r * dir;
  });
}
function groupTableHTML(g){
  const head = TABLE_COLS.map(c => {
    if (!c.sort) return `<th scope="col">${c.label}</th>`;
    const on = state.sort.key === c.sort;
    return `<th scope="col" class="sortable${on ? ' sorted' : ''}" data-sort="${c.sort}" title="Trier par ${c.label.toLowerCase()}" aria-sort="${on ? (state.sort.dir > 0 ? 'ascending' : 'descending') : 'none'}">${c.label}<span class="arrow">${on ? (state.sort.dir > 0 ? '▲' : '▼') : '↕'}</span></th>`;
  }).join('');
  return `<div class="tbl-wrap"><table class="tbl">
      <colgroup>${TABLE_COLS.map(c => `<col style="width:${c.width}">`).join('')}</colgroup>
      <thead><tr>${head}</tr></thead>
      <tbody>${sortedModels(g.models).map(rowHTML).join('')}</tbody>
    </table></div>`;
}

// ============================================================================
// ÉTAT & RENDU
// ============================================================================
const $ = id => document.getElementById(id);
const content = $('content'), toc = $('toc'), tabsEl = $('tabs'), counterEl = $('counter'), searchEl = $('search');
const panelEl = $('filter-panel'), activeEl = $('active-filters'), trayEl = $('tray'), dialogEl = $('cmp-dialog');
const MAX_COMPARE = 6;

const state = {
  cat: 'all',
  q: '',
  status: null, statusMode: 'any', // any | applique | retire
  degat: null,
  cout: null,
  ciblage: null,
  onlyUndoc: !!store.get('onlyUndoc', false),
  view: store.get('view', 'cards') === 'table' ? 'table' : 'cards',
  filtersOpen: !!store.get('filtersOpen', false),
  compare: [],
  sort: { key: null, dir: 1 },
};
state.compare = (store.get('compare', []) || []).filter(id => MODEL_BY_ID[id]).slice(0, MAX_COMPARE);

function render(){
  let html = '';
  let tocHtml = '';
  CATEGORIES.forEach(cat => {
    const count = cat.groups.reduce((s, g) => s + g.models.length, 0);
    html += `<section class="category" id="${cat.key}" data-cat="${cat.key}" style="--cat:${cat.color}">
      <div class="category-head">
        <h2 class="category-title">${esc(cat.label)} <small class="cat-count">${count} aptitudes</small></h2>
        <p class="category-desc">${esc(cat.desc)}</p>
      </div>`;
    tocHtml += `<div data-cat="${cat.key}" style="--cat:${cat.color}"><a class="toc-cat" href="#${cat.key}">${esc(cat.label)} <span class="n"></span></a>`;
    cat.groups.forEach(g => {
      html += `<div class="group" id="${g.gid}" data-gid="${g.gid}" style="--cat:${cat.color}">
        <div class="group-head">
          <h3 class="group-title">${esc(g.label)}</h3>
          <span class="group-count"></span>
          ${g.desc ? `<p class="group-desc">${esc(g.desc)}</p>` : ''}
        </div>
        ${state.view === 'table' ? groupTableHTML(g) : groupCardsHTML(g)}
      </div>`;
      tocHtml += `<a class="toc-group" href="#${g.gid}" data-gid="${g.gid}">${esc(g.label)} <span class="n"></span></a>`;
    });
    html += `</section>`;
    tocHtml += `</div>`;
  });
  html += `<div class="empty" id="empty" hidden>Aucune aptitude ne correspond à ces critères.<br><button type="button" class="btn" data-action="reset">Réinitialiser les filtres</button></div>`;
  content.innerHTML = html;
  toc.innerHTML = tocHtml;
  $('layout').classList.toggle('wide', state.view === 'table');
  document.querySelectorAll('.seg [data-view]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.view === state.view)));
  observeGroups();
}

// Panneau de filtres : construit une seule fois, comptes sur l'ensemble des aptitudes
function buildFilterPanel(){
  const statusCount = new Map();
  MODELS.forEach(m => {
    const seen = new Set();
    [...m.statuts, ...m.retire].forEach(t => {
      const base = statusBase(t), k = nameKey(base);
      if (seen.has(k)) return;
      seen.add(k);
      if (!statusCount.has(k)) statusCount.set(k, { name: base, color: statusColor(t), n: 0 });
      statusCount.get(k).n++;
    });
  });
  const statuses = [...statusCount.entries()].sort((a, b) => a[1].name.localeCompare(b[1].name, 'fr'));

  const dmg = new Map();
  MODELS.forEach(m => m.degatKeys.forEach(k => dmg.set(k, (dmg.get(k) || 0) + 1)));
  const dmgName = k => DMG_ORDER.find(n => nameKey(n) === k) || k.charAt(0).toUpperCase() + k.slice(1);
  const dmgRank = k => { const i = DMG_ORDER.findIndex(n => nameKey(n) === k); return i < 0 ? 99 : i; };
  const dmgSorted = [...dmg.entries()].sort((a, b) => dmgRank(a[0]) - dmgRank(b[0]) || a[0].localeCompare(b[0], 'fr'));

  FILTER_LABELS.status = Object.fromEntries(statuses.map(([k, s]) => [k, { name: s.name, color: s.color }]));
  FILTER_LABELS.degat = Object.fromEntries(dmgSorted.map(([k]) => [k, { name: dmgName(k), color: damageColor(dmgName(k)) }]));
  FILTER_LABELS.cout = Object.fromEntries(COST_FILTER_KEYS.map(k => [k, { name: k, color: COSTS[k].color, title: COSTS[k].label }]));
  FILTER_LABELS.ciblage = Object.fromEntries(CIBLAGES.map(([k, info]) => [k, info]));

  const chip = (f, k, info, n) => `<button type="button" class="s-chip" data-f="${f}" data-v="${esc(k)}" aria-pressed="false" style="--c:${info.color}"${info.title ? ` title="${esc(info.title)}"` : ''}><span class="dot"></span>${esc(info.name)}<small>${n}</small></button>`;
  panelEl.innerHTML = `
    <div class="fp-label">Coût</div>
    <div class="fp-chips">${COST_FILTER_KEYS.map(k => [k, MODELS.filter(m => m.couts.includes(k)).length]).filter(([, n]) => n).map(([k, n]) => chip('cout', k, FILTER_LABELS.cout[k], n)).join('')}</div>
    <div class="fp-label">Ciblage</div>
    <div class="fp-chips">${CIBLAGES.map(([k, info]) => [k, info, MODELS.filter(m => m.ciblage === k).length]).filter(([, , n]) => n).map(([k, info, n]) => chip('ciblage', k, info, n)).join('')}</div>
    <div class="fp-label">Dégâts</div>
    <div class="fp-chips">${dmgSorted.map(([k, n]) => chip('degat', k, FILTER_LABELS.degat[k], n)).join('')}</div>
    <div class="fp-label">Statuts</div>
    <div class="fp-chips">
      <div class="seg fp-mode" role="group" aria-label="Le statut est…">
        <button type="button" data-mode="any" aria-pressed="true" title="Aptitudes qui appliquent ou retirent le statut">Appliqué ou retiré</button>
        <button type="button" data-mode="applique" aria-pressed="false" title="Aptitudes qui appliquent le statut">◆ Appliqué</button>
        <button type="button" data-mode="retire" aria-pressed="false" title="Aptitudes qui retirent le statut">✕ Retiré</button>
      </div>
      ${statuses.map(([k, s]) => chip('status', k, s, s.n)).join('')}
    </div>`;
}
const FILTER_LABELS = { status: {}, degat: {}, cout: {}, ciblage: {} };

function matches(m, ignoreCat){
  if (!ignoreCat && state.cat !== 'all' && m.cat.key !== state.cat) return false;
  if (state.q && !m.search.includes(state.q)) return false;
  if (state.onlyUndoc && m.hasInfo) return false;
  if (state.status) {
    const a = m.applies.includes(state.status), r = m.removes.includes(state.status);
    if (state.statusMode === 'applique' ? !a : state.statusMode === 'retire' ? !r : !(a || r)) return false;
  }
  if (state.degat && !m.degatKeys.includes(state.degat)) return false;
  if (state.cout && !m.couts.includes(state.cout)) return false;
  if (state.ciblage && m.ciblage !== state.ciblage) return false;
  return true;
}

function applyFilters(){
  let shown = 0;
  const catCounts = {};
  MODELS.forEach(m => { if (matches(m, true)) catCounts[m.cat.key] = (catCounts[m.cat.key] || 0) + 1; });

  CATEGORIES.forEach(cat => {
    let secShown = 0;
    cat.groups.forEach(g => {
      let gShown = 0, undocShown = 0;
      g.models.forEach(m => {
        const ok = matches(m);
        const el = document.getElementById('a' + m.id);
        if (el) el.hidden = !ok;
        if (ok) { gShown++; if (!m.hasInfo) undocShown++; }
      });
      const gEl = content.querySelector(`[data-gid="${g.gid}"]`);
      gEl.hidden = gShown === 0;
      const total = g.models.length;
      gEl.querySelector('.group-count').textContent = gShown === total ? `${total} aptitude${total > 1 ? 's' : ''}` : `${gShown} sur ${total}`;
      const undoc = gEl.querySelector('.undoc');
      if (undoc) { undoc.hidden = undocShown === 0; undoc.querySelector('.undoc-n').textContent = undocShown; }
      const grid = gEl.querySelector('.grid');
      if (grid) grid.hidden = gShown - undocShown === 0;
      const t = toc.querySelector(`.toc-group[data-gid="${g.gid}"]`);
      t.hidden = gShown === 0;
      t.querySelector('.n').textContent = gShown;
      secShown += gShown;
    });
    const sec = content.querySelector(`.category[data-cat="${cat.key}"]`);
    sec.hidden = secShown === 0;
    const total = cat.groups.reduce((s, g) => s + g.models.length, 0);
    sec.querySelector('.cat-count').textContent = secShown === total ? `${total} aptitudes` : `${secShown} sur ${total} aptitudes`;
    const tc = toc.querySelector(`[data-cat="${cat.key}"]`);
    tc.hidden = secShown === 0;
    tc.querySelector('.toc-cat .n').textContent = secShown;
    shown += secShown;
  });
  $('empty').hidden = shown !== 0;

  // Onglets de catégorie : nombre d'aptitudes qui correspondent aux autres critères
  const allCount = Object.values(catCounts).reduce((s, n) => s + n, 0);
  tabsEl.querySelectorAll('.tab').forEach(t => {
    const n = t.dataset.cat === 'all' ? allCount : (catCounts[t.dataset.cat] || 0);
    t.querySelector('.n').textContent = n;
    t.classList.toggle('active', state.cat === t.dataset.cat);
    t.classList.toggle('zero', !n);
    t.setAttribute('aria-selected', String(state.cat === t.dataset.cat));
  });

  const documented = MODELS.filter(m => m.documented).length;
  counterEl.innerHTML = `<b>${shown}</b> / ${MODELS.length} aptitudes · ${documented} documentées`;

  // Mise en évidence des pastilles correspondant aux filtres
  content.querySelectorAll('.pill.status').forEach(p => p.classList.toggle('hl', !!state.status && p.dataset.status === state.status
    && (state.statusMode === 'any' || (state.statusMode === 'retire') === p.classList.contains('removed'))));
  content.querySelectorAll('.pill.dmg').forEach(p => p.classList.toggle('hl', !!state.degat
    && (p.dataset.degat === state.degat || (state.degat === 'fixes' && p.dataset.fixe === '1'))));
  content.querySelectorAll('.cost.filt').forEach(p => p.classList.toggle('hl', p.dataset.cout === state.cout));

  // Panneau et résumé des filtres
  panelEl.querySelectorAll('.s-chip').forEach(c => c.setAttribute('aria-pressed', String(state[c.dataset.f] === c.dataset.v)));
  panelEl.querySelectorAll('[data-mode]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.mode === state.statusMode)));
  const af = [];
  const MODE_LABEL = { any: 'Statut', applique: 'Applique', retire: 'Retire' };
  if (state.q) af.push(['q', 'Recherche', `« ${searchEl.value.trim()} »`, 'var(--bronze-bright)']);
  if (state.cout) af.push(['cout', 'Coût', state.cout, FILTER_LABELS.cout[state.cout].color]);
  if (state.ciblage) af.push(['ciblage', 'Ciblage', FILTER_LABELS.ciblage[state.ciblage].name, FILTER_LABELS.ciblage[state.ciblage].color]);
  if (state.degat) af.push(['degat', 'Dégâts', FILTER_LABELS.degat[state.degat]?.name || state.degat, FILTER_LABELS.degat[state.degat]?.color]);
  if (state.status) af.push(['status', MODE_LABEL[state.statusMode], FILTER_LABELS.status[state.status]?.name || state.status, FILTER_LABELS.status[state.status]?.color]);
  activeEl.innerHTML = af.length
    ? af.map(([f, label, val, color]) => `<button type="button" class="af" data-clear="${f}" style="--c:${color || 'var(--bronze-bright)'}" title="Retirer ce filtre"><small>${label}</small>${esc(val)}<span class="x" aria-hidden="true">×</span></button>`).join('')
      + (af.length > 1 ? `<button type="button" class="btn ghost" data-action="reset">Tout effacer</button>` : '')
    : '';
  $('af-row').hidden = af.length === 0;
  const nFilters = [state.cout, state.ciblage, state.degat, state.status].filter(Boolean).length;
  const badge = $('filters-badge');
  badge.hidden = !nFilters;
  badge.textContent = nFilters;

  syncCompare();
}

// ============================================================================
// COMPARAISON
// ============================================================================
const CMP_ROWS = [
  ['Catégorie', m => `${esc(m.cat.label)} › ${esc(m.group.label)}`],
  ['Type', H.type],
  ['Coût', H.cout],
  ['Portée', H.portee],
  ['Cible', H.cible],
  ['Cooldown', H.cooldown],
  ['Dégâts', H.degats],
  ['Applique', H.applique],
  ['Retire', H.retire],
  ['Effets chiffrés', H.effects],
  ['Rend', H.gain],
  ['Recharge', H.recharge],
  ['Fait perdre', H.perte],
  ['Jet', H.jet],
  ['Résistance', H.resist],
  ['Octroie', H.octroie],
  ['Effets', H.effets],
  ['Conditions', H.conditions],
  ['Description', H.desc],
  ['Notes', H.notes],
  ['Obtenue via', H.sources],
];
function saveCompare(){ store.set('compare', state.compare); }
let trayMsg = '';
function toggleCompare(id){
  const i = state.compare.indexOf(id);
  if (i >= 0) state.compare.splice(i, 1);
  else if (state.compare.length >= MAX_COMPARE) { trayMsg = `Maximum ${MAX_COMPARE} aptitudes : retirez-en une d'abord.`; }
  else state.compare.push(id);
  saveCompare();
  syncCompare();
}
function syncCompare(){
  content.querySelectorAll('[data-cmp]').forEach(b => {
    const on = state.compare.includes(+b.dataset.cmp);
    b.setAttribute('aria-pressed', String(on));
    b.title = on ? 'Retirer de la comparaison' : 'Ajouter à la comparaison';
    const lbl = b.querySelector('span');
    if (lbl) lbl.textContent = on ? 'Comparée' : 'Comparer';
    b.closest('[data-id]')?.classList.toggle('in-cmp', on);
  });
  trayEl.hidden = state.compare.length === 0;
  if (state.compare.length) {
    trayEl.innerHTML = `<span class="tray-title">Comparaison ${state.compare.length}/${MAX_COMPARE}</span>
      <div class="tray-items">${state.compare.map(id => {
        const m = MODEL_BY_ID[id];
        return `<span class="tray-item" style="--cat:${m.cat.color}" data-rm="${id}" title="Retirer de la comparaison">${esc(m.name)}<span class="x" aria-hidden="true">×</span></span>`;
      }).join('')}</div>
      ${trayMsg ? `<span class="tray-msg">${esc(trayMsg)}</span>` : ''}
      <button type="button" class="btn ghost" data-action="cmp-clear">Vider</button>
      <button type="button" class="btn primary" data-action="cmp-open"${state.compare.length < 2 ? ' disabled title="Sélectionnez au moins 2 aptitudes"' : ''}>${ICONS.compare} Comparer</button>`;
  }
  trayMsg = '';
  if (dialogEl.open) renderCompare();
}
function renderCompare(){
  const models = state.compare.map(id => MODEL_BY_ID[id]);
  if (models.length === 0) { dialogEl.close(); return; }
  const onlyDiff = $('cmp-diff').checked;
  const head = `<tr><th class="rl"></th>${models.map(m => `<th style="--cat:${m.cat.color}">
      <a class="cmp-name" href="#a${m.id}" data-goto="${m.id}">${esc(m.name)}</a>
      <div class="cmp-meta"><span>#${m.id}</span><button type="button" class="cmp-rm" data-rm="${m.id}" title="Retirer de la comparaison">Retirer ×</button></div>
    </th>`).join('')}</tr>`;
  const body = CMP_ROWS.map(([label, fn]) => {
    const cells = models.map(m => fn(m) || '');
    if (cells.every(c => !c)) return '';
    const same = cells.every(c => c === cells[0]);
    if (onlyDiff && same) return '';
    return `<tr class="${same ? 'same' : 'diff'}"><td class="rl">${label}</td>${cells.map(c => `<td>${c || NONE}</td>`).join('')}</tr>`;
  }).join('');
  $('cmp-body').innerHTML = `<table class="cmp-table"><thead>${head}</thead><tbody>${body || `<tr><td class="rl"></td><td colspan="${models.length}" class="none">Aucune différence.</td></tr>`}</tbody></table>`;
  $('cmp-title').textContent = `Comparaison · ${models.length} aptitude${models.length > 1 ? 's' : ''}`;
}

// ============================================================================
// NAVIGATION
// ============================================================================
// Affiche une aptitude ciblée par l'URL (#a123), même si les filtres la masquaient
function revealHash(){
  const m = /^#a(\d+)$/.exec(location.hash);
  if (!m || !MODEL_BY_ID[+m[1]]) return;
  let el = document.getElementById('a' + m[1]);
  if (!el || el.hidden || el.closest('[hidden]')) { resetFilters(); el = document.getElementById('a' + m[1]); }
  if (!el) return;
  el.scrollIntoView({ block: 'center' });
  el.classList.remove('flash');
  void el.offsetWidth;
  el.classList.add('flash');
}
function resetFilters(){
  state.cat = 'all'; state.q = ''; state.status = null; state.statusMode = 'any'; state.degat = null; state.cout = null; state.ciblage = null;
  state.onlyUndoc = false; $('only-undoc').checked = false; store.set('onlyUndoc', false);
  searchEl.value = '';
  applyFilters();
}
function scrollToContent(){
  const bar = $('toolbar');
  const top = content.getBoundingClientRect().top + window.scrollY - (getComputedStyle(bar).position === 'sticky' ? bar.offsetHeight + 12 : 12);
  if (window.scrollY > top) window.scrollTo({ top });
}

// Hauteur de la barre d'outils collante -> décalage des ancres et du sommaire
const barRO = new ResizeObserver(() => {
  const bar = $('toolbar');
  const h = getComputedStyle(bar).position === 'sticky' ? bar.offsetHeight : 0;
  document.documentElement.style.setProperty('--bar-h', h + 'px');
});
barRO.observe($('toolbar'));

// Sommaire : met en évidence le groupe en cours de lecture
let groupIO = null;
function observeGroups(){
  if (groupIO) groupIO.disconnect();
  if (!('IntersectionObserver' in window)) return;
  const visible = new Map();
  groupIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) visible.set(e.target.dataset.gid, e.boundingClientRect.top); else visible.delete(e.target.dataset.gid); });
    let best = null, bestTop = Infinity;
    visible.forEach((_, gid) => {
      const top = content.querySelector(`[data-gid="${gid}"]`).getBoundingClientRect().top;
      if (Math.abs(top) < bestTop) { bestTop = Math.abs(top); best = gid; }
    });
    toc.querySelectorAll('.toc-group').forEach(a => a.classList.toggle('current', a.dataset.gid === best));
    const cur = toc.querySelector('.toc-group.current');
    if (cur) {
      const r = cur.getBoundingClientRect(), tr = toc.getBoundingClientRect();
      if (r.top < tr.top || r.bottom > tr.bottom) toc.scrollTop += r.top - tr.top - tr.height / 2;
    }
  }, { rootMargin: '-25% 0px -55% 0px' });
  content.querySelectorAll('.group').forEach(g => groupIO.observe(g));
}

// ============================================================================
// ÉVÉNEMENTS
// ============================================================================
function setFilter(f, v){
  state[f] = v && v !== state[f] ? v : null;
  applyFilters();
}
searchEl.addEventListener('input', () => { state.q = norm(searchEl.value.trim()); applyFilters(); });
document.addEventListener('keydown', e => {
  if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !dialogEl.open) {
    e.preventDefault(); searchEl.focus(); searchEl.select();
  }
  if (e.key === 'Escape' && document.activeElement === searchEl && searchEl.value) {
    searchEl.value = ''; state.q = ''; applyFilters();
  }
});
document.querySelector('.seg[aria-label="Affichage"]').addEventListener('click', e => {
  const b = e.target.closest('[data-view]');
  if (!b || b.dataset.view === state.view) return;
  state.view = b.dataset.view;
  store.set('view', state.view);
  render();
  applyFilters();
});
tabsEl.addEventListener('click', e => {
  const b = e.target.closest('.tab');
  if (!b) return;
  state.cat = b.dataset.cat;
  applyFilters();
  scrollToContent();
});
$('filters-toggle').addEventListener('click', () => {
  state.filtersOpen = !state.filtersOpen;
  store.set('filtersOpen', state.filtersOpen);
  panelEl.hidden = !state.filtersOpen;
  $('filters-toggle').setAttribute('aria-expanded', String(state.filtersOpen));
});
panelEl.addEventListener('click', e => {
  const mode = e.target.closest('[data-mode]');
  if (mode) { state.statusMode = mode.dataset.mode; applyFilters(); return; }
  const c = e.target.closest('.s-chip');
  if (c) { setFilter(c.dataset.f, c.dataset.v); scrollToContent(); }
});
activeEl.addEventListener('click', e => {
  if (e.target.closest('[data-action="reset"]')) { resetFilters(); return; }
  const b = e.target.closest('[data-clear]');
  if (!b) return;
  if (b.dataset.clear === 'q') { searchEl.value = ''; state.q = ''; }
  else state[b.dataset.clear] = null;
  applyFilters();
});
content.addEventListener('click', e => {
  if (e.target.closest('[data-action="reset"]')) { resetFilters(); return; }
  const cmp = e.target.closest('[data-cmp]');
  if (cmp) { toggleCompare(+cmp.dataset.cmp); return; }
  const th = e.target.closest('th[data-sort]');
  if (th) {
    const k = th.dataset.sort;
    // 1er clic : croissant · 2e : décroissant · 3e : ordre d'origine
    if (state.sort.key !== k) state.sort = { key: k, dir: 1 };
    else if (state.sort.dir === 1) state.sort.dir = -1;
    else state.sort = { key: null, dir: 1 };
    const y = th.getBoundingClientRect().top;
    render(); applyFilters();
    const nth = content.querySelector(`[data-gid="${th.closest('.group').dataset.gid}"] th[data-sort="${k}"]`);
    if (nth) window.scrollBy(0, nth.getBoundingClientRect().top - y);
    return;
  }
  const pill = e.target.closest('.filt[data-status], .filt[data-degat], .filt[data-cout]');
  if (!pill) return;
  if (pill.dataset.cout !== undefined) setFilter('cout', pill.dataset.cout);
  else if (pill.dataset.status !== undefined) {
    // depuis une fiche : un statut retiré filtre sur « Retiré », un statut appliqué sur « Appliqué »
    const k = pill.dataset.status;
    const mode = pill.classList.contains('removed') ? 'retire' : 'applique';
    if (state.status === k && state.statusMode === mode) state.status = null;
    else { state.status = k; state.statusMode = mode; }
    applyFilters();
  }
  else setFilter('degat', pill.dataset.degat);
  scrollToContent();
});
trayEl.addEventListener('click', e => {
  const a = e.target.closest('[data-action]');
  if (a && a.dataset.action === 'cmp-clear') { state.compare = []; saveCompare(); syncCompare(); return; }
  if (a && a.dataset.action === 'cmp-open') { renderCompare(); dialogEl.showModal(); return; }
  const rm = e.target.closest('[data-rm]');
  if (rm) toggleCompare(+rm.dataset.rm);
});
dialogEl.addEventListener('click', e => {
  if (e.target === dialogEl) { dialogEl.close(); return; }
  const rm = e.target.closest('[data-rm]');
  if (rm) { toggleCompare(+rm.dataset.rm); return; }
  const go = e.target.closest('[data-goto]');
  if (go) {
    e.preventDefault();
    dialogEl.close();
    if (location.hash === '#a' + go.dataset.goto) revealHash(); else location.hash = 'a' + go.dataset.goto;
  }
});
$('cmp-diff').addEventListener('change', renderCompare);
$('only-undoc').checked = state.onlyUndoc;
$('only-undoc').addEventListener('change', e => { state.onlyUndoc = e.target.checked; store.set('onlyUndoc', state.onlyUndoc); applyFilters(); });
$('cmp-close').addEventListener('click', () => dialogEl.close());
$('cmp-clear').addEventListener('click', () => { state.compare = []; saveCompare(); syncCompare(); dialogEl.close(); });
window.addEventListener('hashchange', revealHash);

// Légende
$('legend').innerHTML = Object.entries(COSTS)
  .map(([k, c]) => `<span><span class="cost" style="--c:${c.color}">${k}</span>${esc(c.label)}</span>`).join('')
  + `<span><span class="cost item"><b>1 ×</b> Objet</span>objet consommé</span>`
  + `<span><span class="pill status" style="--c:var(--vitales-bright)">Statut</span>appliqué</span>`
  + `<span><span class="pill status removed" style="--c:var(--vitales-bright)">Statut</span>retiré</span>`
  + `<span><span class="pill dmg" style="--c:var(--combat-bright)">Dégâts</span>type de dégâts</span>`;

// Initialisation
panelEl.hidden = !state.filtersOpen;
$('filters-toggle').setAttribute('aria-expanded', String(state.filtersOpen));
tabsEl.innerHTML = [{ key: 'all', label: 'Toutes', color: 'var(--bronze-bright)' }, ...CATEGORIES].map(c =>
  `<button type="button" role="tab" class="tab" data-cat="${c.key}" aria-selected="false" style="--cat:${c.color}">${esc(c.label)} <span class="n"></span></button>`).join('');
buildFilterPanel();
render();
applyFilters();
if (location.hash) requestAnimationFrame(revealHash);
