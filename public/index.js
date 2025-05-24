"use strict";

async function getData() {
  const res = await fetch("public/data.json");
  return res.json();
}

function insertScoreInDocument(nameField, value) {
  const line = document.getElementById(nameField.toLowerCase());
  const el = line.getElementsByClassName("score")[0].children[0];
  el.innerHTML = value;
}

function updateTotalScore(jsonData) {
  let score = jsonData.reduce(
    (acc, crrEl) => (acc + crrEl.score) / 2,
    jsonData[0].score,
  );
  score = Math.floor(score);

  insertScoreInDocument("total-score", score);
}

getData().then((data) => {
  function work() {
    updateTotalScore(data);
    data.map((el) => {
      insertScoreInDocument(el.category, el.score);
    });
  }

  if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", (_) => {
      work();
    });
  } else {
    work();
  }
});
