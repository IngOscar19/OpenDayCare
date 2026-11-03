"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { CommentsThread } from "@/components/feed/CommentsThread";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { ActivityPost as ActivityPostData } from "@/lib/feed-data";

type ActivityPostProps = {
  post: ActivityPostData;
  room: string;
};

const badgeTone = {
  primary: "bg-primary-fixed text-on-primary-fixed-variant shadow-sm",
  secondary: "bg-secondary-fixed text-on-secondary-fixed shadow-sm",
  neutral: "bg-surface-container text-on-surface-variant",
} as const;

const roleTone = {
  primary: "bg-primary-fixed text-on-primary-fixed-variant",
  secondary: "bg-secondary-fixed text-on-secondary-fixed",
} as const;

export function ActivityPost({ post, room }: ActivityPostProps) {
  const [liked, setLiked] = useState(post.reactions.liked);
  const [saved, setSaved] = useState(post.reactions.saved);
  const commentInputRef = useRef<HTMLTextAreaElement>(null);

  function focusCommentInput() {
    commentInputRef.current?.focus();
    commentInputRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const summary = post.interactive
    ? liked
      ? post.reactions.summary
      : post.reactions.summaryUnliked ?? post.reactions.summary
    : post.reactions.summary;

  const main = post.media[0];
  const secondary = post.media[1];
  const tertiary = post.media[2];
  const mainHeight = post.gallerySize === "tall" ? "h-56" : "h-48";
  const subHeight = post.gallerySize === "tall" ? "h-32" : "h-28";

  return (
    <article className="px-gutter pt-space-lg">
      <div className="bg-surface-container-lowest rounded-lg overflow-hidden shadow-card">
        <div className="p-space-md bg-surface-container-low/50 flex items-start justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="relative flex-shrink-0">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={44}
                height={44}
                className="w-11 h-11 rounded-full object-cover"
              />
              {post.author.verified ? (
                <span className="absolute -bottom-0.5 -right-0.5 bg-primary rounded-full p-0.5 text-on-primary">
                  <MaterialIcon
                    name="verified"
                    filled
                    className="text-[11px]"
                  />
                </span>
              ) : null}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline text-title-sm text-on-surface truncate">
                  {post.author.name}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded-full font-headline text-label-sm ${roleTone[post.author.roleTone]}`}
                >
                  {post.author.role}
                </span>
                <span className="text-on-surface-variant font-body text-body-sm text-xs">
                  {post.time}
                </span>
              </div>
            </div>
          </div>
          <button
            type="button"
            aria-label="Opciones de publicación"
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container transition-colors"
          >
            <MaterialIcon name="more_horiz" className="text-[20px]" />
          </button>
        </div>

        <div className="px-space-md pt-space-md flex flex-wrap gap-2 items-center">
          {post.badges.map((badge) => (
            <span
              key={badge.text}
              className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full font-headline text-label-sm ${badgeTone[badge.tone]}`}
            >
              {badge.icon ? (
                <MaterialIcon
                  name={badge.icon}
                  filled
                  className="text-[15px]"
                />
              ) : null}
              <span>{renderStrong(badge.text, badge.strong)}</span>
            </span>
          ))}
        </div>

        <div className="px-space-md pt-space-sm">
          <h2 className="font-headline text-headline-md text-on-surface leading-snug">
            {post.title}
          </h2>
          <p className="font-body text-body-md text-on-surface-variant mt-space-xs leading-relaxed">
            {post.body}
          </p>
        </div>

        <div className="px-space-md pt-space-md">
          <div className="grid grid-cols-2 gap-2 rounded-lg overflow-hidden bg-surface-container">
            <div
              className={`col-span-2 relative ${mainHeight} rounded-t-lg overflow-hidden group`}
            >
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes="(min-width: 1024px) 720px, 100vw"
                className="object-cover"
              />
              {main.overlay ? (
                main.overlayType === "pill" ? (
                  <div className="absolute bottom-2 left-2 bg-on-background/60 backdrop-blur-md px-3 py-1 rounded-full text-on-tertiary-container flex items-center gap-1 font-headline text-label-sm">
                    {main.overlayIcon ? (
                      <MaterialIcon
                        name={main.overlayIcon}
                        className="text-[14px]"
                      />
                    ) : null}
                    <span>{main.overlay}</span>
                  </div>
                ) : (
                  <div className="absolute inset-0 bg-linear-to-t from-on-background/40 to-transparent flex items-end p-2">
                    <span className="text-on-primary font-headline text-label-sm">
                      {main.overlay}
                    </span>
                  </div>
                )
              ) : null}
            </div>
            <div
              className={`relative ${subHeight} rounded-bl-lg overflow-hidden`}
            >
              <Image
                src={secondary.src}
                alt={secondary.alt}
                fill
                sizes="(min-width: 1024px) 360px, 50vw"
                className="object-cover"
              />
              {secondary.overlay ? (
                <div className="absolute inset-0 bg-linear-to-t from-on-background/40 to-transparent flex items-end p-2">
                  <span className="text-on-primary font-headline text-label-sm">
                    {secondary.overlay}
                  </span>
                </div>
              ) : null}
            </div>
            <div
              className={`relative ${subHeight} rounded-br-lg overflow-hidden`}
            >
              <Image
                src={tertiary.src}
                alt={tertiary.alt}
                fill
                sizes="(min-width: 1024px) 360px, 50vw"
                className="object-cover"
              />
              {tertiary.badge ? (
                <div className="absolute bottom-2 right-2 bg-primary/85 backdrop-blur-md px-2 py-0.5 rounded-full text-on-primary font-headline text-label-sm flex items-center gap-1">
                  <span>{tertiary.badge}</span>
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="px-space-md pt-space-sm flex flex-wrap gap-1.5">
          {post.tags.map((tag, index) => {
            const isLast = index === post.tags.length - 1;
            return (
              <span
                key={tag}
                className={`font-headline text-label-sm px-2.5 py-1 rounded-full ${
                  isLast
                    ? "text-secondary bg-secondary-fixed/50"
                    : "text-primary bg-primary-fixed/40"
                }`}
              >
                {tag}
              </span>
            );
          })}
        </div>

        <div className="px-space-md pt-space-md pb-space-sm flex items-center justify-between text-on-surface-variant font-headline text-label-sm">
          <div className="flex items-center gap-1.5">
            <span aria-hidden="true" className="flex -space-x-1">
              {post.reactions.emojis.map((emoji, index) => (
                <span
                  key={emoji}
                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                    index === 0
                      ? "bg-tertiary text-on-tertiary"
                      : "bg-secondary-container text-on-secondary"
                  }`}
                >
                  {emoji}
                </span>
              ))}
            </span>
            <span className="text-on-surface font-semibold">{summary}</span>
          </div>
          <div className="flex items-center gap-3">
            <span>{post.reactions.comments} comentarios</span>
            <span>•</span>
            <span>Guardado {post.reactions.saves} veces</span>
          </div>
        </div>

        <div className="px-space-md py-space-sm bg-surface-container-low/40 flex items-center justify-between">
          <button
            type="button"
            onClick={
              post.interactive ? () => setLiked((value) => !value) : undefined
            }
            aria-pressed={post.interactive ? liked : undefined}
            className={`min-h-[44px] flex items-center gap-2 px-space-md rounded-full font-headline text-label-md transition-all active:scale-95 ${
              post.interactive && liked
                ? "bg-tertiary-fixed text-on-tertiary-fixed shadow-sm"
                : "bg-surface-container text-on-surface-variant"
            }`}
          >
            <MaterialIcon
              name="favorite"
              className={`text-[19px] ${
                post.interactive && !liked
                  ? "text-on-surface-variant"
                  : "text-tertiary"
              }`}
              filled={post.interactive ? liked : true}
            />
            <span className="font-bold">
              {post.interactive && liked ? "¡Me encanta!" : "Me gusta"}
            </span>
          </button>
          <button
            type="button"
            onClick={post.comments ? focusCommentInput : undefined}
            className="min-h-[44px] flex items-center gap-1.5 px-space-md rounded-full text-on-surface-variant hover:bg-surface-container-high transition-colors font-headline text-label-md"
          >
            <MaterialIcon name="chat_bubble_outline" className="text-[19px]" />
            <span>Comentar</span>
          </button>
          <button
            type="button"
            onClick={
              post.interactive ? () => setSaved((value) => !value) : undefined
            }
            aria-pressed={post.interactive ? saved : undefined}
            aria-label={
              post.interactive && saved
                ? "Quitar del álbum de Mateo"
                : "Guardar en el álbum de Mateo"
            }
            title="Guardar en el álbum de Mateo"
            className={`min-h-[44px] w-11 h-11 flex items-center justify-center rounded-full transition-colors ${
              post.interactive && saved
                ? "bg-primary-fixed text-on-primary-fixed-variant"
                : "text-on-surface-variant hover:bg-surface-container-high"
            }`}
          >
            <MaterialIcon
              name={post.interactive && saved ? "bookmark" : "bookmark_border"}
              filled={post.interactive && saved}
              className="text-[20px]"
            />
          </button>
        </div>
        {post.comments ? (
          <CommentsThread
            comments={post.comments}
            room={room}
            inputRef={commentInputRef}
          />
        ) : null}
      </div>
    </article>
  );
}

function renderStrong(text: string, strong?: string) {
  if (!strong) return text;
  const index = text.indexOf(strong);
  if (index === -1) return text;
  return (
    <>
      {text.slice(0, index)}
      <strong>{strong}</strong>
      {text.slice(index + strong.length)}
    </>
  );
}
