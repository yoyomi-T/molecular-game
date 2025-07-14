// ==========================================================
// 1. データのインポート
// 別のJavaScriptファイルで定義されたデータを、このファイルで使えるように読み込みます。
// C++の #include や Pythonの import と同じ目的です。
// HTMLの <script type="module" src="script.js"></script> が必要です。
// ==========================================================
import { stages } from './data/stages.js';          // ステージの定義
import { allMonomers } from './data/monomers.js';    // すべてのモノマーの定義
import { allProducts } from './data/products.js';    // すべての完成分子（生成物）の定義
// import { aminoAcidKarutaCards } from './data/amino_acid_karuta_data.js'; // アミノ酸かるたステージで必要になったらインポート

// ==========================================================
// 2. DOM要素の取得
// HTMLファイル内の特定のIDを持つ要素をJavaScriptから操作できるように取得します。
// ==========================================================
const targetMoleculeImg = document.getElementById('target-molecule-img');  // 目標分子の画像要素
const targetMoleculeName = document.getElementById('target-molecule-name'); // 目標分子の名前表示要素
const monomerPool = document.getElementById('monomer-pool');              // 利用可能なモノマーを表示するエリア
const buildArea = document.getElementById('build-area');                  // モノマーをドラッグ＆ドロップする結合エリア
const checkButton = document.getElementById('check-button');              // 結合チェックボタン
const feedbackMessage = document.getElementById('feedback-message');      // 正誤フィードバックメッセージ表示エリア

// ステージ選択メニュー関連の要素
const menuToggleButton = document.getElementById('menu-toggle');    // ハンバーガーメニューボタン (≡)
const sideMenu = document.getElementById('side-menu');              // サイドメニューのコンテナ
const stageListElement = document.getElementById('stage-list');     // ステージリスト（ul要素）

// ==========================================================
// 3. グローバル変数
// ゲームの状態を管理するための変数です。
// ==========================================================
let droppedMonomers = [];      // 結合エリアに現在ドロップされているモノマーのIDを保持する配列
let currentStageIndex = 0;     // 現在アクティブなステージのインデックス（stages配列の何番目か）

// ==========================================================
// 4. ゲームの初期化関数
// ページが読み込まれたときや、ゲームがリセットされるときに呼び出されます。
// ==========================================================
function initializeGame() {
    // サイドメニューにステージリストを動的に生成して表示します。
    renderStageList();
    // 最初のステージをロードして、ゲームを開始します。
    loadStage(currentStageIndex);
}

// ==========================================================
// 5. ステージをロードする関数
// 指定されたインデックスのステージデータを読み込み、UIを更新します。
// ==========================================================
function loadStage(stageIndex) {
    // 無効なステージインデックスが指定された場合はエラーを出して終了します。
    if (stageIndex < 0 || stageIndex >= stages.length) {
        console.error("Invalid stage index:", stageIndex);
        return;
    }

    // 現在のステージインデックスを更新します。
    currentStageIndex = stageIndex;
    // ロードするステージのデータを stages 配列から取得します。
    const stage = stages[currentStageIndex];

    // ゲームエリアの状態をリセットします。
    buildArea.innerHTML = '<p>Drag and drop monomers here.</p>'; // 初期テキストに戻す
    droppedMonomers = []; // ドロップされたモノマーをクリア
    feedbackMessage.textContent = ''; // フィードバックメッセージをクリア
    feedbackMessage.classList.remove('success', 'error'); // メッセージの色クラスを削除
    checkButton.disabled = false; // チェックボタンを有効化

    // ステージが切り替わったので、サイドメニューを閉じます。
    sideMenu.classList.remove('open');
    // document.body.classList.remove('menu-open'); // 必要であれば body のクラスも削除

    // ステージのタイプに応じて異なる初期化処理を実行します。
    if (stage.type === 'puzzle') {
        // パズルゲームの場合のUIとデータの準備
        // 現在のステージの目標分子データを allProducts からIDで検索します。
        const target = allProducts.find(p => p.id === stage.target);
        if (!target) {
            console.error("Target molecule not found for stage:", stage.id);
            return;
        }

        // 目標分子の画像と名前を更新します。
        targetMoleculeImg.src = target.image;
        targetMoleculeName.textContent = target.name;

        // このステージで利用可能なモノマーのみを allMonomers からフィルタリングします。
        const availableMonomersForStage = allMonomers.filter(m => stage.availableMonomers.includes(m.id));

        // モノマープールを一度クリアし、利用可能なモノマーカードを動的に生成して表示します。
        monomerPool.innerHTML = '';
        availableMonomersForStage.forEach(monomer => {
            const monomerCard = document.createElement('div');
            monomerCard.classList.add('monomer-card');
            monomerCard.setAttribute('draggable', 'true'); // ドラッグ可能属性
            monomerCard.dataset.id = monomer.id; // データID（モノマーの識別子）を設定

            const img = document.createElement('img');
            img.src = monomer.image;
            img.alt = monomer.name;
            monomerCard.appendChild(img);

            const p = document.createElement('p');
            p.textContent = monomer.name;
            monomerCard.appendChild(p);

            monomerPool.appendChild(monomerCard);
        });

        // 結合チェックボタンを再表示（かるたから切り替わる可能性を考慮）
        checkButton.style.display = 'block';

    } else if (stage.type === 'karuta') {
        // かるたゲームの場合のUIとデータの準備 (TODO: ここにかるたゲーム専用のセットアップを書く)
        // 現状は表示を切り替えるだけです。
        targetMoleculeImg.src = ''; // パズル用の目標画像を非表示に
        targetMoleculeName.textContent = 'アミノ酸かるた'; // かるた用のタイトル
        buildArea.innerHTML = '<p>読み上げられたアミノ酸に対応する札をクリックしてください。</p>'; // かるた用の指示
        monomerPool.innerHTML = ''; // モノマープールをクリア（かるたの札をここに表示する想定）
        checkButton.style.display = 'none'; // かるたには結合チェックボタンが不要なので非表示に
        feedbackMessage.textContent = 'アミノ酸かるたステージです！';

        // 実際のかるたの札の表示や、読み上げ機能、クリック判定などはここに追加実装が必要です。
        // 例: loadKarutaStage(stage.karutaDataId); // この関数は別途定義
    }
}

// ==========================================================
// 6. ステージリストをサイドメニューに描画する関数
// `stages.js` から取得したステージ情報に基づいてリストを動的に生成します。
// ==========================================================
function renderStageList() {
    stageListElement.innerHTML = ''; // 既存のリスト項目を全てクリア
    // stages配列の各ステージに対して処理を実行します。
    stages.forEach((stage, index) => {
        const listItem = document.createElement('li'); // リスト項目 (<li>) を作成
        const stageButton = document.createElement('button'); // ボタン (<button>) を作成
        stageButton.textContent = stage.name; // ボタンのテキストをステージ名に設定
        stageButton.dataset.stageIndex = index; // データ属性にステージのインデックスを保存（クリック時に使用）

        // ボタンがクリックされたら、そのステージをロードするようにイベントリスナーを設定
        stageButton.addEventListener('click', () => {
            // dataset.stageIndex は文字列として取得されるので、parseIntで数値に変換
            loadStage(parseInt(stageButton.dataset.stageIndex));
        });

        listItem.appendChild(stageButton); // <li>の中に<button>を入れる
        stageListElement.appendChild(listItem); // <ul>の中に<li>を入れる
    });
}

// ==========================================================
// 7. ドラッグ＆ドロップイベントリスナー
// モノマーをドラッグして結合エリアにドロップするための処理です。
// 汎用的に使えるため、ステージの種類に関わらず動作します。
// ==========================================================

// モノマープールからのドラッグ開始時
monomerPool.addEventListener('dragstart', (e) => {
    // ドラッグ中のデータとして、ドラッグされた要素（モノマーカード）のデータID（モノマーのID）をセット
    e.dataTransfer.setData('text/plain', e.target.dataset.id);
    // ドラッグ中の要素に 'dragging' クラスを追加して、視覚的なフィードバックを提供
    e.target.classList.add('dragging');
});

// モノマープールでのドラッグ終了時
monomerPool.addEventListener('dragend', (e) => {
    // ドラッグが終了したら 'dragging' クラスを削除
    e.target.classList.remove('dragging');
});

// 結合エリア上でドラッグ要素が動いているとき (ドロップを許可するために必要)
buildArea.addEventListener('dragover', (e) => {
    e.preventDefault(); // デフォルトの動作（リンクを開くなど）を防止
    buildArea.classList.add('drag-over'); // ホバー時のスタイルを適用
});

// 結合エリアからドラッグ要素が離れたとき
buildArea.addEventListener('dragleave', () => {
    buildArea.classList.remove('drag-over'); // ホバー時のスタイルを削除
});

// 結合エリアへのドロップ時
buildArea.addEventListener('drop', (e) => {
    e.preventDefault(); // デフォルトの動作を防止
    buildArea.classList.remove('drag-over'); // ホバー時のスタイルを削除

    // ドラッグされたデータ（モノマーのID）を取得
    const monomerId = e.dataTransfer.getData('text/plain');
    // 取得したIDを使って、全モノマーデータ (allMonomers) から該当するモノマー情報を検索
    const droppedMonomer = allMonomers.find(m => m.id === monomerId);

    // ドロップされたモノマーが見つかった場合
    if (droppedMonomer) {
        // 現在のステージがパズルタイプでない場合は、ドロップを許可しない
        if (stages[currentStageIndex].type !== 'puzzle') {
            feedbackMessage.textContent = 'このステージではモノマーをドロップできません。';
            feedbackMessage.classList.add('error');
            setTimeout(() => feedbackMessage.textContent = '', 2000);
            return; // 処理を中断
        }

        // 同じモノマーが既にドロップされているかチェック (今回のパズルゲームのルールとして)
        if (droppedMonomers.includes(monomerId)) {
            feedbackMessage.textContent = '同じモノマーは複数ドロップできません。';
            feedbackMessage.classList.add('error');
            setTimeout(() => feedbackMessage.textContent = '', 2000);
            return; // 処理を中断
        }

        // 結合エリアが空（最初のドロップ）だった場合、初期テキストを削除
        if (droppedMonomers.length === 0) {
            buildArea.innerHTML = '';
        }

        // ドロップされたモノマーカードのHTML要素を動的に作成
        const droppedCard = document.createElement('div');
        droppedCard.classList.add('monomer-card', 'dropped'); // 'monomer-card'と'dropped'クラスを追加
        const img = document.createElement('img');
        img.src = droppedMonomer.image;
        img.alt = droppedMonomer.name;
        droppedCard.appendChild(img);
        const p = document.createElement('p');
        p.textContent = droppedMonomer.name;
        droppedCard.appendChild(p);

        // 作成したカードを結合エリアに追加
        buildArea.appendChild(droppedCard);
        // ドロップされたモノマーのIDを記録配列に追加
        droppedMonomers.push(monomerId);
    }
});


// ==========================================================
// 8. 結合チェックロジック
// 「結合をチェック！」ボタンがクリックされたときに実行されます。
// ドロップされたモノマーが目標分子のレシピに合致するかを判定します。
// ==========================================================
checkButton.addEventListener('click', () => {
    // フィードバックメッセージをリセット
    feedbackMessage.textContent = '';
    feedbackMessage.classList.remove('success', 'error');

    const currentStage = stages[currentStageIndex];

    // 現在のステージがパズルタイプでない場合は処理しない
    if (currentStage.type !== 'puzzle') {
        feedbackMessage.textContent = 'このステージでは結合チェックはできません。';
        feedbackMessage.classList.add('error');
        return;
    }

    // 現在のステージの目標分子データを allProducts からIDで検索
    const target = allProducts.find(p => p.id === currentStage.target);
    if (!target) {
        console.error("Target molecule not found for current stage check.");
        feedbackMessage.textContent = 'ゲームエラーが発生しました。';
        feedbackMessage.classList.add('error');
        return;
    }

    // ドロップされたモノマーの数が、目標分子に必要なモノマーの数と一致するかチェック
    if (droppedMonomers.length !== target.requiredMonomers.length) {
        feedbackMessage.textContent = `モノマーの数が違います。${target.requiredMonomers.length}つ必要です。`;
        feedbackMessage.classList.add('error');
        return;
    }

    // 目標分子に必要なモノマーのセットと、実際にドロップされたモノマーのセットを作成
    // Setを使うことで、要素の重複を考慮せず、純粋な種類の比較ができます
    const requiredSet = new Set(target.requiredMonomers);
    const droppedSet = new Set(droppedMonomers);

    // 以下の2つの条件が満たされたら「正しい組み合わせ」と判断します
    // 1. 必要なモノマーの種類数とドロップされたモノマーの種類数が同じ
    // 2. 必要なモノマーの全ての種類が、ドロップされたモノマーのセットに含まれている
    const isCorrectCombination = requiredSet.size === droppedSet.size &&
                                 [...requiredSet].every(item => droppedSet.has(item));

    if (isCorrectCombination) {
        // 正解の場合の処理
        feedbackMessage.textContent = `${target.name}が完成！正解！🎉`;
        feedbackMessage.classList.add('success');
        checkButton.disabled = true; // 正解したらボタンを無効化
        // TODO: ここに「次のステージへ進む」ボタンの表示や、ゲームクリアの演出などを追加
    } else {
        // 不正解の場合の処理
        feedbackMessage.textContent = '不正解です。正しい組み合わせではありません。';
        feedbackMessage.classList.add('error');
    }
});

// ==========================================================
// 9. サイドメニューの表示/非表示の制御
// ハンバーガーメニューボタンのクリックイベントと、メニュー外クリックイベントを処理します。
// ==========================================================

// ハンバーガーメニューボタンがクリックされたときの処理
menuToggleButton.addEventListener('click', () => {
    // sideMenu 要素に 'open' クラスを付けたり外したりして、表示/非表示を切り替える
    sideMenu.classList.toggle('open');
    // 必要であれば、body要素に 'menu-open' クラスを付けたり外したりして、
    // メインコンテンツの表示位置をずらすなどのCSSを適用できます。
    // document.body.classList.toggle('menu-open');
});

// ドキュメント全体でのクリックイベントを監視（メニュー外クリックで閉じるため）
document.addEventListener('click', (e) => {
    // クリックされた要素がサイドメニュー内ではない AND
    // クリックされた要素がハンバーガーメニューボタンではない AND
    // サイドメニューが現在開いている状態である
    if (!sideMenu.contains(e.target) && !menuToggleButton.contains(e.target) && sideMenu.classList.contains('open')) {
        // 上記の条件をすべて満たす場合、サイドメニューを閉じる
        sideMenu.classList.remove('open');
        // document.body.classList.remove('menu-open'); // 必要であれば body のクラスも外す
    }
});


// ==========================================================
// 10. ゲーム開始のトリガー
// ページが完全に読み込まれたときに `initializeGame` 関数を呼び出します。
// ==========================================================
window.onload = initializeGame;