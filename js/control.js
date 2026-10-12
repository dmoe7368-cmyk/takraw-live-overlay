let current = {};

const STAGES = {
  "Group": "stage-group",
  "၁၆ သင်း": "stage-16",
  "Play-off": "stage-playoff",
  "Quarter": "stage-quarter",
  "Semi": "stage-semi",
  "Final": "stage-final"
};

takrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;
  current = data;

  document.getElementById('ctrl-h-name').textContent = data.homeName || 'မြန်မာ';
  document.getElementById('ctrl-h-sets').textContent = data.homeSets ?? 0;
  document.getElementById('ctrl-h-pts').textContent = data.homePoints ?? 0;

  document.getElementById('ctrl-a-name').textContent = data.awayName || 'ထိုင်း';
  document.getElementById('ctrl-a-sets').textContent = data.awaySets ?? 0;
  document.getElementById('ctrl-a-pts').textContent = data.awayPoints ?? 0;

  // ပိုက်အမြင့် input တွင် လက်ရှိတန်ဖိုး ထည့်ပေးထားခြင်း
  if (data.netHeight) {
    document.getElementById('input-net-height').value = data.netHeight;
  }

  // Active Buttons (ပွဲအမျိုးအစား & ကစားဟန်)
  updateToggleUI('btn-type-pro', 'btn-type-tour', data.matchType === 'ကြေးစား');
  updateToggleUI('btn-style-fight', 'btn-style-handi', data.matchStyle === 'အဖိုက် / အနိုက်');

  // Stage Buttons Active State
  Object.entries(STAGES).forEach(([stgName, btnId]) => {
    const el = document.getElementById(btnId);
    if (el) {
      if (data.matchStage === stgName) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Due Button UI
  const dueBtn = document.getElementById('btn-due');
  if (data.isDue) {
    dueBtn.classList.add('active');
    dueBtn.textContent = '⚡ DUE POINT : ON (ဒျူးဖွင့်ထားသည်)';
  } else {
    dueBtn.classList.remove('active');
    dueBtn.textContent = '⚡ DUE POINT : OFF';
  }
});

function updateToggleUI(btnId1, btnId2, isFirstActive) {
  const b1 = document.getElementById(btnId1);
  const b2 = document.getElementById(btnId2);
  if (!b1 || !b2) return;

  if (isFirstActive) {
    b1.classList.add('active');
    b2.classList.remove('active');
  } else {
    b1.classList.remove('active');
    b2.classList.add('active');
  }
}

function selectMatchType(type) {
  takrawRef.update({ matchType: type });
}

function selectStage(stage) {
  takrawRef.update({ matchStage: stage });
}

function selectMatchStyle(style) {
  takrawRef.update({ matchStyle: style });
}

// ပိုက်အမြင့် သတ်မှတ်ခြင်း functions
function quickSetHeight(h) {
  document.getElementById('input-net-height').value = h;
  takrawRef.update({ netHeight: h });
}

function saveCustomHeight() {
  const h = document.getElementById('input-net-height').value.trim();
  takrawRef.update({ netHeight: h });
}

function toggleDue() {
  takrawRef.update({ isDue: !current.isDue });
}

function addPoint(team, val) {
  if (team === 'home') {
    const homePoints = Math.max(0, (current.homePoints || 0) + val);
    takrawRef.update({ homePoints });
  } else {
    const awayPoints = Math.max(0, (current.awayPoints || 0) + val);
    takrawRef.update({ awayPoints });
  }
}

function addSet(team, val) {
  if (team === 'home') {
    const homeSets = Math.max(0, (current.homeSets || 0) + val);
    takrawRef.update({ homeSets });
  } else {
    const awaySets = Math.max(0, (current.awaySets || 0) + val);
    takrawRef.update({ awaySets });
  }
}

function setServe(team) {
  takrawRef.update({ serve: team });
}

function setMatchSet(setTxt) {
  takrawRef.update({ currentSet: setTxt });
}

function resetCurrentSetPoints() {
  if (confirm("လက်ရှိ Set ရမှတ်ကို 0-0 သို့ ပြန်ထားမလား?")) {
    takrawRef.update({ homePoints: 0, awayPoints: 0, isDue: false });
  }
}

function saveTeams() {
  const homeName = document.getElementById('input-h-name').value.trim() || current.homeName || 'မြန်မာ';
  const awayName = document.getElementById('input-a-name').value.trim() || current.awayName || 'ထိုင်း';
  takrawRef.update({ homeName, awayName });
}

function resetAll() {
  if (confirm("ပွဲစဉ်အချက်အလက် အားလုံးကို အစက ပြန်စမလား?")) {
    takrawRef.set({
      matchType: "ကြေးစား",
      matchStage: "",
      netHeight: "၅'၂\"",
      matchStyle: "အဖိုက် / အနိုက်",
      homeName: "မြန်မာ",
      awayName: "ထိုင်း",
      homeSets: 0,
      awaySets: 0,
      homePoints: 0,
      awayPoints: 0,
      currentSet: "SET 1",
      serve: "home",
      isDue: false
    });
  }
}
