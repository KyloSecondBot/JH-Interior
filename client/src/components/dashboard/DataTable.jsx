import { useState, useEffect } from 'react';
import { Pencil, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import ConfirmModal from './ConfirmModal';

/**
 * Reusable table component for dashboard manager pages.
 *
 * Props:
 *  columns   — array of { key, label, render?, mobileHide? }
 *  rows      — array of data objects
 *  onEdit    — (row) => void
 *  onDelete  — async (id) => void
 *  onReorder — async (newOrderedRows) => void   (enables ↑↓ buttons)
 *  keyField  — string (default 'id')
 *  emptyText — string
 */
export default function DataTable({
  columns = [],
  rows = [],
  onEdit,
  onDelete,
  onReorder,
  keyField = 'id',
  emptyText = 'No records yet.',
}) {
  const [confirmId, setConfirmId] = useState(null);
  const [deleting, setDeleting]   = useState(false);

  // Optimistic local ordering so the swap feels instant
  const [localRows, setLocalRows] = useState(null);
  useEffect(() => { setLocalRows(null); }, [rows]);

  const effectiveRows = onReorder ? (localRows ?? rows) : rows;

  async function handleDelete() {
    setDeleting(true);
    try {
      await onDelete(confirmId);
    } finally {
      setDeleting(false);
      setConfirmId(null);
    }
  }

  function move(index, direction) {
    const current = localRows ?? rows;
    const next = [...current];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    setLocalRows(next);   // show immediately
    onReorder(next);      // persist to DB
  }

  const extraCols = (onReorder ? 1 : 0) + (onEdit || onDelete ? 1 : 0);

  return (
    <>
      <div className="overflow-x-auto rounded-2xl border border-white/8">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/8 bg-white/3">
              {onReorder && <th className="w-12 px-3 py-3" />}
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={`px-4 py-3 text-left text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40${col.mobileHide ? ' hidden sm:table-cell' : ''}`}
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-4 py-3 text-right text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {effectiveRows.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + extraCols}
                  className="px-4 py-10 text-center text-sm text-white/30"
                >
                  {emptyText}
                </td>
              </tr>
            ) : (
              effectiveRows.map((row, index) => (
                <tr
                  key={row[keyField]}
                  className="border-b border-white/5 transition hover:bg-white/3 last:border-0"
                >
                  {onReorder && (
                    <td className="px-3 py-2">
                      <div className="flex flex-col gap-0.5">
                        <button
                          type="button"
                          onClick={() => move(index, -1)}
                          disabled={index === 0}
                          className="rounded p-0.5 text-white/30 transition hover:bg-white/8 hover:text-white disabled:opacity-20 disabled:cursor-default"
                          title="Move up"
                        >
                          <ChevronUp className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => move(index, 1)}
                          disabled={index === effectiveRows.length - 1}
                          className="rounded p-0.5 text-white/30 transition hover:bg-white/8 hover:text-white disabled:opacity-20 disabled:cursor-default"
                          title="Move down"
                        >
                          <ChevronDown className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  )}
                  {columns.map((col) => (
                    <td key={col.key} className={`px-4 py-3 text-white/75${col.mobileHide ? ' hidden sm:table-cell' : ''}`}>
                      {col.render ? col.render(row[col.key], row) : (row[col.key] ?? '—')}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(row)}
                            className="rounded-lg border border-white/10 bg-white/5 p-1.5 text-white/50 transition hover:bg-white/10 hover:text-white"
                            title="Edit"
                          >
                            <Pencil className="h-3.5 w-3.5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => setConfirmId(row[keyField])}
                            className="rounded-lg border border-red-500/20 bg-red-500/10 p-1.5 text-red-400/70 transition hover:bg-red-500/20 hover:text-red-400"
                            title="Delete"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <ConfirmModal
        open={confirmId !== null}
        title="Delete record"
        message="This will permanently delete the record. This cannot be undone."
        onConfirm={handleDelete}
        onCancel={() => setConfirmId(null)}
        loading={deleting}
      />
    </>
  );
}
