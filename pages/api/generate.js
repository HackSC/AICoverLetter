import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

//completion endpoint with temperature of 0.6
//1 token generally corresponds to abbout 4 characters of common english text (default to 16 tokens)
export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: generateAIPrompt(req.body.resume, req.body.jobDescription),
    temperature: 0.7,
    max_tokens: 400,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generateAIPrompt(resume, jobDescription) {
  // const capitalizedPrompt = prompt[0].toUpperCase() + prompt.slice(1).toLowerCase();
  // console.log(`Write a Cover Letter Based on This Job Description and Resume: \n\n Job Description: \n ${jobDescription}
  // \n\n Resume: \n ${resume}`);
  return `Write a Cover Letter Based on This Job Description and Resume: \n\n Job Description: \n ${jobDescription} 
  \n\n Resume: \n ${resume}`;
}
