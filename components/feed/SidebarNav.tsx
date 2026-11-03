"use client";

import { useEffect, useState } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FeedData } from "@/lib/feed-data";

type SidebarNavProps = {
  open: boolean;
  onClose: () => void;
  school: FeedData["school"];
  viewer: FeedData["viewer"];
  navigation: FeedData["navigation"];
};

export function SidebarNav({
  open,
  onClose,
  school,
  viewer,
  navigation,
}: SidebarNavProps) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const hidden = !open && !isDesktop;
  const mainItems = navigation.filter((item) => item.id !== "notificaciones");
  const alertItems = navigation.filter((item) => item.id === "notificaciones");

  return (
    <>
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          open ? "block" : "hidden"
        }`}
      />
      <aside
        aria-label="Menú lateral"
        aria-hidden={hidden || undefined}
        inert={hidden}
        className={`fixed top-0 left-0 bottom-0 z-50 w-72 max-w-[85vw] bg-surface-container-lowest flex flex-col shadow-sidebar transform transition-transform duration-300 pt-safe pb-safe lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-space-lg flex items-center justify-between bg-surface-container-low">
          <div className="flex items-center gap-space-sm">
            <span className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
              <MaterialIcon
                name="child_care"
                className="text-on-primary text-[22px]"
              />
            </span>
            <div>
              <h2 className="font-headline text-title-sm text-on-surface">
                {school.name}
              </h2>
              <p className="font-headline text-label-sm text-on-surface-variant">
                {school.room}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Cerrar menú"
            onClick={onClose}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container lg:hidden"
          >
            <MaterialIcon name="close" />
          </button>
        </div>
        <nav
          aria-label="Navegación lateral"
          className="flex-1 px-space-md py-space-lg flex flex-col gap-space-xs"
        >
          {mainItems.map((item) => (
            <SidebarLink key={item.id} item={item} active={item.id === "feed"} />
          ))}
          {alertItems.length > 0 ? (
            <div className="my-space-md h-px bg-outline-variant/30" />
          ) : null}
          {alertItems.map((item) => (
            <SidebarLink key={item.id} item={item} active={false} />
          ))}
        </nav>
        <div className="p-space-md">
          <div className="p-space-md rounded-lg bg-surface-container-low flex items-center gap-space-sm">
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <MaterialIcon name="person" className="text-on-primary text-[18px]" />
            </span>
            <div className="flex-1 min-w-0">
              <p className="font-headline text-label-md text-on-surface truncate">
                {viewer.role}
              </p>
              <p className="font-headline text-label-sm text-on-surface-variant truncate">
                Bebé: {viewer.child} ({viewer.age})
              </p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

type SidebarLinkProps = {
  item: FeedData["navigation"][number];
  active: boolean;
};

function SidebarLink({ item, active }: SidebarLinkProps) {
  return (
    <a
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-space-md min-h-[48px] px-space-md rounded-full transition-colors ${
        active
          ? "bg-primary-container text-on-primary-container font-bold"
          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
      }`}
      href="#"
    >
      <MaterialIcon name={item.icon} className="text-[22px]" />
      <span className="font-headline text-label-lg">{item.label}</span>
    </a>
  );
}
