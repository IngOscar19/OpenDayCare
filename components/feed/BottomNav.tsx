import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FeedData } from "@/lib/feed-data";

type BottomNavProps = {
  navigation: FeedData["navigation"];
};

export function BottomNav({ navigation }: BottomNavProps) {
  const items = navigation.filter((item) => item.shortLabel);

  return (
    <nav
      aria-label="Navegación inferior"
      className="fixed bottom-0 w-full z-50 pb-safe bg-surface/85 backdrop-blur-xl shadow-bottom lg:hidden"
    >
      <div className="flex justify-around items-center h-16 px-space-sm">
        {items.map((item) => {
          const active = item.id === "feed";
          return (
            <a
              key={item.id}
              aria-current={active ? "page" : undefined}
              className={`flex flex-col items-center justify-center min-w-[48px] min-h-[48px] px-space-sm rounded-full transition-colors ${
                active
                  ? "text-primary font-bold"
                  : "text-on-surface-variant hover:text-on-surface"
              }`}
              href="#"
            >
              <MaterialIcon name={item.icon} className="text-[24px]" />
              <span className="font-headline text-label-sm mt-0.5">
                {item.shortLabel}
              </span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
