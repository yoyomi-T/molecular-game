// data/amino_acid_karuta_data.js

export const aminoAcidKarutaCards = [
    { id: 'gly', name: 'グリシン', yomikata: 'ぐりしん', image: './images/karuta_cards/gly.png', ph: 'neutral' },
    { id: 'ala', name: 'アラニン', yomikata: 'あらにん', image: './images/karuta_cards/ala.png', ph: 'neutral' },
    { id: 'val', name: 'バリン', yomikata: 'ばりん', image: './images/karuta_cards/val.png', ph: 'neutral' },
    { id: 'leu', name: 'ロイシン', yomikata: 'ろいしん', image: './images/karuta_cards/leu.png', ph: 'neutral' },
    { id: 'ile', name: 'イソロイシン', yomikata: 'いそろいしん', image: './images/karuta_cards/ile.png', ph: 'neutral' },
    { id: 'ser', name: 'セリン', yomikata: 'せりん', image: './images/karuta_cards/ser.png', ph: 'neutral' },
    { id: 'pro', name: 'プロリン', yomikata: 'ぷろりん', image: './images/karuta_cards/pro.png', ph: 'neutral' },
    { id: 'thr', name: 'トレオニン', yomikata: 'とれおにん', image: './images/karuta_cards/thr.png', ph: 'neutral' },
    { id: 'asn', name: 'アスパラギン', yomikata: 'あすぱらぎん', image: './images/karuta_cards/asn.png', ph: 'neutral' },
    { id: 'gln', name: 'グルタミン', yomikata: 'ぐるたみん', image: './images/karuta_cards/gln.png', ph: 'neutral' },
    { id: 'cys', name: 'システイン', yomikata: 'しすていん', image: './images/karuta_cards/cys.png', ph: 'neutral' },
    { id: 'met', name: 'メチオニン', yomikata: 'めちおにん', image: './images/karuta_cards/met.png', ph: 'neutral' },
    { id: 'phe', name: 'フェニルアラニン', yomikata: 'ふぇにるあらにん', image: './images/karuta_cards/phe.png', ph: 'neutral' },
    { id: 'tyr', name: 'チロシン', yomikata: 'ちろしん', image: './images/karuta_cards/tyr.png', ph: 'neutral' },
    { id: 'typ', name: 'トリプトファン', yomikata: 'とりぷとふぁん', image: './images/karuta_cards/trp.png', ph: 'neutral' },
    
    { id: 'his', name: 'ヒスチジン', yomikata: 'ひすちじん', image: './images/karuta_cards/his.png', ph: 'basic' },
    { id: 'lys', name: 'リシン', yomikata: 'りしん', image: './images/karuta_cards/lys.png', ph: 'basic' },
    { id: 'arg', name: 'アルギニン', yomikata: 'あるぎにん', image: './images/karuta_cards/arg.png', ph: 'basic' },

    { id: 'asp', name: 'アスパラギン酸', yomikata: 'あすぱらぎんさん', image: './images/karuta_cards/asp.png', ph: 'acid' },
    { id: 'glu', name: 'グルタミン酸', yomikata: 'ぐるたみんさん', image: './images/karuta_cards/glu.png', ph: 'acid' },
];

// 必須アミノ酸（参考情報として）
export const essentialAminoAcids = [
    'val', 'leu', 'ile', 'met', 'trp',
    'phe', 'thr', 'lys', 'his'
];