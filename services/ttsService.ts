
import { Language } from '../types';

class TTSService {
  private synth: SpeechSynthesis;
  public onStateChange: ((state: 'idle' | 'speaking') => void) | null = null;
  private voices: SpeechSynthesisVoice[] = [];
  private voicesPromise: Promise<SpeechSynthesisVoice[]>;

  constructor() {
    this.synth = window.speechSynthesis;
    this.voicesPromise = new Promise((resolve) => {
      const loadVoices = () => {
        const voiceList = this.synth.getVoices();
        if (voiceList.length > 0) {
          this.voices = voiceList;
          resolve(voiceList);
        }
      };

      this.synth.onvoiceschanged = loadVoices;
      loadVoices(); // In case voices are already loaded
    });
  }

  private setState(state: 'idle' | 'speaking') {
    this.onStateChange?.(state);
  }
  
  private findBestVoice(lang: Language): SpeechSynthesisVoice | null {
    const langCode = lang === 'hi' ? 'hi-IN' : 'en-US';
    const voicesForLang = this.voices.filter(v => v.lang === langCode);
    if (voicesForLang.length === 0) return null;

    // Preference order for high-quality voices by keywords in their name
    const qualityPriorities = [
        { name: 'Google', quality: 10 },
        { name: 'Microsoft', quality: 9 }, // Edge often has great neural voices
        { name: 'Apple', quality: 8 }, // Safari/iOS voices
        { name: 'Neural', quality: 7 },
        { name: 'Enhanced', quality: 6 },
    ];
    
    let bestVoice: SpeechSynthesisVoice | null = null;
    let highestQuality = 0;

    for (const voice of voicesForLang) {
        // Prioritize non-local (network-based) voices, as they are often higher quality
        if (!voice.localService && highestQuality < 5) {
            bestVoice = voice;
            highestQuality = 5;
        }

        for (const priority of qualityPriorities) {
            if (voice.name.includes(priority.name) && priority.quality > highestQuality) {
                bestVoice = voice;
                highestQuality = priority.quality;
            }
        }
    }
    
    // Fallback to the first available voice if no "premium" one is found
    return bestVoice || voicesForLang[0];
  }

  async speak(text: string, lang: Language): Promise<void> {
    this.cancel();

    if (!this.synth) {
      console.warn('Speech Synthesis not supported by this browser.');
      this.setState('idle');
      return;
    }
    
    await this.voicesPromise;

    return new Promise<void>((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === 'hi' ? 'hi-IN' : 'en-US';
      
      const bestVoice = this.findBestVoice(lang);
      if (bestVoice) {
        utterance.voice = bestVoice;
        console.log(`Using voice: ${bestVoice.name}`);
      } else {
        console.warn(`No suitable voice found for language: ${lang}`);
      }
      
      utterance.onstart = () => this.setState('speaking');
      utterance.onend = () => {
          this.setState('idle');
          resolve();
      };
      utterance.onerror = (event) => {
          console.error("Browser TTS Error", event);
          this.setState('idle');
          reject(event);
      };

      this.synth.speak(utterance);
    });
  }

  cancel() {
    if (this.synth && (this.synth.speaking || this.synth.pending)) {
      this.synth.cancel();
    }
    this.setState('idle');
  }
}

export const ttsService = new TTSService();
