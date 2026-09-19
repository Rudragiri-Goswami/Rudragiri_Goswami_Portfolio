import React from "react";

/** Renders ordinals like "Ranked 8th out of 135+ Teams Nationwide" with superscript suffixes. */
export function OrdinalText({ text }: { text: string }) {
  const regex = /(\d+)(st|nd|rd|th)\b/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(
      <React.Fragment key={match.index}>
        {match[1]}
        <sup className="text-[0.65em]">{match[2]}</sup>
      </React.Fragment>,
    );
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}
