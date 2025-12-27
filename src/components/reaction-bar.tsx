import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { formatSlug } from "@/utils/formatSlug";

interface ReactionBarProps {
  slug: string;
  initialReactions?: Record<string, string>;
}

function isJsonResponse(res: Response): boolean {
  return (res.headers.get("content-type") ?? "").includes("application/json");
}

export function ReactionBar({ slug, initialReactions = {} }: ReactionBarProps) {
  const [reactions, setReactions] = useState<Record<string, number>>(
    Object.fromEntries(
      Object.entries(initialReactions).map(([k, v]) => [k, parseInt(v, 10)])
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
        if (response.ok && isJsonResponse(response)) {
          const data = await response.json();
          if (data?.reactions) {
            setReactions(
              Object.fromEntries(
                Object.entries(data.reactions).map(([k, v]) => [k, parseInt(v as string, 10)])
              )
            );
          }
        }
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
    const hasReacted = typeof window !== "undefined" ? sessionStorage.getItem(reactionKey) : null;
    const action = hasReacted ? 'remove' : 'add';

    setLoading(true);
    
    try {
      const res = await fetch(`/api/reactions/${slugFormatted}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emoji, action })
      });
      if (!res.ok || !isJsonResponse(res)) return;
      const data = await res.json();
      if (!data?.reactions) return;
      
      setReactions(
        Object.fromEntries(
          Object.entries(data.reactions).map(([k, v]) => [k, parseInt(v as string, 10)])
        )
      );
      
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
      const isMobile = window.innerWidth < 768;
      const pickerHeight = isMobile ? 400 : 500;
      const pickerWidth = isMobile ? Math.min(320, window.innerWidth - 20) : 350;
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;
      
      let top = 0;
      let left = rect.left;
      
      if (isMobile) {
        top = Math.max(10, (window.innerHeight - pickerHeight) / 2);
        left = Math.max(10, (window.innerWidth - pickerWidth) / 2);
      } else {
        if (spaceAbove >= pickerHeight) {
          top = rect.top - pickerHeight;
        } else if (spaceBelow >= pickerHeight) {
          top = rect.bottom + 8;
        } else {
          top = Math.max(10, (window.innerHeight - pickerHeight) / 2);
        }
        
        if (left + pickerWidth > window.innerWidth) {
          left = Math.max(10, window.innerWidth - pickerWidth - 10);
        }
      }
      
      setPickerPosition({ top, left });
    }
    setShowPicker(!showPicker);
  };

  return (
    <>
      <div className="space-y-3 w-full max-w-full">
        <div className="flex gap-2 md:gap-3 items-center overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          {displayEmojis.map(emoji => {
            const count = reactions[emoji] || 0;
            const reactionKey = `reacted_${formatSlug(slug)}_${emoji}`;
            const hasReacted = typeof window !== "undefined" ? sessionStorage.getItem(reactionKey) : null;
            
            return (
              <button 
                key={emoji}
                type="button"
                onClick={() => handleReact(emoji)}
                disabled={loading}
                className={`
                  shrink-0 px-2 py-2 md:px-4 md:py-3 rounded-xl transition-all duration-200 text-base md:text-lg lg:text-xl
                  ${hasReacted 
                    ? 'bg-blue-100 border-2 border-blue-400 hover:bg-blue-50' 
                    : 'bg-gray-100 hover:bg-gray-200 border-2 border-transparent'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-110 active:scale-95
                `}
                title={hasReacted ? 'Click to remove reaction' : 'Click to react'}
              >
                <span className="mr-1 md:mr-2">{emoji}</span>
                {count > 0 && <span className="text-xs md:text-sm lg:text-base font-semibold text-gray-700">{count}</span>}
              </button>
            );
          })}
          
          <div className="relative shrink-0">
            <button
              ref={buttonRef}
              type="button"
              onClick={handlePickerToggle}
              className="px-2 py-2 md:px-4 md:py-3 rounded-xl bg-gray-100 hover:bg-gray-200 border-2 border-transparent transition-all text-base md:text-lg lg:text-xl"
            >
              ➕
            </button>
          </div>
        </div>
      </div>
      
      {showPicker && createPortal(
        <>
          <button
            type="button"
            aria-label="Close emoji picker"
            className="fixed inset-0 z-40 bg-transparent border-0"
            onClick={() => setShowPicker(false)}
          />
          <div 
            className="fixed z-50"
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