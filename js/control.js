let current = {};

takrawRef.on('value', (snap) => {
  const data = snap.val();
  if (!data) return;
  current = data;

  document.getElementById('ctrl-h-name').textContent = data.homeName || 'MYA';
  document.getElementById('ctrl-h-sets').textContent = data.homeSets ?? 0;
  document.getElementById('ctrl-h-pts').textContent = data.homePoints ?? 0;

  document.getElementById('ctrl-a-name').textContent = data.awayName || 'THA';
  document.getElementById('ctrl-a-sets').textContent = data.awaySets ?? 0;
  document.getElementById('ctrl-a-pts').textContent = data.awayPoints ?? 0;

  // Active Button UI Updates
  updateToggleUI('btn-type-pro', 'btn-type-tour', data.matchType === 'ကြေးစား');
  updateToggleUI('btn-style-fight', 'btn-style-handi', data.matchStyle === 'အဖိုက် / အနိုက်');
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

// ၁။ ပွဲအမျိုးအစား ရွေးချယ်မှု
function selectMatchType(type) {
  takrawRef.update({ matchType: type });
}

// ၂။ အပေးအယူ / ကစားဟန် ရွေးချယ်မှု
function selectMatchStyle(style) {
  takrawRef.update({ matchStyle: style });
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
    takrawRef.update({ homePoints: 0, awayPoints: 0 });
  }
}

function saveTeams() {
  const homeName = document.getElementById('input-h-name').value.trim() || current.homeName || 'MYA';
  const awayName = document.getElementById('input-a-name').value.trim() || current.awayName || 'THA';
  takrawRef.update({ homeName, awayName });
}

function resetAll() {
  if (confirm("ပွဲစဉ်အချက်အလက် အားလုံးကို အစက ပြန်စမလား?")) {
    takrawRef.set({
      matchType: "ကြေးစား",
      matchStyle: "အဖိုက် / အနိုက်",
      homeName: "MYA",
      awayName: "THA",
      homeSets: 0,
      awaySets: 0,
      homePoints: 0,
      awayPoints: 0,
      currentSet: "SET 1",
      serve: "home"
    });
  }
}
