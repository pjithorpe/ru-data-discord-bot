/* eslint-disable spaced-comment */
const settings = {};

settings.admin_role = '@mods';

settings.date_column_name = 'date';
settings.time_column_name = 'time';
settings.date_format = 'DD/MM/YYYY';
settings.time_format = 'HH:mm';

settings.table_padding = 0;
settings.tables_url = 'https://www.bbc.co.uk/sport/rugby-union/';

settings.players_url = 'https://www.ultimaterugby.com/';

settings.positions = [
    'Tighthead Prop',
    'Loosehead Prop',
    'Hooker',
    'No 4 Lock',
    'No 5 Lock',
    'Blindside Flanker',
    'Openside Flanker',
    'No. 8',
    'Scrum Half',
    'Fly Half',
    'Inside Centre',
    'Outside Centre',
    'Left Wing',
    'Right Wing',
    'Fullback',
];

/*******************
    COMPETITIONS
*******************/

// Keys should be the same as the competition target name in competition_aliases
settings.competition_pool_count = {
    premiership_rugby: 1,
    top_14: 1,
    trc_2020: 1,
    pro_14: 2,
    champions_cup: 5,
    challenge_cup: 5,
    championship: 1,
    super_rugby: 3,
    sr_aotearoa: 1,
    sr_australia: 1,
    '6_nations': 1,
    rwc_2019: 4,
    english_nat_1: 1,
    english_nat_2: 2,

};

settings.competition_table_names = {
    premiership_rugby: 'english-premiership/table',
    top_14: 'top-14/table',
    trc_2020: 'rugby-championship/table',
    pro_14: 'pro-tournament/table',
    champions_cup: 'european-cup/table',
    challenge_cup: 'european-challenge-cup/table',
    championship: 'the-english-championship/table',
    super_rugby: 'super-rugby/table',
    sr_aotearoa: 'super-rugby-nz/table',
    sr_australia: 'super-rugby-au/table',
    '6_nations': 'six-nations/table',
    rwc_2019: 'world-cup/table',
    english_nat_1: 'english-national-league-one/table',
    english_nat_2: 'english-national-league-two/table',
};

// Should include name as listed on Ultimate Rugby, followed by aliases which map to that same name
settings.competition_aliases = {
    rwc_2019: 'rwc_2019', rugby_world_cup: 'rwc_2019', rwc: 'rwc_2019', wc: 'rwc_2019', world_cup: 'rwc_2019',
    '6_nations': '6_nations', '6_n': '6_nations', '6n': '6_nations', six_nations: '6_nations',
    'women\'s_6_nations': 'women\'s_6_nations', '6_nations_womens': 'women\'s_6_nations', womens_6_n: 'women\'s_6_nations', womens6n: 'women\'s_6_nations', women_six_nations: 'women\'s_6_nations', 'women\'s6n': 'women\'s_6_nations', 'women\'s_six_nations': 'women\'s_6_nations',
    trc_2020: 'trc_2020', trc: 'trc_2020', the_rugby_championship: 'trc_2020',
    rugby_europe: 'rugby_europe', rec: 'rugby_europe',
    pacific_nations_cup: 'pacific_nations_cup', pnc: 'pacific_nations_cup',
    u20_championship: 'u20_championship', u20: 'u20_championship', u20wc: 'u20_chamionship', u20s_wc: 'u20_chamionship', u20swc: 'u20_chamionship', 'u20\'s_wc': 'u20_chamionship', 'u20\'s_championship': 'u20_chamionship',
    international_friendlies: 'international_friendlies', friendly: 'international_friendlies', international: 'international_friendlies', internationals: 'international_friendlies',

    premiership_rugby: 'premiership_rugby', prem: 'premiership_rugby', premiership: 'premiership_rugby', english_prem: 'premiership_rugby', english_premiership: 'premiership_rugby', gallagher: 'premiership_rugby', proper_rugby: 'premiership_rugby',
    prem_rugby_cup: 'prem_rugby_cup', prc: 'prem_rugby_cup', prem_cup: 'prem_rugby_cup', premiership_rugby_cup: 'prem_rugby_cup', anglo_welsh: 'prem_rugby_cup', awc: 'prem_rugby_cup',
    championship: 'championship', english_championship: 'championship',
    pro_14: 'pro_14', pro14: 'pro_14', p14: 'pro_14', guinness: 'pro_14', master_race: 'pro_14', p13: 'pro_14', pro13: 'pro_14', pro_13: 'pro_14', pro12: 'pro_14', p12: 'pro_14', pro_12: 'pro_14',
    top_14: 'top_14', top14: 'top_14', t14: 'top_14',
    pro_d2: 'pro_d2', prod2: 'pro_d2',
    mlr: 'mlr', major_league_rugby: 'mlr',
    champions_cup: 'champions_cup', champions: 'champions_cup', europe: 'champions_cup', champs_cup: 'champions_cup', championscup: 'champions_cup', champ_cup: 'champions_cup', champscup: 'champions_cup',
    challenge_cup: 'challenge_cup', challenge: 'challenge_cup',

    super_rugby: 'super_rugby', sr: 'super_rugby',
    nrc: 'nrc', national_rugby_championship: 'nrc',
    mitre_10_cup: 'mitre_10_cup', mitre_10: 'mitre_10_cup', m10c: 'mitre_10_cup', m_10_c: 'mitre_10_cup', mitre10: 'mitre_10_cup',
    currie_cup: 'currie_cup', currie: 'currie_cup', cc: 'currie_cup',
    'premier_15\'s': 'premier_15\'s',
    sr_aotearoa: 'sr_aotearoa', sr_nz: 'sr_aotearoa', givemesomedamnruggers: 'sr_aotearoa', shrugbybestrugby: 'sr_aotearoa', super_rugby_nz: 'sr_aotearoa', sr_new_zealand: 'sr_aotearoa',
    sr_australia: 'sr_australia', sr_au: 'sr_australia', sr_folau: 'sr_australia', super_rugby_au: 'sr_australia', super_rugby_aus: 'sr_australia', super_rugby_australia: 'sr_australia', sr_aus: 'sr_australia',

    //for competition tables (not checked UR name for these leagues)
    nat_1: 'english_nat_1', national_1: 'english_nat_1', nat1: 'english_nat_1', n1: 'english_nat_1',
    nat_2: 'english_nat_2', national_2: 'english_nat_2', nat2: 'english_nat_2', n2: 'english_nat_2',
};

/************
    TEAMS
************/

// Keys should be the same as the team target name in team_aliases
settings.team_logos = {
    // Premiership
    leicester_tigers: 'https://i.imgur.com/BAzGajk.png',
    exeter_chiefs: 'https://i.imgur.com/qITNxNK.png',
    bath_rugby: 'https://i.imgur.com/ryUoUP9.png',
    bristol_bears: 'https://i.imgur.com/f6CpKVX.png',
    gloucester_rugby: 'https://i.imgur.com/IpDQSG8.png',
    harlequins: 'https://i.imgur.com/Sh6rCWE.png',
    london_irish: 'https://i.imgur.com/ksOjtDJ.png',
    wasps: 'https://i.imgur.com/nWOHY9n.png',
    northampton_saints: 'https://i.imgur.com/zwWU288.png',
    sale_sharks: 'https://i.imgur.com/7MNt3rA.png',
    saracens: 'https://i.imgur.com/lyO3oqB.png',
    worcester_warriors: 'https://i.imgur.com/zGsMwZT.png',

    // Pro 14
    cheetahs: 'https://i.imgur.com/n3LQ3fZ.png',
    ospreys: 'https://i.imgur.com/T1fvxaH.png',
    benetton_rugby: 'https://i.imgur.com/rSSB2DO.png',
    cardiff_blues: 'https://i.imgur.com/9naUL8A.png',
    connacht_rugby: 'https://i.imgur.com/IoEjulm.png',
    southern_kings: 'https://i.imgur.com/LdHwrzF.png',
    edinburgh_rugby: 'https://i.imgur.com/A2ijRnL.png',
    glasgow_warriors: 'https://i.imgur.com/dKl3FSq.png',
    leinster_rugby: 'https://i.imgur.com/um3Df4y.png',
    scarlets: 'https://i.imgur.com/B1QMbXY.png',
    munster_rugby: 'https://i.imgur.com/n2Sl1xF.png',
    dragons: 'https://i.imgur.com/CJJmniG.png',
    ulster_rugby: 'https://i.imgur.com/Y2T6EkB.png',
    zebre_rugby: 'https://i.imgur.com/Mi1SoTy.png',

    // Top 14
    clermont_auvergne: 'https://i.imgur.com/IBZ4W1k.png',
    lyon: 'https://i.imgur.com/Ys6jEh1.png',
    montpellier: 'https://i.imgur.com/E2O1oJS.png',
    la_rochelle: 'https://i.imgur.com/njKyUA1.png',
    brive: 'https://i.imgur.com/YXL9GLp.png',
    pau: 'https://i.imgur.com/DIamGFK.png',
    racing_92: 'https://i.imgur.com/yuDt66h.png',
    toulouse: 'https://i.imgur.com/AV6Xd0T.png',
    rc_toulon: 'https://i.imgur.com/VeUwVSj.png',
    union_bordeaux_begles: 'https://i.imgur.com/QygNLxy.png',
    castres_olympique: 'https://i.imgur.com/arPI316.png',
    bayonne: 'https://i.imgur.com/nKuzLjs.png',
    agen: 'https://i.imgur.com/c0nkwwk.png',
    stade_francais: 'https://i.imgur.com/VEM4ZHg.png',

    // 6 Nations
    france: 'https://i.imgur.com/2kWouwe.png',
    england: 'https://i.imgur.com/bjoe7w5.png',
    ireland: 'https://i.imgur.com/zeretko.png',
    italy: 'https://i.imgur.com/P0CuRW8.png',
    scotland: 'https://i.imgur.com/jeU7svS.png',
    wales: 'https://i.imgur.com/oE4BLXl.png',
};

// No need to include name as listed on Ultimate Rugby, just any aliases that map to that name
settings.team_aliases = {

    // England
    bath: 'bath_rugby', cunts: 'bath_rugby', barf: 'bath_rugby',
    bristol: 'bristol_bears', bears: 'bristol_bears', bris: 'bristol_bears',
    exeter: 'exeter_chiefs', exe: 'exeter_chiefs',
    quins: 'harlequins', hq: 'harlequins',
    gloucester: 'gloucester_rugby', glos: 'gloucester_rugby', glaws: 'gloucester_rugby', our_year: 'gloucester_rugby',
    tigers: 'leicester_tigers', leicester: 'leicester_tigers',
    irish: 'london_irish', london_australian: 'london_irish', exiles: 'london_irish', bath_b: 'london_irish', bath_a: 'london_irish',
    sale: 'sale_sharks',
    saints: 'northampton_saints', northampton: 'northampton_saints',
    sarries: 'saracens', cheaters: 'saracens', cheats: 'saracens',
    worcester: 'worcester_warriors',
    falcons: 'newcastle_falcons', newcastle: 'newcastle_falcons',
    yorkshire: 'yorkshire_carnegie', carnegie: 'yorkshire_carnegie',
    pirates: 'cornish_pirates', cornish: 'cornish_pirates',
    coventry: 'coventry_rugby',
    jersey: 'jersey_reds',
    doncaster: 'doncaster_knights', knights: 'doncaster_knights',
    ealing: 'ealing_trailfinders', trailfinders: 'ealing_trailfinders',
    nottingham: 'nottingham_rugby',
    scottish: 'london_scottish',
    welsh: 'london_welsh',
    hartpury: 'hartpury_college_rfc', hcrfc: 'hartpury_college_rfc',
    ampthill: 'ampthill_rugby',

    // France
    bordeaux: 'union_bordeaux_begles', begles: 'union_bordeaux_begles', bordeaux_begles: 'union_bordeaux_begles', union_bordeaux_bègles: 'union_bordeaux_begles', bordeaux_bègles: 'union_bordeaux_begles',
    clermont: 'clermont_auvergne', asm: 'clermont_auvergne', asm_clermont_auvergne: 'clermont_auvergne',
    lyon_olympique_universitaire: 'lyon', lou: 'lyon',
    aviron_bayonnais: 'bayonne',
    toulon: 'rc_toulon', rc_toulonnais: 'rc_toulon',
    castres: 'castres_olympique',
    section_paloise: 'pau',
    montpellier_rugby: 'montpellier',
    su_agen: 'agen',
    stade_rochelais: 'la_rochelle', rochelle: 'la_rochelle',
    stade_toulousain: 'toulouse',
    stade_français: 'stade_francais', stade_français_paris: 'stade_francais', stade_francais_paris: 'stade_francais', sf: 'stade_francais',
    racing: 'racing_92', r92: 'racing_92', r_92: 'racing_92',
    ca_brive: 'brive', club_athletique_brive: 'brive',

    // Scotland
    glasgow: 'glasgow_warriors', glesga: 'glasgow_warriors',
    edinburgh: 'edinburgh_rugby', edi: 'edinburgh_rugby',

    // Ireland
    ulster: 'ulster_rugby',
    munster: 'munster_rugby',
    leinster: 'leinster_rugby',
    connacht: 'connacht_rugby',

    // Wales
    llanelli_scarlets: 'scarlets', llanelli: 'scarlets', the_good_welsh_team: 'scarlets',
    newport_gwent_dragons: 'dragons', newport: 'dragons',
    neath_swansea_ospreys: 'ospreys', swansea: 'ospreys',
    cardiff: 'cardiff_blues', diff: 'cardiff_blues', the_diff: 'cardiff_blues',

    // Italy
    treviso: 'benetton_rugby', benetton: 'benetton_rugby', benetton_treviso: 'benetton_rugby',
    zebre: 'zebre_rugby',

    // New Zealand
    canes: 'hurricanes',
    saders: 'crusaders',

    // South Africa
    toyota_cheetahs: 'cheetahs', bloemfontein: 'cheetahs',
    kings: 'southern_kings', port_elizabeth: 'southern_kings',

    // Australia
    tahs: 'waratahs',

    // Argentina
    jags: 'jaguares',

    // International
    eng: 'england', good: 'england', good_guys: 'england',
    wal: 'wales', cymru: 'wales',
    ire: 'ireland', éire: 'ireland', leinster_b: 'ireland', leinster_a: 'ireland',
    fra: 'france', les_bleus: 'france', la_france: 'france', frenchies: 'france',
    sco: 'scotland', alba: 'scotland',
    ita: 'italy', italia: 'italy', azzurri: 'italy',
    nz: 'new_zealand', evil: 'new_zealand', abs: 'new_zealand', all_blacks: 'new_zealand', kiwis: 'new_zealand', bad_guys: 'new_zealand', baddies: 'new_zealand',
    sa: 'south_africa', za: 'south_africa', bokke: 'south_africa', springboks: 'south_africa',
    aus: 'australia', wallabies: 'australia', convicts: 'australia', aussies: 'australia',
    arg: 'argentina', pumas: 'argentina', los_pumas: 'argentina', argies: 'argentina',
    jap: 'japan', brave_blossoms: 'japan', blossoms: 'japan',
    geo: 'georgia', lelos: 'georgia',
    fij: 'fiji', flying_fijians: 'fiji',
    sam: 'samoa', manu_samoa: 'samoa',
    ton: 'tonga', ikale_tahi: 'tonga', sea_eagles: 'tonga',
    us: 'usa', united_states: 'usa', yanks: 'usa', america: 'usa',
    spa: 'spain',
    rom: 'romania', oaks: 'romania',
    uru: 'uruguay',
    rus: 'russia',
    can: 'canada',
    por: 'portugal',
    nam: 'namibia',
    hk: 'hong_kong',
    net: 'netherlands',
    bra: 'brazil',
    bel: 'belgium',
    ger: 'germany',
    chi: 'chile',
    swi: 'switzerland',
    kor: 'korea',
    zim: 'zimbabwe',
    ken: 'kenya',
    col: 'colombia',
};

// Add no-space versions of all aliases with underscores
// Issue: if a team has no aliases, and has a multi-word name, it won't get picked up in this setup algorithm, and users won't be able to use the no-space version of its name.
const teamKeys = Object.keys(settings.team_aliases);
const ultimateRugbyNames = [];
for (let i = 0; i < teamKeys.length; i++) {
    const alias = teamKeys[i];
    const target = settings.team_aliases[alias];
    settings.team_aliases[alias.replace(/_/g, '')] = target;

    if (!ultimateRugbyNames.includes(target)) ultimateRugbyNames.push(target);
}
for (let i = 0; i < ultimateRugbyNames.length; i++) {
    const alias = ultimateRugbyNames[i];
    settings.team_aliases[alias.replace(/_/g, '')] = alias;
}

const compKeys = Object.keys(settings.competition_aliases);
for (let i = 0; i < compKeys.length; i++) {
    const alias = compKeys[i];
    settings.competition_aliases[alias.replace(/_/g, '')] = settings.competition_aliases[alias];
}

module.exports = settings;