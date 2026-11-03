"use client";

import { useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FeedData, FeedTab } from "@/lib/feed-data";

type FeedTabsProps = {
  tabs: FeedData["tabs"];
};

export function FeedTabs({ tabs }: FeedTabsProps) {
  const [active, setActive] = useState<FeedTab>("aula");

  return (
    <section className="px-gutter pt-space-md">
      <div className="bg-surface-container-low p-1.5 rounded-full flex gap-1 shadow-sm">
        {tabs.map((tab) => {
          const isActive = tab.id === active;
          return (
            <button
              key={tab.id}
              type="button"
              aria-pressed={isActive}
              onClick={() => setActive(tab.id)}
              className={`flex-1 py-2.5 px-space-md rounded-full font-headline text-label-md flex items-center justify-center gap-2 transition-all ${
                isActive
                  ? "bg-primary text-on-primary shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <MaterialIcon name={tab.icon} className="text-[18px]" />
              <span>{tab.label}</span>
              {tab.dot ? (
                <span
                  aria-hidden="true"
                  className="w-2 h-2 rounded-full bg-secondary-container"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </section>
  );
}
