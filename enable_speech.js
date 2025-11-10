window.handleOrientation = function(event) {
      // gamma: esquerda/direita, beta: frente/trás
      window.tiltX = event.gamma || 0;
      window.tiltY = event.beta || 0;
    }
    
document.getElementById("startVoice").onclick = () => {
      const output = document.getElementById("voiceOutput");

      if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
        output.textContent = "Speech recognition not supported in this browser.";
        return;
      }

      const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
      recognition.lang = "en-US";
      recognition.continuous = true;
      recognition.interimResults = false;

      recognition.onresult = (event) => {
        const transcript = event.results[event.results.length - 1][0].transcript.trim();
        output.textContent = `Heard: "${transcript}"`;
      };

      recognition.onerror = (err) => {
        output.textContent = `Speech error: ${err.error}`;
      };

      recognition.start();
      output.textContent = "Listening... speak into the mic 🎤";
    };