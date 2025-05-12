
import { useState, useEffect } from "react";
import { Clock, Save } from "lucide-react";

interface VisitTopBarProps {
  visitStartTime?: Date;
  saveStatus?: "unsaved" | "saving" | "saved";
  patientName?: string;
}

export const VisitTopBar = ({
  visitStartTime = new Date(),
  saveStatus = "saved",
  patientName = "",
}: VisitTopBarProps) => {
  const [elapsed, setElapsed] = useState<string>("00:00");

  // Format elapsed time as MM:SS
  const formatElapsedTime = (startTime: Date) => {
    const diff = Math.floor((new Date().getTime() - startTime.getTime()) / 1000);
    const minutes = Math.floor(diff / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (diff % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setElapsed(formatElapsedTime(visitStartTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [visitStartTime]);

  return (
    <div className="bg-white border-b border-border px-4 py-2 flex justify-between items-center">
      <div className="flex items-center">
        <h2 className="font-medium">{patientName ? `Visit: ${patientName}` : "New Visit"}</h2>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <Clock size={14} className="text-syntera-gray" />
          <span className="font-medium">{elapsed}</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm">
          <Save size={14} className={saveStatus === "saved" ? "text-syntera-success" : "text-syntera-warning"} />
          <span>
            {saveStatus === "unsaved" && "Unsaved changes"}
            {saveStatus === "saving" && "Saving..."}
            {saveStatus === "saved" && "All changes saved"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default VisitTopBar;
