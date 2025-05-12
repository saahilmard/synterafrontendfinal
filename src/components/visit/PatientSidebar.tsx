
import React from "react";

interface Patient {
  name: string;
  dob: string;
  mrn: string;
  age: number;
  visitType: string;
  photoUrl?: string;
  gender?: string;
  allergies?: string[];
  medications?: string[];
}

interface PatientSidebarProps {
  patient: Patient;
}

export const PatientSidebar = ({ patient }: PatientSidebarProps) => {
  return (
    <div className="bg-white rounded-lg border border-border p-4 flex flex-col h-full overflow-y-auto">
      <div className="flex items-center gap-3 pb-3 border-b border-border">
        <div className="w-12 h-12 rounded-full bg-syntera-blue-light flex items-center justify-center text-syntera-blue font-bold text-lg">
          {patient.photoUrl ? (
            <img
              src={patient.photoUrl}
              alt={patient.name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            patient.name.charAt(0)
          )}
        </div>
        <div>
          <h3 className="font-medium">{patient.name}</h3>
          <p className="text-sm text-syntera-gray">{patient.gender}, {patient.age} years</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2 py-3 border-b border-border">
        <div className="flex justify-between">
          <span className="text-sm text-syntera-gray">DOB:</span>
          <span className="text-sm font-medium">{patient.dob}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-syntera-gray">MRN:</span>
          <span className="text-sm font-medium">{patient.mrn}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-syntera-gray">Visit Type:</span>
          <span className="text-sm font-medium">{patient.visitType}</span>
        </div>
      </div>

      {patient.allergies && patient.allergies.length > 0 && (
        <div className="py-3 border-b border-border">
          <h4 className="text-sm font-medium mb-2">Allergies</h4>
          <ul className="text-sm space-y-1">
            {patient.allergies.map((allergy, index) => (
              <li key={index} className="bg-red-50 text-red-700 px-2 py-1 rounded-md">{allergy}</li>
            ))}
          </ul>
        </div>
      )}

      {patient.medications && patient.medications.length > 0 && (
        <div className="py-3">
          <h4 className="text-sm font-medium mb-2">Current Medications</h4>
          <ul className="text-sm space-y-1">
            {patient.medications.map((medication, index) => (
              <li key={index} className="bg-syntera-blue-light/40 px-2 py-1 rounded-md">{medication}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PatientSidebar;
