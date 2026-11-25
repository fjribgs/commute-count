"use client"

import { MoreHorizontal, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CommuteRoute {
  id: string
  name: string
  distance: string
  avgTraffic: string
  stdDeviation: string
  status: "Active" | "Saved"
}

const ROUTES_DATA: CommuteRoute[] = [
  {
    id: "1",
    name: "Cileunyi – Kampus UPI",
    distance: "24 km",
    avgTraffic: "25 min",
    stdDeviation: "σ = 15 min",
    status: "Active",
  },
  {
    id: "2",
    name: "Alternative Ring Road",
    distance: "28 km",
    avgTraffic: "12 min",
    stdDeviation: "σ = 9 min",
    status: "Saved",
  },
  {
    id: "3",
    name: "Weekend City Loop",
    distance: "16 km",
    avgTraffic: "18 min",
    stdDeviation: "σ = 10 min",
    status: "Saved",
  },
]

export default function RoutesSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-orange-2xl text-lg font-semibold tracking-tight">
          Saved Commute Routes
        </h2>

        <Button
          variant="outline"
          className="text-orange-2xl cursor-pointer rounded-lg border-slate-200 bg-white px-4 font-medium shadow-none hover:bg-slate-50"
        >
          <Plus className="mr-1.5 size-4" />
          Add Route
        </Button>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-medium text-slate-400">
                <th className="px-6 py-4 font-medium">Route Name</th>
                <th className="px-6 py-4 font-medium">Round-trip Distance</th>
                <th className="px-6 py-4 font-medium">Avg Traffic</th>
                <th className="px-6 py-4 font-medium">Std Deviation</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="w-12 px-6 py-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {ROUTES_DATA.map((route) => {
                const isActive = route.status === "Active"

                return (
                  <tr
                    key={route.id}
                    className={`transition ${
                      isActive ? "bg-orange-sm/60" : "hover:bg-slate-50/70"
                    }`}
                  >
                    <td className="text-orange-2xl px-6 py-4 font-medium">
                      {route.name}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-700">
                      {route.distance}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-700">
                      {route.avgTraffic}
                    </td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-700">
                      {route.stdDeviation}
                    </td>
                    <td className="px-6 py-4">
                      {isActive ? (
                        <span className="bg-orange-sm text-orange-xl inline-flex items-center rounded-full px-3 py-1 text-xs font-medium">
                          Active
                        </span>
                      ) : (
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">
                          Saved
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        type="button"
                        className="cursor-pointer rounded-md p-1 text-slate-400 hover:bg-slate-200/50 hover:text-slate-600"
                        aria-label={`Options for ${route.name}`}
                      >
                        <MoreHorizontal className="size-4" />
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}