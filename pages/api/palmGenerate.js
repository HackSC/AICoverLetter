const { TextServiceClient } = require("@google-ai/generativelanguage").v1beta2;
const { GoogleAuth } = require("google-auth-library");

// Set up the model and API key for PaLM
const MODEL_NAME = "models/text-bison-001";
const API_KEY = process.env.PALM_API_KEY; // Ensure your API key is set in the environment variables

// Initialize the PaLM API client
const client = new TextServiceClient({
  authClient: new GoogleAuth().fromAPIKey(API_KEY),
});

// Function to call the PaLM API for text generation
async function generateTextWithPaLM(prompt) {
  try {
    const response = await client.generateText({
      model: MODEL_NAME,
      prompt: {
        text: prompt,
      },
    });

    // Assuming the first candidate's output is what we need
    const generatedText = response[0].candidates[0].output;
    return generatedText;
  } catch (error) {
    console.error('Error calling PaLM API:', error);
    throw error;
  }
}

// Function to generate the AI prompt for a cover letter
function generateAIPrompt(resume, jobTitle, jobDescription) {
  return `Write a sophisticated cover letter that highlights the candidate's qualifications and experience from their resume for the indicated job title. In your letter, address how the candidate's skills align with the requirements of the job description, and provide specific examples of their experience. Additionally, discuss how the candidate's skills can contribute to the success of the company, and demonstrate their passion for their field. Base everything in the letter on the following Job Title, Job Description, and Resume: \n\n Job Title: ${jobTitle} \n\n Job Description: ${jobDescription}
  \n\n Resume: ${trimSpaces(resume)} \n\n Don't autocomplete the resume, focus on the cover letter.`;
}

// Function to trim spaces from a string
const trimSpaces = (str) => {
  if (!str) return str;
  return str.trimStart().trimEnd();
};

// Handler function adapted for PaLM API
export default async function handler(req, res) {
  const prompt = generateAIPrompt(
    req.body.resume,
    req.body.jobTitle,
    req.body.jobDescription
  );

  try {
    const coverLetter = await generateTextWithPaLM(prompt);
    res.status(200).json({ result: coverLetter });
  } catch (error) {
    res.status(500).send('Error generating text with PaLM');
  }
}
