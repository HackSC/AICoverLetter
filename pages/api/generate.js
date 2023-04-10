const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

//completion endpoint with temperature of 0.6
//1 token generally corresponds to abbout 4 characters of common english text (default to 16 tokens)
export default async function handler(req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generateAIPrompt(
      req.body.resume,
      req.body.jobTitle,
      req.body.jobDescription
    ),
    temperature: 0.7,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generateAIPrompt(resume, jobTitle, jobDescription) {
  return `Write a sophisticated cover letter that highlights the candidate's qualifications and experience from their resume for the indicated job title. In your letter, address how the candidate's skills align with the requirements of the job description, and provide specific examples of their experience. Additionally, discuss how the candidate's skills can contribute to the success of the company, and demonstrate their passion for their field. Base everything in the letter on the following Job Title, Job Description, and Resume: \n\n Job Title: ${jobTitle} \n\n Job Description: ${jobDescription}
  \n\n Resume: ${trimSpaces(resume)} \n\n Don't autocomplete the resume, focus on the cover letter.`;
}

const trimSpaces = (str) => {
  if (!str) return str;
  return str.trimStart().trimEnd();
};
