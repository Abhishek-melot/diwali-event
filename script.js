// Modal code.

const modal = document.getElementById("modal");

function showDialog() {
  // document.body.style.overflow="hidden"
  modal.showModal();
}

function closeDialog() {
  modal.close();
  // document.body.style.overflow="auto"
}

// User and talent tabs switching code.

const tabs = document.querySelectorAll(".tab");
const content = document.querySelectorAll(".tab-content");
console.log(tabs);
tabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => {
      t.classList.remove("active");
    });

    content.forEach((c, ci) => {
      if (i === ci) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    tab.classList.add("active");
  });
});

// Leaderboard section tab switch code

const tabs2 = document.querySelectorAll(".tab2");
const content2 = document.querySelectorAll(".tab-content");
console.log(tabs2);
tabs2.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs2.forEach((t) => {
      t.classList.remove("active");
    });

    content.forEach((c, ci) => {
      if (i === ci) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    tab.classList.add("active");
  });
});

// Schedule section tab switching code

const tabs1 = document.querySelectorAll(".tab1");
const scontent = document.querySelectorAll(".tab-schedule-content");
console.log(scontent);
tabs1.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    tabs1.forEach((t) => {
      t.classList.remove("active");
    });

    scontent.forEach((c, ci) => {
      if (i === ci) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });

    tab.classList.add("active");
  });
});

// Carousel code

let rewardData=[
    "User recieves total 25% of the beans pot.",
    "User recieves amazon gift card.",
    "User recieves a celebration theme.",
    "User recieves a fury profile theme.",
    "User recieves a Superstar profile badge.",
    "User recieves a web page mention.",
    "User recieves a Pk superstar theme.",
]

let leftArrow = document.querySelector(".left");
let rightArrow = document.querySelector(".right");
let rewardText=document.querySelector(".reward-text")
let prizes = document.querySelectorAll(".prizes");
let rewardContainer= document.querySelector('.rewards');
let currentId= +(rewardContainer.getAttribute("data-current"));
console.log(currentId)

rightArrow.addEventListener("click", () => {
  let currentPrize = document.querySelector(".prizes.active");

  if (
    currentPrize.nextElementSibling &&
    currentPrize.nextElementSibling.classList.contains("prizes")
  ) {
    console.log(currentPrize.nextElementSibling);
    currentPrize.nextElementSibling.classList.add("active");
    currentId+=1;
  } else {
    prizes[0].classList.add("active");
    currentId=0;
  }
  currentPrize.classList.remove("active");
  rewardContainer.setAttribute("data-current",currentId);
  rewardText.innerHTML=rewardData[currentId];
});

leftArrow.addEventListener("click", () => {
  let currentPrize = document.querySelector(".prizes.active");

  if (
    currentPrize.previousElementSibling &&
    currentPrize.previousElementSibling.classList.contains("prizes")
  ) {
    console.log(currentPrize.previousElementSibling);
    currentPrize.previousElementSibling.classList.add("active");
    currentId-=1
  } else {
    prizes[prizes.length - 1].classList.add("active");
    currentId=prizes.length-1;
  }
  currentPrize.classList.remove("active");
  rewardContainer.setAttribute("data-current",currentId);
  rewardText.innerHTML=rewardData[currentId];
});

// Fetching schedule data from spreadsheet.

let SHEET_ID = "1GoCTAdP_gpgf8vZv0MPGGj2GFGUxiCNqpppWBs0C4yQ";
let SHEET_TITLE = "test_event";

let SHEET_RANGE = "A4:C13";

let URL =
  "https://docs.google.com/spreadsheets/d/" +
  SHEET_ID +
  "/gviz/tq?sheet=" +
  SHEET_TITLE +
  "&range=" +
  SHEET_RANGE;

async function fetchSheetData(sheet_range) {
  try {
    const res = await fetch(`${URL}`);
    const data = await res.text();
    return JSON.parse(data.substring(47).slice(0, -2));
  } catch (e) {
    return null;
  }
}

async function renderScheduleData(scheduleData) {
  const danceScheduleTable = document.querySelector(
    ".tab-schedule-content .table"
  );
  const scheduleTableItemTemplate = document.querySelector("#table-desc");
  scheduleData = scheduleData.rows.slice(0, 5);
  scheduleData.forEach((schedule) => {
    const name = schedule.c[0].v;
    const id = schedule.c[1].v;
    const time = schedule.c[2].v;

    const scheduleTableItem = scheduleTableItemTemplate.content.cloneNode(true);
    const player1Name = scheduleTableItem.querySelector(".player-1-name");
    const player1ID = scheduleTableItem.querySelector(".player-1-id");
    const player2Name = scheduleTableItem.querySelector(".player-2-name");
    const player2ID = scheduleTableItem.querySelector(".player-2-id");

    player1Name.innerText = name;
    player1ID.innerText = "ID " + id;
    player2Name.innerText = name;
    player2ID.innerText = "ID " + id;

    danceScheduleTable.appendChild(scheduleTableItem);
  });
}

function renderLeaderboardData(data) {
    const top3 = data.rows.slice(0, 3);
  
    const toppers = document.querySelectorAll(".top");
    toppers.forEach((topper, i) => {
      const current = top3[i].c;
      const name = topper.querySelector(".name");
      const id = topper.querySelector(".id");
      const beans = topper.querySelector(".beans");
  
      name.innerHTML = current[0].v;
      id.innerHTML = current[1].v;
      beans.innerText = current[2].v || 0;
    });
  
    const winnerContainer = document.querySelector(".winner-container");
    const winnerStripTemplate = document.querySelector("#winner-strip");
  
    for (let i = 3; i < data.rows.length; i++) {
      const current = data.rows[i].c;
      const winnerStrip = winnerStripTemplate.content.cloneNode(true);
      const position = winnerStrip.querySelector(".position");
      position.innerHTML = i + 1;
  
      const name = winnerStrip.querySelector(".name");
      name.innerHTML = current[0].v;
  
      const id = winnerStrip.querySelector(".id");
      id.innerHTML = current[1].v;
  
      const beans = winnerStrip.querySelector(".beans");
      beans.innerHTML = current[2].v || 0;
      winnerContainer.appendChild(winnerStrip);
    }
  }

async function init() {
  const data = await fetchSheetData(SHEET_RANGE);
  console.log(data);
  renderScheduleData(data.table);
  const leaderboardData = await fetchSheetData("A18:C27");
  renderLeaderboardData(leaderboardData.table);
}
init();
