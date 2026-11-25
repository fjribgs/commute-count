"use client"

import React from "react"

export default function KPISection() {
  // Data histogram bar distribusi Monte Carlo (simulated outcomes)
  // Menyerupai kurva lonceng Gaussian/Normal Distribution
  const distributionBars = [
    2, 3, 5, 8, 12, 16, 22, 28, 38, 48, 58, 68, 76, 88, 98, 92, 100, 94, 90, 80, 68, 56, 44, 34, 26, 18, 12, 8, 5, 3, 2
  ]

  // Path SVG untuk kurva densitas probabilitas (garis oranye)
  // ViewBox: 0 0 1000 300
  const smoothCurvePath =
    "M 40 285 C 120 282 220 260 320 215 C 400 170 460 70 520 65 C 580 65 640 160 720 215 C 800 260 900 282 960 285"

  return (
    <div className="space-y-4 w-full">
      {/* 1. Grid 4 KPI Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
        {/* Card 1: Expected Monthly Cost */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Expected Monthly Cost
            </span>
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              Rp 285.400
            </div>
          </div>
          <div className="pt-4">
            <span className="inline-flex items-center rounded-full bg-orange-sm px-2.5 py-0.5 text-xs font-semibold text-orange-xl">
              Mean E[X]
            </span>
          </div>
        </div>

        {/* Card 2: 95% Confidence Range */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              95% Confidence Range
            </span>
            <div className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900 font-mono">
              Rp 245k <span className="font-sans font-normal text-slate-400">–</span> Rp 335k
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            Best to Worst Case
          </div>
        </div>

        {/* Card 3: Traffic Congestion Penalty */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Traffic Congestion Penalty
            </span>
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              Rp 75.200
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            26.3% of total fuel cost
          </div>
        </div>

        {/* Card 4: Budget Safety Probability */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xs flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs sm:text-sm font-medium text-slate-500">
              Budget Safety Probability
            </span>
            <div className="text-2xl sm:text-[1.75rem] font-bold tracking-tight text-slate-900 font-mono">
              78.4%
            </div>
          </div>
          <div className="pt-4 text-xs font-medium text-slate-500">
            Chance of staying &le; Rp 300k
          </div>
        </div>
      </div>

      {/* 2. Main Card: Monthly Fuel Cost Probability Distribution */}
      <div className="rounded-2xl border border-slate-200/80 bg-white p-5 sm:p-6 shadow-xs">
        {/* Header & Badges */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-bold tracking-tight text-slate-900">
              Monthly Fuel Cost Probability Distribution
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
              N = 5,000 Runs · Based on your current commute assumptions
            </p>
          </div>
          <span className="self-start sm:self-auto rounded-full bg-orange-sm px-3.5 py-1 text-xs font-semibold text-orange-xl">
            Monte Carlo
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 mt-4 text-xs font-medium text-slate-600">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded-xs bg-orange-md" />
            <span>Simulated outcomes</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-0.5 w-4 bg-orange-lg rounded-full" />
            <span>Probability density</span>
          </div>
        </div>

        {/* Interactive Responsive SVG Distribution Chart */}
        <div className="mt-6 w-full overflow-x-auto">
          <div className="min-w-155 relative pt-6 pb-2">
            {/* Markers: Mean & 95th Percentile */}
            <div className="absolute top-0 left-0 right-0 h-6 pointer-events-none">
              {/* Mean (Rp 285k) Marker */}
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: "52%" }}
              >
                <div className="rounded-full bg-orange-sm px-2.5 py-0.5 text-[11px] font-semibold text-orange-xl shadow-2xs whitespace-nowrap border border-amber-200/50">
                  Mean (Rp 285k)
                </div>
              </div>

              {/* 95th Percentile (Rp 335k) Marker */}
              <div
                className="absolute -translate-x-1/2 flex flex-col items-center"
                style={{ left: "74%" }}
              >
                <div className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-semibold text-slate-700 shadow-2xs whitespace-nowrap border border-slate-200/60">
                  95th Percentile (Rp 335k)
                </div>
              </div>
            </div>

            {/* Chart Body: Grid & Bars */}
            <div className="relative h-60 w-full mt-2">
              {/* Horizontal Gridlines & Y-Axis Labels */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[11px] font-medium text-slate-400">
                <div className="flex items-center w-full">
                  <span className="w-8 shrink-0">500</span>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8 shrink-0">375</span>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8 shrink-0">250</span>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8 shrink-0">125</span>
                  <div className="h-px w-full bg-slate-100" />
                </div>
                <div className="flex items-center w-full">
                  <span className="w-8 shrink-0">0</span>
                  <div className="h-px w-full bg-slate-200" />
                </div>
              </div>

              {/* Vertical Dashed Lines for Markers */}
              <div
                className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-amber-400/80 pointer-events-none"
                style={{ left: "52%" }}
              />
              <div
                className="absolute top-0 bottom-0 w-px border-l-2 border-dashed border-slate-300 pointer-events-none"
                style={{ left: "74%" }}
              />

              {/* Histogram Bars */}
              <div className="absolute inset-0 pl-10 pr-2 flex items-end justify-between gap-1 pointer-events-none">
                {distributionBars.map((val, idx) => (
                  <div
                    key={idx}
                    className="flex-1 bg-orange-md rounded-t-xs hover:bg-orange-lg transition-colors"
                    style={{ height: `${val * 0.9}%` }}
                  />
                ))}
              </div>

              {/* Smooth Orange Probability Density SVG Line */}
              <svg
                className="absolute inset-0 pl-10 pr-2 h-full w-full pointer-events-none overflow-visible"
                viewBox="0 0 1000 300"
                preserveAspectRatio="none"
              >
                <path
                  d={smoothCurvePath}
                  fill="none"
                  stroke="#FFA001"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* X-Axis Labels */}
            <div className="flex justify-between pl-10 pr-2 pt-3 text-[11px] font-mono text-slate-500">
              <span>Rp 180k</span>
              <span>Rp 220k</span>
              <span>Rp 260k</span>
              <span>Rp 300k</span>
              <span>Rp 340k</span>
              <span>Rp 380k</span>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-slate-100" />

        {/* Footer Statement */}
        <p className="text-xs sm:text-sm font-medium text-slate-700">
          <span className="font-semibold text-slate-900">78.4%</span> of simulated months stay within your Rp 300.000 budget.
        </p>
      </div>

      {/* 3. Callout Box: A little buffer goes a long way */}
      <div className="rounded-2xl border border-amber-200/60 bg-orange-sm p-5 shadow-2xs space-y-1">
        <h3 className="text-sm sm:text-base font-bold text-slate-900">
          A little buffer goes a long way.
        </h3>
        <p className="text-xs sm:text-sm text-slate-700">
          Set aside Rp 335.000 to cover the higher-cost end of your estimated range.
        </p>
      </div>
    </div>
  )
}
