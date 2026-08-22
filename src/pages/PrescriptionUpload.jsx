import { useRef, useState } from "react";
import {
  Upload,
  FileImage,
  X,
  UserRound,
  ScanLine,
  CheckCircle,
  ChevronDown,
} from "lucide-react";

function PrescriptionUpload() {
  const fileInputRef = useRef(null);

  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [patient, setPatient] = useState("");
  const [processed, setProcessed] = useState(false);

  // ================= FILE SELECTION =================

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setSelectedFile(file);
    setProcessed(false);

    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  };

  // ================= CHOOSE FILE =================

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  // ================= REMOVE FILE =================

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setPreview(null);
    setProcessed(false);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // ================= PROCESS PRESCRIPTION =================

  const handleProcess = () => {
    if (!patient) {
      alert("Please select a patient.");
      return;
    }

    if (!selectedFile) {
      alert("Please upload a prescription.");
      return;
    }

    // Temporary frontend simulation.
    // Later this will connect to the OCR + Medical NLP backend.
    setProcessed(true);
  };

  return (
    <main className="dashboard prescription-page">

      {/* =====================================================
          PAGE HEADER
          ===================================================== */}

      <div className="dashboard-header">
        <div>

          <p className="welcome-text">
            Prescription Management 📄
          </p>

          <h1>
            Upload Prescription
          </h1>

          <p className="header-description">
            Upload a patient's prescription for medicine extraction
            and processing.
          </p>

        </div>
      </div>


      {/* =====================================================
          PATIENT INFORMATION
          ===================================================== */}

      <section className="prescription-card patient-card">

        {/* LEFT SIDE */}

        <div className="patient-info-left">

          <div className="prescription-section-title">

            <div className="section-icon patient-icon">
              <UserRound size={21} />
            </div>

            <div>

              <h2>
                Patient Information
              </h2>

              <p>
                Choose the patient for this prescription.
              </p>

            </div>

          </div>

        </div>


        {/* RIGHT SIDE - PATIENT SELECTION */}

        <div className="patient-selection">

          <label className="input-label">
            Select Patient
          </label>

          <div className="select-wrapper">

            <select
              className="patient-select"
              value={patient}
              onChange={(event) => {
                setPatient(event.target.value);
                setProcessed(false);
              }}
            >

              <option value="">
                Choose a patient
              </option>

              <option value="Ravi Kumar">
                Ravi Kumar
              </option>

              <option value="Lakshmi">
                Lakshmi
              </option>

              <option value="Kumar">
                Kumar
              </option>

              <option value="Priya">
                Priya
              </option>

            </select>

            <ChevronDown
              size={18}
              className="select-arrow"
            />

          </div>

        </div>

      </section>


      {/* =====================================================
          PRESCRIPTION IMAGE
          ===================================================== */}

      <section className="prescription-card upload-card">

        {/* SECTION HEADER */}

        <div className="prescription-section-title">

          <div className="section-icon prescription-icon">
            <FileImage size={21} />
          </div>

          <div>

            <h2>
              Prescription Image
            </h2>

            <p>
              Upload a clear image of the patient's prescription.
            </p>

          </div>

        </div>


        {/* HIDDEN FILE INPUT */}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          onChange={handleFileChange}
          hidden
        />


        {/* =====================================================
            BEFORE FILE SELECTION
            ===================================================== */}

        {!selectedFile && (

          <div
            className="unique-upload-box"
            onClick={handleChooseFile}
          >

            {/* UPLOAD ICON */}

            <div className="upload-circle">

              <Upload size={28} />

            </div>


            {/* TITLE */}

            <h3>
              Upload Prescription
            </h3>


            {/* DESCRIPTION */}

            <p>
              Drag & drop your prescription here
            </p>


            <span>
              or choose an image from your computer
            </span>


            {/* BUTTON */}

            <button
              type="button"
              className="choose-file-button"
              onClick={(event) => {
                event.stopPropagation();
                handleChooseFile();
              }}
            >

              <Upload size={16} />

              Choose File

            </button>


            {/* SUPPORTED FORMATS */}

            <small>
              JPG • JPEG • PNG
            </small>

          </div>

        )}


        {/* =====================================================
            AFTER FILE SELECTION
            ===================================================== */}

        {selectedFile && (

          <div className="preview-container">

            {/* PREVIEW HEADER */}

            <div className="preview-header">

              <div>

                <h3>
                  Selected Prescription
                </h3>

                <p>
                  {selectedFile.name}
                </p>

              </div>


              {/* REMOVE */}

              <button
                type="button"
                className="remove-file-button"
                onClick={handleRemoveFile}
                aria-label="Remove prescription"
              >

                <X size={18} />

              </button>

            </div>


            {/* IMAGE */}

            <div className="image-preview">

              <img
                src={preview}
                alt="Uploaded prescription"
              />

            </div>

          </div>

        )}


        {/* =====================================================
            PROCESS BUTTON
            ===================================================== */}

        {selectedFile && (

          <button
            type="button"
            className="process-button"
            onClick={handleProcess}
          >

            <ScanLine size={19} />

            Process Prescription

          </button>

        )}

      </section>


      {/* =====================================================
          TEMPORARY OCR RESULT
          ===================================================== */}

      {processed && (

        <section className="content-card prescription-card result-card">

          <div className="prescription-section-title">

            <div className="section-icon green-icon">

              <CheckCircle size={21} />

            </div>

            <div>

              <h2>
                Extracted Medicine Details
              </h2>

              <p>
                Information extracted from the prescription.
              </p>

            </div>

          </div>


          {/* MEDICINE DETAILS */}

          <div className="medicine-grid">

            <div className="medicine-field">

              <span>
                Medicine Name
              </span>

              <strong>
                Paracetamol
              </strong>

            </div>


            <div className="medicine-field">

              <span>
                Dosage
              </span>

              <strong>
                500 mg
              </strong>

            </div>


            <div className="medicine-field">

              <span>
                Frequency
              </span>

              <strong>
                Twice a day
              </strong>

            </div>


            <div className="medicine-field">

              <span>
                Timing
              </span>

              <strong>
                Morning & Night
              </strong>

            </div>


            <div className="medicine-field">

              <span>
                Food Relation
              </span>

              <strong>
                After Food
              </strong>

            </div>

          </div>

        </section>

      )}

    </main>
  );
}

export default PrescriptionUpload;