'use client';

import { type FormEvent, useState } from 'react';

type PreferenceState = {
  enableNotifications: boolean;
  requireTwoFactor: boolean;
  allowBetaFeatures: boolean;
};

export default function SettingsPage() {
  const [preferences, setPreferences] = useState<PreferenceState>({
    enableNotifications: true,
    requireTwoFactor: false,
    allowBetaFeatures: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState('');

  const handleToggle = (key: keyof PreferenceState) => {
    setPreferences((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSaving(true);
    setFeedback('');

    window.setTimeout(() => {
      setIsSaving(false);
      setFeedback('Preferences saved locally. Hook this up to a real API during the challenge.');
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-gray-900">Settings</h2>
        <p className="mt-1 text-sm text-gray-600">Update feature toggles that SDETs can write tests around.</p>
      </header>

      <form onSubmit={handleSubmit} className="bg-white shadow-sm rounded-lg border border-gray-200">
        <div className="px-4 py-5 sm:px-6 space-y-6">
          <fieldset className="space-y-4">
            <legend className="text-base font-medium text-gray-900">Feature Toggles</legend>

            <ToggleRow
              id="enable-notifications"
              label="Enable notifications"
              description="Allow system alerts to reach testers when new challenges are ready."
              checked={preferences.enableNotifications}
              onChange={() => handleToggle('enableNotifications')}
            />

            <ToggleRow
              id="require-two-factor"
              label="Require two-factor authentication"
              description="Enforce an extra security step for admin accounts."
              checked={preferences.requireTwoFactor}
              onChange={() => handleToggle('requireTwoFactor')}
            />

            <ToggleRow
              id="allow-beta-features"
              label="Allow beta features"
              description="Give admins early access to experimental testing modules."
              checked={preferences.allowBetaFeatures}
              onChange={() => handleToggle('allowBetaFeatures')}
            />
          </fieldset>
        </div>
        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-60"
            disabled={isSaving}
          >
            {isSaving ? 'Saving…' : 'Save preferences'}
          </button>
        </div>
      </form>

      {feedback && (
        <div className="rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-700">{feedback}</div>
      )}
    </div>
  );
}

type ToggleRowProps = {
  id: string;
  label: string;
  description: string;
  checked: boolean;
  onChange: () => void;
};

function ToggleRow({ id, label, description, checked, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-start justify-between rounded-lg border border-gray-200 p-4">
      <div>
        <label htmlFor={id} className="text-sm font-medium text-gray-900">
          {label}
        </label>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <button
        id={id}
        type="button"
        onClick={onChange}
        className={`${
          checked ? 'bg-blue-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2`}
      >
        <span
          aria-hidden="true"
          className={`${
            checked ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
        />
      </button>
    </div>
  );
}
