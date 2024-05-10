import { useContext } from "react";
import { ThemeContext } from "../../contexts/ThemeContext";

export const useTheme = () => {
    const context = useContext(ThemeContext);
    
    if (context === undefined) {
      throw new Error('useAuth must be used within an ThemeProvider');
    }
    
    return context
};