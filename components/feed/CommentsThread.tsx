"use client";

import { useState, type RefObject } from "react";
import { MaterialIcon } from "@/components/ui/MaterialIcon";
import type { FeedComment } from "@/lib/feed-data";

type CommentsThreadProps = {
  comments: FeedComment[];
  room: string;
  inputRef: RefObject<HTMLTextAreaElement | null>;
};

const quickEmojis = ["❤️", "👏", "⭐", "🥰"];

export function CommentsThread({
  comments,
  room,
  inputRef,
}: CommentsThreadProps) {
  const [items, setItems] = useState(comments);
  const [draft, setDraft] = useState("");

  function insertEmoji(emoji: string) {
    setDraft((current) => `${current}${emoji} `);
    inputRef.current?.focus();
  }

  function submitComment() {
    const body = draft.trim();
    if (!body) return;

    setItems((current) => [
      ...current,
      {
        id: `local-${current.length + 1}`,
        author: "Tú (Familia de Mateo)",
        time: "Ahora mismo",
        body,
        avatarIcon: "person",
        tone: "family",
        fresh: true,
      },
    ]);
    setDraft("");
  }

  return (
    <div className="p-space-md bg-surface-container-low flex flex-col gap-space-sm">
      <div className="flex items-center justify-between mb-1">
        <span className="font-headline text-label-sm text-on-surface-variant flex items-center gap-1">
          <MaterialIcon name="groups" className="text-[15px] text-primary" />
          Muro de familias • {room}
        </span>
        <span className="font-headline text-label-sm text-primary">
          Visible para toda la sala
        </span>
      </div>

      {items.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}

      <div className="mt-space-xs bg-surface-container-lowest p-space-sm rounded-lg shadow-sm">
        <div className="flex items-center gap-1 pb-1.5 mb-1.5">
          <span className="font-headline text-label-sm text-on-surface-variant">
            Reacciones rápidas:
          </span>
          <div className="flex gap-1 ml-1">
            {quickEmojis.map((emoji) => (
              <button
                key={emoji}
                type="button"
                aria-label={`Insertar emoji ${emoji}`}
                onClick={() => insertEmoji(emoji)}
                className="px-2 py-0.5 rounded-full bg-surface-container-low hover:bg-surface-container text-xs transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-end gap-2">
          <div className="flex-1 min-w-0">
            <textarea
              ref={inputRef}
              aria-label="Escribe un mensaje de apoyo para la clase o para la maestra"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              rows={2}
              placeholder="Escribe un mensaje de apoyo para la clase o para la maestra..."
              className="w-full bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 rounded-xl px-3 py-2 text-body-sm font-body focus:outline-none focus:bg-surface-container-lowest focus:shadow-[0_0_0_2px_#00685f] resize-none transition-all"
            />
          </div>
          <button
            type="button"
            aria-label="Enviar mensaje"
            onClick={submitComment}
            className="min-h-[44px] min-w-[44px] rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md active:scale-95 hover:bg-primary-container transition-all flex-shrink-0"
          >
            <MaterialIcon name="send" className="text-[20px]" />
          </button>
        </div>
        <div className="flex items-center justify-between mt-2 pt-1">
          <span className="font-headline text-label-sm text-on-surface-variant flex items-center gap-1">
            <MaterialIcon
              name="visibility"
              className="text-[13px] text-primary"
            />
            Visible para las familias de {room}
          </span>
          <span
            aria-live="polite"
            className="font-headline text-label-sm text-on-surface-variant/70"
          >
            {draft.length}/180
          </span>
        </div>
      </div>
    </div>
  );
}

function CommentItem({ comment }: { comment: FeedComment }) {
  if (comment.nested) {
    return (
      <div className="ml-6 bg-primary-fixed/20 p-space-sm rounded-lg flex items-start gap-space-sm shadow-sm">
        <span className="w-7 h-7 rounded-full bg-primary flex items-center justify-center text-on-primary flex-shrink-0 mt-0.5">
          <MaterialIcon
            name={comment.avatarIcon}
            className="text-[14px]"
          />
        </span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="font-headline text-label-sm text-primary font-bold">
              {comment.author}
            </span>
            {comment.badge ? (
              <span className="font-headline text-label-sm bg-primary text-on-primary px-1.5 rounded-full text-[10px]">
                {comment.badge}
              </span>
            ) : null}
          </div>
          <p className="font-body text-body-sm text-on-surface-variant mt-0.5 leading-snug">
            {comment.body}
          </p>
        </div>
      </div>
    );
  }

  const isFamily = comment.tone === "family";

  return (
    <div
      className={`bg-surface-container-lowest p-space-sm rounded-lg flex items-start gap-space-sm shadow-sm ${
        comment.fresh ? "animate-fade-in" : ""
      }`}
    >
      <span
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
          isFamily
            ? "bg-primary text-on-primary"
            : "bg-secondary-container text-on-secondary"
        }`}
      >
        <MaterialIcon name={comment.avatarIcon} className="text-[16px]" />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className="font-headline text-label-md text-on-surface font-bold">
            {comment.author}
          </span>
          <span
            className={`font-headline text-label-sm ${
              comment.fresh
                ? "text-primary font-semibold"
                : "text-on-surface-variant"
            }`}
          >
            {comment.time}
          </span>
        </div>
        <p className="font-body text-body-sm text-on-surface mt-1 leading-snug">
          {comment.body}
        </p>
      </div>
    </div>
  );
}
