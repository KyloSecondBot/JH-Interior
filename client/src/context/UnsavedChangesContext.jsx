import { createContext, useContext, useState } from 'react';

const Ctx = createContext(null);

export function UnsavedChangesProvider({ children }) {
  const [isDirty, setIsDirty] = useState(false);
  // stores a callback to run after the user confirms leaving
  const [pendingAction, setPendingAction] = useState(null);

  return (
    <Ctx.Provider value={{ isDirty, setIsDirty, pendingAction, setPendingAction }}>
      {children}
    </Ctx.Provider>
  );
}

export function useUnsavedChanges() {
  return useContext(Ctx);
}
