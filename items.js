(function attachShinobiDashItems(root, factory) {
  const api = factory();
  if (typeof module !== "undefined" && module.exports) {
    module.exports = api;
  }
  root.ShinobiDashItems = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function createShinobiDashItems() {
  "use strict";

  const rarityMeta = {
    common: { label: "コモン", color: "#ffffff", chance: 0.7 },
    uncommon: { label: "アンコモン", color: "#ffe06c", chance: 0.27 },
    rare: { label: "レア", color: "#7fe7ff", chance: 0.025 },
    epic: { label: "エピック", color: "#ff8cff", chance: 0.005 }
  };
  const rarityOrder = ["common", "uncommon", "rare", "epic"];

  function makePalette() {
    return {};
  }

  const WHITE_SLATE_ICON_SIZE = 32;
  const whiteSlateFamilies = [
    "weapon", "star", "scroll", "mask", "broom",
    "bell", "lantern", "origami", "charm", "tea",
    "wagashi", "flower", "nature", "ore", "weather",
    "sweet", "drink", "space", "toy", "accessory",
    "tech", "container", "key", "food", "instrument"
  ];
  const whiteSlatePaletteSets = [
    ["#283247", "#7f9ab8", "#e2f4ff", "#66d8ff", "#ffd85c", "#ff6a7a"],
    ["#3d1325", "#d64d72", "#ffd1df", "#ffe05c", "#62d8ff", "#64d982"],
    ["#3b2615", "#b87434", "#ffe2a1", "#ffffff", "#4bb8ff", "#e84a3a"],
    ["#172b1b", "#58ad5d", "#c8f6a8", "#ffe05c", "#ff7bd5", "#ffffff"],
    ["#17183a", "#695dff", "#d8d6ff", "#62e6ff", "#ffe05c", "#ff7bd5"],
    ["#2f2014", "#d28a36", "#ffd580", "#fff4bf", "#55c878", "#ffffff"],
    ["#122c3a", "#36bce8", "#c8f7ff", "#ffffff", "#ffe05c", "#ff7bd5"],
    ["#241330", "#8f5cff", "#e4d2ff", "#ff75c8", "#62e6ff", "#ffe05c"]
  ];
  const whiteSlateCatalog = {
    weapon: [["mist_kunai", "霧先クナイ", "忍具", "朝霧を裂く細身のクナイ。刃先の青が暗い足場を少しだけ照らす。"], ["storm_katana", "嵐切り太刀", "武器", "刃に雨雲の線が走る太刀。抜く前から風が騒ぐ。"], ["bamboo_spear", "青竹の槍", "武器", "竹の節を残した軽い槍。突くよりも距離を測るのが得意。"], ["crescent_sickle", "三日月鎌", "武器", "三日月形の刃を持つ小鎌。草も影も同じ角度で刈れる。"]],
    star: [["sakura_shuriken", "桜刃手裏剣", "忍具", "花びらのように開いた手裏剣。投げると春色の残像だけが残る。"], ["pinwheel_shuriken", "風車手裏剣", "忍具", "回るたび色が変わる手裏剣。風向きを読むためにも使える。"], ["compass_star", "方位星", "宇宙", "東西南北を星の光で示す小さな標。迷うほど強く光る。"], ["void_shuriken", "虚空手裏剣", "忍具", "中心だけが夜より黒い手裏剣。投げると距離が一瞬折れる。"]],
    scroll: [["blue_ink_scroll", "青墨の巻物", "巻物", "青い墨で道順が記された巻物。濡れても文字が少しだけ泳ぐ。"], ["red_talisman", "赤札の護符", "巻物", "赤い帯で封じた護符。危ない橋の前で紙端が震える。"], ["pocket_grimoire", "豆魔導書", "本", "片手で隠せる小さな魔導書。余白の落書きまで効力がある。"], ["floating_map_tile", "浮島地図", "地図", "折り目の中に浮島が描かれた地図。見るたび道が少し変わる。"]],
    mask: [["fox_mask_half", "半月狐面", "和風", "片側だけ月模様の狐面。顔よりも気配を隠してくれる。"], ["red_oni_mask", "赤鬼の小面", "和風", "角つきの小さな面。被らなくても机の上で威張っている。"], ["moon_sleep_mask", "月眠りの面", "和風", "半月の目を持つ白い面。静かな場所では表情が変わる。"], ["festival_smile_mask", "祭り笑面", "和風", "屋台の灯りを映す笑い面。にぎやかな任務によく似合う。"]],
    broom: [["straw_broom", "軒下ほうき", "道具", "竹の柄に藁を束ねたほうき。掃いた跡が細い道しるべになる。"], ["feather_duster", "羽根はたき", "道具", "軽い羽根のはたき。埃よりも眠気を払うのが得意。"], ["rain_mop", "雨上がりモップ", "道具", "水色の房を持つモップ。濡れた床に小さな虹を作る。"], ["garden_rake", "庭ならし熊手", "道具", "細い歯が並ぶ熊手。砂利の上に月形の線を残す。"]],
    bell: [["moon_bell", "月鈴", "和風", "小さな鈴の中に月色の音が入っている。鳴らすと夜が一拍だけ静まる。"], ["wind_chime", "涼風の風鈴", "和風", "透明な短冊が揺れる風鈴。風がなくても小さく鳴る。"], ["shrine_gong", "社の銅鈴", "和風", "古い社に掛かる銅鈴。重い音で迷いを追い払う。"], ["twin_cymbals", "双子の小鉦", "楽器", "二枚でひと組の小さな鉦。合わせると星が一粒跳ねる。"]],
    lantern: [["paper_lantern", "紙あかり提灯", "和風", "赤い紙に星形の窓がある提灯。風に揺れても火は四角く残る。"], ["night_candle", "夜番ろうそく", "道具", "青い芯のろうそく。短い炎が足元だけを正確に照らす。"], ["firefly_jar", "蛍入り小瓶", "自然", "蛍の光を閉じ込めた瓶。振らなくても淡く瞬く。"], ["moon_lamp", "欠け月ランプ", "宇宙", "欠けた月の形をしたランプ。暗いほど輪郭が澄む。"]],
    origami: [["origami_crane", "折り鶴の守り", "和風", "一枚紙で折られた鶴の守り。角の折り目がよく効く。"], ["paper_boat", "小舟折り紙", "和風", "水に浮かべると進む方向を自分で選ぶ折り紙。"], ["origami_kabuto", "折り紙かぶと", "和風", "小さな兜の折り紙。頭ではなく勇気にかぶせる。"], ["origami_butterfly", "紙蝶", "自然", "二色の羽を持つ折り紙の蝶。開いたまま静かに飛びたがる。"]],
    charm: [["green_omamori", "若葉お守り", "和風", "若葉色の布に結び紐を通したお守り。転ぶ前に袖を引く。"], ["ema_plaque", "小さな絵馬", "和風", "願いを書いた小さな絵馬。裏側に別の願いが隠れている。"], ["rainbow_knot", "虹組紐", "アクセサリー", "色の違う紐を結んだ飾り。ほどけそうでほどけない。"], ["seal_tag", "封じ札", "巻物", "細い紙に印を押した札。近づくと墨が少し濃くなる。"]],
    tea: [["tea_whisk", "茶筅の小枝", "和風", "竹の先を細く割った茶筅。泡立つ音で集中が戻る。"], ["matcha_bowl", "抹茶椀", "飲み物", "泡立つ緑の椀。飲むと気持ちがきれいに正座する。"], ["star_teapot", "星急須", "飲み物", "注ぎ口に星飾りのある急須。最後の一滴だけよく光る。"], ["bamboo_scoop", "竹茶杓", "和風", "細く削った茶杓。すくうたびに香りが整う。"]],
    wagashi: [["tri_dango", "三色だんご串", "和菓子", "桃、白、若草の団子が並ぶ串。見た目よりずっと腹持ちする。"], ["taiyaki_coin", "小判たい焼き", "和菓子", "小判みたいに丸い尾を持つたい焼き。片面だけよく焼けている。"], ["matcha_manju", "抹茶まんじゅう", "和菓子", "抹茶の印が押された丸いまんじゅう。割ると緑の香りが立つ。"], ["nerikiri_flower", "練り切り花", "和菓子", "花びらを一枚ずつ押した練り切り。小さいのに季節を持っている。"]],
    flower: [["red_camellia", "赤椿の留め具", "花", "濃い赤の椿をかたどった留め具。雪の中でもすぐ見つかる。"], ["yellow_tulip", "黄チューリップ灯", "花", "黄色いチューリップの形をした小灯。朝だけ少し明るくなる。"], ["lotus_drop", "蓮つゆの珠", "自然", "蓮の葉に残った朝露の珠。転がしても濡れない。"], ["hydrangea_cluster", "紫陽花クラスタ", "花", "小さな花が集まった紫陽花の房。雨音をしまっている。"]],
    nature: [["maple_pin", "紅葉ピン", "自然", "五つに分かれた紅葉のピン。風向きが変わると少し震える。"], ["pinecone_charm", "松ぼっくり守り", "自然", "鱗が重なる小さな守り。拾った場所をよく覚えている。"], ["coral_branch", "珊瑚枝のかけら", "自然", "海底から届いた赤い枝。乾いても波の形を忘れない。"], ["blue_starfish", "青ヒトデ札", "自然", "星型の青いヒトデを模した札。裏側に潮の地図がある。"]],
    ore: [["moss_stone", "苔むす小石", "自然", "丸い石に苔が乗っている。投げるより置くほうが似合う。"], ["gold_ore", "金鉱石の欠片", "自然", "黒い岩肌に金が走る欠片。重さより輝きが先に来る。"], ["ice_pebble", "氷粒石", "自然", "透き通った小石。手のひらで溶けず、少しだけ空を映す。"], ["crystal_cluster", "結晶群", "自然", "大小の結晶が肩を寄せるかけら。暗い棚でも存在感がある。"]],
    weather: [["rain_cloud_pin", "雨雲ピン", "自然", "雨粒を三つ抱えた雲のピン。曇りの日ほど機嫌がいい。"], ["thunder_seed", "雷種", "自然", "殻の中で小さな稲妻が眠る種。植える場所は選んだほうがいい。"], ["rain_umbrella", "雨待ち傘", "道具", "水色の傘。開くと地面の音が少しやわらぐ。"], ["snowflake_mark", "雪印の欠片", "自然", "六方向に伸びた雪の印。手の中でも形を崩さない。"]],
    sweet: [["candy_cane", "しましまキャンディ杖", "お菓子", "赤と白の縞が曲がったキャンディ。先端で小さな合図ができる。"], ["cotton_candy_blue", "青い綿飴雲", "お菓子", "割り箸の上で雲みたいに膨らむ綿飴。空腹より先に消える。"], ["melon_jelly", "メロンゼリー杯", "お菓子", "脚付きの器に入った緑のゼリー。揺れ方だけは勇敢。"], ["cocoa_cookie_house", "ココア小屋クッキー", "お菓子", "小さな家の形をしたクッキー。屋根の砂糖が雪のように残る。"]],
    drink: [["ramune_bottle", "星栓ラムネ", "飲み物", "青い瓶に星型のビー玉が入ったラムネ。栓を抜く音が涼しい。"], ["masu_sake", "枡酒ひとくち", "飲み物", "木の枡に月色の酒を注いだもの。角がきりっと冷えている。"], ["tropical_blue", "青花トロピカル", "飲み物", "青いジュースに花飾りを添えた一杯。忍ぶには少し派手。"], ["boba_milk_tea", "黒珠ミルクティー", "飲み物", "底に黒い珠が並ぶミルクティー。吸い上げるたび元気が来る。"]],
    space: [["mini_rocket", "豆粒ロケット", "宇宙", "机の上から飛び立ちそうな豆粒ロケット。進行方向だけは立派。"], ["ring_planet", "小さな環の星", "宇宙", "輪を持つ小さな惑星。回すと机の上で昼夜が入れ替わる。"], ["silver_comet", "銀尾の彗星", "宇宙", "銀色の尾を引く小さな彗星。願い事を一つだけ急がせる。"], ["tin_satellite", "ブリキ衛星", "宇宙", "古いブリキの衛星模型。アンテナだけ妙に元気がいい。"]],
    toy: [["gacha_capsule", "赤青ガチャ玉", "ホビー", "半分赤く半分青いカプセル。中身より回した音が楽しい。"], ["wood_kendama", "祭りけん玉", "ホビー", "赤い玉と木の皿のけん玉。成功した音だけよく響く。"], ["red_kite", "花凧", "ホビー", "花印のついた赤い凧。風を捕まえるより風に誘われる。"], ["ivory_dice", "象牙サイコロ", "ホビー", "角の丸いサイコロ。出目より転がり方が気まぐれ。"]],
    accessory: [["pearl_ring", "真珠リング", "アクセサリー", "小粒の真珠を留めた指輪。月明かりだけをよく拾う。"], ["pearl_necklace", "三粒ネックレス", "アクセサリー", "三つの真珠がずれて並ぶ首飾り。歩くたび月が揺れる。"], ["rose_hairpin", "薔薇かんざし", "アクセサリー", "赤い花を添えたかんざし。髪より先に視線を結ぶ。"], ["blue_brooch", "青晶ブローチ", "アクセサリー", "青い結晶をはめたブローチ。服の上で小さな空になる。"]],
    tech: [["holo_constellation", "星座ホロカード", "宇宙", "角度で星座が変わるカード。読むには少し首をかしげる。"], ["solar_tile", "太陽パネル札", "宇宙", "小さな太陽電池の札。光を受けると縁だけ金色になる。"], ["rusty_data_chip", "錆びたデータチップ", "機械", "古い記録媒体。読み込むと半分だけ消えた地図が出てくる。"], ["plasma_battery", "プラズマ電池", "機械", "紫の電光が跳ねる電池。触れると気合いまで立つ。"]],
    container: [["lacquer_chest", "漆塗り小箱", "宝箱", "黒と赤の小箱。開ける前から大事そうな音がする。"], ["festival_gift", "祭り包み", "宝物", "金の帯で結ばれた包み。ほどく前から屋台の匂いがする。"], ["amaterasu_capsule", "天照カプセル", "宇宙", "光の粒を封じた透明カプセル。開けると影が一歩退く。"], ["travel_pouch", "旅布ポーチ", "道具", "紐で閉じる小さなポーチ。底にまだ知らない道が残っている。"]],
    key: [["sky_key", "空色の鍵", "鍵", "雲の形をした鍵。扉より窓に反応しやすい。"], ["star_key", "星門の鍵", "鍵", "丸い門の印を持つ鍵。開く場所ではなく距離を短くする。"], ["gear_key", "歯車鍵", "鍵", "歯車の軸に似た鍵。回すと小さな機械音が返る。"], ["blossom_key", "花印の鍵", "鍵", "花弁の飾りがついた鍵。春にだけ素直に回る。"]],
    food: [["night_onigiri", "夜塩おにぎり", "食べ物", "黒海苔を巻いた小さなおにぎり。夜道でも形がはっきりしている。"], ["salmon_sushi", "星鮭にぎり", "食べ物", "星粒のような脂が光る鮭のにぎり。皿の上で少し冷たい。"], ["festival_burger", "屋台バーガー", "食べ物", "黄色いソースがはみ出す小さなバーガー。元気だけは大盛り。"], ["dream_bento", "夢見の弁当箱", "食べ物", "開けるたび中身が少し変わる弁当。最後に残るおかずだけが本音らしい。"]],
    instrument: [["bamboo_flute", "竹笛", "楽器", "節の残る短い笛。吹くと風が一筋だけ進む。"], ["festival_drum", "祭り太鼓", "楽器", "小さな太鼓。叩く前から肩が少し弾む。"], ["blue_music_note", "青い音符", "楽器", "水色の音符を閉じ込めた飾り。触れると一音だけ鳴る。"], ["moon_shamisen", "月三味線", "楽器", "細い弦に月光を張った三味線。夜だけ音が丸くなる。"]]
  };
  const whiteSlateDefinitions = [];
  for (let variant = 0; variant < 4; variant += 1) {
    for (const family of whiteSlateFamilies) {
      const [id, name, kind, flavor] = whiteSlateCatalog[family][variant];
      const index = whiteSlateDefinitions.length;
      const rarity = index < 50 ? "common" : index < 80 ? "uncommon" : index < 95 ? "rare" : "epic";
      whiteSlateDefinitions.push({ id, name, rarity, kind, flavor });
    }
  }

  function makeWhiteSlateItemSprite(item, index) {
    const rows = Array.from({ length: WHITE_SLATE_ICON_SIZE }, () => Array(WHITE_SLATE_ICON_SIZE).fill("."));
    const colors = whiteSlatePaletteSets[index % whiteSlatePaletteSets.length];
    const family = whiteSlateFamilies[index % whiteSlateFamilies.length];
    const variant = Math.floor(index / whiteSlateFamilies.length) % 4;
    const p = (x, y, key) => {
      x = Math.round(x); y = Math.round(y);
      if (x >= 0 && x < WHITE_SLATE_ICON_SIZE && y >= 0 && y < WHITE_SLATE_ICON_SIZE) rows[y][x] = key;
    };
    const rect = (x, y, w, h, key) => {
      for (let yy = y; yy < y + h; yy += 1) for (let xx = x; xx < x + w; xx += 1) p(xx, yy, key);
    };
    const line = (x1, y1, x2, y2, key) => {
      const steps = Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1), 1);
      for (let i = 0; i <= steps; i += 1) p(x1 + (x2 - x1) * i / steps, y1 + (y2 - y1) * i / steps, key);
    };
    const diamond = (cx, cy, r, key) => {
      for (let y = -r; y <= r; y += 1) {
        const span = r - Math.abs(y);
        for (let x = -span; x <= span; x += 1) p(cx + x, cy + y, key);
      }
    };
    const ellipse = (cx, cy, rx, ry, key) => {
      for (let y = -ry; y <= ry; y += 1) {
        for (let x = -rx; x <= rx; x += 1) {
          if ((x * x) / (rx * rx) + (y * y) / (ry * ry) <= 1) p(cx + x, cy + y, key);
        }
      }
    };
    const sparkle = (x, y, key = "y") => {
      p(x, y, key); p(x - 1, y, "z"); p(x + 1, y, "z"); p(x, y - 1, "z"); p(x, y + 1, "z");
    };
    const erase = (x, y, w, h) => rect(x, y, w, h, ".");
    const t = { p, rect, line, diamond, ellipse, sparkle, erase };
    drawWhiteSlateFamily(t, family, variant, index);
    outlineWhiteSlate(rows);
    drawWhiteSlateDetails(t, family, variant, item.rarity, index);
    const palette = {
      k: "#050506",
      d: colors[0],
      m: colors[1],
      l: colors[2],
      h: colors[3],
      w: "#ffffff",
      x: colors[4],
      a: colors[5],
      b: "#ffe05c",
      c: "#6de6ff",
      e: "#53f29b",
      f: "#ff7bd5",
      g: "#8e6cff",
      n: "#243041",
      r: "#ff304f",
      s: "#7a441f",
      y: "#ffd84d",
      z: "#ffffff"
    };
    item.palette = palette;
    return rows.map((row) => Array.from({ length: WHITE_SLATE_ICON_SIZE }, (_, i) => row[i] || ".").join(""));
  }

  function outlineWhiteSlate(rows) {
    const copy = rows.map((row) => row.slice());
    for (let y = 0; y < WHITE_SLATE_ICON_SIZE; y += 1) {
      for (let x = 0; x < WHITE_SLATE_ICON_SIZE; x += 1) {
        if (copy[y][x] === ".") continue;
        for (const [dx, dy] of [[0, -1], [1, 0], [0, 1], [-1, 0]]) {
          const ox = x + dx;
          const oy = y + dy;
          if (ox >= 0 && ox < WHITE_SLATE_ICON_SIZE && oy >= 0 && oy < WHITE_SLATE_ICON_SIZE && rows[oy][ox] === ".") rows[oy][ox] = "k";
        }
      }
    }
  }

  function drawWhiteSlateFamily(t, family, v, index) {
    const { p, rect, line, diamond, ellipse, sparkle, erase } = t;
    switch (family) {
      case "weapon":
        if (v === 0) { line(24, 4, 9, 24, "l"); line(23, 4, 8, 24, "m"); rect(6, 23, 9, 3, "s"); diamond(24, 4, 3, "c"); }
        if (v === 1) { line(24, 3, 7, 24, "w"); line(23, 4, 6, 25, "l"); rect(6, 23, 11, 3, "x"); rect(4, 26, 8, 3, "s"); }
        if (v === 2) { line(16, 3, 16, 27, "s"); diamond(16, 5, 5, "l"); line(11, 12, 21, 12, "x"); rect(14, 23, 4, 6, "d"); }
        if (v === 3) { line(9, 25, 23, 7, "s"); diamond(22, 8, 6, "l"); erase(20, 11, 5, 4); rect(7, 24, 8, 3, "x"); }
        break;
      case "star":
        if (v === 0) { line(16, 3, 16, 29, "m"); line(3, 16, 29, 16, "m"); line(7, 7, 25, 25, "l"); line(25, 7, 7, 25, "h"); diamond(16, 16, 4, "d"); }
        if (v === 1) { for (let i = 0; i < 4; i += 1) line(16, 16, i % 2 ? 28 : 4, i < 2 ? 8 : 24, i % 2 ? "h" : "m"); diamond(16, 16, 5, "x"); }
        if (v === 2) { diamond(16, 16, 12, "l"); diamond(16, 16, 8, "m"); rect(15, 3, 2, 26, "x"); rect(3, 15, 26, 2, "x"); }
        if (v === 3) { line(16, 3, 21, 15, "g"); line(21, 15, 29, 16, "g"); line(16, 29, 21, 17, "f"); line(3, 16, 15, 11, "c"); diamond(16, 16, 5, "d"); }
        break;
      case "scroll":
        if (v === 0) { rect(7, 8, 18, 15, "w"); rect(5, 7, 5, 17, "s"); rect(22, 7, 5, 17, "s"); line(11, 12, 21, 12, "h"); line(11, 17, 19, 17, "c"); }
        if (v === 1) { rect(11, 5, 10, 23, "w"); rect(9, 7, 14, 4, "r"); line(13, 14, 19, 14, "k"); line(13, 18, 19, 18, "h"); diamond(16, 23, 3, "x"); }
        if (v === 2) { rect(7, 8, 9, 18, "m"); rect(16, 8, 9, 18, "l"); rect(15, 8, 2, 18, "d"); line(9, 12, 14, 12, "w"); line(18, 14, 23, 14, "h"); }
        if (v === 3) { diamond(16, 16, 12, "w"); line(7, 16, 25, 16, "h"); line(16, 6, 16, 27, "c"); p(11, 11, "m"); p(22, 21, "x"); }
        break;
      case "mask":
        if (v === 0) { ellipse(16, 14, 11, 8, "w"); rect(8, 12, 5, 3, "k"); rect(19, 12, 5, 3, "k"); line(11, 8, 7, 4, "h"); line(21, 8, 25, 4, "h"); rect(14, 18, 5, 2, "r"); }
        if (v === 1) { ellipse(16, 16, 10, 10, "r"); diamond(10, 8, 3, "x"); diamond(22, 8, 3, "x"); rect(10, 15, 4, 3, "k"); rect(19, 15, 4, 3, "k"); rect(13, 23, 7, 2, "w"); }
        if (v === 2) { ellipse(16, 16, 10, 10, "l"); erase(9, 7, 8, 20); rect(18, 12, 4, 3, "k"); rect(17, 20, 6, 2, "h"); line(20, 8, 24, 5, "x"); }
        if (v === 3) { ellipse(16, 15, 11, 8, "w"); line(8, 13, 24, 13, "r"); rect(11, 15, 3, 3, "k"); rect(20, 15, 3, 3, "k"); rect(14, 20, 6, 2, "f"); }
        break;
      case "broom":
        if (v === 0) { line(13, 4, 13, 28, "s"); line(18, 4, 18, 28, "s"); for (let i = 0; i < 8; i += 1) line(10 + i, 14, 5 + i, 30, i % 2 ? "m" : "l"); rect(9, 12, 12, 3, "x"); }
        if (v === 1) { line(10, 6, 23, 26, "s"); ellipse(8, 5, 7, 4, "w"); ellipse(11, 8, 7, 4, "l"); line(7, 6, 2, 10, "c"); }
        if (v === 2) { rect(14, 4, 4, 23, "s"); rect(9, 22, 14, 5, "w"); for (let i = 0; i < 7; i += 1) line(10 + i * 2, 22, 8 + i * 2, 29, "c"); }
        if (v === 3) { line(16, 4, 16, 28, "s"); for (let i = 0; i < 7; i += 1) line(8 + i * 3, 11, 16, 18, "l"); rect(7, 10, 20, 3, "m"); }
        break;
      case "bell":
        if (v === 0) { ellipse(16, 17, 8, 8, "m"); rect(12, 8, 8, 9, "l"); rect(10, 23, 12, 3, "d"); diamond(16, 17, 2, "k"); }
        if (v === 1) { rect(13, 6, 6, 18, "c"); rect(10, 5, 12, 3, "w"); line(11, 24, 8, 29, "x"); line(21, 24, 24, 29, "x"); diamond(16, 22, 3, "h"); }
        if (v === 2) { ellipse(16, 16, 10, 7, "x"); ellipse(16, 14, 7, 5, "m"); rect(13, 7, 6, 5, "s"); line(8, 23, 24, 23, "d"); }
        if (v === 3) { ellipse(11, 16, 7, 7, "x"); ellipse(21, 16, 7, 7, "x"); rect(14, 15, 4, 3, "s"); line(7, 24, 25, 24, "d"); }
        break;
      case "lantern":
        if (v === 0) { rect(10, 8, 12, 17, "r"); rect(12, 6, 8, 3, "d"); rect(12, 13, 8, 6, "w"); rect(14, 15, 4, 3, "x"); }
        if (v === 1) { rect(14, 9, 4, 15, "y"); ellipse(16, 9, 5, 5, "h"); rect(11, 24, 10, 3, "s"); line(12, 6, 20, 6, "w"); }
        if (v === 2) { rect(10, 8, 12, 16, "c"); rect(11, 9, 10, 13, "w"); for (const q of [[14, 13], [17, 17], [13, 20]]) sparkle(q[0], q[1], "y"); }
        if (v === 3) { ellipse(16, 15, 10, 10, "l"); erase(9, 7, 8, 20); rect(12, 24, 8, 3, "s"); sparkle(20, 10, "x"); }
        break;
      case "origami":
        if (v === 0) { diamond(15, 15, 9, "c"); line(7, 15, 2, 10, "w"); line(22, 15, 29, 9, "l"); line(16, 20, 16, 28, "d"); }
        if (v === 1) { diamond(16, 19, 11, "m"); erase(5, 9, 22, 9); line(7, 19, 25, 19, "w"); line(16, 8, 16, 26, "h"); }
        if (v === 2) { line(6, 20, 16, 7, "m"); line(26, 20, 16, 7, "l"); rect(8, 20, 16, 4, "d"); line(16, 7, 16, 24, "w"); }
        if (v === 3) { diamond(11, 14, 7, "f"); diamond(21, 14, 7, "c"); rect(15, 11, 3, 12, "d"); p(16, 9, "x"); }
        break;
      case "charm":
        if (v === 0) { rect(10, 8, 12, 18, "m"); line(10, 8, 16, 4, "l"); line(22, 8, 16, 4, "l"); line(12, 15, 20, 15, "x"); diamond(16, 19, 3, "w"); }
        if (v === 1) { rect(8, 10, 16, 13, "s"); line(8, 10, 16, 6, "s"); line(24, 10, 16, 6, "s"); rect(11, 13, 10, 5, "w"); line(16, 23, 16, 29, "r"); }
        if (v === 2) { line(9, 10, 23, 24, "f"); line(23, 10, 9, 24, "c"); ellipse(16, 17, 6, 6, "x"); ellipse(16, 17, 3, 3, "w"); }
        if (v === 3) { rect(11, 7, 10, 20, "w"); rect(12, 9, 8, 4, "r"); line(13, 16, 19, 16, "k"); line(13, 20, 19, 20, "h"); }
        break;
      case "tea":
        if (v === 0) { rect(9, 6, 14, 3, "s"); for (let i = 0; i < 9; i += 1) line(11 + i, 8, 8 + i, 28, i % 2 ? "l" : "m"); rect(8, 26, 16, 2, "h"); }
        if (v === 1) { ellipse(16, 17, 11, 6, "s"); ellipse(16, 14, 9, 4, "e"); ellipse(16, 21, 8, 3, "d"); }
        if (v === 2) { ellipse(16, 17, 10, 7, "m"); rect(12, 8, 8, 8, "l"); ellipse(24, 16, 4, 5, "m"); line(10, 9, 22, 9, "w"); }
        if (v === 3) { line(8, 26, 22, 6, "s"); rect(18, 6, 6, 3, "l"); rect(7, 24, 10, 3, "d"); p(21, 5, "w"); }
        break;
      case "wagashi":
        if (v === 0) { line(8, 27, 24, 7, "s"); ellipse(9, 24, 4, 4, "h"); ellipse(16, 16, 4, 4, "w"); ellipse(23, 8, 4, 4, "m"); }
        if (v === 1) { ellipse(15, 16, 10, 7, "m"); diamond(25, 16, 5, "l"); diamond(8, 16, 3, "d"); p(12, 13, "k"); line(14, 18, 20, 13, "h"); }
        if (v === 2) { ellipse(16, 17, 10, 8, "l"); rect(12, 10, 8, 4, "e"); line(13, 12, 19, 12, "w"); }
        if (v === 3) { for (let i = 0; i < 6; i += 1) diamond(16 + Math.round(Math.cos(i) * 7), 16 + Math.round(Math.sin(i) * 5), 4, i % 2 ? "m" : "l"); diamond(16, 16, 4, "x"); }
        break;
      case "flower":
        if (v === 0) { for (const q of [[16, 8], [10, 14], [22, 14], [12, 22], [20, 22]]) ellipse(q[0], q[1], 5, 4, "m"); diamond(16, 16, 4, "x"); line(16, 20, 16, 29, "e"); }
        if (v === 1) { ellipse(13, 13, 5, 9, "m"); ellipse(19, 13, 5, 9, "l"); diamond(16, 18, 5, "x"); line(16, 21, 16, 29, "e"); }
        if (v === 2) { ellipse(16, 19, 13, 6, "e"); ellipse(16, 12, 7, 4, "h"); ellipse(16, 12, 4, 2, "w"); line(8, 25, 24, 25, "d"); }
        if (v === 3) { for (let y = 9; y <= 21; y += 5) for (let x = 9; x <= 21; x += 5) diamond(x, y, 3, (x + y) % 2 ? "g" : "c"); line(15, 22, 14, 29, "e"); }
        break;
      case "nature":
        if (v === 0) { for (let i = 0; i < 5; i += 1) line(16, 18, 7 + i * 4, 6 + (i % 2) * 5, "m"); line(16, 18, 16, 29, "s"); diamond(16, 18, 4, "x"); }
        if (v === 1) { for (let y = 8; y < 24; y += 4) ellipse(16, y, 6 + y / 5, 3, y % 8 ? "m" : "l"); rect(14, 20, 4, 9, "s"); }
        if (v === 2) { line(16, 26, 16, 8, "m"); line(16, 18, 8, 10, "l"); line(16, 17, 24, 9, "h"); line(16, 21, 7, 18, "l"); line(16, 21, 25, 18, "m"); }
        if (v === 3) { for (let i = 0; i < 5; i += 1) line(16, 16, 16 + Math.round(Math.cos(i * 1.25) * 10), 16 + Math.round(Math.sin(i * 1.25) * 10), "m"); diamond(16, 16, 7, "c"); }
        break;
      case "ore":
        if (v === 0) { diamond(16, 18, 10, "d"); diamond(13, 15, 5, "m"); rect(12, 11, 9, 4, "e"); }
        if (v === 1) { diamond(16, 17, 11, "d"); line(9, 19, 23, 11, "y"); line(11, 23, 20, 9, "y"); diamond(19, 12, 3, "w"); }
        if (v === 2) { diamond(16, 16, 12, "c"); diamond(16, 14, 8, "w"); line(11, 22, 23, 9, "g"); }
        if (v === 3) { diamond(10, 20, 6, "m"); diamond(17, 15, 8, "c"); diamond(23, 21, 5, "g"); sparkle(18, 11, "z"); }
        break;
      case "weather":
        if (v === 0) { ellipse(14, 14, 9, 6, "l"); ellipse(22, 15, 7, 5, "l"); for (const x of [10, 16, 22]) line(x, 22, x - 2, 28, "c"); }
        if (v === 1) { ellipse(15, 14, 9, 6, "g"); line(18, 7, 11, 18, "y"); line(18, 7, 21, 16, "y"); line(21, 16, 14, 28, "y"); }
        if (v === 2) { line(16, 7, 7, 25, "s"); line(16, 7, 25, 25, "s"); ellipse(16, 25, 10, 4, "c"); rect(15, 6, 3, 19, "h"); }
        if (v === 3) { line(16, 5, 16, 27, "c"); line(5, 16, 27, 16, "c"); line(8, 8, 24, 24, "w"); line(24, 8, 8, 24, "w"); diamond(16, 16, 3, "l"); }
        break;
      case "sweet":
        if (v === 0) { line(10, 28, 22, 7, "w"); line(11, 28, 23, 7, "r"); ellipse(23, 7, 4, 4, "r"); }
        if (v === 1) { ellipse(16, 13, 11, 9, "l"); ellipse(13, 13, 6, 5, "m"); rect(14, 21, 4, 9, "s"); }
        if (v === 2) { rect(9, 12, 14, 12, "m"); rect(10, 10, 12, 3, "l"); rect(11, 19, 10, 4, "w"); }
        if (v === 3) { rect(8, 13, 16, 11, "m"); line(8, 13, 16, 6, "l"); line(24, 13, 16, 6, "l"); rect(12, 18, 8, 5, "w"); }
        break;
      case "drink":
        if (v === 0) { rect(12, 5, 8, 21, "c"); rect(13, 3, 6, 4, "w"); rect(13, 14, 6, 5, "h"); p(18, 10, "z"); }
        if (v === 1) { rect(8, 16, 16, 10, "s"); rect(10, 13, 12, 4, "l"); rect(12, 11, 8, 3, "w"); p(16, 11, "c"); }
        if (v === 2) { rect(10, 12, 13, 13, "c"); line(21, 5, 18, 14, "w"); ellipse(11, 10, 5, 4, "f"); p(20, 16, "y"); }
        if (v === 3) { rect(10, 9, 12, 16, "l"); rect(11, 11, 10, 8, "m"); for (const x of [12, 15, 18]) p(x, 22, "k"); line(21, 5, 18, 12, "c"); }
        break;
      case "space":
        if (v === 0) { rect(14, 6, 5, 15, "w"); diamond(16, 4, 4, "h"); rect(11, 17, 4, 7, "r"); rect(18, 17, 4, 7, "c"); p(16, 26, "y"); }
        if (v === 1) { ellipse(16, 16, 9, 8, "g"); line(5, 20, 27, 12, "y"); line(6, 21, 26, 13, "w"); p(13, 12, "z"); }
        if (v === 2) { diamond(22, 10, 5, "w"); line(19, 13, 6, 26, "c"); line(20, 15, 8, 28, "y"); sparkle(24, 8, "z"); }
        if (v === 3) { rect(13, 10, 7, 8, "l"); line(10, 7, 13, 11, "w"); line(20, 11, 25, 7, "w"); rect(8, 20, 16, 3, "c"); p(16, 14, "z"); }
        break;
      case "toy":
        if (v === 0) { ellipse(16, 13, 10, 9, "c"); rect(7, 15, 18, 8, "r"); rect(9, 13, 14, 3, "w"); }
        if (v === 1) { ellipse(16, 8, 6, 6, "r"); line(16, 14, 16, 27, "s"); rect(8, 15, 16, 4, "h"); rect(8, 15, 3, 10, "l"); rect(21, 15, 3, 10, "l"); }
        if (v === 2) { rect(8, 9, 16, 13, "r"); diamond(16, 15, 5, "y"); line(16, 22, 12, 30, "w"); line(16, 22, 20, 30, "w"); }
        if (v === 3) { rect(9, 9, 14, 14, "w"); for (const q of [[13, 13], [18, 13], [16, 16], [13, 19], [18, 19]]) p(q[0], q[1], "k"); }
        break;
      case "accessory":
        if (v === 0) { ellipse(16, 17, 10, 9, "y"); ellipse(16, 17, 6, 5, "."); diamond(16, 10, 4, "w"); }
        if (v === 1) { for (let i = 0; i < 7; i += 1) ellipse(8 + i * 3, 16 + Math.round(Math.sin(i) * 4), 2, 2, "w"); rect(14, 22, 4, 3, "y"); }
        if (v === 2) { line(9, 26, 23, 8, "y"); for (const q of [[19, 10], [22, 12], [18, 14]]) ellipse(q[0], q[1], 4, 3, "r"); line(17, 16, 12, 22, "e"); }
        if (v === 3) { diamond(16, 13, 8, "c"); diamond(16, 13, 5, "w"); rect(9, 23, 14, 3, "y"); }
        break;
      case "tech":
        if (v === 0) { rect(8, 7, 16, 18, "g"); rect(10, 9, 12, 12, "c"); for (const q of [[12, 12], [17, 14], [20, 18]]) sparkle(q[0], q[1], "z"); }
        if (v === 1) { rect(6, 10, 20, 12, "d"); for (let i = 0; i < 4; i += 1) rect(8 + i * 4, 12, 3, 8, i % 2 ? "c" : "l"); line(6, 22, 26, 22, "y"); }
        if (v === 2) { rect(9, 8, 14, 17, "n"); rect(11, 10, 10, 13, "m"); rect(7, 12, 2, 3, "h"); rect(23, 16, 2, 3, "h"); p(16, 16, "z"); }
        if (v === 3) { rect(7, 10, 18, 12, "d"); rect(9, 12, 14, 8, "c"); line(7, 22, 25, 22, "y"); line(16, 7, 16, 25, "w"); }
        break;
      case "container":
        if (v === 0) { rect(7, 13, 18, 12, "m"); rect(8, 10, 16, 5, "r"); rect(14, 12, 4, 13, "y"); rect(14, 17, 4, 4, "d"); }
        if (v === 1) { rect(8, 12, 16, 14, "r"); rect(6, 10, 20, 5, "y"); rect(14, 8, 4, 18, "y"); rect(11, 6, 10, 4, "f"); }
        if (v === 2) { ellipse(16, 16, 10, 13, "c"); ellipse(16, 14, 7, 9, "w"); rect(10, 17, 12, 5, "f"); sparkle(16, 11, "z"); }
        if (v === 3) { rect(9, 10, 14, 16, "m"); line(9, 10, 16, 5, "l"); line(23, 10, 16, 5, "l"); rect(12, 18, 8, 3, "x"); }
        break;
      case "key":
        if (v === 0) { ellipse(10, 14, 6, 6, "c"); ellipse(10, 14, 3, 3, "."); rect(15, 13, 11, 3, "h"); rect(24, 16, 2, 5, "y"); }
        if (v === 1) { diamond(9, 13, 6, "y"); diamond(9, 13, 3, "."); rect(14, 12, 12, 3, "c"); diamond(25, 15, 3, "h"); }
        if (v === 2) { ellipse(10, 14, 6, 6, "s"); ellipse(10, 14, 2, 2, "."); line(15, 14, 27, 22, "m"); rect(22, 20, 3, 5, "x"); }
        if (v === 3) { for (const q of [[8, 13], [11, 10], [11, 16]]) diamond(q[0], q[1], 3, "f"); rect(14, 12, 12, 3, "y"); rect(23, 15, 2, 4, "h"); }
        break;
      case "food":
        if (v === 0) { diamond(16, 15, 10, "w"); rect(12, 17, 8, 7, "d"); p(13, 11, "x"); }
        if (v === 1) { rect(7, 17, 18, 5, "w"); rect(9, 12, 14, 5, "m"); rect(9, 22, 14, 3, "d"); p(21, 13, "x"); }
        if (v === 2) { ellipse(16, 11, 10, 4, "l"); rect(7, 13, 18, 4, "m"); rect(8, 18, 16, 3, "e"); rect(7, 22, 18, 3, "d"); }
        if (v === 3) { rect(8, 11, 16, 13, "d"); rect(10, 13, 6, 4, "w"); rect(17, 13, 5, 4, "m"); rect(10, 18, 12, 4, "h"); }
        break;
      case "instrument":
        if (v === 0) { line(8, 25, 24, 7, "s"); rect(20, 5, 5, 4, "l"); rect(7, 24, 8, 3, "d"); p(16, 15, "w"); }
        if (v === 1) { ellipse(16, 17, 9, 8, "s"); ellipse(16, 17, 6, 5, "w"); rect(11, 7, 10, 4, "m"); line(10, 25, 22, 25, "d"); }
        if (v === 2) { line(14, 5, 14, 25, "c"); ellipse(18, 24, 6, 4, "c"); rect(18, 20, 5, 3, "h"); }
        if (v === 3) { rect(12, 8, 8, 17, "s"); ellipse(16, 23, 8, 5, "m"); line(9, 9, 23, 9, "w"); line(10, 13, 22, 13, "w"); }
        break;
    }
  }

  function drawWhiteSlateDetails(t, family, v, rarity, index) {
    const { p, rect, line, sparkle } = t;
    if (family === "space" || family === "tech") sparkle(5 + (index % 4), 6 + (v * 2), "y");
    if (family === "flower" || family === "nature") { line(5, 28, 10, 25, "e"); p(24, 27, "e"); }
    if (family === "sweet" || family === "drink") { p(10, 9, "z"); p(22, 20, "w"); }
    if (family === "weapon" || family === "star") p(26, 7 + v, "c");
    if (rarity === "rare" || rarity === "epic") { sparkle(27, 6, rarity === "epic" ? "f" : "c"); p(4, 10, "y"); }
    if (rarity === "epic") { sparkle(5, 26, "y"); sparkle(26, 26, "f"); }
    rect(2 + (index % 3), 30, 2, 1, "k");
  }

  function makeItemIcon(item, index) {
    return makeWhiteSlateItemSprite(item, index);
  }

  function createItems() {
    return whiteSlateDefinitions.map((item, index) => {
      const palette = makePalette(item.palette);
      const iconItem = { ...item, palette };
      const icon = makeItemIcon(iconItem, index);
      return {
        ...item,
        palette: iconItem.palette,
        icon
      };
    });
  }

  function createCatalogData() {
    return {
      items: createItems(),
      rarityMeta,
      rarityOrder
    };
  }

  return {
    rarityMeta,
    rarityOrder,
    definitions: whiteSlateDefinitions,
    createItems,
    createCatalogData
  };
});
