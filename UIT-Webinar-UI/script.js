const submitBtn = document.getElementById("submit-btn");
const displayPanel = document.getElementById("data-display");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const phone = document.getElementById("phone").value;
  const email = document.getElementById("email").value;
  const location = document.getElementById("address").value;
  const major = document.getElementById("major").value;
  const current_year = document.getElementById("grad-year").value;
  const expected_year = document.getElementById("curr-year").value;
  const university = document.getElementById("university").value;
  const GPA = document.getElementById("gpa").value;
  const job_title = document.getElementById("job").value;
  const skills = document.getElementById("skills").value;
  const cert = document.getElementById("certificate").value;
  const award = document.getElementById("award").value;
  const workExp = document.getElementById("work").value;
  const acts = document.getElementById("activities").value;
  const project = document.getElementById("project").value;

  const data = {
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
  };

  const result = await FetchApi(data);

  console.log(result);

  displayPanel.innerHTML = result;
});

async function FetchApi(data) {
  const res = await axios.post("http://localhost:3000/chat", data, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(res.data);
  return res.data.message;
}
