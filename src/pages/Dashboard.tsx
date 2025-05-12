
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import VisitCard from "@/components/dashboard/VisitCard";
import FilterBar from "@/components/dashboard/FilterBar";
import { Button } from "@/components/ui/Button";

// Mock data
const recentVisits = [
  {
    id: "v1",
    patientName: "Emma Johnson",
    date: "May 10, 2025 - 10:30 AM",
    visitType: "Sick Visit",
    duration: "15 minutes",
    summary: "7-year-old female presenting with 3-day history of cough, worse at night. No fever. Assessment: Acute bronchitis, likely viral. Plan includes supportive care, honey for cough, and follow-up if symptoms worsen.",
  },
  {
    id: "v2",
    patientName: "Liam Williams",
    date: "May 9, 2025 - 2:15 PM",
    visitType: "Well Check",
    duration: "25 minutes",
    summary: "4-year-old male for annual well-child visit. Growth and development appropriate for age. Vaccinations up to date. Anticipatory guidance provided regarding sleep habits and screen time. No concerns identified.",
  },
  {
    id: "v3",
    patientName: "Sophia Martinez",
    date: "May 9, 2025 - 9:45 AM",
    visitType: "Follow-up",
    duration: "10 minutes",
    summary: "10-year-old female for follow-up of otitis media. Symptoms resolved. Examination shows clear tympanic membranes bilaterally. No further treatment needed.",
  },
  {
    id: "v4",
    patientName: "Noah Thompson",
    date: "May 8, 2025 - 3:30 PM",
    visitType: "Consultation",
    duration: "30 minutes",
    summary: "2-year-old male referred for evaluation of recurrent wheezing. History suggests reactive airway disease. Low-dose inhaled corticosteroid initiated. Allergy testing recommended. Follow-up in 4 weeks.",
  },
];

const Dashboard = () => {
  return (
    <MainLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <p className="text-gray-500 mt-1">
                Manage your patient visits and records
              </p>
            </div>
            
            <Link to="/visit">
              <Button variant="accent" leftIcon={<Plus size={16} />}>
                New Visit
              </Button>
            </Link>
          </div>

          <FilterBar />
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-medium mb-4">Recent Visits</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentVisits.map((visit) => (
              <VisitCard key={visit.id} visit={visit} />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
