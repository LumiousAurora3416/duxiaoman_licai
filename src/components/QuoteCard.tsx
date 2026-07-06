interface QuoteCardProps {
  quote: string;
  author: string;
}

export default function QuoteCard({ quote, author }: QuoteCardProps) {
  return (
    <div className="cloud cloud-tail px-5 py-5">
      <span className="mb-1 block font-hand text-2xl leading-none text-[#fcd34d]">
        &ldquo;
      </span>
      <p className="font-hand text-base leading-relaxed text-[#78350f]">
        {quote}
      </p>
      <p className="mt-2 text-right text-xs font-bold text-[#d97706]">
        —— {author}
      </p>
    </div>
  );
}
