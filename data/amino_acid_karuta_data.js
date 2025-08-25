// data/amino_acid_karuta_data.js

export const aminoAcidKarutaCards = [
    { id: 'gly', name: 'グリシン', yomikata: 'ぐりしん', formula: 'H₂NCH₂COOH', MW: 75.07, ph: 'neutral', pI: 5.97, image: './images/karuta_cards/gly.png' },
    { id: 'ala', name: 'アラニン', yomikata: 'あらにん', formula: 'CH₃CH(NH₂)COOH', MW: 89.09, ph: 'neutral', pI: 6.00, image: './images/karuta_cards/ala.png' },
    { id: 'val', name: 'バリン', yomikata: 'ばりん', formula: '(CH₃)₂CHCH(NH₂)COOH', MW: 117.15, ph: 'neutral', pI: 5.96, image: './images/karuta_cards/val.png' },
    { id: 'leu', name: 'ロイシン', yomikata: 'ろいしん', formula: '(CH₃)₂CHCH₂CH(NH₂)COOH', MW: 131.17, ph: 'neutral', pI: 5.98, image: './images/karuta_cards/leu.png' },
    { id: 'ile', name: 'イソロイシン', yomikata: 'いそろいしん', formula: 'CH₃CH₂CH(CH₃)CH(NH₂)COOH', MW: 131.17, ph: 'neutral', pI: 6.02, image: './images/karuta_cards/ile.png' },
    { id: 'ser', name: 'セリン', yomikata: 'せりん', formula: 'HOCH₂CH(NH₂)COOH', MW: 105.09, ph: 'neutral', pI: 5.68, image: './images/karuta_cards/ser.png' },
    { id: 'pro', name: 'プロリン', yomikata: 'ぷろりん', formula: 'C₄H₈NCOOH', MW: 115.13, ph: 'neutral', pI: 6.30, image: './images/karuta_cards/pro.png' },
    { id: 'thr', name: 'トレオニン', yomikata: 'とれおにん', formula: 'CH₃CH(OH)CH(NH₂)COOH', MW: 119.12, ph: 'neutral', pI: 6.16, image: './images/karuta_cards/thr.png' },
    { id: 'asn', name: 'アスパラギン', yomikata: 'あすぱらぎん', formula: 'H₂NCOCH₂CH(NH₂)COOH', MW: 132.12, ph: 'neutral', pI: 5.41, image: './images/karuta_cards/asn.png' },
    { id: 'gln', name: 'グルタミン', yomikata: 'ぐるたみん', formula: 'H₂NCOCH₂CH₂CH(NH₂)COOH', MW: 146.15, ph: 'neutral', pI: 5.65, image: './images/karuta_cards/gln.png' },
    { id: 'cys', name: 'システイン', yomikata: 'しすていん', formula: 'HSCH₂CH(NH₂)COOH', MW: 121.16, ph: 'neutral', pI: 5.07, image: './images/karuta_cards/cys.png' },
    { id: 'met', name: 'メチオニン', yomikata: 'めちおにん', formula: 'CH₃SCH₂CH₂CH(NH₂)COOH', MW: 149.21, ph: 'neutral', pI: 5.74, image: './images/karuta_cards/met.png' },
    { id: 'phe', name: 'フェニルアラニン', yomikata: 'ふぇにるあらにん', formula: 'C₆H₅CH₂CH(NH₂)COOH', MW: 165.19, ph: 'neutral', pI: 5.48, image: './images/karuta_cards/phe.png' },
    { id: 'tyr', name: 'チロシン', yomikata: 'ちろしん', formula: 'HOC₆H₄CH₂CH(NH₂)COOH', MW: 181.19, ph: 'neutral', pI: 5.66, image: './images/karuta_cards/tyr.png' },
    { id: 'typ', name: 'トリプトファン', yomikata: 'とりぷとふぁん', formula: 'C₈NH₆CH₂CH(NH₂)COOH', MW: 204.23, ph: 'neutral', pI: 5.89, image: './images/karuta_cards/trp.png' },
    
    { id: 'his', name: 'ヒスチジン', yomikata: 'ひすちじん', formula: 'C₃H₃N₂CH₂CH(NH₂)COOH', MW: 155.16, ph: 'basic', pI: 7.59, image: './images/karuta_cards/his.png' },
    { id: 'lys', name: 'リシン', yomikata: 'りしん', formula: 'H₂N(CH₂)₄CH(NH₂)COOH', MW: 146.19, ph: 'basic', pI: 9.74, image: './images/karuta_cards/lys.png' },
    { id: 'arg', name: 'アルギニン', yomikata: 'あるぎにん', formula: 'HN=C(NH₂)NH(CH₂)₃CH(NH₂)COOH', MW: 174.20, ph: 'basic', pI: 10.76, image: './images/karuta_cards/arg.png' },

    { id: 'asp', name: 'アスパラギン酸', yomikata: 'あすぱらぎんさん', formula: 'HOOCCH₂CH(NH₂)COOH', MW: 133.10, ph: 'acid', pI: 2.77, image: './images/karuta_cards/asp.png' },
    { id: 'glu', name: 'グルタミン酸', yomikata: 'ぐるたみんさん', formula: 'HOOCCH₂CH₂CH(NH₂)COOH', MW: 147.13, ph: 'acid', pI: 3.22, image: './images/karuta_cards/glu.png' },
];

// 必須アミノ酸（参考情報として）
export const essentialAminoAcids = [
    'val', 'leu', 'ile', 'met', 'trp',
    'phe', 'thr', 'lys', 'his'
];