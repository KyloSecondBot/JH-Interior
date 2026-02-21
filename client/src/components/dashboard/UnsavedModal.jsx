import { motion } from 'framer-motion';

export default function UnsavedModal({
  onLeave,
  onStay,
  title = 'Unsaved changes',
  message = 'Leave this page? Any changes you made will be lost.',
  leaveLabel = 'Leave page',
  stayLabel = 'Keep editing',
}) {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onStay}
      />

      {/* Panel */}
      <motion.div
        className="relative z-10 mx-4 w-full max-w-sm rounded-3xl border border-white/10 bg-[#111] p-6 shadow-[0_32px_80px_rgba(0,0,0,0.7)]"
        initial={{ opacity: 0, scale: 0.96, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <h3 className="text-base font-semibold text-white">{title}</h3>
        <p className="mt-1.5 text-sm text-white/50">{message}</p>

        <div className="mt-5 flex gap-3">
          <button
            onClick={onLeave}
            className="flex-1 rounded-xl border border-white/10 bg-white/5 py-2.5 text-sm font-medium text-white/55 transition hover:bg-white/8 hover:text-white"
          >
            {leaveLabel}
          </button>
          <button
            onClick={onStay}
            className="flex-1 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-black transition hover:bg-amber-300"
          >
            {stayLabel}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
