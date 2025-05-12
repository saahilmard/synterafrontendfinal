
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import TranscriptionFeed from "@/components/visit/TranscriptionFeed";
import SoapNote from "@/components/visit/SoapNote";
import PatientSidebar from "@/components/visit/PatientSidebar";
import VisitTopBar from "@/components/visit/VisitTopBar";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

// Mock data
const demoPatient = {
  name: "Emma Johnson",
  dob: "04/15/2016",
  mrn: "MRN-23456",
  age: 7,
  visitType: "Sick Visit",
  gender: "Female",
  allergies: ["Penicillin"],
  medications: ["Albuterol PRN", "Loratadine 5mg daily"],
};

const LiveVisit = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"unsaved" | "saving" | "saved">("saved");
  const { toast } = useToast();

  const handleStartRecording = () => {
    setIsRecording(true);
    toast({
      title: "Recording Started",
      description: "Audio is now being recorded and transcribed in real-time.",
    });
  };

  const handleStopRecording = () => {
    setIsRecording(false);
    toast({
      title: "Recording Stopped",
      description: "Audio recording has been stopped.",
    });
  };

  const handleRegenerateNote = () => {
    setIsGenerating(true);
    toast({
      title: "Regenerating SOAP Note",
      description: "Using AI to analyze the transcript and update the note...",
    });
    
    // Simulate regeneration
    setTimeout(() => {
      setIsGenerating(false);
      toast({
        title: "SOAP Note Updated",
        description: "The note has been regenerated based on the latest transcript.",
      });
    }, 2000);
  };

  const handleSaveNote = () => {
    setSaveStatus("saving");
    
    // Simulate saving
    setTimeout(() => {
      setSaveStatus("saved");
      toast({
        title: "Note Saved",
        description: "Your SOAP note has been saved successfully.",
      });
    }, 1500);
  };

  return (
    <MainLayout>
      <VisitTopBar
        visitStartTime={new Date()}
        saveStatus={saveStatus}
        patientName={demoPatient.name}
      />
      
      <div className="p-4 lg:p-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 h-[calc(100vh-120px)]">
          <div className="lg:col-span-3 h-full flex flex-col">
            <PatientSidebar patient={demoPatient} />
          </div>
          
          <div className="lg:col-span-4 h-full flex flex-col">
            <div className="mb-3 flex justify-between items-center">
              {!isRecording ? (
                <Button
                  variant="accent"
                  onClick={handleStartRecording}
                  className="w-full"
                >
                  Start Recording
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  onClick={handleStopRecording}
                  className="w-full"
                >
                  Stop Recording
                </Button>
              )}
            </div>
            <TranscriptionFeed isLive={isRecording} />
          </div>
          
          <div className="lg:col-span-5 h-full flex flex-col">
            <SoapNote
              isGenerating={isGenerating}
              onRegenerate={handleRegenerateNote}
              onSave={handleSaveNote}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default LiveVisit;
