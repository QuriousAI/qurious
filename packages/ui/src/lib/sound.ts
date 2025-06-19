const AUDIO_OPTIONS = {
  added_to_folder: "./pop.mp3",
};

export const playToastSound = (
  sound: keyof typeof AUDIO_OPTIONS = "added_to_folder"
) => {
  const audio = new Audio(AUDIO_OPTIONS[sound]);
  audio.play();
};
