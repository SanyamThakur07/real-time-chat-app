// audio setup - lazy initialization to avoid autoplay policy issues
const getKeyStrokeSounds = () => [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    const keyStrokeSounds = getKeyStrokeSounds();
    const randomSound =
      keyStrokeSounds[Math.floor(Math.random() * keyStrokeSounds.length)];

    randomSound.currentTime = 0;
    randomSound.volume = 0.3; // Lower volume for better UX
    randomSound
      .play()
      .catch((error) => console.log("Audio play failed:", error));
  };

  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
