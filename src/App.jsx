import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import PrescriptionUpload from "./pages/PrescriptionUpload";
import Patients from "./pages/Patients";
import MedicationStatus from "./pages/MedicationStatus";
import CaregiverAlerts from "./pages/CaregiverAlerts";
import Settings from "./pages/Settings";

function App() {
  return (
    <BrowserRouter>

      <div className="app">

        {/* Sidebar */}
        <Sidebar />

        {/* Main Content */}
        <div className="main-content">

          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Prescription */}
            <Route
              path="/prescriptions"
              element={<PrescriptionUpload />}
            />

            {/* Patients */}
            <Route
              path="/patients"
              element={<Patients />}
            />

            {/* Medication Status */}
            <Route
              path="/medication-status"
              element={<MedicationStatus />}
            />

            {/* Caregiver Alerts */}
            <Route
              path="/alerts"
              element={<CaregiverAlerts />}
            />

            {/* Settings */}
            <Route
              path="/settings"
              element={<Settings />}
            />

          </Routes>

        </div>

      </div>

    </BrowserRouter>
  );
}

export default App;