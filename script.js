// ==========================================================
// 1. データのインポート
// 別のJavaScriptファイルで定義されたデータを、このファイルで使えるように読み込みます。
// C++の #include や Pythonの import と同じ目的です。
// HTMLの <script type="module" src="script.js"></script> が必要です。
// ==========================================================
import { stages } from './data/stages.js';          // ステージの定義
import { allMonomers } from './data/monomer.js';    // すべてのモノマーの定義
import { allProducts } from './data/products.js';    // すべての完成分子（生成物）の定義
import { aminoAcidKarutaCards } from './data/amino_acid_karuta_data.js';
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

// ステージ選択メニュー関連の要素const startScreen = document.getElementById('start-screen'); // スタート画面の要素
const menuToggleButton = document.getElementById('menu-toggle');    // ハンバーガーメニューボタン (≡)
const sideMenu = document.getElementById('side-menu');              // サイドメニューのコンテナ
const stageListElement = document.getElementById('stage-list');     // ステージリスト（ul要素）

//ホーム画面
const startScreen = document.getElementById('start-screen'); // スタート画面の要素
const startGameButton = document.getElementById('start-game-button'); // 「ゲームを始める」ボタン
const showStageSelectButton = document.getElementById('show-stage-select-button'); // 「ステージ選択」ボタン（スタート画面用）
const gameContainer = document.getElementById('game-container'); // メインのゲーム画面コンテナ

const gameHeader = document.getElementById('game-header');

// ★★★ ここに karutaGameUI の定義を追加・確認 ★★★
const karutaGameUI = document.getElementById('karuta-game-ui');

// ★★★ かるたゲーム関連の他のDOM要素もこの近くにあるか確認 ★★★
const karutaScoreElement = document.getElementById('karuta-score');
const karutaTotalCardsElement = document.getElementById('karuta-total-cards');
const karutaTimerElement = document.getElementById('karuta-timer');
const readCardButton = document.getElementById('read-card-button');
const karutaMessageElement = document.getElementById('karuta-message');

// ==========================================================
// 3. グローバル変数
// ゲームの状態を管理するための変数です。
// ==========================================================
let droppedMonomers = [];      // 結合エリアに現在ドロップされているモノマーのIDを保持する配列
let currentStageIndex = 0;     // 現在アクティブなステージのインデックス（stages配列の何番目か）

let karutaCardsInPlay = [];
let currentReadingCard = null;
let karutaScore = 0;
let karutaTimer = null;
let timeLeft = 0;
const GAME_TIME_LIMIT = 60; // かるたゲームの時間制限 (秒)
const SPEECH_VOICE = 'ja-JP';
// ==========================================================
// 4. ゲームの初期化関数
// ページが読み込まれたときや、ゲームがリセットされるときに呼び出されます。
// ==========================================================
function initializeGame() {
    // ページロード時にスタート画面を表示し、ゲーム画面は非表示にする
    startScreen.style.display = 'flex'; // スタート画面はFlexboxで中央配置
    gameContainer.style.display = 'none'; // ゲーム画面は非表示

    // スタート画面のボタンにイベントリスナーを設定
    startGameButton.addEventListener('click', () => {
        startScreen.style.display = 'none'; // スタート画面を非表示に
        gameContainer.style.display = 'grid'; // ゲーム画面を表示（CSSのgridレイアウトに戻す）
        loadStage(0); // 最初のステージ（インデックス0）をロードしてゲーム開始
    });

    showStageSelectButton.addEventListener('click', () => {
        startScreen.style.display = 'none'; // スタート画面を非表示に
        gameContainer.style.display = 'grid'; // ゲーム画面を表示
        // ステージリストは initializeGame より前に renderStageList() で生成済み
        // そのため、ここではサイドメニューを直接開くだけ
        sideMenu.classList.add('open');
        // loadStageは、ステージ選択から実際にステージが選ばれたときに呼び出されるべきですが、
        // 念のため初期ステージをロードしておくと、画面が空白になりません。
        loadStage(currentStageIndex);
    });

    // サイドメニューのステージリストを生成する
    renderStageList(); // これを initializeGame 内で呼び出すことで、
                       // スタート画面が表示されている間にリストが裏で準備される
}

// ==========================================================
// 5. ステージをロードする関数
// 指定されたインデックスのステージデータを読み込み、UIを更新します。
// ==========================================================
// script.js 内の loadStage 関数 (修正版)

function loadStage(stageIndex) {
    // ステージインデックスが有効範囲内かチェック
    if (stageIndex < 0 || stageIndex >= stages.length) {
        console.error("Invalid stage index:", stageIndex);
        return;
    }

    currentStageIndex = stageIndex; // 現在のステージインデックスを更新
    const stage = stages[currentStageIndex]; // 現在のステージデータを取得

    // --- UI要素の表示/非表示をリセット（共通の初期化処理） ---
    // これらはどちらのゲームタイプでも共通で一旦デフォルトの状態に戻します。
    // その後、各ゲームタイプで必要なものが表示され、不要なものが非表示になります。
    gameHeader.style.display = 'block'; // パズルゲーム用ヘッダーは一旦表示に
    karutaGameUI.style.display = 'none'; // かるたUIは一旦非表示に

    targetMoleculeImg.style.display = 'block'; // 目標分子画像は一旦表示に
    targetMoleculeName.style.display = 'block'; // 目標分子名は一旦表示に
    buildArea.style.display = 'block'; // 結合エリアは一旦表示に
    checkButton.style.display = 'block'; // チェックボタンは一旦表示に

    monomerPool.style.display = 'flex'; // モノマープール（かるた札/モノマーカード表示エリア）は常にflexだが、内容とクラスが変わる
    monomerPool.classList.remove('karuta-card-display'); // かるた用のクラスを一旦削除

    feedbackMessage.textContent = ''; // フィードバックメッセージをクリア
    feedbackMessage.classList.remove('success', 'error'); // メッセージのスタイルをリセット


    // --- ステージのタイプに基づいてUIとロジックを切り替える ---
    if (stage.gametype === 'puzzle') {
        // --- パズルゲームのロジック ---

        // 現在のステージの目標分子データを allProducts からIDで検索します。
        const target = allProducts.find(p => p.id === stage.target);
        if (!target) {
            console.error("Target molecule not found for stage:", stage.id);
            return;
        }

        // 目標分子の画像と名前を更新します。
        targetMoleculeImg.src = target.image;
        targetMoleculeName.textContent = target.name;

        // 結合エリアを初期化
        buildArea.innerHTML = '<p>モノマーをここにドラッグ＆ドロップしてください。</p>';
        droppedMonomers = []; // ドロップされたモノマーをリセット

        // チェックボタンを有効化
        checkButton.disabled = false;

        // モノマープールを一度クリアし、利用可能なモノマーカードを動的に生成して表示します。
        monomerPool.innerHTML = ''; // ここでクリア

        // このステージで利用可能なモノマーのみを allMonomers からフィルタリングします。
        const availableMonomersForStage = allMonomers.filter(m => stage.availableMonomers.includes(m.id));
        console.log("Available Monomers for Stage:", availableMonomersForStage);

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

    } else if (stage.gametype === 'karuta') {
        // --- かるたゲームのロジック ---

        // パズルゲームのUI要素を非表示にする
        gameHeader.style.display = 'none'; // ヘッダーを非表示
        targetMoleculeImg.style.display = 'none'; // 目標分子画像を非表示
        targetMoleculeName.style.display = 'none'; // 目標分子名を非表示
        buildArea.style.display = 'none'; // 結合エリアを非表示
        checkButton.style.display = 'none'; // チェックボタンを非表示

        // かるたゲームのUI要素を表示
        karutaGameUI.style.display = 'flex';

        // かるたゲームの初期化関数を呼び出す
        initKarutaGame();

    } else {
        // 未知のステージタイプの場合の処理 (エラーハンドリングなど)
        console.error("Unknown stage gametype:", stage.gametype);
    }

    // サイドメニューを閉じる（共通処理）
    sideMenu.classList.remove('open');
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
        if (stages[currentStageIndex].gametype !== 'puzzle') {
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
        droppedMonomers.push(droppedMonomer);
    }
});


// ==========================================================
// 8. 結合チェックロジック
// 「結合をチェック！」ボタンがクリックされたときに実行されます。
// ドロップされたモノマーが目標分子のレシピに合致するかを判定します。
// ==========================================================
checkButton.addEventListener('click', checkMonomerCombination); 

// そして、checkMonomerCombination 関数を定義します
// (この関数は、イベントリスナーよりも下、または別のファイルでexportしていてもOKですが、
//  ここでは分かりやすさのため一緒に示します)

function checkMonomerCombination() {
    console.log("Dropped Monomers:", droppedMonomers);
    // 現在のステージがパズルタイプでない場合は処理しない
    if (stages[currentStageIndex].gametype !== 'puzzle') return;

    // ドロップされたモノマーがない場合は処理しない
    if (droppedMonomers.length === 0) {
        feedbackMessage.textContent = 'モノマーを結合エリアにドラッグ＆ドロップしてください。';
        feedbackMessage.classList.add('error');
        return;
    }

    const currentStage = stages[currentStageIndex];
    const targetProduct = allProducts.find(p => p.id === currentStage.target);

    // ドロップされたモノマーのIDリストを取得し、ソートして比較できるように準備
    console.log("Dropped Monomers (raw):", droppedMonomers);
    const droppedMonomerIds = droppedMonomers.map(m => m.id).sort();
    console.log("Dropped Monomer IDs (sorted):", droppedMonomerIds); // ★追加
    console.log("Dropped Monomer IDs JSON:", JSON.stringify(droppedMonomerIds)); // ★追加

    let foundProduct = null; // 見つかった生成物を保持する変数

    // すべての生成物 (allProducts) をループして、ドロップされたモノマーの組み合わせと一致するかチェック
    for (const product of allProducts) {
        const requiredMonomerIdsSorted = product.requiredMonomers.sort();

        console.log("Product:", product.name); // ★追加
        console.log("Required Monomer IDs (sorted):", requiredMonomerIdsSorted); // ★追加
        console.log("Required Monomer IDs JSON:", JSON.stringify(requiredMonomerIdsSorted)); // ★追加

        // 必要なモノマーの数と種類が一致するかを比較
        if (JSON.stringify(droppedMonomerIds) === JSON.stringify(requiredMonomerIdsSorted)) {
            foundProduct = product;
            break; // 一致する生成物が見つかったらループを抜ける
        }
    }

    if (foundProduct) {
        // 何らかの生成物（化合物）が見つかった場合
        feedbackMessage.classList.remove('error');

        // 結合エリアをクリアし、生成物の画像と名前を表示
        buildArea.innerHTML = '';

        const productDisplayDiv = document.createElement('div');
        productDisplayDiv.classList.add('molecule-display', 'generated-product');

        const img = document.createElement('img');
        img.src = foundProduct.image;
        img.alt = foundProduct.name;
        img.classList.add('generated-product-img');

        const nameP = document.createElement('p');
        nameP.textContent = foundProduct.name;
        nameP.classList.add('generated-product-name');

        // 水の表示
        const waterDiv = document.createElement('div');
        waterDiv.classList.add('byproduct');
        waterDiv.innerHTML = '<alt="水" style="width: 50px; height: auto;"><p>+<br>水</p>';

        productDisplayDiv.appendChild(img);
        productDisplayDiv.appendChild(nameP);
        productDisplayDiv.appendChild(waterDiv);

        buildArea.appendChild(productDisplayDiv);

        // 正解判定
        if (foundProduct.id === targetProduct.id) {
            feedbackMessage.textContent = `${targetProduct.name} ができました！正解です！`;
            feedbackMessage.classList.add('success');
        } else {
            feedbackMessage.textContent = `${foundProduct.name} ができました。残念、目標ではありません！`;
            feedbackMessage.classList.add('error');
        }

        // フィードバックメッセージが表示された後、クリックでリセットできるようにする
        // feedbackMessage要素自体にイベントリスナーを追加する
        const resetHandler = () => {
            resetBuildArea();
            // イベントリスナーは一度実行されたら削除する（重複して発火しないように）
            feedbackMessage.removeEventListener('click', resetHandler);
            // feedbackMessageのスタイルもリセット
            feedbackMessage.classList.remove('success', 'error');
            feedbackMessage.textContent = ''; // メッセージもクリア
        };

        // 少し遅延させてからイベントリスナーを追加すると、
        // ユーザーが意図しないクリックで即座にリセットされるのを防げます。
        setTimeout(() => {
            feedbackMessage.addEventListener('click', resetHandler);
            feedbackMessage.style.cursor = 'pointer'; // クリック可能であることを示すカーソル
            feedbackMessage.textContent += ' (タップして次へ)'; // ユーザーへの指示
        }, 1000); // 1秒後にクリック可能にする

    } else {
        // どの生成物にも一致しなかった場合 (不正解)
        feedbackMessage.textContent = 'この組み合わせでは何もできませんでした。もう一度試しましょう！';
        feedbackMessage.classList.add('error');
        setTimeout(() => {
            resetBuildArea();
        }, 2000);
    }
}

// 結合エリアを初期状態に戻す関数 (これも必要であれば追加)
function resetBuildArea() {
    buildArea.innerHTML = '<p>モノマーをここにドラッグ＆ドロップしてください。</p>';
    droppedMonomers = [];
    feedbackMessage.textContent = '';
    feedbackMessage.classList.remove('success', 'error');
}


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
// 10. かるたゲームロジック 
// ==========================================================

function initKarutaGame() {
    karutaScore = 0;
    timeLeft = GAME_TIME_LIMIT;
    karutaCardsInPlay = [...aminoAcidKarutaCards];
    shuffleArray(karutaCardsInPlay);
    karutaTotalCardsElement.textContent = karutaCardsInPlay.length;
    karutaScoreElement.textContent = karutaScore;
    karutaMessageElement.textContent = '「読み上げる」ボタンを押すとアミノ酸の名前が読み上げられます。'; // メッセージ変更
    readCardButton.disabled = false;

    // 現在の読み上げ対象をリセット
    currentReadingCard = null;
    // 古い読み上げ表示をクリア
    karutaGameUI.querySelector('.current-reading-name')?.remove();


    renderKarutaCards();
    clearInterval(karutaTimer);
    karutaTimerElement.textContent = `残り時間: ${timeLeft}秒`;
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function renderKarutaCards() {
    monomerPool.innerHTML = '';
    monomerPool.classList.add('karuta-card-display');
    monomerPool.style.display = 'flex';

    karutaCardsInPlay.forEach(card => {
        const karutaCardElement = document.createElement('div');
        karutaCardElement.classList.add('karuta-card');
        karutaCardElement.dataset.id = card.id;

        const img = document.createElement('img');
        img.src = card.image;
        img.alt = card.name;
        karutaCardElement.appendChild(img);

        const nameP = document.createElement('p');
        nameP.classList.add('karuta-card-name');
        nameP.textContent = card.name;
        karutaCardElement.appendChild(nameP);

        const formulaP = document.createElement('p');
        formulaP.classList.add('karuta-card-formula');
        formulaP.textContent = card.formula;
        karutaCardElement.appendChild(formulaP);

        // ★読み仮名要素を追加 (画面には表示しないが、音声合成のためにデータとして保持)
        const yomikataSpan = document.createElement('span');
        yomikataSpan.classList.add('karuta-card-yomikata');
        yomikataSpan.textContent = card.yomikata;
        yomikataSpan.style.display = 'none'; // 画面には表示しない
        karutaCardElement.appendChild(yomikataSpan);

        karutaCardElement.addEventListener('click', handleKarutaCardClick);
        monomerPool.appendChild(karutaCardElement);
    });
}

function updateKarutaTimer() {
    timeLeft--;
    karutaTimerElement.textContent = `残り時間: ${timeLeft}秒`;

    if (timeLeft <= 0) {
        endKarutaGame('時間切れ！');
    }
}

// 読み上げ開始（次の札を提示）(変更あり)
function startKarutaRound() {
    if (karutaCardsInPlay.length === 0) {
        endKarutaGame('全ての札を取りました！');
        return;
    }

    readCardButton.disabled = true; // ボタンを無効化

    // すでに表示されている読み上げ名を削除
    const oldReadingName = karutaGameUI.querySelector('.current-reading-name');
    if (oldReadingName) {
        oldReadingName.remove();
    }

    // まだ取られていない札の中からランダムに選択
    const remainingCards = karutaCardsInPlay.filter(card => !document.querySelector(`.karuta-card[data-id="${card.id}"].correct`));

    if (remainingCards.length === 0) {
        endKarutaGame('全ての札を取りました！');
        return;
    }

    currentReadingCard = remainingCards[Math.floor(Math.random() * remainingCards.length)];

    // ★読み上げるアミノ酸の名前をUIに表示
    const readingNameElement = document.createElement('p');
    readingNameElement.classList.add('current-reading-name');
    readingNameElement.textContent = `探すのは「${currentReadingCard.name}」です！`;
    karutaGameUI.insertBefore(readingNameElement, readCardButton.nextSibling);

    karutaMessageElement.textContent = '対応する札をクリックしてください！';
    karutaMessageElement.classList.remove('error', 'success');


    // ★音声合成の部分を再度有効化し、yomikataを読み上げる
    const utterance = new SpeechSynthesisUtterance(currentReadingCard.yomikata); // yomikata を読み上げる
    utterance.lang = SPEECH_VOICE;
    utterance.rate = 0.8;

    utterance.onend = () => {
        readCardButton.disabled = false; // 読み上げ終了後にボタンを有効化
        if (!karutaTimer) {
            karutaTimer = setInterval(updateKarutaTimer, 1000);
        }
    };

    window.speechSynthesis.speak(utterance);
}

function handleKarutaCardClick(e) {
    if (!currentReadingCard) {
        karutaMessageElement.textContent = 'まず「読み上げる」ボタンを押してください。';
        karutaMessageElement.classList.add('error');
        setTimeout(() => karutaMessageElement.classList.remove('error'), 2000);
        return;
    }

    const clickedCardId = e.currentTarget.dataset.id;
    const clickedCardElement = e.currentTarget;

    if (clickedCardId === currentReadingCard.id) {
        karutaScore++;
        karutaScoreElement.textContent = karutaScore;
        karutaMessageElement.textContent = '正解！👍';
        karutaMessageElement.classList.remove('error');
        karutaMessageElement.classList.add('success');

        clickedCardElement.classList.add('correct');
        clickedCardElement.addEventListener('animationend', () => {
            clickedCardElement.style.display = 'none';
        });

        // 正解後、現在の読み上げ表示を削除
        const oldReadingName = karutaGameUI.querySelector('.current-reading-name');
        if (oldReadingName) {
            oldReadingName.remove();
        }

        currentReadingCard = null;
        // 正解後、自動的に次のラウンドを開始
        setTimeout(() => {
            karutaMessageElement.classList.remove('success');
            startKarutaRound();
        }, 1000); // 1秒後に次の読み上げを開始
    } else {
        karutaMessageElement.textContent = '不正解！もう一度よく見てください。🤔';
        karutaMessageElement.classList.remove('success');
        karutaMessageElement.classList.add('error');
        clickedCardElement.classList.add('incorrect');
        clickedCardElement.addEventListener('animationend', () => {
            clickedCardElement.classList.remove('incorrect');
        }, { once: true });
    }
}

function endKarutaGame(message) {
    clearInterval(karutaTimer);
    readCardButton.disabled = true;
    currentReadingCard = null;

    karutaMessageElement.textContent = `${message} あなたの得点: ${karutaScore} / ${aminoAcidKarutaCards.length}`;
    if (karutaScore === aminoAcidKarutaCards.length) {
        karutaMessageElement.classList.add('success');
    } else {
        karutaMessageElement.classList.add('error');
    }

    // ゲーム終了後、読み上げ表示を削除
    const oldReadingName = karutaGameUI.querySelector('.current-reading-name');
    if (oldReadingName) {
        oldReadingName.remove();
    }

    setTimeout(() => {
        karutaMessageElement.textContent = 'もう一度プレイするにはステージ選択から！';
        karutaMessageElement.classList.remove('success', 'error');
    }, 5000);
}

// ==========================================================
// 11. ゲーム開始のトリガー
// ページが完全に読み込まれたときに `initializeGame` 関数を呼び出します。
// ==========================================================
window.onload = initializeGame;