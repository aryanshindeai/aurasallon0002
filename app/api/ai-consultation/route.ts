import { GoogleGenAI, Type } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is missing on server" },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { hairType, hairConcerns, primaryGoal, skinType, imageBase64 } = body;

    const ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });

    const promptText = `You are the AI Chief Master Stylist & Trichologist for "AURA THE SALON", an ultra-luxury ₹10 crore hair & beauty salon in Chandrapur.
    Provide an ultra-exclusive, personalized hair & skin diagnostic report and treatment plan for a VIP client with:
    - Hair Type/Texture: ${hairType || "Medium Wave, Frizz-prone"}
    - Primary Hair Concerns: ${hairConcerns || "Dryness, lack of shine, color damage"}
    - Primary Goal: ${primaryGoal || "Silk shine, balayage dimension, frizz elimination"}
    - Skin Profile: ${skinType || "Normal to combination"}

    Generate a structured JSON analysis with:
    1. diagnosticSummary: A luxury 2-3 sentence assessment of their hair fiber & skin condition.
    2. faceShapeAndColorTone: Recommended hair framing cut and color undertones (e.g. Honey Caramel, Espresso Mocca, Velvet Rose Gold).
    3. recommendedAuraServices: Array of 3 specific Aura services with reasons why.
    4. expectedResults: What they will see after their session.
    5. homeCareProtocol: 3 precise maintenance tips using premium products (like Dyson, Moroccanoil, Kérastase).
    6. stylistNote: A warm, elegant quote from Master Stylist Rahul Verma.`;

    const contents: any[] = [];
    if (imageBase64) {
      contents.push({
        inlineData: {
          mimeType: "image/jpeg",
          data: imageBase64.replace(/^data:image\/\w+;base64,/, ""),
        },
      });
    }
    contents.push({ text: promptText });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: { parts: contents },
      config: {
        systemInstruction: "You are the top editorial hair & beauty director for AURA THE SALON. Always speak with sophisticated elegance, high fashion authority, and warmth.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            diagnosticSummary: { type: Type.STRING },
            faceShapeAndColorTone: { type: Type.STRING },
            recommendedAuraServices: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  serviceName: { type: Type.STRING },
                  whyRecommended: { type: Type.STRING },
                  duration: { type: Type.STRING },
                  estimatedPrice: { type: Type.STRING }
                },
                required: ["serviceName", "whyRecommended"]
              }
            },
            expectedResults: { type: Type.STRING },
            homeCareProtocol: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            stylistNote: { type: Type.STRING }
          },
          required: ["diagnosticSummary", "faceShapeAndColorTone", "recommendedAuraServices", "expectedResults", "homeCareProtocol", "stylistNote"]
        }
      }
    });

    const jsonText = response.text || "{}";
    const data = JSON.parse(jsonText);

    return NextResponse.json({ success: true, result: data });
  } catch (err: any) {
    console.error("AI Consultation error:", err);
    return NextResponse.json(
      { error: err.message || "Failed to generate AI consultation" },
      { status: 500 }
    );
  }
}
