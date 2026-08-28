from pathlib import Path

import pytesseract
from PIL import Image, ImageOps


# Tesseract installation on Windows
pytesseract.pytesseract.tesseract_cmd = (
    r"C:\Program Files\Tesseract-OCR\tesseract.exe"
)


def extract_text_from_image(image_path: str) -> dict:
    """
    Extract English + Tamil text from a prescription image.

    Returns:
        {
            "text": "...",
            "confidence": 85.5
        }
    """

    path = Path(image_path)

    if not path.exists():
        raise FileNotFoundError(
            f"Image not found: {image_path}"
        )

    # Open image safely
    image = Image.open(path)

    # Convert RGBA/RGB/etc. to RGB
    if image.mode != "RGB":
        image = image.convert("RGB")

    # Convert to grayscale
    gray = ImageOps.grayscale(image)

    # Tesseract configuration
    config = "--psm 6"

    # OCR: English + Tamil
    text = pytesseract.image_to_string(
        gray,
        lang="eng+tam",
        config=config,
    )

    # Word-level OCR confidence
    data = pytesseract.image_to_data(
        gray,
        lang="eng+tam",
        config=config,
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
