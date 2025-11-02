var muteFlag = true;
//おみくじを引くをクリック
function FortuneSlip() {
  let kuji = document.querySelector("#omikuji");
  kuji.setAttribute("visible", "false");
  kuji.setAttribute("src", ""); //おみくじリセット
  let box = document.querySelector("#box");
  box.setAttribute("visible", "true");
  document.querySelector("#s_shuffle").components.sound.playSound();
  box.setAttribute("animation-mixer", ""); //おみくじ入れを振る
  setTimeout(() => {
    //6.5秒後おみくじ入れ移動の効果音
    document.querySelector("#s_move").components.sound.playSound();
  }, 6500);
  let horse = document.querySelector("#mascot");
  setTimeout(() => {
    //8秒後おみくじ入れを非表示馬表示
    box.setAttribute("visible", "false");
    box.removeAttribute("animation-mixer");
    horse.setAttribute("visible", "true");
    document.querySelector("#s_run").components.sound.playSound();
    HorseStart();
  }, 8500);
}
//馬スタート
function HorseStart() {
  let btb = document.querySelector("#button_bk");
  let kuji = document.querySelector("#omikuji");
  let horse = document.querySelector("#mascot");
  let srun = document.querySelector("#s_run");
  //馬移動
  var horseMove = function () {
    let horsePos = horse.getAttribute("position");
    if (horsePos.z > -3) {
      //馬が近づいたらおみくじ表示
      var string = Omikuji();
      horse.setAttribute("visible", "false");
      horse.setAttribute("position", { x: 0, y: -3, z: -30 });
      if (srun.components.sound.isPlaying) {
        srun.components.sound.stopSound();
      }
      document.querySelector("#s_disp").components.sound.playSound();
      kuji.setAttribute("src", string);
      kuji.setAttribute("visible", "true");
      btb.setAttribute("visible", "true");
      clearInterval(moveOn);
    } else {
      horse.setAttribute("position", {
        x: horsePos.x,
        y: horsePos.y,
        z: horsePos.z + 1,
      });
    }
  };
  var moveOn = setInterval(horseMove, 100);
}
//おみくじを決める
function Omikuji() {
  let randomInteger = Math.floor(Math.random() * 100);
  console.log(randomInteger);
  if (randomInteger == 0) {
    return "#daikyou";
  } else if (randomInteger >= 1 && randomInteger <= 4) {
    return "#kyou";
  } else if (randomInteger >= 5 && randomInteger <= 14) {
    return "#suekichi";
  } else if (randomInteger >= 15 && randomInteger <= 34) {
    return "#kichi";
  } else if (randomInteger >= 35 && randomInteger <= 54) {
    return "#syoukichi";
  } else if (randomInteger >= 55 && randomInteger <= 74) {
    return "#chuukichi";
  } else {
    return "#daikichi";
  }
}

//ミュート
function Mute() {
  let ssea = document.querySelector("#s_sea");
  let spush = document.querySelector("#s_push");
  let sshuffle = document.querySelector("#s_shuffle");
  let smove = document.querySelector("#s_move");
  let srun = document.querySelector("#s_run");
  let sdisp = document.querySelector("#s_disp");
  ssea.setAttribute("volume", "0");
  spush.setAttribute("volume", "0");
  sshuffle.setAttribute("volume", "0");
  smove.setAttribute("volume", "0");
  srun.setAttribute("volume", "0");
  sdisp.setAttribute("volume", "0");
  document.querySelector("#s_sea").components.sound.pauseSound();
}

//ミュート解除
function UnMute() {
  let ssea = document.querySelector("#s_sea");
  let spush = document.querySelector("#s_push");
  let sshuffle = document.querySelector("#s_shuffle");
  let smove = document.querySelector("#s_move");
  let srun = document.querySelector("#s_run");
  let sdisp = document.querySelector("#s_disp");
  ssea.setAttribute("volume", "0.25");
  spush.setAttribute("volume", "0.8");
  sshuffle.setAttribute("volume", "0.8");
  smove.setAttribute("volume", "0.8");
  srun.setAttribute("volume", "0.8");
  sdisp.setAttribute("volume", "0.8");
  document.querySelector("#s_sea").components.sound.playSound();
}
