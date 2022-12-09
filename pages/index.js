import { Spinner } from "@chakra-ui/react";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import getText from "../helperFunctions/getText";
import Head from "next/head"
import Footer from "../components/Footer";
import { Textarea } from "@nextui-org/react";
import Header from "../components/Header";

<Head>
  <script
    async
    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671714996037159"
    crossorigin="anonymous"
  ></script>
</Head>

export default function Home() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(null);
  //after upload, get file and display some data, remove possible errors
  const handleChange = (event) => {
    //to prevent typescript null value error
    if (!event.target.files) return;
    setError(null);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };
  //after submission, set output text and show error element if incorrect file format
  const handleSubmission = () => {
    if (!selectedFile) {
      setError(`Please upload your resume`);
      return;
    }
    getText(selectedFile).then(
      (text) => {
        // console.log(text)
        callGPT(text);
      },
      (error) => {
        console.error(error);
        setError(`File could not be uploaded due to this error: ${error}`);
      }
    );
  };

  async function callGPT(extractedResumeText) {
    setLoading(true);
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: extractedResumeText,
          jobDescription: jobDescription,
        }),
      });
      const data = await response.json();
      setCoverLetterText(data.result);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const clearText = () => {
    setIsSelected(false);
    setCoverLetterText(null);
  };

  const copyToClipboard = () => {
    if (coverLetterText) {
      navigator.clipboard.writeText(coverLetterText).catch(() => {
        alert("something went wrong");
      });
    }
  };

  return (
    <>
      <Header />
      <div className={styles.largerContainer}>
        <div className="row">
          <p>{`Upload Your Resume`}</p>
          <br />
          <label className="custom-input">
            <input
              type="file"
              name="file"
              data-testid="upload-input"
              onChange={handleChange}
              accept="application/pdf"
            />
            {/* Upload PDF to Extract Text */}
          </label>
          {isSelected && selectedFile && (
            <div>
              <p>
                Filename: <strong>{selectedFile.name}</strong>
              </p>{" "}
              {/* <p>
                Filetype: <strong>{selectedFile.type}</strong>
              </p> */}
              {/* <p>
              Size in bytes: <strong>{selectedFile.size}</strong>
            </p> */}
            </div>
          )}

          <div>
            {loading ? (
              <div className={styles.spinner}>
                <b>One moment as we make you look real good :)</b>
                <br />
                <br />
                <Spinner boxSize={24} />
              </div>
            ) : (
              <div>
                <br />
                <br />

                {/* <p>{`Paste any relevant job information below (optional)`}</p> */}
                <Textarea
                  id="jobDescription"
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  resize="horizontal"
                  labelPlaceholder="Job Description (optional)"
                  status="Default"
                  rows={20}
                  width="500px"
                />
              </div>
            )}
          </div>
          {error && <div>{error}</div>}

          <div>
            <br />
            <button className="btn btn-primary" onClick={handleSubmission}>
              Generate a Personalized Cover Letter
            </button>
            <p className={styles.privacy}>note: resumes deleted upon creation of cover letter</p>
          </div>
        </div>
        <div>
          {coverLetterText && (
            <div className={styles.resultTextArea}>
              <div>
                <h4>Generated Cover Letter</h4>
                <Textarea
                  id="resultTextArea"
                  initialValue={coverLetterText}
                  // onChange={handleChange}
                  resize="horizontal"
                  placeholder={coverLetterText}
                  status="primary"
                  rows={28}
                  width="650px"
                />
              </div>
              {/* <div className="parsed-text">
                <h4>Parsed Text</h4>
              </div> */}
              <br></br>
              <div>
                <button
                  className="btn btn-outline-secondary"
                  onClick={copyToClipboard}
                >
                  Copy to Clipboard
                </button>
              </div>
              <button className="btn btn-secondary" onClick={clearText}>
                Clear
              </button>
            </div>
          )}
        </div>
      </div>  
      <Footer />
    </>
  );
}
