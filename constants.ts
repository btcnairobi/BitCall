import { Category } from './types';
import { 
  MessageCircle, 
  Send, 
  GraduationCap, 
  Globe, 
  Lightbulb, 
  RefreshCw, 
  ShoppingCart, 
  Palette, 
  Rocket, 
  Bot, 
  Handshake 
} from 'lucide-react';

export const CATEGORIES = [
  { id: Category.BitcoinEducation, icon: GraduationCap, label: "Bitcoin Education" },
  { id: Category.BitcoinAdoption, icon: Globe, label: "Bitcoin Adoption" },
  { id: Category.BitcoinInnovation, icon: Lightbulb, label: "Bitcoin Innovation" },
  { id: Category.BitcoinCircularEconomy, icon: RefreshCw, label: "Bitcoin Circular Economy" },
  { id: Category.Merchants, icon: ShoppingCart, label: "Merchants (Pay With Bitcoin)" },
  { id: Category.BrandingLogos, icon: Palette, label: "Branding & Logos" },
  { id: Category.Entrepreneurship, icon: Rocket, label: "Entrepreneurship & Startups" },
  { id: Category.AIProductivity, icon: Bot, label: "AI Productivity" },
  { id: Category.PersonalMentorship, icon: Handshake, label: "Personal Mentorship" },
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
    // Open direct chat with Mutonga. MessageReview component handles the copy-to-clipboard.
    getLink: (_msg: string) => `https://t.me/mutonganakamoto`
  }
];

export const TIME_SLOTS: string[] = [];
// Generate slots for 24 hours
let startHour = 0;
const endHour = 23;
while (startHour <= endHour) {
  const ampm = startHour >= 12 ? 'PM' : 'AM';
  const displayHour = startHour === 0 ? 12 : (startHour > 12 ? startHour - 12 : startHour);
  const displayHourStr = displayHour.toString();
  
  TIME_SLOTS.push(`${displayHourStr}:00 ${ampm}`);
  if (startHour !== endHour || (startHour === endHour && 30 < 60)) {
    TIME_SLOTS.push(`${displayHourStr}:30 ${ampm}`);
  }
  startHour++;
}