"use client";

import { AlertCircle } from "lucide-react";
import { BudgetInfo } from "@/types";

interface BudgetOverviewProps {
  budget: BudgetInfo;
}

export default function BudgetOverview({ budget }: BudgetOverviewProps) {
  const percentage =
    budget.total > 0
      ? ((budget.total - budget.remaining) / budget.total) * 100
      : 0;

  return (
    <div className="card rounded-2xl p-8">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h2 className="text-xl font-bold text-[#222831] mb-2">
            Budget Overview
          </h2>
          <p className="text-[#393E46]">
            Track your travel expenses at a glance
          </p>
        </div>
        <div className="flex items-center gap-8">
          <div className="text-center">
            <p className="text-sm text-[#393E46] mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-[#222831]">
              ₹{Math.round(budget.total || 0).toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-px bg-[#EEEEEE]" />
          <div className="text-center">
            <p className="text-sm text-[#393E46] mb-1">Spent</p>
            <p className="text-2xl font-bold text-[#00ADB5]">
              ₹
              {Math.round(
                (budget.flights || 0) + (budget.hotels || 0),
              ).toLocaleString()}
            </p>
          </div>
          <div className="h-12 w-px bg-[#EEEEEE]" />
          <div className="text-center">
            <p className="text-sm text-[#393E46] mb-1">Remaining</p>
            <p
              className={`text-2xl font-bold ${
                (budget.remaining || 0) < 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              ₹{Math.round(budget.remaining || 0).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6">
        <div className="h-3 bg-[#EEEEEE] rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage > 90
                ? "bg-red-500"
                : percentage > 70
                  ? "bg-yellow-500"
                  : "bg-gradient-to-r from-[#00ADB5] to-[#009ca3]"
            }`}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
        <div className="flex justify-between mt-2 text-sm">
          <span className="text-[#393E46]">
            Flights: ₹{Math.round(budget.flights || 0).toLocaleString()}
          </span>
          <span className="text-[#393E46]">
            Hotels: ₹{Math.round(budget.hotels || 0).toLocaleString()}
          </span>
        </div>
      </div>
      {budget.exceeded && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
          <AlertCircle size={20} className="text-red-500" />
          <p className="text-red-600 text-sm">
            Budget exceeded! Consider adjusting your plans or increasing your
            budget.
          </p>
        </div>
      )}
    </div>
  );
}
