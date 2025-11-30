import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import EmojiPicker, { EmojiClickData } from 'emoji-picker-react';
import { formatSlug } from '@/utils/formatSlug';

interface ReactionBarProps {
  slug: string;
  initialReactions?: Record<string, string>;
}

export function ReactionBar({ slug, initialReactions = {} }: ReactionBarProps) {
  const [reactions, setReactions] = useState<Record<string, number>>(
    Object.fromEntries(
      Object.entries(initialReactions).map(([k, v]) => [k, parseInt(v)])
    )
  );
  const [showPicker, setShowPicker] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pickerPosition, setPickerPosition] = useState({ top: 0, left: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const fetchReactions = async () => {
      try {
        const slugFormatted = formatSlug(slug);
        const response = await fetch(`/api/reactions/${slugFormatted}`);
        const data = await response.json();
        
        setReactions(
          Object.fromEntries(
            Object.entries(data.reactions).map(([k, v]) => [k, parseInt(v as string)])
          )
        );
      } catch (error) {
        console.error('Error fetching reactions:', error);
      }
    };

    fetchReactions();
  }, [slug]);

  const DEFAULT_EMOJIS = ['❤️', '✨', '🤸‍♀️', '🌻', '🌈'];
  
  const reactedEmojis = Object.entries(reactions)
    .filter(([, count]) => count > 0)
    .sort(([, a], [, b]) => b - a)
    .map(([emoji]) => emoji);
  
  const defaultsToAdd = DEFAULT_EMOJIS.filter(emoji => !reactedEmojis.includes(emoji));
  const displayEmojis = [...reactedEmojis, ...defaultsToAdd].slice(0, 5);

  const handleReact = async (emoji: string) => {
    const slugFormatted = formatSlug(slug);
    const reactionKey = `reacted_${slugFormatted}_${emoji}`;
    const hasReacted = sessionStorage.getItem(reactionKey);
    const action = hasReacted ? 'remove' : 'add';

    setLoading(true);
    
    try {
      const res = await fetch(`/api/reactions/${slugFormatted}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji, action })
      });
      const data = await res.json();
      
      setReactions(
        Object.fromEntries(
          Object.entries(data.reactions).map(([k, v]) => [k, parseInt(v as string)])
        )
      );
      
      // Toggle session storage
      if (hasReacted) {
        sessionStorage.removeItem(reactionKey);
      } else {
        sessionStorage.setItem(reactionKey, 'true');
      }
      
      setShowPicker(false);
    } catch (error) {
      console.error('Error toggling reaction:', error);
    } finally {
      setLoading(false);
    }
  };

  const onEmojiClick = (emojiData: EmojiClickData) => {
    handleReact(emojiData.emoji);
  };

  const handlePickerToggle = () => {
    if (!showPicker && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      const pickerHeight = 500;
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      if (spaceAbove >= pickerHeight) {
        setPickerPosition({
          top: rect.top - pickerHeight,
          left: rect.left
        });
      } else if (spaceBelow >= pickerHeight) {
        setPickerPosition({
          top: rect.bottom + 8,
          left: rect.left
        });
      } else {
        setPickerPosition({
          top: Math.max(10, (window.innerHeight - pickerHeight) / 2),
          left: rect.left
        });
      }
    }
    setShowPicker(!showPicker);
  };

  return (
    <>
      <div className="space-y-3">
        <div className="flex gap-3 items-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {displayEmojis.map(emoji => {
            const count = reactions[emoji] || 0;
            const reactionKey = `reacted_${formatSlug(slug)}_${emoji}`;
            const hasReacted = sessionStorage.getItem(reactionKey);
            
            return (
              <button 
                key={emoji}
                onClick={() => handleReact(emoji)}
                disabled={loading}
                className={`
                  flex-shrink-0 px-4 py-3 rounded-xl transition-all duration-200 text-lg md:text-xl
                  ${hasReacted 
                    ? 'bg-blue-100 border-2 border-blue-400 hover:bg-blue-50' 
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-110 active:scale-95
                `}
                title={hasReacted ? 'Click to remove reaction' : 'Click to react'}
              >
                <span className="mr-2">{emoji}</span>
                {count > 0 && <span className="text-sm md:text-base font-semibold text-gray-700">{count}</span>}
              </button>
            );
          })}
          
          <div className="relative flex-shrink-0">
            <button
              ref={buttonRef}
              onClick={handlePickerToggle}
              className="px-4 py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-transparent transition-all text-lg md:text-xl"
            >
              ➕
            </button>
          </div>
        </div>
      </div>
      
      {showPicker && createPortal(
        <>
          <div 
            className="fixed inset-0 z-[9998]" 
            onClick={() => setShowPicker(false)}
          />
          <div 
            className="fixed z-[9999]"
            style={{
              top: `${pickerPosition.top}px`,
              left: `${pickerPosition.left}px`
            }}
          >
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        </>,
        document.body
      )}
    </>
  );
}