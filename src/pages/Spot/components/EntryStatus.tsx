import { AlertTriangle, CheckCircle, XCircle } from 'lucide-react'

interface EntryStatusProps {
  isAccessible: boolean
}

export function EntryStatus({ isAccessible }: EntryStatusProps) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
        isAccessible
          ? 'border-emerald-700/50 bg-emerald-950/40'
          : 'border-red-700/50 bg-red-950/40'
      }`}
    >
      {isAccessible ? (
        <CheckCircle size={22} className="shrink-0 text-emerald-400" />
      ) : (
        <XCircle size={22} className="shrink-0 text-red-400" />
      )}
      <div className="flex-1">
        <p className={`font-semibold ${isAccessible ? 'text-emerald-400' : 'text-red-400'}`}>
          {isAccessible ? '출입 가능' : '출입 불가'}
        </p>
        <p className="text-xs text-gray-500">
          {isAccessible
            ? '현재 일반인 출입이 허용된 장소입니다'
            : '사유지 또는 위험 구역으로 출입이 금지됩니다'}
        </p>
      </div>
      {!isAccessible && <AlertTriangle size={18} className="shrink-0 text-yellow-500" />}
    </div>
  )
}
