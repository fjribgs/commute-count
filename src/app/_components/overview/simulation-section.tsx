"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

export default function SimulationParameters() {
  const [vehicle, setVehicle] = useState("honda-beat")
  const [distance, setDistance] = useState("24")
  const [commuteDays, setCommuteDays] = useState(22)
  const [trafficDelay, setTrafficDelay] = useState("25")
  const [variability, setVariability] = useState<"low" | "medium" | "high">("medium")
  const [budget, setBudget] = useState("300.000")

  return (
    <section className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs p-5 sm:p-6">
        {/* Header */}
        <div className="flex flex-col gap-1">
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            Simulation Parameters
          </h2>
          <p className="text-sm text-slate-500">
            Make the model fit your daily routine.
          </p>
        </div>

        {/* Save Scenario Button */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 px-4 text-center text-sm font-semibold text-slate-900 shadow-2xs hover:bg-slate-50 transition cursor-pointer"
          >
            Save Scenario
          </button>
        </div>

        {/* Divider */}
        <div className="my-5 border-t border-slate-100" />

        {/* Form Fields */}
        <div className="space-y-5">
          {/* Vehicle & Fuel */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Vehicle & fuel
            </label>
            <div className="relative">
              <select
                value={vehicle}
                onChange={(e) => setVehicle(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-10 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition cursor-pointer"
              >
                <option value="honda-beat">Honda Beat — Pertalite (Rp 10.000/L)</option>
                <option value="honda-vario">Honda Vario — Pertamax (Rp 12.500/L)</option>
                <option value="yamaha-nmax">Yamaha NMAX — Pertamax (Rp 12.500/L)</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-slate-500" />
            </div>
          </div>

          {/* Daily Round-trip Distance */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Daily round-trip distance
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={distance}
                onChange={(e) => setDistance(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-12 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="24"
              />
              <span className="absolute right-3.5 text-xs sm:text-sm text-slate-500 font-medium">
                km
              </span>
            </div>
          </div>

          {/* Active Commute Days */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs sm:text-sm">
              <span className="font-medium text-slate-700">Active commute days</span>
              <span className="font-semibold text-slate-900">
                {commuteDays} <span className="font-normal text-slate-600">days / month</span>
              </span>
            </div>

            {/* Range Slider */}
            <div className="relative flex items-center py-1">
              <input
                type="range"
                min="1"
                max="31"
                value={commuteDays}
                onChange={(e) => setCommuteDays(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-orange-lg"
              />
            </div>
          </div>

          {/* Average Daily Traffic Delay */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Average daily traffic delay
            </label>
            <div className="relative flex items-center">
              <input
                type="number"
                value={trafficDelay}
                onChange={(e) => setTrafficDelay(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium text-slate-900 pr-12 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="25"
              />
              <span className="absolute right-3.5 text-xs sm:text-sm text-slate-500 font-medium">
                min
              </span>
            </div>
          </div>

          {/* Traffic Variability / Uncertainty */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Traffic variability / uncertainty
            </label>
            <div className="grid grid-cols-3 gap-1 rounded-xl border border-slate-200/80 bg-slate-50/50 p-1">
              <button
                type="button"
                onClick={() => setVariability("low")}
                className={`rounded-lg py-2 text-center text-xs font-medium transition cursor-pointer ${
                  variability === "low"
                    ? "bg-orange-lg text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Low (±5m)
              </button>
              <button
                type="button"
                onClick={() => setVariability("medium")}
                className={`rounded-lg py-2 text-center text-xs font-medium transition cursor-pointer ${
                  variability === "medium"
                    ? "bg-orange-lg text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                Medium (±15m)
              </button>
              <button
                type="button"
                onClick={() => setVariability("high")}
                className={`rounded-lg py-2 text-center text-xs font-medium transition cursor-pointer ${
                  variability === "high"
                    ? "bg-orange-lg text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                High (±30m)
              </button>
            </div>
          </div>

          {/* Target Monthly Budget */}
          <div className="space-y-2">
            <label className="text-xs sm:text-sm font-medium text-slate-700">
              Target monthly budget
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-3.5 text-xs sm:text-sm text-slate-900 font-medium">
                Rp
              </span>
              <input
                type="text"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3.5 py-3 text-sm font-medium text-slate-900 focus:border-amber-500 focus:outline-hidden focus:ring-2 focus:ring-amber-500/20 transition"
                placeholder="300.000"
              />
            </div>
          </div>

          {/* Run Simulation CTA Button */}
          <div className="pt-2">
            <button
              type="button"
              className="w-full rounded-xl bg-orange-lg py-3.5 px-4 text-center text-sm font-semibold text-slate-950 hover:opacity-90 active:scale-[0.99] transition shadow-xs cursor-pointer"
            >
              Run 5,000 Monte Carlo Simulations
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
