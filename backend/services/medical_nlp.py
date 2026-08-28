import json
import os

from dotenv import load_dotenv
from google import genai


# ============================================================
# LOAD GEMINI API KEY
# ============================================================

load_dotenv("backend/.env", override=True)

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise RuntimeError("GEMINI_API_KEY is not configured")

client = genai.Client(api_key=GEMINI_API_KEY)


# ============================================================
# STRUCTURED JSON SCHEMA
# ============================================================

MEDICAL_SCHEMA = {
    "type": "object",
    "properties": {
        "medicines": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "medicine_name": {
                        "type": "string"
                    },
                    "dosage": {
                        "type": "string"
                    },
                    "timing": {
                        "type": "string"
                    },
                    "food_relation": {
                        "type": "string"
                    },
                    "visual_description": {
                        "type": "string"
                    },
                    "tamil_tts_script": {
                        "type": "string"
                    },
                    "haptic_pattern": {
                        "type": "string"
                    }
                },
                "required": [
                    "medicine_name",
                    "dosage",
                    "timing",
                    "food_relation",
                    "visual_description",
                    "tamil_tts_script",
                    "haptic_pattern"
                ]
            }
        }
    },
    "required": [
        "medicines"
    ]
}


# ============================================================
# MEDICAL NLP FUNCTION
# ============================================================

def extract_medical_information(ocr_text: str) -> dict:
    """
    Convert OCR prescription text into structured medical information.

    Input:
        OCR text extracted from prescription image.

    Output:
        {
            "medicines": [
                {
                    "medicine_name": "...",
                    "dosage": "...",
                    "timing": "...",
                    "food_relation": "...",
                    "visual_description": "...",
                    "tamil_tts_script": "...",
                    "haptic_pattern": "..."
                }
            ]
        }
    """

    # --------------------------------------------------------
    # Validate OCR text
    # --------------------------------------------------------

    if not ocr_text or not ocr_text.strip():
        raise ValueError("OCR text is empty")

    # --------------------------------------------------------
    # Gemini prompt
    # --------------------------------------------------------

    prompt = f"""
You are a medical prescription information extraction assistant.

The following text was extracted from a prescription using OCR.

OCR may contain:

- spelling mistakes
- incorrect characters
- Tamil and English mixed together
- missing spaces
- incorrectly recognized medicine names
- duplicated text
- noise
- doctor information
- clinic information
- general advice

Your task is to extract ONLY medicines and their information
that can reasonably be identified from the prescription.

DO NOT invent medical information.

IMPORTANT RULES:

1. Correct obvious OCR spelling mistakes ONLY when the intended
   medicine name is reasonably clear.

2. Do not guess a medicine name if the OCR text does not provide
   enough evidence.

3. Every medicine object MUST have a medicine_name.

4. If a medicine name cannot reasonably be identified,
   DO NOT create a medicine object for it.

5. Do not create a medicine object from a standalone dosage.

6. Do not create a medicine object from a standalone timing.

7. Do not create a medicine object from a standalone food instruction.

8. Do not create separate medicine objects for dosage, timing,
   or food information when the medicine name is missing.

9. Do not duplicate the same medicine.

10. Preserve dosage based only on the prescription.

11. Extract medication timing when explicitly present.

Examples:

- Morning
- Afternoon
- Night
- Once Daily
- Twice Daily
- Before Breakfast
- After Dinner
- Morning & Night

12. Extract food relation when explicitly present.

Examples:

- Before Food
- After Food
- With Food
- Before Breakfast
- After Dinner

13. If dosage is missing, return an empty string.

14. If timing is missing, return an empty string.

15. If food relation is missing, return an empty string.

16. visual_description should describe the medicine form only
    when reasonably supported by the prescription.

Examples:

- Tablet
- Capsule
- Syrup
- Injection

17. tamil_tts_script must be a short and simple Tamil reminder
    based ONLY on the extracted medicine information.

18. Do not add medical advice to tamil_tts_script.

19. Do not change the prescribed dosage.

20. Do not invent a timing.

21. Do not invent a food relation.

22. haptic_pattern should be a simple pattern that the frontend
    can use for reminders.

Allowed examples:

- single_short_vibration
- single_long_vibration
- double_short_vibration
- double_pulse

23. Do not treat general advice as a medicine.

For example:

- Walk 30 minutes
- Avoid oil
- Avoid heavy food
- Take medicines regularly

These are NOT medicines.

24. Ignore doctor names, registration numbers, clinic names,
    addresses, phone numbers and other unrelated information.

25. Ignore prescription footer/header duplication.

26. Only include medicines that are reasonably identifiable
    from the OCR text.

27. Return ONLY the structured JSON data matching the schema.

OCR TEXT:
==================================================

{ocr_text}

==================================================
"""

    # --------------------------------------------------------
    # Send request to Gemini
    # --------------------------------------------------------

    interaction = client.interactions.create(
        model="gemini-3.6-flash",
        input=prompt,
        response_format={
            "type": "text",
            "mime_type": "application/json",
            "schema": MEDICAL_SCHEMA,
        },
    )

    # --------------------------------------------------------
    # Read Gemini response
    # --------------------------------------------------------

    text = interaction.output_text.strip()

    if not text:
        raise ValueError(
            "Gemini returned an empty response"
        )

    # --------------------------------------------------------
    # Parse JSON
    # --------------------------------------------------------

    try:
        result = json.loads(text)

    except json.JSONDecodeError as exc:
        raise ValueError(
            f"Gemini returned invalid JSON: {text}"
        ) from exc

    # --------------------------------------------------------
    # Basic validation
    # --------------------------------------------------------

    if not isinstance(result, dict):
        raise ValueError(
            "Gemini response is not a JSON object"
        )

    if "medicines" not in result:
        raise ValueError(
            "Gemini response does not contain 'medicines'"
        )

    if not isinstance(result["medicines"], list):
        raise ValueError(
            "'medicines' must be a list"
        )

    # --------------------------------------------------------
    # Remove invalid unnamed medicine entries
    # --------------------------------------------------------

    valid_medicines = []

    for medicine in result["medicines"]:

        if not isinstance(medicine, dict):
            continue

        medicine_name = medicine.get(
            "medicine_name",
            ""
        ).strip()

        # Never allow unnamed medicines into final output
        if not medicine_name:
            continue

        # Make sure all required fields exist
        cleaned_medicine = {
            "medicine_name": medicine_name,
            "dosage": medicine.get(
                "dosage", ""
            ).strip(),

            "timing": medicine.get(
                "timing", ""
            ).strip(),

            "food_relation": medicine.get(
                "food_relation", ""
            ).strip(),

            "visual_description": medicine.get(
                "visual_description", ""
            ).strip(),

            "tamil_tts_script": medicine.get(
                "tamil_tts_script", ""
            ).strip(),

            "haptic_pattern": medicine.get(
                "haptic_pattern", ""
            ).strip(),
        }

        valid_medicines.append(cleaned_medicine)

    # --------------------------------------------------------
    # Remove duplicate medicines
    # --------------------------------------------------------

    unique_medicines = []
    seen_names = set()

    for medicine in valid_medicines:

        medicine_key = medicine[
            "medicine_name"
        ].lower().strip()

        if medicine_key in seen_names:
            continue

        seen_names.add(medicine_key)

        unique_medicines.append(medicine)

    # --------------------------------------------------------
    # Final result
    # --------------------------------------------------------

    return {
        "medicines": unique_medicines
    }