const settings = {};

settings.admin_role = '@mods';

settings.ignored_columns = ['url', '_xml', '_links', 'id', 'app', 'app:edited', 'edited', 'save', 'del'];

settings.date_column_name = 'date';
settings.time_column_name = 'time';
settings.date_format = 'DD/MM/YYYY';
settings.time_format = 'HH:mm';

settings.league_aliases = {
    rugby_world_cup: '4574', world_cup: '4574', rwc: '4574',
    prem: '4414', premiership: '4414',
};

settings.competition_aliases = {
    rugby_world_cup: 'rwc_2019',
    mitre_10: 'mitre_10_cup',
};

settings.team_aliases = {

    // England
    bath_rugby: 'bath',
    bears: 'bristol_bears',
    exeter_chiefs: 'exeter',
    quins: 'harlequins',
    tigers: 'leicester', leicester_tigers: 'leicester',
    irish: 'london_irish',
    sale_sharks: 'sale',
    sarries: 'saracens',
    worcester_warriors: 'worcester',
    falcons: 'newcastle', newcastle_falcons: 'newcastle',
    yorkshire: 'carnegie',
    cornish_pirates: 'pirates',
    bedford_blues: 'bedford',
    coventry: 'coventry_rugby',
    jersey: 'jersey_reds',
    doncaster_knights: 'doncaster',
    ealing_trailfinders: 'ealing',
    nottingham_rugby: 'nottingham',
    scottish: 'london_scottish',
    welsh: 'london_welsh',
    hartpury: 'hartpury_college', hcrfc: 'hartpury_college',
    ampthill_rufc: 'ampthill',

    // France
    bordeaux: 'union_bordeaux_begles', begles: 'union_bordeaux_begles', bordeaux_begles: 'union_bordeaux_begles',
    clermont: 'clermont_auvergne', asm: 'clermont_auvergne',
    lyon_olympique_universitaire: 'lyon', lou: 'lyon',
    aviron_bayonnais: 'bayonne',
    toulon: 'rc_toulon', rc_toulonnais: 'rc_toulon',
    castres: 'castres_olympique',
    section_paloise: 'pau',
    su_agen: 'agen',
    stade_rochelais: 'la_rochelle', rochelle: 'la_rochelle',
    stade_toulousain: 'toulouse',
    stade_français: 'stade_francais', stade_francais_paris: 'stade_francais', sf: 'stade_francais',
    racing: 'racing_92', r92: 'racing_92', r_92: 'racing_92',
    ca_brive: 'brive', club_athletique_brive: 'brive',

    // Scotland
    glasgow_warriors: 'glasgow',

    // Ireland

    // Wales
    cardiff_blues: 'cardiff',

    // Italy
    benetton: 'treviso', benetton_treviso: 'treviso',

    // New Zealand
    canes: 'hurricanes',
    saders: 'crusaders',

    // South Africa

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