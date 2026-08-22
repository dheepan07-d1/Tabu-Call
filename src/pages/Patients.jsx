import { useState } from "react";
import {
  Search,
  Users,
  Phone,
  Eye,
} from "lucide-react";

function Patients() {
  const [search, setSearch] = useState("");

  const patients = [
    {
      name: "Ravi Kumar",
      age: 62,
      phone: "9876543210",
      mode: "Voice",
      status: "Active",
    },
    {
      name: "Lakshmi",
      age: 58,
      phone: "8765432109",
      mode: "Vibration",
      status: "Active",
    },
    {
      name: "Kumar",
      age: 65,
      phone: "7654321098",
      mode: "Voice + Vibration",
      status: "Active",
    },
    {
      name: "Priya",
      age: 54,
      phone: "9123456780",
      mode: "Voice",
      status: "Active",
    },
  ];

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="dashboard patients-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <p className="welcome-text">
            Patient Management 👥
          </p>

          <h1>Patients</h1>

          <p className="header-description">
            View and manage registered patients.
          </p>
        </div>

        <div className="patients-count">
          <Users size={20} />
          <span>{patients.length} Patients</span>
        </div>
      </div>


      {/* Patient List */}
      <section className="content-card patients-card">

        <div className="patients-toolbar">

          <div>
            <h2>Patient List</h2>
            <p>Registered patients in TabuCall.</p>
          </div>

          {/* Search */}
          <div className="patient-search">

            <Search size={18} />

            <input
              type="text"
              placeholder="Search patient..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

          </div>

        </div>


        {/* Table */}
        <div className="table-container">

          <table>

            <thead>
              <tr>
                <th>Patient</th>
                <th>Age</th>
                <th>Phone</th>
                <th>Sensory Mode</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>


            <tbody>

              {filteredPatients.map((patient, index) => (

                <tr key={index}>

                  {/* Patient */}
                  <td>

                    <div className="patient">

                      <div className="patient-avatar">
                        {patient.name.charAt(0)}
                      </div>

                      <span>
                        {patient.name}
                      </span>

                    </div>

                  </td>


                  {/* Age */}
                  <td>
                    {patient.age}
                  </td>


                  {/* Phone */}
                  <td>

                    <div className="phone-number">

                      <Phone size={14} />

                      {patient.phone}

                    </div>

                  </td>


                  {/* Mode */}
                  <td>

                    <span
                      className={`patient-mode ${patient.mode
                        .toLowerCase()
                        .replaceAll(" ", "-")
                        .replace("+", "plus")}`}
                    >
                      {patient.mode}
                    </span>

                  </td>


                  {/* Status */}
                  <td>

                    <span className="patient-status">
                      ● {patient.status}
                    </span>

                  </td>


                  {/* Action */}
                  <td>

                    <button
                      className="view-patient-button"
                      title="View patient"
                    >
                      <Eye size={16} />
                      View
                    </button>

                  </td>

                </tr>

              ))}


              {/* No result */}
              {filteredPatients.length === 0 && (

                <tr>

                  <td
                    colSpan="6"
                    className="no-patients"
                  >
                    No patients found.
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

export default Patients;