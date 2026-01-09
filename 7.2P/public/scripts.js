const socket = io();

const hostPanel = document.getElementById('hostPanel');
const roleText = document.getElementById('roleText');
const pSlider = document.getElementById('pSlider');
const pValue = document.getElementById('pValue');

function renderCommon(state) {
  document.getElementById('p').innerText = state.p.toFixed(2);
  document.getElementById('shots').innerText = state.shots;
  document.getElementById('ones').innerText = state.ones;

  const freq = state.shots > 0 ? (state.ones / state.shots) : 0;
  document.getElementById('freq').innerText = freq.toFixed(3);
}

function setHostUI(isHost) {
  hostPanel.style.display = isHost ? 'block' : 'none';
  roleText.innerText = `Role: ${isHost ? 'Host' : 'Viewer'}`;
}

socket.on('state', (state) => {
  // determine host
  const isHost = socket.id === state.hostId;
  setHostUI(isHost);

  // sync slider display to current p (for host)
  pSlider.value = state.p;
  pValue.innerText = Number(state.p).toFixed(2);

  renderCommon(state);
});

socket.on('measurement', (state) => {
  // latest bit
  document.getElementById('latest').innerText = state.bit;
  renderCommon(state);
});

// Host slider -> server
pSlider.addEventListener('input', () => {
  const newP = Number(pSlider.value);
  pValue.innerText = newP.toFixed(2);
  socket.emit('set_p', newP);
});
