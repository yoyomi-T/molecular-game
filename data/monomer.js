// data/monomer.js
const allMonomers = [
    { id: 'a_glucose', name: 'α-グルコース', yomikata: 'あるふぁぐるこーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/a_glucose.png', type: 'monosaccharide', tip: '別名「ブドウ糖」。無色の結晶で、水によく溶けるが、エタノールやジエチルエーテルにはあまり溶けない。' },
    { id: 'b_glucose', name: 'β-グルコース', yomikata: 'べーたぐるこーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/b_glucose.png', type: 'monosaccharide', tip: '別名「ブドウ糖」。無色の結晶で、水によく溶けるが、エタノールやジエチルエーテルにはあまり溶けない。' },
    { id: 'c_glucose', name: 'グルコース（鎖状構造）', yomikata: 'ぐるこーす　さじょうこうぞう', formula: 'C₆H₁₂O₆', image: 'images/monomers/c_glucose.png', type: 'monosaccharide', tip: 'ホルミル基を持ち、水溶液は還元性を示す。グルコースは水溶液中でα-グルコース、β-グルコース、鎖状構造のグルコースで平衡状態にある。' },
    { id: 'b6_fructose', name: 'β-フルクトース（六員環）', yomikata: 'べーたふるくとーす　ろくいんかんこうぞう', formula: 'C₆H₁₂O₆', image: 'images/monomers/b6_fructose.png', type: 'monosaccharide', tip: '「果糖」とも呼ばれる、無色で吸湿性の結晶。結晶中では六員環構造。水溶液は還元性を示す。' },
    { id: 'b5_fructose', name: 'β-フルクトース（五員環）', yomikata: 'べーたふるくとーす　ごいんかんこうぞう', formula: 'C₆H₁₂O₆', image: 'images/monomers/b5_fructose.png', type: 'monosaccharide', tip: '水溶液中では六員環、五員環、カルボニル基を持つ鎖状構造と平衡状態にある。水溶液は還元性を示す。' },
    { id: 'a6_fructose', name: 'α-フルクトース（六員環）', yomikata: 'あるふぁふるくとーす　ろくいんかんこうぞう', formula: 'C₆H₁₂O₆', image: 'images/monomers/a6_fructose.png', type: 'monosaccharide', tip: 'フルクトースは水溶液中では六員環α型約2％、六員環β型約53％、鎖状型約3％、五員環α型約10％、五員環β型約32％の並行混合物である。' },
    { id: 'a5_fructose', name: 'α-フルクトース（五員環）', yomikata: 'べーたふるくとーす　ごいんかんこうぞう', formula: 'C₆H₁₂O₆', image: 'images/monomers/a5_fructose.png', type: 'monosaccharide', tip: 'フルクトースは水溶液中では六員環α型約2％、六員環β型約53％、鎖状型約3％、五員環α型約10％、五員環β型約32％の並行混合物である。' },
    { id: 'a_galactose', name: 'α-ガラクトース', yomikata: 'あるふぁがらくとーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/a_galactose.png', type: 'monosaccharide', tip: '寒天や海藻に多く含まれる多糖類を加水分解して得られる。還元性を示す。' },
    { id: 'b_galactose', name: 'β-ガラクトース', yomikata: 'べーたがらくとーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/b_galactose.png', type: 'monosaccharide', tip: '寒天や海藻に多く含まれる多糖類を加水分解して得られる。還元性を示す。' },
    { id: 'a_mannose', name: 'α-マンノース', yomikata: 'あるふぁまんのーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/a_mannose.png', type: 'monosaccharide', tip: 'こんにゃくに含まれるマンナンやグルコマンナンといった多糖類を加水分解して得られる。' },
    { id: 'b_mannose', name: 'β-マンノース', yomikata: 'べーたまんのーす', formula: 'C₆H₁₂O₆', image: 'images/monomers/b_mannose.png', type: 'monosaccharide', tip: 'こんにゃくに含まれるマンナンやグルコマンナンといった多糖類を加水分解して得られる。' },
    { id: 'xylitol', name: 'キシリトール', yomikata: 'きしりとーる', formula: 'C₅H₁₂O₅', image: 'images/monomers/xylitol.png', type: 'monosaccharide', tip: '自然界に少量しかなく、希少糖の一つである。水に溶かすと吸熱し、口に含むと清涼感がある。キシロースC₅H₁₀O₅から作られる。' },
    { id: 'deoxyribose', name: 'デオキシリボース', yomikata: 'でおきしりぼーす', image: 'images/monomers/deoxyribose.png', type: 'monosaccharide', tip: 'デオキシリボ核酸の構成要素。' },
    { id: 'ribose', name: 'リボース', yomikata: 'りぼーす', image: 'images/monomers/ribose.png', type: 'monosaccharide', tip: 'リボ核酸の構成要素。' },
,
];
export { allMonomers };