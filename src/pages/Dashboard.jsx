import {
  Users,
  FileText,
  Clock,
  AlertTriangle,
  CheckCircle,
  PhoneCall,
} from "lucide-react";

import StatCard from "../components/StatCard";

function Dashboard() {
  return (
    <main className="dashboard">

      {/* ================= HEADER ================= */}

      <div className="dashboard-header">

        <div>
          <p className="welcome-text">
            Welcome back 👋
          </p>

          <h1>
            TabuCall Dashboard
          </h1>

          <p className="header-description">
            Monitor patients, prescriptions and medication adherence.
          </p>
        </div>

        <div className="header-date">
          <span>Today</span>

          <strong>
            22 August
            <br />
            2026
          </strong>
        </div>

      </div>


      {/* ================= STATISTICS ================= */}

      <section className="stats-grid">

        <StatCard
          title="Total Patients"
          value="120"
          description="+8 this month"
          icon={<Users size={24} />}
          type="blue"
        />

        <StatCard
          title="Active Prescriptions"
          value="85"
          description="Currently active"
          icon={<FileText size={24} />}
          type="purple"
        />

        <StatCard
          title="Pending Reminders"
          value="12"
          description="Awaiting response"
          icon={<Clock size={24} />}
          type="orange"
        />

        <StatCard
          title="Missed Medications"
          value="7"
          description="Needs attention"
          icon={<AlertTriangle size={24} />}
          type="red"
        />

      </section>


      {/* ================= MEDICATION STATUS ================= */}

      <section className="content-card">

        <div className="section-header">

          <div>
            <h2>
              Today's Medication Status
            </h2>

            <p>
              Track patient medication confirmations.
            </p>
          </div>

          <button className="view-button">
            View All
          </button>

        </div>


        {/* Table */}

        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Medicine</th>
                <th>Time</th>
                <th>Mode</th>
                <th>Status</th>
              </tr>
            </thead>


            <tbody>

              {/* Patient 1 */}

              <tr>

                <td>
                  <div className="patient">

                    <div className="patient-avatar">
                      R
                    </div>

                    <span>
                      Ravi Kumar
                    </span>

                  </div>
                </td>

                <td>
                  Paracetamol 500mg
                </td>

                <td>
                  08:00 AM
                </td>

                <td>

                  <span className="mode-badge voice">

                    <PhoneCall size={14} />

                    Voice

                  </span>

                </td>

                <td>

                  <span className="status-badge success">

                    <CheckCircle size={15} />

                    Confirmed

                  </span>

                </td>

              </tr>


              {/* Patient 2 */}

              <tr>

                <td>

                  <div className="patient">

                    <div className="patient-avatar">
                      L
                    </div>

                    <span>
                      Lakshmi
                    </span>

                  </div>

                </td>

                <td>
                  Metformin 500mg
                </td>

                <td>
                  09:00 AM
                </td>

                <td>

                  <span className="mode-badge vibration">

                    📳 Vibration

                  </span>

                </td>

                <td>

                  <span className="status-badge pending">

                    <Clock size={15} />

                    Pending

                  </span>

                </td>

              </tr>


              {/* Patient 3 */}

              <tr>

                <td>

                  <div className="patient">

                    <div className="patient-avatar">
                      K
                    </div>

                    <span>
                      Kumar
                    </span>

                  </div>

                </td>

                <td>
                  Amoxicillin 250mg
                </td>

                <td>
                  10:00 AM
                </td>

                <td>

                  <span className="mode-badge both">

                    📞 + 📳 Voice + Vibration

                  </span>

                </td>

                <td>

                  <span className="status-badge missed">

                    <AlertTriangle size={15} />

                    Missed

                  </span>

                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </section>

    </main>
  );
}

export default Dashboard;