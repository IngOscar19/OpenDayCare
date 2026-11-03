import { MaterialIcon } from "@/components/ui/MaterialIcon";

type AppHeaderProps = {
  school: { name: string; room: string };
  onOpenMenu: () => void;
};

export function AppHeader({ school, onOpenMenu }: AppHeaderProps) {
  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-surface/80 backdrop-blur-xl shadow-header lg:left-72 lg:right-0 lg:w-auto">
      <div className="h-16 px-gutter flex items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <button
            type="button"
            aria-label="Abrir menú lateral"
            onClick={onOpenMenu}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full text-on-surface hover:bg-surface-container-high transition-colors lg:hidden"
          >
            <MaterialIcon name="menu" className="text-[24px]" />
          </button>
          <div className="flex flex-col ml-1">
            <span className="font-headline text-title-sm text-primary tracking-tight leading-tight">
              {school.name}
            </span>
            <span className="font-headline text-label-sm text-on-surface-variant flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary-container inline-block" />
              {school.room}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-space-xs">
          <a
            aria-label="Mi Cuenta"
            className="min-w-[44px] min-h-[44px] flex items-center justify-center p-1 rounded-full hover:bg-surface-container-high transition-colors"
            href="#"
          >
            <span className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <MaterialIcon name="person" className="text-on-primary text-[18px]" />
            </span>
          </a>
        </div>
      </div>
    </header>
  );
}
