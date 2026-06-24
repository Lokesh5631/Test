import dotenv from "dotenv"
dotenv.config()


import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({apiKey: process.env.API_KEY});

// async function main() {
//   try{
//   const response = await ai.models.generateContent({
//     model: "gemini-3.5-flash",
//     contents: "Create an AI imnage",
//   });

//   console.log(response.text);
//   } catch (err){
//     console.log("Error", err);
//   }
// }
async function main(){
  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-lite",
    contents: "Generate some random 5 objects in the following json format", // This is where your prompt goes
    config: {
      // 1. Tell Gemini to reply with a JSON string instead of text
      responseMimeType: "application/json",
      // 2. Define the exact JSON structure you want the AI to follow
      responseSchema: {
        type: "OBJECT",
        properties: {
          projects: {
            type: "ARRAY",
            items: {
              type: "OBJECT",
              properties: {
                // Here go the attributes making up each data element. For example, if we need to generate two attributes, product name and price.
                product_name: { type: "STRING" },
                price: { type: "NUMBER" },
              }
            }
          }
        }
      }
    }
  });

  // Convert the structured JSON string into a live JavaScript Object
  const data = JSON.parse(response.text);

  // Now you can easily loop through the array or access indices natively!
  console.log(data.projects);
}
main();