function handleOrientation(event) {
      // gamma: esquerda/direita, beta: frente/trás
      tiltX = event.gamma || 0;
      tiltY = event.beta || 0;
    }

async function enableOrientation() {
    try {
        if (typeof DeviceOrientationEvent !== "undefined" &&
            typeof DeviceOrientationEvent.requestPermission === "function") {
            const response = await DeviceOrientationEvent.requestPermission();
            if (response === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
            statusEl.textContent = "Sensores ativados! Jogo em curso.";
            gameStarted = true;
            } else {
            statusEl.textContent = "Permissão negada. Não é possível usar o sensor de movimento.";
            }
    } else {
        // Android / outros
        window.addEventListener("deviceorientation", handleOrientation);
        statusEl.textContent = "Sensores ativados! Jogo em curso.";
        gameStarted = true;
    }
    } catch (err) {
        console.error(err);
        statusEl.textContent = "Erro ao tentar aceder ao sensor de movimento.";
    }
}