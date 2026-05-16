import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface EntryStatusProps {
  isAccessible: boolean
}

export function EntryStatus({ isAccessible }: EntryStatusProps) {
  return (
    <div
      className={`flex items-start gap-4 rounded-xl border px-5 py-5 ${
        isAccessible
          ? 'border-primary/40 bg-spot-surface/60'
          : 'border-secondary/40 bg-secondary/10'
      }`}
    >
      {isAccessible ? (
        <CheckCircle size={20} className="mt-0.5 shrink-0 text-primary" />
      ) : (
        <XCircle size={20} className="mt-0.5 shrink-0 text-secondary" />
      )}
      <div className="spot-text-box min-w-0 flex-1 space-y-1.5">
        <p className={`text-sm font-semibold ${isAccessible ? 'text-gray-2' : 'text-secondary'}`}>
          {isAccessible ? '출입 가능' : '출입 불가'}
        </p>
        <p className="text-xs leading-relaxed text-spot-muted">
          {isAccessible
            ? '현재 일반인 출입이 허용된 장소입니다'
            : '사유지 또는 위험 구역으로 출입이 금지됩니다'}
        </p>
      </div>
      {!isAccessible && (
        <AlertTriangle size={16} className="mt-1 shrink-0 text-secondary" />
      )}
    </div>
  )
}
