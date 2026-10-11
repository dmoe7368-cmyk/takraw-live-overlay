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
});

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
