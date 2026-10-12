import { AlertCircle, RefreshCw } from "lucide-react";

export function ErrorMessage({ message, onRetry }) {
  return (
    <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 mb-4 flex items-center gap-3">
      <AlertCircle className="text-red-400 shrink-0" size={20} />
      <div className="flex-1">
        <p className="text-sm text-red-400">
          {message || "Something went wrong"}
        </p>
      </div>
      {onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-1 px-3 py-1.5 bg-red-500/20 text-red-400 rounded-lg text-xs hover:bg-red-500/30 transition-colors"
        >
          <RefreshCw size={12} /> Retry
        </button>
      )}
    </div>
  );
}
