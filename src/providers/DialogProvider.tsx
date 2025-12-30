import React, { useState, createContext, useContext } from "react";
import './dialog.css';

interface DialogContextType {
  showDialog: (content: React.ReactNode,seprate?:boolean) => void;
  hideDialog: () => void;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [dialogContent, setDialogContent] = useState<React.ReactNode>(null);
  const [isSeparate, setIsSeparate] = useState<boolean>(false);
  const showDialog = (content: React.ReactNode,seprate?:boolean) => {
    setDialogContent(content);
    setIsSeparate(seprate || false);
  };

  const hideDialog = () => {
    setDialogContent(null);
  };

  return (
    <DialogContext.Provider value={{ showDialog, hideDialog }}>
      {children}

      <DialogRender
        dialogContent={dialogContent}
        hideDialog={hideDialog}
        classType={isSeparate}
      />
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) throw new Error("useDialog must be used inside <DialogProvider>");
  return ctx;
};


const DialogRender = ({ dialogContent, hideDialog, classType }: { classType: boolean, dialogContent: React.ReactNode; hideDialog: () => void }) => {
  switch (classType) {
    case true:
      return (<>
        {dialogContent && (
          <div>
            <button className="dialog-close-btn" onClick={hideDialog}>
              ✕
            </button>

            {dialogContent}
          </div>
        )}
      </>);
    default:
      return (
        <>
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
        </>
      )
  };

}

export default DialogRender