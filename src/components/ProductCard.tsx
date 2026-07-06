import type { Product } from "@/data/products";

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export default function ProductCard({ product, compact }: ProductCardProps) {
  return (
    <div className="paper-card p-5">
      <div className="mb-4 flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fefce8]">
          <span className="text-2xl">{product.icon}</span>
        </div>
        <div>
          <h3 className="font-extrabold text-[#292524]">{product.name}</h3>
          <p className="text-xs text-[#a8a29e]">{product.provider}</p>
        </div>
      </div>

      <div className="mb-3 grid grid-cols-2 gap-2">
        <div className="rounded-2xl bg-[#fefce8] p-3 text-center">
          <p className="text-[10px] text-[#a8a29e]">年化收益率</p>
          <p className="text-lg font-extrabold text-[#d97706]">
            {product.annualYield}
          </p>
        </div>
        <div className="rounded-2xl bg-[#fefce8] p-3 text-center">
          <p className="text-[10px] text-[#a8a29e]">起投金额</p>
          <p className="text-lg font-extrabold text-[#292524]">
            {product.minInvestment}
          </p>
        </div>
      </div>

      {!compact && (
        <>
          <div className="mb-3 rounded-2xl bg-gradient-to-r from-[#d1fae5] to-[#a7f3d0] p-3">
            <p className="flex items-center gap-1.5 text-sm font-bold text-[#047857]">
              <span>🛡️</span> {product.safetyTag}
            </p>
            <p className="mt-0.5 text-[11px] text-[#6b7280] leading-relaxed">
              {product.safetyDetail}
            </p>
          </div>
          <p className="text-xs text-[#57534e] leading-relaxed">
            {product.description}
          </p>
        </>
      )}
    </div>
  );
}
