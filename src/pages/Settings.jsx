import { useState } from "react";
import {
  Bell,
  Building2,
  CheckCircle,
  Phone,
  Save,
  Settings as SettingsIcon,
  User,
  Vibrate,
} from "lucide-react";

function Settings() {
  const [settings, setSettings] = useState({
    hospitalName: "City Care Hospital",
    staffName: "Admin",
    caregiverAlerts: true,
    missedMedicationAlerts: true,
    voiceCalls: true,
    vibrationAlerts: true,
  });

  const [saved, setSaved] = useState(false);

  const handleChange = (field) => {
    setSettings((current) => ({
      ...current,
      [field]: !current[field],
    }));

    setSaved(false);
  };

  const handleSave = () => {
    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  };

  return (
    <main className="dashboard settings-page">

      {/* ================================
          HEADER
          ================================ */}

      <div className="dashboard-header">

        <div>
          <p className="welcome-text">
            System Configuration ⚙️
          </p>

          <h1>
            Settings
          </h1>

          <p className="header-description">
            Manage hospital information and TabuCall
            notification preferences.
          </p>
        </div>

      </div>


      {/* ================================
          PROFILE SETTINGS
          ================================ */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon profile-icon">
            <Building2 size={22} />
          </div>

          <div>
            <h2>
              Hospital / Staff Profile
            </h2>

            <p>
              Basic information about the hospital staff.
            </p>
          </div>

        </div>


        <div className="settings-form">

          <div className="settings-field">

            <label>
              Hospital Name
            </label>

            <div className="settings-input-wrapper">

              <Building2 size={17} />

              <input
                type="text"
                value={settings.hospitalName}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    hospitalName: e.target.value,
                  });

                  setSaved(false);
                }}
              />

            </div>

          </div>


          <div className="settings-field">

            <label>
              Staff Name
            </label>

            <div className="settings-input-wrapper">

              <User size={17} />

              <input
                type="text"
                value={settings.staffName}
                onChange={(e) => {
                  setSettings({
                    ...settings,
                    staffName: e.target.value,
                  });

                  setSaved(false);
                }}
              />

            </div>

          </div>

        </div>

      </section>


      {/* ================================
          NOTIFICATION SETTINGS
          ================================ */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon notification-icon">
            <Bell size={22} />
          </div>

          <div>
            <h2>
              Notification Settings
            </h2>

            <p>
              Choose which patient events should generate alerts.
            </p>
          </div>

        </div>


        <div className="settings-options">

          {/* Caregiver Alerts */}

          <div className="settings-option">

            <div className="option-left">

              <div className="option-icon red-option">
                <Bell size={18} />
              </div>

              <div>
                <h3>
                  Caregiver Alerts
                </h3>

                <p>
                  Alert caregivers when patients need attention.
                </p>
              </div>

            </div>


            <button
              className={
                settings.caregiverAlerts
                  ? "toggle-button active"
                  : "toggle-button"
              }
              onClick={() =>
                handleChange("caregiverAlerts")
              }
            >
              <span></span>
            </button>

          </div>


          {/* Missed Medication */}

          <div className="settings-option">

            <div className="option-left">

              <div className="option-icon orange-option">
                <Bell size={18} />
              </div>

              <div>
                <h3>
                  Missed Medication Alerts
                </h3>

                <p>
                  Receive alerts when a patient misses medication.
                </p>
              </div>

            </div>


            <button
              className={
                settings.missedMedicationAlerts
                  ? "toggle-button active"
                  : "toggle-button"
              }
              onClick={() =>
                handleChange("missedMedicationAlerts")
              }
            >
              <span></span>
            </button>

          </div>

        </div>

      </section>


      {/* ================================
          COMMUNICATION SETTINGS
          ================================ */}

      <section className="settings-card">

        <div className="settings-card-header">

          <div className="settings-icon communication-icon">
            <Phone size={22} />
          </div>

          <div>
            <h2>
              Communication Preferences
            </h2>

            <p>
              Configure how TabuCall communicates with patients.
            </p>
          </div>

        </div>


        <div className="settings-options">

          {/* Voice Calls */}

          <div className="settings-option">

            <div className="option-left">

              <div className="option-icon blue-option">
                <Phone size={18} />
              </div>

              <div>
                <h3>
                  Voice Calls
                </h3>

                <p>
                  Enable automatic voice medication reminders.
                </p>
              </div>

            </div>


            <button
              className={
                settings.voiceCalls
                  ? "toggle-button active"
                  : "toggle-button"
              }
              onClick={() =>
                handleChange("voiceCalls")
              }
            >
              <span></span>
            </button>

          </div>


          {/* Vibration */}

          <div className="settings-option">

            <div className="option-left">

              <div className="option-icon purple-option">
                <Vibrate size={18} />
              </div>

              <div>
                <h3>
                  Vibration Alerts
                </h3>

                <p>
                  Enable haptic reminders for hearing-impaired patients.
                </p>
              </div>

            </div>


            <button
              className={
                settings.vibrationAlerts
                  ? "toggle-button active"
                  : "toggle-button"
              }
              onClick={() =>
                handleChange("vibrationAlerts")
              }
            >
              <span></span>
            </button>

          </div>

        </div>

      </section>


      {/* ================================
          SAVE
          ================================ */}

      <div className="settings-save-area">

        {saved && (
          <div className="settings-saved-message">

            <CheckCircle size={17} />

            Settings saved successfully

          </div>
        )}


        <button
          className="settings-save-button"
          onClick={handleSave}
        >
          <Save size={17} />

          Save Settings
        </button>

      </div>

    </main>
  );
}

export default Settings;