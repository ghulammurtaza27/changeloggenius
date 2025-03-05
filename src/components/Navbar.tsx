import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import {
  Menu,
  X,
  GitBranch,
  FileText,
  Home,
  Settings,
  LogOut,
  User
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { toast } = useToast();

  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
  };

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/changelog", label: "Changelog", icon: FileText },
    { path: "/dashboard", label: "Dashboard", icon: GitBranch },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "py-2 bg-background/80 backdrop-blur-lg border-b" 
          : "py-4 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo and brand */}
          <Link 
            to="/" 
            className="flex items-center space-x-2 transition-transform hover:scale-[1.02] active:scale-[0.98]"
          >
            <div className="w-8 h-8">
              <img src="/favicon.svg" alt="ChangelogGenius" className="w-full h-full" />
            </div>
            <span className="text-xl font-semibold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
              ChangelogGenius
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-4 py-2 rounded-md transition-all ${
                  isActive(path)
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
          </nav>

          {/* User menu (desktop) */}
          <div className="hidden md:flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="https://github.com/shadcn.png" alt="User" />
                    <AvatarFallback>CG</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden flex items-center p-2 rounded-md hover:bg-accent"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile navigation */}
        {mobileOpen && (
          <nav className="md:hidden py-4 space-y-2 animate-in slide-in-from-top-4 duration-200">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center px-4 py-2 rounded-md transition-all ${
                  isActive(path)
                    ? "text-primary bg-primary/10 font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
                onClick={() => setMobileOpen(false)}
              >
                <Icon className="w-4 h-4 mr-2" />
                {label}
              </Link>
            ))}
            <div className="pt-4 mt-4 border-t">
              <Button onClick={handleLogout} variant="ghost" className="w-full justify-start text-muted-foreground">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
