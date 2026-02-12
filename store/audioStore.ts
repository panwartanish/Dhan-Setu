
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AudioState {
  voiceEnabled: boolean;
  toggleVoice: () => void;
}

export const useAudioStore = create<AudioState>()(
  persist(
    (set) => ({
      voiceEnabled: true,
      toggleVoice: () => set((state) => ({ voiceEnabled: !state.voiceEnabled })),
    }),
    {
      name: 'dhan-setu-audio-settings',
    }
  )
);
