// data/products.js
const allProducts = [
    //carbohydrates
    { 
        id: 'sucrose', 
        name: 'スクロース', 
        image: 'images/products/sucrose.png', 
        requiredMonomers: ['a_glucose', 'b5_fructose'], 
        type: 'disaccharide' , 
        type1: 'carbohydrate', 
        tip: '別名「ショ糖」。水に溶けやすく、甘みがある。無色の結晶（融点188℃）で、サトウキビやテンサイなどの植物に存在している。'
    },

    { 
        id: 'maltose', 
        name: 'マルトース', 
        image: 'images/products/maltose.png', 
        requiredMonomers: [['a_glucose', 'b_glutose'],['a_glucose', 'a_glucose']], 
        type: 'disaccharide' , 
        type1: 'carbohydrate', 
        tip: '別名「麦芽糖」。水あめの主な成分で、デンプンにアミラーゼを作用させて加水分解すると得られる。'
    },

    
    
    { id: 'dipeptide_ala_gly', name: 'アラニルグリシン', image: 'images/products/dipeptide_ala_gly.png', requiredMonomers: ['alanine', 'glycine'] },
    { id: 'starch_segment', name: 'デンプン（一部）', image: 'images/products/starch_segment.png', requiredMonomers: ['a_glucose', 'a_glucose', 'a_glucose'] }, // 例: 3つのグルコース
    // ...他の生成物
];
export { allProducts };