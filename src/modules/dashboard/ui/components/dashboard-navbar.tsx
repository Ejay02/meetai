"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { useState, useEffect } from "react";
import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
  const { state, toggleSidebar, isMobile } = useSidebar();
  const [isMac, setIsMac] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  useEffect(() => {
    // Detect if user is on macOS or Window
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;

    const isMacOS =
      /Mac|iPhone|iPod|iPad/.test(platform) ||
      /Mac/.test(userAgent) ||
      navigator.platform.toUpperCase().indexOf("MAC") >= 0;

    setIsMac(isMacOS);
  }, []);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setCommandOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
      <nav className="h-16 w-full border-b border-b-slate-200 bg-white/50 backdrop-blur-md shadow-sm flex items-center px-4 gap-x-2 py-3">
        {/* Navbar content here */}

        <Button className="size-9" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>

        <Button
          className="h-9 w-[240px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
          variant="outline"
          size="sm"
          onClick={() => setCommandOpen((open) => !open)}
        >
          <SearchIcon />
          Search
          <kbd className="ml-auto text-xs bg-muted px-1.5 py-0.5 rounded">
            {isMac ? <span className="">&#8984;K</span> : <span>Ctrl+K</span>}
          </kbd>
        </Button>
      </nav>
    </>
  );
};
