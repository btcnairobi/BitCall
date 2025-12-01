import { Category } from './types';
import { MessageCircle, Send, Facebook, Instagram } from 'lucide-react';

export const CATEGORIES = [
  { id: Category.BitcoinEducation, icon: "🎓", label: "Bitcoin Education" },
  { id: Category.BitcoinAdoption, icon: "🌍", label: "Bitcoin Adoption" },
  { id: Category.BitcoinInnovation, icon: "💡", label: "Bitcoin Innovation" },
  { id: Category.BitcoinCircularEconomy, icon: "🔄", label: "Bitcoin Circular Economy" },
  { id: Category.Merchants, icon: "🛒", label: "Merchants (Pay With Bitcoin)" },
  { id: Category.BrandingLogos, icon: "🎨", label: "Branding & Logos" },
  { id: Category.Entrepreneurship, icon: "🚀", label: "Entrepreneurship & Startups" },
  { id: Category.AIProductivity, icon: "🤖", label: "AI Productivity" },
  { id: Category.PersonalMentorship, icon: "🤝", label: "Personal Mentorship" },
];

export const OFFICIAL_NUMBERS = [
  "+254 799 830 656",
  "+254 737 684 314"
];

// Assuming the first number is the primary WhatsApp contact
const PRIMARY_PHONE_CLEAN = "254799830656";

export const SOCIAL_PLATFORMS = [
  {
    name: "WhatsApp",
    icon: MessageCircle,
    color: "bg-green-500 hover:bg-green-600",
    // WhatsApp API
    getLink: (msg: string) => `https://wa.me/${PRIMARY_PHONE_CLEAN}?text=${encodeURIComponent(msg)}`
  },
  {
    name: "Telegram",
    icon: Send,
    color: "bg-blue-500 hover:bg-blue-600",
    // Uses window.location.origin to share the current URL (e.g., the specific Vercel deployment)
    getLink: (msg: string) => `https://t.me/share/url?url=${encodeURIComponent(window.location.origin)}&text=${encodeURIComponent(msg)}`
  },
  {
    name: "Facebook",
    icon: Facebook,
    color: "bg-blue-700 hover:bg-blue-800",
    // HTTPS link for Messenger
    getLink: (msg: string) => `https://m.me/?text=${encodeURIComponent(msg)}` 
  },
  {
    name: "Instagram",
    icon: Instagram,
    color: "bg-pink-600 hover:bg-pink-700",
    // Instagram doesn't support pre-filled DM links via web URL effectively without deep linking.
    // We will copy to clipboard and open IG.
    getLink: (_msg: string) => `https://instagram.com/`
  }
];

export const TIME_SLOTS: string[] = [];
// Generate slots from 8:00 AM to 8:00 PM
let startHour = 8;
const endHour = 20; // 8 PM
while (startHour <= endHour) {
  const ampm = startHour >= 12 ? 'PM' : 'AM';
  const displayHour = startHour > 12 ? startHour - 12 : startHour;
  
  TIME_SLOTS.push(`${displayHour}:00 ${ampm}`);
  if (startHour !== endHour) {
    TIME_SLOTS.push(`${displayHour}:30 ${ampm}`);
  }
  startHour++;
}