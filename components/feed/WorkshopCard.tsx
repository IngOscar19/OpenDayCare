import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { WorkshopPost } from "@/lib/feed-data";

type WorkshopCardProps = {
  post: WorkshopPost;
};

export function WorkshopCard({ post }: WorkshopCardProps) {
  return (
    <article className="px-gutter pt-space-lg">
      <div className="bg-surface-container-lowest rounded-lg p-space-md border border-outline-variant/30 shadow-[0_4px_20px_-2px_rgba(13,148,136,0.06)]">
        <div className="flex items-start justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="w-10 h-10 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed-variant">
              <MaterialIcon name={post.icon} className="text-[20px]" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-headline text-title-sm text-on-surface">
                  {post.title}
                </span>
                <span className="font-headline text-label-sm bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
                  {post.time}
                </span>
              </div>
              <p className="font-headline text-label-sm text-on-surface-variant">
                {post.subtitle}
              </p>
            </div>
          </div>
          <MaterialIcon
            name={post.statusIcon ?? "check_circle"}
            className="text-primary text-[20px]"
          />
        </div>
        <p className="font-body text-body-sm text-on-surface mt-space-sm leading-relaxed">
          {post.body}
        </p>
        <div className="mt-space-sm flex items-center justify-between pt-2 border-t border-outline-variant/30 text-label-sm font-headline text-on-surface-variant">
          <span className="flex items-center gap-1 text-primary font-semibold">
            <MaterialIcon name="photo_library" className="text-[15px]" />
            {post.albumLabel}
          </span>
          <MaterialIcon
            name="arrow_forward_ios"
            className="text-[16px] text-on-surface-variant"
          />
        </div>
      </div>
    </article>
  );
}
