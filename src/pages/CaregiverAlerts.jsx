import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Pill,
  User,
  XCircle,
} from "lucide-react";

function CaregiverAlerts() {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      patient: "Lakshmi",
      medicine: "Metformin",
      dosage: "500 mg",
      time: "9:00 AM",
      attempts: 3,
      type: "Critical",
      message: "No response after 3 call attempts",
      status: "Active",
    },
    {
      id: 2,
      patient: "Priya",
      medicine: "Vitamin D",
      dosage: "1000 IU",
      time: "10:00 AM",
      attempts: 1,
      type: "Follow-up",
      message: "Medication reminder is still pending",
      status: "Active",
    },
    {
      id: 3,
      patient: "Kumar",
      medicine: "Amlodipine",
      dosage: "5 mg",
      time: "8:30 AM",
      attempts: 2,
      type: "Critical",
      message: "Patient did not confirm medication",
      status: "Active",
    },
  ]);

  const [filter, setFilter] = useState("All");

  const resolveAlert = (id) => {
    setAlerts((currentAlerts) =>
      currentAlerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "Resolved" }
          : alert
      )
    );
  };

  const activeAlerts = alerts.filter(
    (alert) => alert.status === "Active"
  );

  const criticalCount = activeAlerts.filter(
    (alert) => alert.type === "Critical"
  ).length;

  const followUpCount = activeAlerts.filter(
    (alert) => alert.type === "Follow-up"
  ).length;

  const resolvedCount = alerts.filter(
    (alert) => alert.status === "Resolved"
  ).length;

  const filteredAlerts =
    filter === "All"
      ? alerts
      : alerts.filter((alert) => alert.type === filter);

  return (
    <main className="dashboard caregiver-alerts-page">

      {/* =================================================
          HEADER
          ================================================= */}

      <div className="dashboard-header">

        <div>
          <p className="welcome-text">
            Patient Safety 🚨
          </p>

          <h1>
            Caregiver Alerts
          </h1>

          <p className="header-description">
            Monitor patients who need attention after missed
            medication reminders.
          </p>
        </div>

      </div>


      {/* =================================================
          ALERT SUMMARY
          ================================================= */}

      <div className="alert-summary">

        {/* Critical */}

        <div className="alert-summary-card critical-summary">

          <div className="alert-summary-icon">
            <AlertTriangle size={24} />
          </div>

          <div>
            <span>Critical Alerts</span>
            <strong>{criticalCount}</strong>
          </div>

        </div>


        {/* Follow Up */}

        <div className="alert-summary-card followup-summary">

          <div className="alert-summary-icon">
            <Clock size={24} />
          </div>

          <div>
            <span>Follow-up Required</span>
            <strong>{followUpCount}</strong>
          </div>

        </div>


        {/* Resolved */}

        <div className="alert-summary-card resolved-summary">

          <div className="alert-summary-icon">
            <CheckCircle size={24} />
          </div>

          <div>
            <span>Resolved</span>
            <strong>{resolvedCount}</strong>
          </div>

        </div>

      </div>


      {/* =================================================
          ALERT LIST
          ================================================= */}

      <section className="content-card alerts-card">

        <div className="alerts-toolbar">

          <div>
            <h2>
              Caregiver Notifications
            </h2>

            <p>
              Alerts that require caregiver attention.
            </p>
          </div>


          {/* Filter */}

          <div className="alert-filters">

            <button
              className={
                filter === "All"
                  ? "alert-filter active"
                  : "alert-filter"
              }
              onClick={() => setFilter("All")}
            >
              All
            </button>

            <button
              className={
                filter === "Critical"
                  ? "alert-filter active"
                  : "alert-filter"
              }
              onClick={() => setFilter("Critical")}
            >
              Critical
            </button>

            <button
              className={
                filter === "Follow-up"
                  ? "alert-filter active"
                  : "alert-filter"
              }
              onClick={() => setFilter("Follow-up")}
            >
              Follow-up
            </button>

          </div>

        </div>


        {/* =================================================
            ALERT ITEMS
            ================================================= */}

        <div className="alerts-list">

          {filteredAlerts.length === 0 ? (

            <div className="no-alerts">

              <CheckCircle size={35} />

              <h3>
                No alerts found
              </h3>

              <p>
                There are no alerts in this category.
              </p>

            </div>

          ) : (

            filteredAlerts.map((alert) => (

              <div
                key={alert.id}
                className={`alert-item ${
                  alert.type === "Critical"
                    ? "critical-alert"
                    : "followup-alert"
                } ${
                  alert.status === "Resolved"
                    ? "resolved-alert"
                    : ""
                }`}
              >

                {/* Alert Icon */}

                <div className="alert-main-icon">

                  {alert.type === "Critical" ? (
                    <AlertTriangle size={23} />
                  ) : (
                    <Clock size={23} />
                  )}

                </div>


                {/* Alert Information */}

                <div className="alert-information">

                  <div className="alert-title-row">

                    <h3>
                      {alert.patient}
                    </h3>

                    <span
                      className={`alert-type ${
                        alert.type === "Critical"
                          ? "critical-type"
                          : "followup-type"
                      }`}
                    >
                      {alert.type}
                    </span>

                    {alert.status === "Resolved" && (
                      <span className="resolved-type">
                        Resolved
                      </span>
                    )}

                  </div>


                  <p className="alert-message">
                    {alert.message}
                  </p>


                  <div className="alert-details">

                    <span>
                      <Pill size={14} />
                      {alert.medicine}
                    </span>

                    <span>
                      <User size={14} />
                      {alert.dosage}
                    </span>

                    <span>
                      <Clock size={14} />
                      {alert.time}
                    </span>

                    <span>
                      <Phone size={14} />
                      {alert.attempts} attempt
                      {alert.attempts > 1 ? "s" : ""}
                    </span>

                  </div>

                </div>


                {/* Actions */}

                <div className="alert-actions">

                  {alert.status === "Active" ? (

                    <button
                      className="resolve-alert-button"
                      onClick={() =>
                        resolveAlert(alert.id)
                      }
                    >
                      <CheckCircle size={15} />
                      Resolve
                    </button>

                  ) : (

                    <div className="resolved-label">
                      <CheckCircle size={16} />
                      Resolved
                    </div>

                  )}

                </div>

              </div>

            ))

          )}

        </div>

      </section>

    </main>
  );
}

export default CaregiverAlerts;