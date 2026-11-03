import { MaterialIcon } from "@/components/ui/MaterialIcon";

export function FeedLoader() {
  return (
    <>
      <div className="px-gutter py-space-lg flex flex-col items-center justify-center gap-2 text-on-surface-variant">
        <div className="flex items-center gap-2 px-space-md py-2 bg-surface-container-lowest rounded-full shadow-sm border border-outline-variant/30">
          <MaterialIcon
            name="progress_activity"
            className="text-[18px] text-primary animate-spin"
          />
          <span className="font-headline text-label-md text-on-surface">
            Cargando más momentos del aula...
          </span>
        </div>
        <p className="font-headline text-label-sm text-on-surface-variant/70">
          Desliza hacia arriba para ver días anteriores
        </p>
      </div>
      <div className="h-6" />
    </>
  );
}
