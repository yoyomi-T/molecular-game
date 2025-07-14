// data/products.js
const allProducts = [
    { id: 'sucrose', name: 'スクロース', image: 'images/products/sucrose.png', requiredMonomers: ['glucose', 'fructose'] },
    { id: 'dipeptide_ala_gly', name: 'アラニルグリシン', image: 'images/products/dipeptide_ala_gly.png', requiredMonomers: ['alanine', 'glycine'] },
    { id: 'starch_segment', name: 'デンプン（一部）', image: 'images/products/starch_segment.png', requiredMonomers: ['glucose', 'glucose', 'glucose'] }, // 例: 3つのグルコース
    // ...他の生成物
];
export { allProducts };