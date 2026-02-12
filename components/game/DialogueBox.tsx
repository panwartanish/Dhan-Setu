import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLanguageStore } from '../../store/languageStore';
import { useAudioStore } from '../../store/audioStore';
import { Dialogue } from '../../types';
import ArrowRight from '../icons/ArrowRight';
import Repeat from '../icons/Repeat';
import { ttsService } from '../../services/ttsService';

interface DialogueBoxProps {
  dialogue: Dialogue;
  onComplete?: () => void;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({ dialogue, onComplete }) => {
  const { language } = useLanguageStore();
  const { voiceEnabled } = useAudioStore();
  const [displayText, setDisplayText] = useState('');
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [ttsState, setTtsState] = useState<'idle' | 'speaking'>('idle');

  const text = dialogue.text[language];
  const speaker = dialogue.speaker[language];

  useEffect(() => {
    ttsService.onStateChange = setTtsState;
    return () => { ttsService.onStateChange = null; };
  }, []);

  useEffect(() => {
    setDisplayText('');
    setIsTypingComplete(false);
    ttsService.cancel(); // Cancel any lingering speech from the previous dialogue

    let index = 0;
    const typewriterInterval = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typewriterInterval);
        setIsTypingComplete(true);
        if (voiceEnabled) {
          ttsService.speak(text, language);
        }
      }
    }, 30);

    return () => {
      clearInterval(typewriterInterval);
      ttsService.cancel();
    };
  }, [dialogue.id, text, language, voiceEnabled]);
  
  const boxVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  } as const;

  const handleRepeatVoice = () => {
    ttsService.speak(text, language);
  };
  
  const showNextButton = isTypingComplete && ttsState === 'idle' && !dialogue.isDecision && onComplete;

  return (
    <motion.div
      variants={boxVariants}
      initial="hidden"
      animate="visible"
      key={dialogue.id}
      className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl shadow-xl p-6 w-full max-w-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex justify-between items-center mb-2">
            <h3 className={`font-bold text-xl text-primary-800 dark:text-primary-200 ${language === 'hi' ? 'font-hindi' : ''}`}>
              {speaker}
            </h3>
            {voiceEnabled && (
               <button 
                onClick={handleRepeatVoice} 
                className="p-2 h-9 w-9 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-gray-700 rounded-full transition-colors disabled:opacity-50" 
                aria-label="Repeat voice"
              >
                 <Repeat className={`w-5 h-5 text-primary-600 dark:text-primary-300 transition-transform ${ttsState === 'speaking' ? 'animate-pulse' : ''}`} />
              </button>
            )}
          </div>
          <p className={`text-dialogue text-primary-900 dark:text-primary-100 ${language === 'hi' ? 'font-hindi' : ''}`}>
            {displayText}
            {!isTypingComplete && <span className="inline-block w-1 h-5 bg-primary-800 dark:bg-primary-200 animate-pulse ml-1" />}
          </p>
        </div>
      </div>
      {showNextButton && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex justify-end mt-4"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onComplete}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-colors shadow-md"
          >
            <span className={language === 'hi' ? 'font-hindi' : ''}>{dialogue.next || dialogue.nextScenarioId ? (language === 'en' ? 'Next' : 'आगे') : (language === 'en' ? 'Finish' : 'समाप्त करें')}</span>
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
};
