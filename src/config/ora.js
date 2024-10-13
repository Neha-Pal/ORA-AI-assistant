const apikey = "AIzaSyDkGcMSZ_iN3mfFDZmhTy6D4XSrEuIzaAU"

/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
}  from "@google/generative-ai"

const apiKey = "AIzaSyDkGcMSZ_iN3mfFDZmhTy6D4XSrEuIzaAU"; // Paste the API key here
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};

async function run(prompt) {
    const chatSession = model.startChat({
        generationConfig,
        history: [],
    });

    try {
        // Fetch the result from sending the message
        const result = await chatSession.sendMessage(prompt);

        // Extract the response text from the result
        const responseText = result.response.text();

        // Log and return the response text
        console.log(responseText);
        return responseText;
    } catch (error) {
        console.error("Error occurred while generating response:", error);
        throw error; // Ensure any error is caught by the caller
    }
}

export default run;

