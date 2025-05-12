
import { useState } from "react";
import MainLayout from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [settings, setSettings] = useState({
    aiVerbosity: "balanced",
    noteTone: "clinical",
    autoSave: true,
    ehrIntegrationEnabled: false,
    apiKey: "",
  });
  const { toast } = useToast();

  const handleSettingChange = (
    key: string,
    value: string | boolean | number
  ) => {
    setSettings((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveSettings = () => {
    toast({
      title: "Settings Saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  return (
    <MainLayout>
      <div className="p-4 lg:p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Settings</h1>
          <p className="text-gray-500 mt-1">
            Customize your Syntera experience
          </p>
        </div>

        <div className="max-w-3xl">
          <div className="bg-white rounded-lg border border-border">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-medium">AI Preferences</h2>
              <p className="text-sm text-gray-500">
                Customize how the AI assistant generates content
              </p>
            </div>

            <div className="p-5 space-y-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  AI Verbosity
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Control how detailed the AI-generated notes will be
                </p>
                <div className="flex items-center space-x-2">
                  <select
                    value={settings.aiVerbosity}
                    onChange={(e) =>
                      handleSettingChange("aiVerbosity", e.target.value)
                    }
                    className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm bg-white"
                  >
                    <option value="concise">Concise (minimal details)</option>
                    <option value="balanced">Balanced (recommended)</option>
                    <option value="comprehensive">Comprehensive (maximum detail)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Note Tone
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Select the writing style for your notes
                </p>
                <div className="flex items-center space-x-2">
                  <select
                    value={settings.noteTone}
                    onChange={(e) =>
                      handleSettingChange("noteTone", e.target.value)
                    }
                    className="w-full max-w-xs px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm bg-white"
                  >
                    <option value="clinical">Clinical (formal medical language)</option>
                    <option value="conversational">Conversational (easier to understand)</option>
                    <option value="narrative">Narrative (story-like format)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.autoSave}
                    onChange={(e) =>
                      handleSettingChange("autoSave", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-syntera-purple focus:ring-syntera-purple"
                  />
                  <span className="ml-2 text-sm">Auto-save notes (every 30 seconds)</span>
                </label>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-border mt-6">
            <div className="p-5 border-b border-border">
              <h2 className="text-lg font-medium">Integrations</h2>
              <p className="text-sm text-gray-500">
                Configure connections to external systems
              </p>
            </div>

            <div className="p-5 space-y-6">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={settings.ehrIntegrationEnabled}
                    onChange={(e) =>
                      handleSettingChange("ehrIntegrationEnabled", e.target.checked)
                    }
                    className="w-4 h-4 rounded border-gray-300 text-syntera-purple focus:ring-syntera-purple"
                  />
                  <span className="ml-2 text-sm">Enable EHR Integration</span>
                </label>
                <p className="text-xs text-gray-500 ml-6 mt-1">
                  Automatically export notes to your electronic health record system
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  API Key
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  Required for EHR integration
                </p>
                <div className="flex items-center space-x-2">
                  <input
                    type="password"
                    value={settings.apiKey}
                    onChange={(e) =>
                      handleSettingChange("apiKey", e.target.value)
                    }
                    placeholder="Enter your API key"
                    className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-syntera-purple text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <Button variant="primary" onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Settings;
