import React, { useEffect, useState } from 'react';

interface TypingTextProps {
  phrases: string[];
}

const TypingText: React.FC<TypingTextProps> = ({ phrases }) => {
  const [typedText, setTypedText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);

  useEffect(() => {
    const currentPhrase = phrases[currentPhraseIndex];
    let charIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const type = () => {
      if (charIndex <= currentPhrase.length) {
        setTypedText(currentPhrase.substring(0, charIndex));
        charIndex++;
        timeout = setTimeout(type, 100);
      } else {
        timeout = setTimeout(() => {
          setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        }, 2000);
      }
    };

    type();

    return () => clearTimeout(timeout);
  }, [currentPhraseIndex, phrases]);

  return (
    <div className="w-full max-w-2xl px-4 mt-4 cursor-pointer">
      <div className="inline-block p-6 shadow-xl ">
        <h3 className="font-mono text-xl md:text-2xl text-white min-h-[2.5rem]">
          {typedText}
          <span className="ml-1 animate-pulse">|</span>
        </h3>
      </div>
    </div>
  );
};

export default TypingText;
