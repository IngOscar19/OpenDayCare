import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FeedData } from "@/lib/feed-data";

type ProfileSummaryProps = {
  viewer: FeedData["viewer"];
  room: string;
};

export function ProfileSummary({ viewer, room }: ProfileSummaryProps) {
  return (
    <section className="px-gutter pt-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-lg shadow-card flex items-center justify-between">
        <div className="flex items-center gap-space-sm min-w-0">
          <div className="relative flex-shrink-0">
            <div className="w-13 h-13 rounded-full overflow-hidden bg-primary-fixed p-0.5 shadow-sm">
              <Image
                src={viewer.avatar}
                alt={viewer.name}
                width={48}
                height={48}
                priority
                className="w-12 h-12 rounded-full object-cover"
              />
            </div>
            <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary shadow-sm">
              <MaterialIcon name="wb_sunny" filled className="text-[13px]" />
            </span>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-space-xs">
              <h1 className="font-headline text-title-sm text-on-surface truncate">
                {viewer.name}
              </h1>
              <span
                role="img"
                aria-label="Activo en sala"
                title="Activo en sala"
                className="w-2 h-2 rounded-full bg-primary flex-shrink-0"
              />
            </div>
            <p className="font-body text-body-sm text-on-surface-variant flex items-center gap-1 truncate">
              <span>{viewer.stage}</span>
              <span>•</span>
              <span className="text-secondary font-headline text-label-sm">
                {room}
              </span>
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Cambiar perfil o ver ficha médica"
          title="Cambiar perfil o ver ficha médica"
          className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-low text-primary hover:bg-surface-container transition-colors"
        >
          <MaterialIcon name="swap_horiz" className="text-[20px]" />
        </button>
      </div>
    </section>
  );
}
