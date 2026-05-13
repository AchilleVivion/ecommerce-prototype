interface CartFooterProps {
  total: number;
}

export function CartFooter({ total }: CartFooterProps) {
  return (
    <div className="space-y-4 border-t p-4">
      <div className="flex items-center justify-between">
        <span className="text-lg font-semibold text-slate-900">Total:</span>
        <span className="text-2xl font-bold text-slate-900">
          ${total.toFixed(2)}
        </span>
      </div>
      <button
        type="button"
        className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
      >
        Checkout
      </button>
    </div>
  );
}
