
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";

interface Visit {
  id: string;
  patientName: string;
  date: string;
  visitType: string;
  duration: string;
  summary: string;
}

interface VisitCardProps {
  visit: Visit;
}

export const VisitCard = ({ visit }: VisitCardProps) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <Link to={`/visit/${visit.id}`} className="block">
        <div className="p-4 border-b border-border">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium">{visit.patientName}</h3>
              <div className="text-sm text-syntera-gray mt-1">{visit.date}</div>
            </div>
            <span className="px-2 py-1 bg-syntera-blue-light text-syntera-blue text-xs rounded-full">
              {visit.visitType}
            </span>
          </div>
        </div>
      </Link>

      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium">AI Summary</span>
          <button className="text-syntera-purple hover:text-syntera-purple-light">
            <RefreshCw size={14} />
          </button>
        </div>
        
        <div className={`text-sm text-gray-600 ${expanded ? "" : "line-clamp-2"}`}>
          {visit.summary}
        </div>
        
        {visit.summary.length > 120 && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs text-syntera-purple hover:text-syntera-purple-light mt-1"
          >
            {expanded ? "Show less" : "Show more"}
          </button>
        )}
      </div>
      
      <div className="px-4 py-2 bg-gray-50 text-xs text-gray-500">
        <span>Duration: {visit.duration}</span>
      </div>
    </div>
  );
};

export default VisitCard;
