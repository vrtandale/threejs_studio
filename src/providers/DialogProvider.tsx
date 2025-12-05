import React, { useState, createContext, useContext } from "react";
import './dialog.css';

interface DialogContextType {
  showDialog: (content: React.ReactNode) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);

  const showDialog = (content: React.ReactNode) => {
    setDialogContent(content);
  };

  const hideDialog = () => {
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}

      {dialogContent && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            
            {/* Close button */}
            <button className="dialog-close-btn" onClick={hideDialog}>
              ✕
            </button>

            {dialogContent}
          </div>
        </div>
      )}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used inside <DialogProvider>");
  return ctx;
};
