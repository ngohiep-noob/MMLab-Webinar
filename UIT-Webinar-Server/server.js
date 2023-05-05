const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/chat", async (req, res) => {
  console.log(req.body);

  const result = await FetchApi(req.body);

  return res.json({
    message: result,
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

async function FetchApi(data) {
  const prompt = GenerateTemplate(data);

  const res = await axios.post(
    "https://api.openai.com/v1/chat/completions",
    {
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer $YOUR_API_KEY",
      },
    }
  );

  console.log(res.data.choices[0].message.content);

  return res.data.choices[0].message.content;
}

function GenerateTemplate(data) {
  const {
    name,
    phone,
    email,
    location,
    major,
    current_year,
    expected_year,
    GPA,
    university,
    job_title,
    skills,
    cert,
    award,
    workExp,
    acts,
    project,
  } = data;
  return `
      Write a job resume for me based on this information
      Improve sections with advanced and academic vocabulary and compelling resume and time. 
      Order sections in a suitable way. 
      Improve more on work experience and personal projects with time and bullet points and contributions. 
      Change job title into objective with more information
    
      Contact Information
      - my name: ${name}
      - my phone number: ${phone}
      - my email address: ${email}
      - my address: ${location}
    
      Professional Summary: 
      - my career goal is to become an ${job_title}
    
    
      Education:
      - I am a ${current_year} at the university of ${university}
      - my major is ${major}
      - my expected graduation year is ${expected_year}
      - my Cumulative GPA: ${GPA}
    
      Work experience:
      - ${workExp}
    
      Personal projects:
      - ${project}
    
      Skills: "let's list necessary and critical skills based on ${job_title} and ${skills}"
      - ${skills}
    
      Certifications:
      - ${cert}
    
      Awards:
      - ${award}
    
      Activities
      - ${acts}
      Let's write the result in html format, 
      it would be injected in to a <div> tag, 
      the cv must be written as html code of the CV must to be finished by(strictly similar) "#####"`;
}
