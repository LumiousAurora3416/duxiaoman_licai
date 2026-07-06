interface QuoteCardProps {
  quote: string;
  author: string;
}

export default function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div className="dialog-bubble p-5 pt-6">
      <p className="relative z-10 mb-2 text-sm leading-relaxed text-[#292524] italic">
        {quote}
      </p>
      <p className="text-right text-xs font-bold text-[#d97706]">
        — {author}
      </p>
    </div>
  );
}
