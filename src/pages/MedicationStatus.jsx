import { useState } from "react";
import {
  Search,
  Pill,
  Phone,
  CheckCircle,
  Clock,
  XCircle,
} from "lucide-react";

function MedicationStatus() {
  const [search, setSearch] = useState("");

  const medications = [
    {
      patient: "Ravi Kumar",
      medicine: "Paracetamol",
      dosage: "500 mg",
      time: "8:00 AM",
      mode: "Voice",
      status: "Confirmed",
    },
    {
      patient: "Lakshmi",
      medicine: "Metformin",
      dosage: "500 mg",
      time: "9:00 AM",
      mode: "Vibration",
      status: "No Response",
    },
    {
      patient: "Kumar",
      medicine: "Amlodipine",
      dosage: "5 mg",
      time: "8:30 AM",
      mode: "Voice + Vibration",
      status: "Confirmed",
    },
    {
      patient: "Priya",
      medicine: "Vitamin D",
      dosage: "1000 IU",
      time: "10:00 AM",
      mode: "Voice",
      status: "Pending",
    },
  ];

  const filteredMedications = medications.filter((medication) =>
    medication.patient.toLowerCase().includes(search.toLowerCase()) ||
    medication.medicine.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard medication-page">

      {/* Header */}

      <div className="dashboard-header">

        <div>

          <p className="welcome-text">
            Medication Monitoring 💊
          </p>

          <h1>
            Medication Status
          </h1>

          <p className="header-description">
            Monitor medication reminders and patient responses.
          </p>

        </div>

      </div>


      {/* Overview Cards */}

      <div className="medication-summary">

        <div className="medication-summary-card confirmed-summary">

          <div className="medication-summary-icon">
            <CheckCircle size={22} />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>2</strong>
          </div>

        </div>


        <div className="medication-summary-card pending-summary">

          <div className="medication-summary-icon">
            <Clock size={22} />
          </div>

          <div>
            <span>Pending</span>
            <strong>1</strong>
          </div>

        </div>


        <div className="medication-summary-card missed-summary">

          <div className="medication-summary-icon">
            <XCircle size={22} />
          </div>

          <div>
            <span>No Response</span>
            <strong>1</strong>
          </div>

        </div>

      </div>


      {/* Medication List */}

      <section className="content-card medication-card">

        <div className="medication-toolbar">

          <div>

            <h2>
              Today's Medication Status
            </h2>

            <p>
              Track patient medication responses.
            </p>

          </div>


          {/* Search */}

          <div className="medication-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient or medicine..."
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
            />

          </div>

        </div>


        {/* Table */}

        <div className="table-container">

          <table>

            <thead>

              <tr>

                <th>Patient</th>

                <th>Medicine</th>

                <th>Dosage</th>

                <th>Time</th>

                <th>Mode</th>

                <th>Status</th>

              </tr>

            </thead>


            <tbody>

              {filteredMedications.map(
                (medication, index) => (

                  <tr key={index}>

                    {/* Patient */}

                    <td>

                      <div className="patient">

                        <div className="patient-avatar">
                          {medication.patient.charAt(0)}
                        </div>

                        <span>
                          {medication.patient}
                        </span>

                      </div>

                    </td>


                    {/* Medicine */}

                    <td>

                      <div className="medicine-name">

                        <div className="medicine-icon">
                          <Pill size={16} />
                        </div>

                        <span>
                          {medication.medicine}
                        </span>

                      </div>

                    </td>


                    {/* Dosage */}

                    <td>
                      {medication.dosage}
                    </td>


                    {/* Time */}

                    <td>

                      <div className="medication-time">

                        <Clock size={14} />

                        {medication.time}

                      </div>

                    </td>


                    {/* Mode */}

                    <td>

                      <span
                        className={`medication-mode ${
                          medication.mode
                            .toLowerCase()
                            .replaceAll(" ", "-")
                            .replace("+", "plus")
                        }`}
                      >
                        {medication.mode}
                      </span>

                    </td>


                    {/* Status */}

                    <td>

                      {medication.status ===
                        "Confirmed" && (

                        <span className="medication-status confirmed">

                          <CheckCircle size={14} />

                          Confirmed

                        </span>

                      )}


                      {medication.status ===
                        "Pending" && (

                        <span className="medication-status pending">

                          <Clock size={14} />

                          Pending

                        </span>

                      )}


                      {medication.status ===
                        "No Response" && (

                        <span className="medication-status no-response">

                          <XCircle size={14} />

                          No Response

                        </span>

                      )}

                    </td>

                  </tr>

                )
              )}


              {/* No Results */}

              {filteredMedications.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="no-medications"
                  >
                    No medication records found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default MedicationStatus;
