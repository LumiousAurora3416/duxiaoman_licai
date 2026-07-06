import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: ProductCardProps) {
  return (
    <div className="card-soft p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl border-2 border-[#f3e2b8] bg-[#fffbeb] text-2xl">
          {product.icon}
        </div>
        <div>
          <h3 className="font-hand text-lg text-[#78350f]">{product.name}</h3>
          <p className="text-xs text-[#b0a08a]">{product.provider}</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2.5">
        <div className="rounded-2xl border-2 border-[#f3e2b8] bg-[#fffbeb] p-3 text-center">
          <p className="text-[10px] text-[#b0a08a]">年化收益率</p>
          <p className="font-hand text-xl text-[#d97706]">
            {product.annualYield}
          </p>
        </div>
        <div className="rounded-2xl border-2 border-[#f3e2b8] bg-[#fffbeb] p-3 text-center">
          <p className="text-[10px] text-[#b0a08a]">起投金额</p>
          <p className="font-hand text-xl text-[#78350f]">
            {product.minInvestment}
          </p>
        </div>
      </div>

      {!compact && (
        <>
          <div className="mb-3 rounded-2xl border-2 border-[#a7f3d0] bg-[#d1fae5] p-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-[#047857]">
              <span>🛡️</span> {product.safetyTag}
            </p>
            <p className="mt-0.5 text-[11px] leading-relaxed text-[#6b7280]">
              {product.safetyDetail}
            </p>
          </div>
          <p className="text-xs leading-relaxed text-[#7c6a55]">
            {product.description}
          </p>
        </>
      )}
    </div>
  );
}
