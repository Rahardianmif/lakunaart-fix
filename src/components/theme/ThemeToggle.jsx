import {
  Monitor,
  Moon,
  Sun,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";

const options = [
  {
    value: "light",
    label: "Light",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Dark",
    icon: Moon,
  },
  {
    value: "system",
    label: "System",
    icon: Monitor,
  },
];

function ThemeToggle() {
  const { mode, setMode } = useTheme();

  return (
    <div className="theme-toggle" aria-label="Theme selector">
      {options.map((option) => {
        const Icon = option.icon;

        return (
          <button
            key={option.value}
            type="button"
            className={mode === option.value ? "active" : ""}
            title={option.label}
            onClick={() => setMode(option.value)}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}

export default ThemeToggle;
