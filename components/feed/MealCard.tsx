import Image from "next/image";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { MealPost } from "@/lib/feed-data";

type MealCardProps = {
  post: MealPost;
};

export function MealCard({ post }: MealCardProps) {
  return (
    <article className="px-gutter pt-space-lg">
      <div className="bg-surface-container-lowest rounded-lg p-space-md shadow-card">
        <div className="flex items-center justify-between mb-space-sm">
          <div className="flex items-center gap-space-sm">
            <span className="w-10 h-10 rounded-full bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed">
              <MaterialIcon name={post.icon} className="text-[20px]" />
            </span>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-title-sm text-on-surface">
                  {post.title}
                </span>
                <span className="font-headline text-label-sm bg-secondary-container/20 text-secondary px-2 py-0.5 rounded-full font-bold">
                  {post.time}
                </span>
              </div>
              <p className="font-headline text-label-sm text-on-surface-variant">
                {post.subtitle}
              </p>
            </div>
          </div>
          <span className="font-headline text-label-sm text-primary flex items-center gap-0.5 font-bold">
            <MaterialIcon name="check_circle" className="text-[16px]" />
            {post.status}
          </span>
        </div>
        <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between gap-space-sm">
          <div className="flex items-center gap-space-sm">
            <div className="w-12 h-12 rounded-lg bg-surface-container overflow-hidden flex-shrink-0">
              <Image
                src={post.dish.image}
                alt={post.dish.name}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <p className="font-headline text-label-md text-on-surface font-bold">
                {post.dish.name}
              </p>
              <p className="font-body text-body-sm text-on-surface-variant">
                {post.dish.note}
              </p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
