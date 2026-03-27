import { RotateCcw } from 'lucide-react';

interface BottomNavProps {
  onResetProfile?: () => void;
}

export function BottomNav({ onResetProfile }: BottomNavProps) {
  return (
    <nav className="fixed bottom-6 right-6 flex items-center justify-center z-[100]">
      <button 
        onClick={onResetProfile}
        className="flex flex-col items-center justify-center text-on-surface/40 w-12 h-12 hover:text-on-surface transition-colors group glass-pill rounded-full"
        title="Réinitialiser le profil"
      >
        <RotateCcw size={20} className="group-hover:rotate-[-45deg] transition-transform" />
        <span className="text-[7px] font-bold uppercase mt-0.5">Reset</span>
      </button>
    </nav>
  );
}
