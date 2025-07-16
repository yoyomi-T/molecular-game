// data/stages.js
const stages = [
    {
        id: 'stage1_disaccharide',
        name: '単糖から二糖へ',
        gametype: 'puzzle', // パズルゲーム
        target: 'sucrose', // 目標分子のID
        availableMonomers: ['a_glucose', 'b5_fructose'] // このステージで使えるモノマー
    },
    {
        id: 'stage2_peptide',
        name: 'アミノ酸からペプチドへ',
        gametype: 'puzzle',
        target: 'dipeptide_ala_gly',
        availableMonomers: ['alanine', 'glycine']
    },
    {
        id: 'stage3_starch_segment',
        name: 'グルコースからデンプンへ',
        gametype: 'puzzle',
        target: 'starch_segment',
        availableMonomers: ['glucose'] // 複数ドロップ可能にするなど
    },
    {
        id: 'stage4_amino_acid_karuta',
        name: 'アミノ酸かるた',
        gametype: 'karuta', // かるたゲーム
        karutaDataId: 'amino_acid_karuta_data' // 参照するかるたデータ
    },
    {
        id: 'karuta_basic_1',
        name: 'アミノ酸かるた（構造→名称）',
        type: 'karuta',
        karutaMode: 'structure_to_name',
        availableMonomers: ['gly', 'ala', 'val', 'leu', 'ile', 'ser', 'pro', 'thr', 'asn', 'gln', 'cys', 'met', 'phe', 'tyr', 'trp', 'his', 'lys', 'arg', 'asp', 'glu'], // ★小文字始まりの3文字略語
        questionCount: 5,
    },
    {
        id: 'karuta_basic_2',
        name: 'アミノ酸かるた（名称→構造）',
        type: 'karuta',
        karutaMode: 'name_to_structure',
        availableMonomers: ['gly', 'ala', 'val', 'leu', 'ile', 'ser', 'pro', 'thr', 'asn', 'gln', 'cys', 'met', 'phe', 'tyr', 'trp', 'his', 'lys', 'arg', 'asp', 'glu'], // ★小文字始まりの3文字略語
        questionCount: 5,
    },
    {
        id: 'karuta_acidic_amino',
        name: '酸性アミノ酸を絞る',
        type: 'karuta',
        karutaMode: 'classification_acidic',
        availableMonomers: ['gly', 'ala', 'val', 'leu', 'ile', 'ser', 'pro', 'thr', 'asn', 'gln', 'cys', 'met', 'phe', 'tyr', 'trp', 'his', 'lys', 'arg', 'asp', 'glu'], // ★小文字始まりの3文字略語
        questionCount: 3,
        filterCriteria: { classification: '酸性' },
    },
    {
        id: 'karuta_essential_amino',
        name: '必須アミノ酸を絞る',
        type: 'karuta',
        karutaMode: 'classification_essential',
        availableMonomers: ['gly', 'ala', 'val', 'leu', 'ile', 'ser', 'pro', 'thr', 'asn', 'gln', 'cys', 'met', 'phe', 'tyr', 'trp', 'his', 'lys', 'arg', 'asp', 'glu'], // ★小文字始まりの3文字略語
        questionCount: 3,
        filterCriteria: { isEssential: true },
    }
];

// 他のファイルからstages変数を参照できるようにexportする
export { stages };