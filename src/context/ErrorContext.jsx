import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext();

export const useError = () => useContext(ErrorContext);

export const ErrorProvider = ({ children }) => {
    const [errors, setErrors] = useState([]);

    return (
        <ErrorContext.Provider value={{ errors, setErrors }}>
            {children}
        </ErrorContext.Provider>
    );
};

const EditorContext = createContext();

export const useEditor = () => useContext(EditorContext);

export const EditorProvider = ({ children }) => {
    const [editorText, setEditorText] = useState('');

    return (
        <EditorContext.Provider value={{ editorText, setEditorText }}>
            {children}
        </EditorContext.Provider>
    );
};
