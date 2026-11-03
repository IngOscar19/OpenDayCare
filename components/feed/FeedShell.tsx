"use client";

import { useState, type ReactNode } from "react";
import { AppHeader } from "@/components/feed/AppHeader";
import { BottomNav } from "@/components/feed/BottomNav";
import { SidebarNav } from "@/components/feed/SidebarNav";
import type { FeedData } from "@/lib/feed-data";

type FeedShellProps = {
  data: FeedData;
  children: ReactNode;
};

export function FeedShell({ data, children }: FeedShellProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <AppHeader school={data.school} onOpenMenu={() => setMenuOpen(true)} />
      <SidebarNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        school={data.school}
        viewer={data.viewer}
        navigation={data.navigation}
      />
      {children}
      <BottomNav navigation={data.navigation} />
    </>
  );
}
