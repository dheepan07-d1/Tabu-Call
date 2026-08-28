from backend.services.ocr import extract_text_from_image
from backend.services.medical_nlp import extract_medical_information


def process_prescription(image_path: str) -> dict:
    """
    Complete prescription processing pipeline.

    Image
       ↓
    OCR
       ↓
    OCR confidence
       ↓
    Gemini Medical NLP
       ↓
    Structured prescription JSON
    """

    # Step 1: Extract text from prescription image
    ocr_result = extract_text_from_image(image_path)

    ocr_text = ocr_result["text"]
    confidence = ocr_result["confidence"]

    # Step 2: Make sure OCR produced something
    if not ocr_text.strip():
        raise ValueError("No text could be extracted from prescription")

    # Step 3: Send OCR text to Gemini
    medical_information = extract_medical_information(ocr_text)

    # Step 4: Combine OCR information + Gemini result
    result = {
        "ocr": {
            "text": ocr_text,
            "confidence": confidence,
        },
        "medical_information": medical_information,
    }

    return result