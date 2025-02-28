import { translate } from '@vitalets/google-translate-api';

async function translateText(text: string) {
  try {
    const res = await translate(text, { from: "en", to: "ja" });

    console.log("Translated Text:", res.text); // English translation
    console.log("Pronunciation (Romaji):", res.raw?.sentences?.[1]?.translit); // Romaji pronunciation
  } catch (error) {
    console.error("Translation Error:", error);
  }
}

// Example Usage
translateText("Hello"); // Output: "Hello" / "kon'nichiwa"

export default async function Page() {
    await translateText("Hello");
    return(
        <p>hello</p>
    )
}