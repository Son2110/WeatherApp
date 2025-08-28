export default function ErrorBox({ message, OnRetry }) {
  return (
    <div className="mt-3 rounded-xl border-red-300 bg-red-50 text-red-700 p-3">
      <div className="text-sm">{message}</div>
      {OnRetry && (
        <button
          onClick={OnRetry}
          className="mt-2 text-xs px-2 py-1 rounded border"
        >
          Retry
        </button>
      )}
    </div>
  );
}
