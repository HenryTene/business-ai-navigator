import { createContext, useContext, useState, type ReactNode } from "react";

type TeacherModeContextType = {
  teacherMode: boolean;
  toggleTeacherMode: () => void;
};

const TeacherModeContext = createContext<TeacherModeContextType>({
  teacherMode: false,
  toggleTeacherMode: () => {},
});

export function TeacherModeProvider({ children }: { children: ReactNode }) {
  const [teacherMode, setTeacherMode] = useState(false);
  const toggleTeacherMode = () => setTeacherMode((v) => !v);
  return (
    <TeacherModeContext.Provider value={{ teacherMode, toggleTeacherMode }}>
      {children}
    </TeacherModeContext.Provider>
  );
}

export function useTeacherMode() {
  return useContext(TeacherModeContext);
}
