from pathlib import Path

import pytesseract
from PIL import Image


# Tell pytesseract where Tesseract is installed on Windows
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(image_path: str) -> dict:
    """
    Extract text from a prescription image using Tesseract OCR.

    Returns:
        {
            "text": "...",
            "confidence": 85.5
        }
    """

    path = Path(image_path)

    if not path.exists():
        raise FileNotFoundError(f"Image not found: {image_path}")

    image = Image.open(path)

    # OCR in English + Tamil
    text = pytesseract.image_to_string(
        image,
        lang="eng+tam",
    )

    # Get word-level OCR confidence
    data = pytesseract.image_to_data(
        image,
        lang="eng+tam",
        output_type=pytesseract.Output.DICT,
    )

    confidences = []

    for confidence in data["conf"]:
        try:
            value = float(confidence)

            if value >= 0:
                confidences.append(value)

        except (ValueError, TypeError):
            continue

    average_confidence = (
        sum(confidences) / len(confidences)
        if confidences
        else 0.0
    )

    return {
        "text": text.strip(),
        "confidence": round(average_confidence, 2),
    }