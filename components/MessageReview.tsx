import React, { useState } from 'react';
import { BookingState, Category } from '../types';
import { format } from 'date-fns';
import { Copy, Check, MessageSquare } from 'lucide-react';
import { SOCIAL_PLATFORMS, OFFICIAL_NUMBERS } from '../constants';
import { clsx } from 'clsx';

interface MessageReviewProps {
  booking: BookingState;
  onReset: () => void;
}

export const MessageReview: React.FC<MessageReviewProps> = ({ booking, onReset }) => {
  const [copied, setCopied] = useState(false);

  if (!booking.date || !booking.time || !booking.category) return null;

  const dateStr = format(booking.date, 'EEEE, MMMM do, yyyy');
  
  // The core message template
  const rawMessage = `Hi Martin,\n\nI'd like to book a call regarding ${booking.category}.\n\n📅 Date: ${dateStr}\n⏰ Time: ${booking.time}\n\nLooking forward to connecting!`;

  const handleCopy = () => {
    navigator.clipboard.writeText(rawMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePlatformClick = (getLink: (msg: string) => string, name: string) => {
    if (name === "Instagram") {
      // Special handling for IG - copy text first then open
      handleCopy();
      window.open(getLink(rawMessage), '_blank');
    } else {
      window.open(getLink(rawMessage), '_blank');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-2xl mx-auto">
      
      {/* Message Preview Card */}
      <div className="bg-white border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rounded-2xl p-6 relative overflow-hidden">
        
        <h3 className="text-black text-sm font-black uppercase tracking-wider mb-3 flex items-center gap-2">
          <MessageSquare size={18} className="text-bitcoin fill-black" /> Generated Message
        </h3>
        
        {/* White Input Field Look */}
        <div className="bg-white rounded-xl p-5 font-mono text-sm sm:text-base text-black whitespace-pre-wrap border-2 border-gray-200 shadow-inner">
          {rawMessage}
        </div>
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-sm font-bold text-bitcoin hover:text-black transition-colors bg-white border border-bitcoin/30 px-3 py-1.5 rounded-lg hover:border-black"
          >
            {copied ? <><Check size={16} /> Copied</> : <><Copy size={16} /> Copy Text</>}
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="space-y-4">
        <p className="text-center text-black font-bold text-lg">Select a platform to send your request:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {SOCIAL_PLATFORMS.map((platform) => (
            <button
              key={platform.name}
              onClick={() => handlePlatformClick(platform.getLink, platform.name)}
              className={clsx(
                "flex items-center justify-center gap-3 p-4 rounded-xl font-black text-white transition-all border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-y-[4px]",
                platform.color
              )}
            >
              <platform.icon size={24} strokeWidth={2.5} />
              Send via {platform.name}
            </button>
          ))}
        </div>
        <p className="text-xs text-center text-black font-semibold mt-2 opacity-70">
          *For Instagram, the message will be copied to your clipboard automatically.
        </p>
      </div>

      {/* Trust & Safety Section */}
      <div className="border-t-2 border-black/10 pt-8 mt-12">
        <div className="bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-xl p-6 text-center">
          <h4 className="text-bitcoin font-black text-xl mb-2 flex items-center justify-center gap-2">
            ⚠️ Important Validation
          </h4>
          <p className="text-black font-medium text-sm mb-4">
            After sending your message, you will receive a confirmation call ONLY from these official numbers:
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {OFFICIAL_NUMBERS.map((num) => (
              <div key={num} className="bg-gray-100 px-4 py-2 rounded-lg border-2 border-black font-mono text-black font-bold tracking-wide">
                {num}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button 
          onClick={onReset}
          className="text-white hover:text-black font-bold text-sm underline underline-offset-4 transition-colors"
        >
          Start New Booking
        </button>
      </div>

    </div>
  );
};