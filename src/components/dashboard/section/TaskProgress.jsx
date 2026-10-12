export default function TaskProgress() {
  return (
    <div
      className="w-100 md:w-50 rounded-xl p-5 border mt-2"
      style={{
        text: "var(--text)",
        borderColor:'var(--border)',
        background:'var(--card)'
      }}
    >
      {/* Title */}
      <h2 className="mb-5 text-lg font-semibold">
        Task Progress
      </h2>

      {/* Progress */}
      <div  className="flex flex-col items-center">
        <div className="relative w-25 h-25 flex items-center justify-center m-auto">
                <svg
                  className="absolute"
                  width="110"
                  height="110"
                  viewBox="0 0 300 300"
                >
                  {/* دایره پس‌زمینه */}
                  <circle 
                    cx="150"
                    cy="150"
                    r="120"
                    stroke="#9d2d3a"
                    strokeWidth="10"
                    fill="none"
                  />

                {/* دایره پیشرفت */}
                <circle 
                  cx="150"
                  cy="150"
                  r="120"
                  stroke="#81bcf6"
                  strokeWidth="10"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 150 150)"
                />
              </svg>
              <div className="text-center">
            <p className="text-xl font-bold">75%</p>
            <p
              className="text-xs opacity-70"
              style={{ color: "var(--text)" }}
            >
              Completed
            </p>
          </div>
            </div>
      </div>

      {/* Stats */}
      <div className="mt-6 space-y-4">

        {/* Completed */}
        <div className="flex items-center justify-between">
          <span className="text-sm">
            🟢 Completed
          </span>

          <span className="font-semibold">
            12
          </span>
        </div>

        {/* Pending */}
        <div className="flex items-center justify-between">
          <span className="text-sm">
            🟡 Pending
          </span>

          <span className="font-semibold">
            4
          </span>
        </div>

        {/* Total */}
        <div
          className="flex items-center justify-between border-t pt-4"
          style={{ borderColor: "var(--border)" }}
        >
          <span className="text-sm font-medium">
            Total Tasks
          </span>

          <span className="font-bold">
            16
          </span>
        </div>

      </div>
    </div>
  );
}