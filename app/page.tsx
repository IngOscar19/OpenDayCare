import { ActivityPost } from "@/components/feed/ActivityPost";
import { FeedLoader } from "@/components/feed/FeedLoader";
import { FeedShell } from "@/components/feed/FeedShell";
import { FeedTabs } from "@/components/feed/FeedTabs";
import { MealCard } from "@/components/feed/MealCard";
import { ProfileSummary } from "@/components/feed/ProfileSummary";
import { WorkshopCard } from "@/components/feed/WorkshopCard";
import { feedData } from "@/lib/feed-data";

export default function Home() {
  return (
    <FeedShell data={feedData}>
      <main className="flex flex-col relative w-full pt-16 pb-24 bg-surface min-h-screen lg:pl-72 lg:pb-8">
        <div className="flex flex-col w-full pb-8 lg:mx-auto lg:max-w-[720px]">
          <ProfileSummary
            viewer={feedData.viewer}
            room={feedData.school.room}
          />
          <FeedTabs tabs={feedData.tabs} />
          {feedData.entries.map((entry) => {
            if (entry.kind === "activity") {
              return (
                <ActivityPost
                  key={entry.id}
                  post={entry}
                  room={feedData.school.room}
                />
              );
            }
            if (entry.kind === "meal") {
              return <MealCard key={entry.id} post={entry} />;
            }
            return <WorkshopCard key={entry.id} post={entry} />;
          })}
          <FeedLoader />
        </div>
      </main>
    </FeedShell>
  );
}
