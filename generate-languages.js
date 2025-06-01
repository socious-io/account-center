import axios from 'axios';
import fs from 'fs';
import path from 'path';
import process from 'process';
import 'dotenv/config';

const DEFAULT_LANGUAGES = ['Arabic', 'French', 'Spanish', 'Japanese', 'Chinese', 'Korean'];
const OUTPUT_BASE = './src/core/translation/locales/';
const fallbackLangCodes = {
  arabic: 'ar',
  french: 'fr',
  spanish: 'es',
  japanese: 'jp',
  chinese: 'zh',
  korean: 'kr',
};

// Validate API key
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error('❌ Missing environment variables.');
  process.exit(1);
}

// Input files
const inputFiles = process.argv.slice(2);
if (!inputFiles.length) {
  console.error('❌ No input files provided.');
  process.exit(1);
}

// Translation using OpenRouter API
async function translateWithOpenRouter(text, targetLanguage) {
  const prompt = `Translate this JSON object into ${targetLanguage}. Keep the keys unchanged and only translate the values.\n\nJSON:\n${text}`;

  const { data } = await axios.post(
    'https://openrouter.ai/api/v1/chat/completions',
    {
      model: 'mistralai/mistral-7b-instruct',
      messages: [
        { role: 'system', content: 'You are a translation engine.' },
        { role: 'user', content: prompt },
      ],
    },
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost',
        'X-Title': 'translation-script',
      },
    },
  );

  return data.choices?.[0]?.message?.content?.trim();
}

// Resolve language code
function getLangCode(language) {
  const lang = new Intl.DisplayNames(['en'], { type: 'language' });

  try {
    for (const code of Intl.getCanonicalLocales('en')) {
      const name = lang.of(code);
      if (name?.toLowerCase() === language.toLowerCase()) {
        return code;
      }
    }
  } catch (err) {
    console.error(`❌ Failed to get code of ${lang}:`, err.message);
  }

  return fallbackLangCodes[language.toLowerCase()] || language.toLowerCase().slice(0, 2);
}

// Translate a file
async function generateTranslationFile(inputFile, targetLanguages = DEFAULT_LANGUAGES, outputBase = OUTPUT_BASE) {
  const originalJson = JSON.parse(fs.readFileSync(inputFile, 'utf-8'));
  const originalText = JSON.stringify(originalJson, null, 2);
  const inputFileName = path.basename(inputFile);

  for (const lang of targetLanguages) {
    console.log(`🔄 Translating to ${lang}...`);
    try {
      const translatedText = await translateWithOpenRouter(originalText, lang);
      const parsed = JSON.parse(translatedText);

      const code = getLangCode(lang);
      const outputDir = path.join(outputBase, code);
      const outputPath = path.join(outputDir, inputFileName);
      fs.writeFileSync(outputPath, JSON.stringify(parsed, undefined, 2));

      console.log(`✅ Saved: ${translatedText} with "${code}" code in ${outputPath}`);
    } catch (err) {
      console.error(`❌ Failed to translate to ${lang}:`, err.message);
    }
  }
}

// Translate All Files
(async () => {
  for (const inputFile of inputFiles) {
    if (!inputFile.endsWith('.json') || !fs.existsSync(inputFile)) {
      console.error(`❌ Skipping invalid file: ${inputFile}`);
      continue;
    }

    try {
      await generateTranslationFile(inputFile);
    } catch (err) {
      console.error(`❌ Error processing file ${inputFile}:`, err.message);
    }
  }
})();
