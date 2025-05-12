
import { useState } from "react";
import { RefreshCw } from "lucide-react";

type SoapSection = "S" | "O" | "A" | "P";

interface SoapNoteProps {
  initialData?: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  };
  onSave?: (data: {
    subjective: string;
    objective: string;
    assessment: string;
    plan: string;
  }) => void;
  isGenerating?: boolean;
  onRegenerate?: () => void;
}

export const SoapNote = ({
  initialData = {
    subjective: "",
    objective: "",
    assessment: "",
    plan: "",
  },
  onSave,
  isGenerating = false,
  onRegenerate,
}: SoapNoteProps) => {
  const [expandedSections, setExpandedSections] = useState<SoapSection[]>(["S", "O", "A", "P"]);
  const [note, setNote] = useState({
    subjective: initialData.subjective || "Patient is a 7-year-old female presenting with cough for 3 days. No fever reported. Cough is worse at night. No shortness of breath. No chest pain. Patient has history of seasonal allergies.",
    objective: initialData.objective || "Vital signs stable. Temperature 98.6°F, heart rate 88, respiratory rate 18, oxygen saturation 99% on room air. Lungs clear to auscultation bilaterally. No wheezing, rales, or rhonchi. Oropharynx mildly erythematous without exudates.",
    assessment: initialData.assessment || "Acute bronchitis, likely viral etiology. Differential diagnosis includes allergic rhinitis given history of seasonal allergies.",
    plan: initialData.plan || "1. Supportive care with rest and hydration\n2. Honey for cough (over 1 year of age)\n3. Follow up in 5-7 days if symptoms worsen or do not improve\n4. Return sooner if develops fever, shortness of breath, or other concerning symptoms",
  });

  const toggleSection = (section: SoapSection) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section]
    );
  };

  const handleChange = (
    section: "subjective" | "objective" | "assessment" | "plan",
    value: string
  ) => {
    setNote((prev) => ({
      ...prev,
      [section]: value,
    }));
  };

  const handleSave = () => {
    if (onSave) {
      onSave(note);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-medium">SOAP Note</h2>
        <div className="flex gap-2">
          <button
            onClick={onRegenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-syntera-purple text-white hover:bg-syntera-purple/90 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={16} className={isGenerating ? "animate-spin" : ""} />
            <span>Regenerate</span>
          </button>
        </div>
      </div>

      <div className={`flex-1 overflow-y-auto ${isGenerating ? "opacity-60" : ""}`}>
        {/* S - Subjective */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection("S")}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-semibold text-syntera-blue">S: Subjective</span>
            <span>{expandedSections.includes("S") ? "−" : "+"}</span>
          </button>
          {expandedSections.includes("S") && (
            <div className="px-4 pb-4">
              <textarea
                value={note.subjective}
                onChange={(e) => handleChange("subjective", e.target.value)}
                className="w-full p-2 min-h-[100px] border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-blue"
                placeholder="Enter subjective information..."
              />
            </div>
          )}
        </div>

        {/* O - Objective */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection("O")}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-semibold text-syntera-blue">O: Objective</span>
            <span>{expandedSections.includes("O") ? "−" : "+"}</span>
          </button>
          {expandedSections.includes("O") && (
            <div className="px-4 pb-4">
              <textarea
                value={note.objective}
                onChange={(e) => handleChange("objective", e.target.value)}
                className="w-full p-2 min-h-[100px] border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-blue"
                placeholder="Enter objective information..."
              />
            </div>
          )}
        </div>

        {/* A - Assessment */}
        <div className="border-b border-border">
          <button
            onClick={() => toggleSection("A")}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-semibold text-syntera-blue">A: Assessment</span>
            <span>{expandedSections.includes("A") ? "−" : "+"}</span>
          </button>
          {expandedSections.includes("A") && (
            <div className="px-4 pb-4">
              <textarea
                value={note.assessment}
                onChange={(e) => handleChange("assessment", e.target.value)}
                className="w-full p-2 min-h-[100px] border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-blue"
                placeholder="Enter assessment information..."
              />
            </div>
          )}
        </div>

        {/* P - Plan */}
        <div>
          <button
            onClick={() => toggleSection("P")}
            className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-50"
          >
            <span className="font-semibold text-syntera-blue">P: Plan</span>
            <span>{expandedSections.includes("P") ? "−" : "+"}</span>
          </button>
          {expandedSections.includes("P") && (
            <div className="px-4 pb-4">
              <textarea
                value={note.plan}
                onChange={(e) => handleChange("plan", e.target.value)}
                className="w-full p-2 min-h-[100px] border border-border rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-blue"
                placeholder="Enter plan information..."
              />
            </div>
          )}
        </div>
      </div>

      <div className="p-4 border-t border-border flex justify-end">
        <button
          onClick={handleSave}
          className="px-4 py-2 bg-syntera-blue text-white rounded-md hover:bg-syntera-blue/90 transition-colors"
        >
          Save Note
        </button>
      </div>
    </div>
  );
};

export default SoapNote;
