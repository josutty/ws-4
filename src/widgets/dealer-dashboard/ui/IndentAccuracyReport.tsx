import { useState } from 'react';

type View = 'outlet' | 'vehicle';

const weeks = ['W1', 'W2', 'W3', 'W4'];
const months = ['JUL', 'AUG', 'SEP', 'TOTAL'];

function value(value: string | null) {
  return value ?? '–';
}

export function IndentAccuracyReport() {
  const [view, setView] = useState<View>('outlet');

  return (
    <section className="space-y-4 bg-surface p-4 text-fg" aria-labelledby="indent-report-title">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm font-semibold">Your indent accuracy</p>
          <div className="flex items-baseline gap-3">
            <strong className="text-2xl">94%</strong>
            <span className="text-sm">4-cycle average</span>
            <span className="text-success">+7%</span>
            <span className="text-sm">bias</span>
          </div>
          <div className="mt-2 flex gap-4 text-sm font-semibold">
            <span>Indent</span>
            <span>offtake</span>
          </div>
        </div>
        <button className="rounded border border-border px-3 py-1.5 text-sm" type="button">
          ▸ View report card
        </button>
      </div>

      <div className="space-y-3">
        <h2 id="indent-report-title" className="text-base font-semibold">
          Indent accuracy — last four cycles
        </h2>
        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded px-3 py-1.5 text-sm"
            data-state={view === 'outlet' ? 'on' : 'off'}
            type="button"
            onClick={() => setView('outlet')}
          >
            By outlet
          </button>
          <button
            className="rounded px-3 py-1.5 text-sm"
            data-state={view === 'vehicle' ? 'on' : 'off'}
            type="button"
            onClick={() => setView('vehicle')}
          >
            By vehicle
          </button>
          <span className="text-sm">Monthly</span>
        </div>
        {view === 'vehicle' ? (
          <div className="rounded border border-border p-4 text-sm" role="status">
            <p className="font-semibold">Vehicle</p>
            <p>No vehicle history</p>
            <p>{value(null)}</p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded border border-border">
            <table className="min-w-[920px] w-full border-collapse text-left">
              <thead>
                <tr className="text-xs uppercase text-muted">
                  <th scope="col" rowSpan={2} className="sticky left-0 bg-surface px-3 py-2">
                    Outlet
                  </th>
                  <th scope="col" rowSpan={2} className="px-3 py-2">Vehicle</th>
                  <th scope="col" rowSpan={2} className="px-3 py-2">Accuracy</th>
                  <th scope="col" rowSpan={2} className="px-3 py-2">Bias</th>
                  <th scope="col" colSpan={4} aria-label="YOUR INDENT" className="px-3 py-2">
                    <span>YOUR INDENT</span>
                    <span className="sr-only" role="columnheader" aria-label="W1" />
                    <span className="sr-only" role="columnheader" aria-label="W2" />
                    <span className="sr-only" role="columnheader" aria-label="W3" />
                    <span className="sr-only" role="columnheader" aria-label="W4" />
                  </th>
                  <th scope="col" colSpan={4} aria-label="JULY 2026" className="px-3 py-2">
                    <span aria-hidden="true">JULY 2026</span>
                  </th>
                </tr>
                <tr className="text-xs uppercase text-muted">
                  {[...weeks, ...months].map((label) => (
                    <th scope="col" key={label} className="px-3 py-2">
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row" className="sticky left-0 bg-surface px-3 py-2 font-medium">Outlet</th>
                  <td className="px-3 py-2">FERT</td>
                  <td className="px-3 py-2 text-success">94%</td>
                  <td className="px-3 py-2">+7%</td>
                  <td className="px-3 py-2">46</td>
                  <td className="px-3 py-2">52</td>
                  <td className="px-3 py-2">48</td>
                  <td className="px-3 py-2">50</td>
                  <td className="px-3 py-2">196</td>
                  <td className="px-3 py-2">201</td>
                  <td className="px-3 py-2">198</td>
                  <td className="px-3 py-2">200</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
