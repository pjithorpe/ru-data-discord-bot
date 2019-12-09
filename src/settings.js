/* eslint-disable spaced-comment */
const settings = {};

settings.admin_role = '@mods';

settings.ignored_columns = ['url', '_xml', '_links', 'id', 'app', 'app:edited', 'edited', 'save', 'del'];

settings.date_column_name = 'date';
settings.time_column_name = 'time';
settings.date_format = 'DD/MM/YYYY';
settings.time_format = 'HH:mm';

/*******************
    COMPETITIONS
*******************/

// Keys should be the same as the competition target name in competition_aliases
settings.competition_table_mapping = {
    premiership_rugby: [1],
    top_14: [2],
    trc_2020: [3],
    pro_14: [4, 5],
    champions_cup: [6, 7, 8, 9, 19],
    challenge_cup: [10, 11, 12, 13, 20],
    championship: [14],
    super_rugby: [15, 16, 17],
    '6_nations': [18],
};

// Should include name as listed on Ultimate Rugby
settings.competition_aliases = {
    rwc_2019: 'rwc_2019', rugby_world_cup: 'rwc_2019', rwc: 'rwc_2019', wc: 'rwc_2019', world_cup: 'rwc_2019',
    '6_nations': '6_nations', '6_n': '6_nations', '6n': '6_nations', six_nations: '6_nations',
    trc_2020: 'trc_2020', trc: 'trc_2020', the_rugby_championship: 'trc_2020',
    rugby_europe: 'rugby_europe', rec: 'rugby_europe',
    pacific_nations_cup: 'pacific_nations_cup', pnc: 'pacific_nations_cup',
    u20_championship: 'u20_championship', u20: 'u20_championship', u20wc: 'u20_chamionship',
    international_friendlies: 'international_friendlies', friendly: 'international_friendlies', international: 'international_friendlies',

    premiership_rugby: 'premiership_rugby', prem: 'premiership_rugby', premiership: 'premiership_rugby', english_prem: 'premiership_rugby', english_premiership: 'premiership_rugby', gallagher: 'premiership_rugby', proper_rugby: 'premiership_rugby',
    prem_rugby_cup: 'prem_rugby_cup', prc: 'prem_rugby_cup', prem_cup: 'prem_rugby_cup', premiership_rugby_cup: 'prem_rugby_cup', anglo_welsh: 'prem_rugby_cup', awc: 'prem_rugby_cup',
    championship: 'championship', english_championship: 'championship',
    pro_14: 'pro_14', pro14: 'pro_14', p14: 'pro_14', guinness: 'pro_14', master_race: 'pro_14',
    top_14: 'top_14', top14: 'top_14', t14: 'top_14',
    pro_d2: 'pro_d2', prod2: 'pro_d2',
    mlr: 'mlr', major_league_rugby: 'mlr',
    champions_cup: 'champions_cup', champions: 'champions_cup', europe: 'champions_cup', champs_cup: 'champions_cup',
    challenge_cup: 'challenge_cup', challenge: 'challenge_cup',

    super_rugby: 'super_rugby', sr: 'super_rugby',
    nrc: 'nrc', national_rugby_championship: 'nrc',
    mitre_10_cup: 'mitre_10_cup', mitre_10: 'mitre_10_cup', m10c: 'mitre_10_cup', m_10_c: 'mitre_10_cup',
    currie_cup: 'currie_cup', currie: 'currie_cup', cc: 'currie_cup',
    'premier_15\'s': 'premier_15\'s',
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
    clermont_auvergne: 'https://i.imgur.com/bf2BGj8.png',
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

// No need to include name as listed on Ultimate Rugby
settings.team_aliases = {

    // England
    bath: 'bath_rugby',
    bristol: 'bristol_bears', bears: 'bristol_bears',
    exeter: 'exeter_chiefs',
    quins: 'harlequins',
    gloucester: 'gloucester_rugby',
    tigers: 'leicester_tigers', leicester: 'leicester_tigers',
    irish: 'london_irish', london_australian: 'london_irish',
    sale: 'sale_sharks',
    saints: 'northampton_saints',
    sarries: 'saracens', cheaters: 'saracens', cheats: 'saracens',
    worcester: 'worcester_warriors',
    falcons: 'newcastle_falcons', newcastle: 'newcastle_falcons',
    yorkshire: 'yorkshire_carnegie',
    pirates: 'cornish_pirates',
    coventry: 'coventry_rugby',
    jersey: 'jersey_reds',
    doncaster: 'doncaster_knights',
    ealing: 'ealing_trailfinders',
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
    glasgow: 'glasgow_warriors',
    edinburgh: 'edinburgh_rugby',

    // Ireland
    ulster: 'ulster_rugby',
    munster: 'munster_rugby',
    leinster: 'leinster_rugby',
    connacht: 'connacht_rugby',

    // Wales
    llanelli_scarlets: 'scarlets',
    newport_gwent_dragons: 'dragons',
    neath_swansea_ospreys: 'ospreys',
    cardiff: 'cardiff_blues',

    // Italy
    treviso: 'benetton_rugby', benetton: 'benetton_rugby', benetton_treviso: 'benetton_rugby',
    zebre: 'zebre_rugby',

    // New Zealand
    canes: 'hurricanes',
    saders: 'crusaders',

    // South Africa
    toyota_cheetahs: 'cheetahs',
    kings: 'southern_kings',

    // Australia
    tahs: 'waratahs',

    // Argentina
    jags: 'jaguares',

    // International
    eng: 'england', good: 'england',
    wal: 'wales', cymru: 'wales',
    ire: 'ireland', éire: 'ireland', leinster_b: 'ireland',
    fra: 'france', les_bleus: 'france', la_france: 'france',
    sco: 'scotland', alba: 'scotland',
    ita: 'italy', italia: 'italy',
    nz: 'new_zealand', evil: 'new_zealand', abs: 'new_zealand', all_blacks: 'new_zealand', kiwis: 'new_zealand',
    sa: 'south_africa', za: 'south_africa', bokke: 'south_africa', springboks: 'south_africa',
    aus: 'australia', wallabies: 'australia', convicts: 'australia',
    arg: 'argentina', pumas: 'argentina', los_pumas: 'argentina',
    jap: 'japan', brave_blossoms: 'japan',
    geo: 'georgia', lelos: 'georgia',
    fij: 'fiji', flying_fijians: 'fiji',
    sam: 'samoa', manu_samoa: 'samoa',
    ton: 'tonga', ikale_tahi: 'tonga', sea_eagles: 'tonga',
    us: 'usa', united_states: 'usa', yanks: 'usa',
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

module.exports = settings;