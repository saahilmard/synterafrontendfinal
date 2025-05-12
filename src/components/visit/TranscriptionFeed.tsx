
import { useEffect, useRef, useState } from "react";

interface TranscriptionSegment {
  id: number;
  timestamp: number;
  speaker: "doctor" | "patient";
  text: string;
}

interface TranscriptionFeedProps {
  segments?: TranscriptionSegment[];
  isLive?: boolean;
}

export const TranscriptionFeed = ({
  segments = [],
  isLive = false,
}: TranscriptionFeedProps) => {
  const feedRef = useRef<HTMLDivElement>(null);
  const [autoscroll, setAutoscroll] = useState(true);

  // Format timestamp to MM:SS
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Autoscroll to bottom when new segments are added
  useEffect(() => {
    if (autoscroll && feedRef.current && isLive) {
      feedRef.current.scrollTop = feedRef.current.scrollHeight;
    }
  }, [segments, autoscroll, isLive]);

  // Placeholder segments for demo
  const demoSegments: TranscriptionSegment[] = segments.length
    ? segments
    : [
        {
          id: 1,
          timestamp: 0,
          speaker: "doctor",
          text: "Hello Emma, how are you feeling today?",
        },
        {
          id: 2,
          timestamp: 5,
          speaker: "patient",
          text: "I've had this cough for a few days now, and my mom said I should come in.",
        },
        {
          id: 3,
          timestamp: 12,
          speaker: "doctor",
          text: "I'm sorry to hear that. Let's take a look. Have you had any fever or chills?",
        },
        {
          id: 4,
          timestamp: 20,
          speaker: "patient",
          text: "No fever, but I've been coughing a lot at night.",
        },
      ];

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 px-2">
        <h2 className="text-lg font-medium">Transcription</h2>
        <div className="flex items-center">
          <button
            onClick={() => setAutoscroll(!autoscroll)}
            className={`text-xs font-medium px-2 py-1 rounded ${
              autoscroll ? "bg-syntera-purple text-white" : "bg-gray-100 text-gray-500"
            }`}
          >
            {autoscroll ? "Auto-scroll On" : "Auto-scroll Off"}
          </button>
        </div>
      </div>
      
      <div
        ref={feedRef}
        className="flex-1 overflow-y-auto p-4 bg-white rounded-lg border border-border space-y-4"
      >
        {demoSegments.map((segment) => (
          <div
            key={segment.id}
            className={`flex gap-3 ${
              segment.speaker === "doctor" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`relative max-w-[85%] p-3 rounded-lg ${
                segment.speaker === "doctor"
                  ? "bg-syntera-blue-light text-gray-800 rounded-tl-none"
                  : "bg-syntera-purple-light text-gray-800 rounded-tr-none"
              }`}
            >
              <div className="text-xs text-gray-500 mb-1">
                {segment.speaker === "doctor" ? "Dr." : "Patient"} • {formatTime(segment.timestamp)}
              </div>
              <p className="text-sm">{segment.text}</p>
            </div>
          </div>
        ))}
        
        {isLive && (
          <div className="flex items-center gap-2 text-sm text-syntera-purple py-2">
            <span className="w-2 h-2 bg-syntera-purple rounded-full animate-pulse"></span>
            <span>Recording in progress...</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TranscriptionFeed;
