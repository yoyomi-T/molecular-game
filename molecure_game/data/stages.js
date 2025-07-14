// data/stages.js
const stages = [
    {
        id: 'stage1_disaccharide',
        name: '単糖から二糖へ',
        type: 'puzzle', // パズルゲーム
        target: 'sucrose', // 目標分子のID
        availableMonomers: ['glucose', 'fructose'] // このステージで使えるモノマー
    },
    {
        id: 'stage2_peptide',
        name: 'アミノ酸からペプチドへ',
        type: 'puzzle',
        target: 'dipeptide_ala_gly',
        availableMonomers: ['alanine', 'glycine']
    },
    {
        id: 'stage3_starch_segment',
        name: 'グルコースからデンプンへ',
        type: 'puzzle',
        target: 'starch_segment',
        availableMonomers: ['glucose'] // 複数ドロップ可能にするなど
    },
    {
        id: 'stage4_amino_acid_karuta',
        name: 'アミノ酸かるた',
        type: 'karuta', // かるたゲーム
        karutaDataId: 'amino_acid_karuta_data' // 参照するかるたデータ
    }
];

// 他のファイルからstages変数を参照できるようにexportする
export { stages };