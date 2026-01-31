import { User } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-card/60 backdrop-blur-xl border-b border-border/50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">T</span>
          </div>
          <span className="text-xl font-semibold text-foreground">TaskFlow</span>
        </div>
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center cursor-pointer hover:bg-accent transition-colors">
          <User className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
