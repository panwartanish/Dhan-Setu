
// --- Base64 Decoding ---
export function decode(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

// --- PCM Audio Decoding ---
// The Gemini TTS model returns audio as raw 1-channel, 24000Hz, 16-bit PCM.
const SAMPLE_RATE = 24000;
const NUM_CHANNELS = 1;

export async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext
): Promise<AudioBuffer> {
  // The raw data is 16-bit signed integers. We need to create a view into the buffer.
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / NUM_CHANNELS;

  // Create an AudioBuffer with the correct parameters.
  const buffer = ctx.createBuffer(NUM_CHANNELS, frameCount, SAMPLE_RATE);

  // Get the channel data buffer.
  const channelData = buffer.getChannelData(0);

  // Copy and convert the 16-bit PCM data to 32-bit float, which the Web Audio API uses.
  for (let i = 0; i < frameCount; i++) {
    // Normalize the 16-bit signed integer (from -32768 to 32767) to a float between -1.0 and 1.0.
    channelData[i] = dataInt16[i] / 32768.0;
  }

  return buffer;
}


// --- Audio Player Class ---
export class AudioPlayer {
    private audioContext: AudioContext;
    private source: AudioBufferSourceNode | null = null;
    private gainNode: GainNode;

    constructor() {
        this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        this.gainNode = this.audioContext.createGain();
        this.gainNode.connect(this.audioContext.destination);
    }

    getContext(): AudioContext {
        return this.audioContext;
    }

    play(audioBuffer: AudioBuffer): Promise<void> {
        return new Promise((resolve) => {
            this.stop(); // Stop any currently playing audio

            if (this.audioContext.state === 'suspended') {
                this.audioContext.resume();
            }

            this.source = this.audioContext.createBufferSource();
            this.source.buffer = audioBuffer;
            this.source.connect(this.gainNode);
            
            this.source.onended = () => {
                this.source = null;
                resolve();
            };
            
            this.source.start(0);
        });
    }

    stop() {
        if (this.source) {
            this.source.onended = null; // Prevent onended from firing on manual stop
            this.source.stop();
            this.source = null;
        }
    }

    isPlaying(): boolean {
        return !!this.source;
    }
}
