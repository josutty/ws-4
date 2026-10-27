import { useState } from 'react';

const groups = ['Vertical', 'Sub-vertical', 'MPG', 'Tonnage', 'AC / Non-AC', 'Segment', 'FERT'];

export function IndentRollup() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section className="space-y-3 bg-surface p-4 text-fg" aria-labelledby="rollup-title">
      <div className="flex items-center justify-between">
        <h2 id="rollup-title" className="text-sm font-semibold">Rollup</h2>
        <span className="text-sm text-muted">52 of 52 lines — workbook filters applied</span>
      </div>
      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Group by">
        <span className="text-sm font-semibold">Group by</span>
        {groups.map((group) => (
          <button
            className="rounded px-3 py-1.5 text-xs"
            data-state={group === 'Sub-vertical' ? 'on' : 'off'}
            key={group}
            type="button"
            onClick={() => setExpanded(false)}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="overflow-x-auto rounded border border-border">
        <table className="min-w-[980px] w-full border-collapse text-left">
          <thead className="text-xs uppercase text-muted">
            <tr>
              <th className="px-3 py-2">SUB-VERTICAL</th>
              <th colSpan={8} className="px-3 py-2">YOUR INDENT · JULY 2026</th>
              <th className="px-3 py-2">Demand mix</th>
              <th className="px-3 py-2">Stock</th>
              <th className="px-3 py-2">Off L3</th>
              <th className="px-3 py-2">Ret L3</th>
              <th className="px-3 py-2">Δ vs last</th>
            </tr>
          </thead>
          <tbody>
            <tr aria-label="FERT">
              <th scope="row" className="px-3 py-2 font-medium">
                <button type="button" aria-label={expanded ? 'Collapse FERT' : 'Expand FERT'} onClick={() => setExpanded(!expanded)}>
                  {expanded ? '▾' : '▸'} FERT
                </button>
              </th>
              <td className="px-3 py-2">46</td>
              <td className="px-3 py-2">52</td>
              <td className="px-3 py-2">48</td>
              <td className="px-3 py-2">50</td>
              <td className="px-3 py-2">196</td>
              <td className="px-3 py-2">600</td>
              <td className="px-3 py-2">433</td>
              <td className="px-3 py-2">37</td>
               <td className="px-3 py-2">600</td>
               <td className="px-3 py-2">162</td>
               <td className="px-3 py-2">105</td>
               <td className="px-3 py-2">34</td>
               <td className="px-3 py-2 text-success">+7%</td>
              <td className="px-3 py-2">–</td>
            </tr>
            {expanded && (
              <tr aria-label="Total" role="row" className="font-semibold">
                <th scope="row" className="px-3 py-2">Total</th>
                <td colSpan={8} className="px-3 py-2">Total</td>
                <td className="px-3 py-2">600</td>
                <td className="px-3 py-2">162</td>
                <td className="px-3 py-2">105</td>
                <td className="px-3 py-2">34</td>
               <td className="px-3 py-2">+7%</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <p className="sr-only">Empty values are shown as –.</p>
    </section>
  );
}
