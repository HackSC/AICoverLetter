import styles from "../styles/Home.module.css";
import { useEffect, useState } from "react";
import getText from "../helperFunctions/getText";
import Head from "next/head";
import Footer from "../components/Footer";
import { Textarea, Button, Text } from "@nextui-org/react";
import Header from "../components/Header";
import Image from "next/image";
import superHeroResumes from "public/superheroResumes.png";
import { TypeAnimation } from "react-type-animation";
import MobileMessage from "components/MobileMessage";

export default function Home() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  // const [jobDescription, setJobDescription] = useState("");
  // const [jobTitle, setJobTitle] = useState("");
  const [coverLetterText, setCoverLetterText] = useState("");
  const [step, setStep] = useState(0);
  const [firstResumeClick, setFirstResumeClick] = useState(true);
  const [mobile, setMobile] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      // This checks if the current device is in fact mobile
      setMobile(true);
    }
  }, [mobile]);

  const handleUplodResumeNavigationClick = () => {
    if (firstResumeClick == false && step != 0) {
      setStep(0);
    } else {
      handleResumeUpload();
      setFirstResumeClick(false);
    }
  };

  const handleUplodPasteJobDescriptionNavigationClick = () => {
    setFirstResumeClick(false);
    setStep(1);
  };

  const handleUplodGenerateCoverLetterNavigationClick = () => {
    setFirstResumeClick(false);
    setStep(2);
  };
  // useEffect(() => {
  //   try {
  //     if (document.getElementById("descriptionTextArea") != null)
  //     {
  //       console.log("entered")
  //       activateJobDescriptionCursor();
  //     }
  //   }
  //   catch (e) {

  //   };
  // }, [step]);

  //after upload, get file and display some data, remove possible errors
  const handleFileUpload = (event) => {
    //to prevent typescript null value error
    if (!event.target.files) return;
    setError(null);
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
    setStep(1);
  };

  // const activateJobDescriptionCursor = () => {
  //   const area = document.getElementById("descriptionTextArea").click();
  //   area.focus()
  //   console.log("function ran")
  // }

  //after submission, set output text and show error element if incorrect file format
  const generateCoverLetter = () => {
    if (!selectedFile) {
      // setError(`Please upload your resume`);
      return;
    }
    const jobTitle = document.getElementById("jobTitleTextArea").value;
    const jobDescription = document.getElementById("jobDescriptionTextArea").value;
    getText(selectedFile).then(
      (text) => {
        callGPT(text,jobDescription,jobTitle);
      },
      (error) => {
        console.error(error);
        setError(`File could not be uploaded due to this error: ${error}`);
      }
    );
  };

  const handleResumeUpload = () => {
    document.getElementById("file-upload").click();
  };

  async function callGPT(extractedResumeText, jobDescription, jobTitle) {
    setStep(2);
    setLoading(true);
    console.log(`Write a Cover Letter Based on the following Job Title, Job Description, and Resume: \n\n Job Title: ${jobTitle} \n\n jobDescription: ${jobDescription}
    \n\n Resume: ${extractedResumeText}`)
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resume: extractedResumeText,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
        }),
      });
      const data = await response.json();
      const formattedResult = ltrim(data.result);
      setCoverLetterText(formattedResult);
      setStep(3);
      setfirstResumeClick(true);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }

  const ltrim = (str) => {
    if (!str) return str;
    return str.trimStart();
  };

  const scrollDown = () => {
    if (!mobile) {
      window.scrollTo({
        top: 900,
        behavior: "smooth",
      });
    }
    else if (mobile) {
      window.scrollTo({
        top: 1786,
        behavior: "smooth",
      });
    }
  };

  // const clearText = () => {
  //   setIsSelected(false);
  //   setCoverLetterText(null);
  // };

  // const copyToClipboard = () => {
  //   if (coverLetterText) {
  //     navigator.clipboard.writeText(coverLetterText).catch(() => {
  //       alert("something went wrong");
  //     });
  //   }
  // };
  // const uploadZone = document.getElementById('uploadZone');
  // uploadZone.onclick = function() {
  //   handleResumeUpload()
  // };

  return (
    <>
      {/* {mobile && (
        <div className={styles.mobileContainer}>
            <MobileMessage />
        </div>
      )} */}
      {/* {!mobile && ( */}
        <div className={mobile ? styles.overallContainerMobile : styles.overallContainer}>
          <div className={styles.topBlock} />
          <div className={styles.heroSection}>
            <div className={mobile ? styles.row1Mobile : styles.row1}>
              <div className={mobile ? styles.row1leftcontainerMobile : styles.row1leftcontainer}>
                <div>
                  <b className={styles.freeBeta}>FREE in BETA</b>
                </div>
                <i className={styles.landYourDreamJobAutomatic}>
                  <div style={{ height: "180px"}}>
                   {!mobile && <TypeAnimation
                      sequence={[
                        "Land your dream job, automatically.",
                        1500,
                        "Never waste time on a cover letter again.",
                        1500,
                        "Click below to get started!",
                        2000,
                      ]}
                      wrapper="div"
                      cursor={true}
                      repeat={false}
                      deletionSpeed={65}
                      style={{ all: "inherit" }}
                    />}
                    {mobile && 
                    <div style={{ height: "180px", fontSize: "50px", lineHeight: "60px"}}>
                      <TypeAnimation
                      sequence={[
                      "Welcome to the future of job applications."
                      ]}
                      />
                    </div>
                    }
                  </div>

                </i>
                <div className={styles.itOnlyTakes30SecondsToGe}>
                  It only takes 30 seconds to get a personalized cover letter
                  that highlights your unique skills and experience using AI.
                </div>
                <Button
                  variant="outlined"
                  color="black"
                  className={styles.button}
                  onClick={scrollDown}
                >{`CREATE YOUR LETTER ->`}</Button>
              </div>
              {
              !mobile && 
              <div className={styles.row1rightcontainer}>
                <Image
                  src={superHeroResumes}
                  width={500}
                  height={500}
                  alt="resume icons"
                />
              </div> 
              }
            </div>
          </div>
          <div className={mobile ? styles.statsSectionMobile : styles.statsSection}>
            <div className={mobile ? styles.frameDiv5Mobile : styles.frameDiv5}>
              <div className={styles.frameDiv6}>
                <b className={styles.statWidget}>
                  <span className={styles.statFontSize}>86</span>
                  <span className={styles.statPercentSize}>{`% `}</span>
                </b>
                <div className={styles.ofRecruitersPreferCandidate}>
                  of job seekers do not personalize their cover letter
                </div>
              </div>
            </div>
            <div className={mobile ? styles.frameDiv5Mobile : styles.frameDiv5}>
              <div className={styles.frameDiv6}>
                <b className={styles.statWidget}>
                  <span className={styles.statFontSize}>83</span>
                  <span className={styles.statPercentSize}>{`% `}</span>
                </b>
                <div className={styles.ofRecruitersPreferCandidate}>
                  of recruiters prefer candidates with cover letters
                </div>
              </div>
            </div>
            <div className={mobile ? styles.frameDiv5Mobile : styles.frameDiv5}>
              <div className={styles.frameDiv6}>
                <b className={styles.statWidget}>
                  <span className={styles.statFontSize}>59</span>
                  <span className={styles.statPercentSize}>{`% `}</span>
                </b>
                <div className={styles.ofRecruitersPreferCandidate}>
                  of cover letters have grammatical errors
                </div>
              </div>
            </div>
            <div className={mobile ? styles.frameDiv5Mobile : styles.frameDiv5}>
              <div className={styles.frameDiv6}>
                <b className={styles.statWidget}>
                  <span className={styles.statFontSize}>48</span>
                  <span className={styles.statPercentSize}>{`% `}</span>
                </b>
                <div className={styles.ofRecruitersPreferCandidate}>
                  of big tech companies require cover letters
                </div>
              </div>
            </div>
          </div>
          <div className={mobile ? styles.statsSectionMobile : styles.statsSection1}>
            <div className={styles.frameDiv13}>
              <i className={mobile ? styles.createYourCoverLetterMobile : styles.createYourCoverLetter}>
                Create your cover letter
              </i>
              <div className={mobile ? styles.uploadYourResumePasteTheMobile : styles.uploadYourResumePasteThe} style={{ paddingBottom: "10px"}}>
                Upload your resume, paste the job description, and create!
              </div>
            </div>
            <div className={styles.appSection}>
              <div className={mobile ? styles.uploadWrapperMobile : styles.uploadWrapper}>
                {/*set step to green if completed*/}
                <div
                  onClick={(e) => handleUplodResumeNavigationClick()}
                  className={
                    selectedFile ? styles.frameDiv14green : styles.frameDiv14
                  }
                >
                  <div className={styles.uPLOADRESUME}>
                    1. UPLOAD YOUR RESUME
                  </div>
                </div>
                <div
                  onClick={(e) =>
                    handleUplodPasteJobDescriptionNavigationClick()
                  }
                  className={
                    step > 1 ? styles.frameDiv14green : styles.frameDiv14
                  }
                >
                  <div className={styles.uPLOADRESUME}>
                    2. PASTE JOB DESCRIPTION
                  </div>
                </div>
                <div
                  onClick={(e) =>
                    handleUplodGenerateCoverLetterNavigationClick()
                  }
                  className={
                    step > 2 ? styles.frameDiv14green : styles.frameDiv14
                  }
                >
                  <div className={`${styles.uPLOADRESUME}`}>
                    3. GENERATE COVER LETTER
                  </div>
                </div>
              </div>
              {step == 0 && (
                <div className={styles.frameDiv16}>
                  <div className={styles.uploadWrapper1}>
                    <label className="custom-input">
                      <input
                        type="file"
                        name="file"
                        id="file-upload"
                        onChange={handleFileUpload}
                        accept="application/pdf"
                        style={{ display: "none" }}
                      />
                    </label>
                    <div
                      onClick={(e) => handleResumeUpload()}
                      className={styles.uploadInner}
                    >
                      <img
                        className={styles.icon}
                        alt=""
                        src="../uploadIcon.svg"
                      />
                      <div className={styles.dRAGDROPYOURRESUMEOrBro}>
                        <p className={styles.dRAGDROPYOURRESUME}>
                          <span
                            className={styles.dRAGDROP}
                          >{`DRAG & DROP YOUR RESUME`}</span>
                        </p>
                        <p className={styles.uSsjsd}>
                          <span>
                            {`or `}
                            <span className={styles.browseFiles}>
                              browse files
                            </span>{" "}
                            on your computer
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {step == 1 && !mobile && (
                <>
                  <div className={mobile ? styles.enterJobDescriptionMobile : styles.enterJobDescription}>
                    <p className={styles.jobDescriptionTitleTitle}>
                      ENTER THE JOB TITLE:
                    </p>
                    <div>
                      <textarea
                        placeholder="ex: Software Engineer at Google"
                        id="jobTitleTextArea"
                        // onChange={(e) => setJobDescription(e.target.value)}
                        className={styles.jobDescription}
                        autofocus
                        rows={1}
                      >
                      </textarea>
                    </div>
                    <div className={styles.jobDescriptionArea}> 
                      <p className={styles.jobDescriptionAreaTitle}>
                        ENTER THE JOB DESCRIPTION (OPTIONAL):
                      </p>
                      <div className={styles.textAreaDescription}>
                        <textarea
                          placeholder="ex: We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Google’s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve."
                          id="jobDescriptionTextArea"
                          // onChange={(e) => setJobDescription(e.target.value)}
                          className={styles.jobDescription}
                          autofocus
                          rows={7}
                        >
                        </textarea>
                      </div>
                    </div>
                  </div>
                    <div
                      className={`${styles.frameDiv17} ${styles.jobDescriptionCoverLetterButton}`}
                      onClick={(e) => generateCoverLetter()}
                    >
                      <div className={styles.generateCoverLetterButton}>
                        {`Generate Cover Letter ->`}
                      </div>
                    </div>
                </>
              )}
             {step == 1 && mobile && (
                <>
                  <div className={mobile ? styles.enterJobDescriptionMobile : styles.enterJobDescription}>
                    <p className={styles.jobDescriptionTitleTitle}>
                      ENTER THE JOB TITLE AND DESCRIPTION:
                    </p>
                    <div>
                      <textarea
                        placeholder="ex: Software Engineer at Google working on search engine optimization"
                        id="jobTitleTextArea"
                        // onChange={(e) => setJobDescription(e.target.value)}
                        className={styles.jobDescription}
                        autofocus
                        rows={8}
                      >
                      </textarea>
                    </div>
                    {/* <div className={styles.jobDescriptionArea}> 
                      <p className={styles.jobDescriptionAreaTitle}>
                        ENTER THE JOB DESCRIPTION (OPTIONAL):
                      </p>
                      <div className={styles.textAreaDescription}>
                        <textarea
                          placeholder="ex: We're looking for engineers who bring fresh ideas from all areas, including information retrieval, distributed computing, large-scale system design, networking and data storage, security, artificial intelligence, natural language processing, UI design and mobile; the list goes on and is growing every day. As a software engineer, you will work on a specific project critical to Google’s needs with opportunities to switch teams and projects as you and our fast-paced business grow and evolve."
                          id="jobDescriptionTextArea"
                          // onChange={(e) => setJobDescription(e.target.value)}
                          className={styles.jobDescription}
                          autofocus
                          rows={7}
                        >
                        </textarea>
                      </div>
                    </div> */}
                  </div>
                    <div
                      className={`${styles.frameDiv17} ${styles.jobDescriptionCoverLetterButton}`}
                      onClick={(e) => generateCoverLetter()}
                    >
                      <div className={styles.generateCoverLetterButton}>
                        {`Generate Cover Letter ->`}
                      </div>
                    </div>
                </>
              )}
              {step >= 2 &&
                (loading ? (
                  <div>
                    <div class={styles.loader}></div>
                  </div>
                ) : (
                  <>
                    <div className={mobile ? styles.resultJobDescriptionMobile : styles.resultJobDescription}>
                      <div>
                        <textarea
                          id="resultTextArea"
                          defaultValue={coverLetterText}
                          // onChange={(e) => setJobDescription(e.target.value)}
                          className={styles.resultJobTextArea}
                          autofocus
                          rows={10}
                        ></textarea>
                      </div>
                    </div>
                    <div
                      className={styles.frameDiv17}
                      onClick={(e) => setStep(1)}
                    >
                      <div className={styles.generateCoverLetterButton}>
                        {`Generate Another Letter ->`}
                      </div>
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div className={mobile ? styles.footerMobile : styles.footer}>
            Made with ❤️ by{" "}
            {/*temporarily deciding against linktree as my website includes all links*/}
            <a style={{ color: "white" }} href="https://danialasaria.com/about">
              <u>Danial</u>
            </a>{" "}
            and{" "}
            <a style={{ color: "white" }} href="https://reesebretow.com/">
              <u>Reese</u>
            </a>
          </div>
        </div>
      {/* )} */}
    </>
  );
}
// <>
// <Head>
//   <title>AI Cover Letter</title>
//   <script
//     async
//     src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4671714996037159"
//     crossorigin="anonymous"
//   >
//   </script>
// </Head>
//   <Header />
//   <div className={styles.largerContainer}>
//     <div className="row">
//       {/*Remove default upload button to add custome button that will call handleFileUpload*/}
//       <Button shadow onClick={handleClick}>
//         {
//           (
//             selectedFile == null
//             ? ("Upload Resume")
//             : "Success!"
//           )
//         }
//         {console.log(selectedFile)}
//       </Button>
//       <label className="custom-input">
//         <input
//           type="file"
//           name="file"
//           id="file-upload"
//           onChange={handleFileUpload}
//           accept="application/pdf"
//           style={{display:'none'}}
//         />
//       </label>
//       {/* {isSelected && selectedFile && (
//         <div>
//           <p>
//             Filename: <strong>{selectedFile.name}</strong>
//           </p>{" "} */}
//           {/* <p>
//             Filetype: <strong>{selectedFile.type}</strong>
//           </p> */}
//           {/* <p>
//           Size in bytes: <strong>{selectedFile.size}</strong>
//         </p> */}
//         {/* </div>
//       )} */}

//       <div>
//         {loading ? (
//           <div className={styles.spinner}>
//             <br />
//             <b>One moment as we make you look real good :)</b>
//             <br />
//             <br />
//             <Spinner boxSize={24} />
//           </div>
//         ) : (
//           <div>
//             <br />
//             <br />

//             {/* <p>{`Paste any relevant job information below (optional)`}</p> */}
//             <Textarea
//               id="jobDescription"
//               value={jobDescription}
//               onChange={(e) => setJobDescription(e.target.value)}
//               resize="horizontal"
//               labelPlaceholder="Job Description (optional)"
//               status="Default"
//               rows={20}
//               width="500px"
//             />
//           </div>
//         )}
//       </div>
//       {error && <div>{error}</div>}

//       <div>
//         <br />
//         <Button shadow className="btn btn-primary" onClick={handleSubmission}>
//           Generate Cover Letter
//         </Button>
//         <br />
//         <p className={styles.privacy}>
//         We take privacy seriously.  Resumes are deleted upon creation of the cover letter, <br />
//         and no data is stored on our servers.
//         </p>
//       </div>
//     </div>
//     <div>
//     {!coverLetterText && (
//     <div className={styles.instructions}>
//         <Text
//         h1
//         size={20}
//         // css={{
//         //   textGradient: "45deg, $blue600 -20%, $pink600 50%",
//         // }}
//         weight="bold"
//       >
//          Welcome to the most advanced cover letter generator on the market!
//          Simply upload your resume and provide information about the job you&apos;re applying for to get a personalized cover
//          letter that highlights your unique skills and experience. Our platform uses cutting-edge AI technology to craft the perfect
//           cover letter, giving you the best chance of landing your dream job. </Text>
//       </div>
//     )}
//       {coverLetterText && (
//         <div className={styles.resultTextArea}>
//           <div>
//             <h4>Generated Cover Letter</h4>
//             <Textarea
//               id="resultTextArea"
//               initialValue={coverLetterText}
//               // onChange={handleChange}
//               resize="horizontal"
//               placeholder={coverLetterText}
//               status="default"
//               rows={26}
//               width="650px"
//             />
//           </div>
//           {/* <div className="parsed-text">
//             <h4>Parsed Text</h4>
//           </div> */}
//           <br></br>
//             <div className={styles.resultButtons}>
//               <div className={styles.copyClipboard}>
//                 <Button
//                   color="success"
//                   onClick={copyToClipboard}
//                 >
//                   Copy to Clipboard
//                 </Button>
//               </div>
//               <div className={styles.clearButton}>
//                 <Button
//                 color="success"
//                 onClick={clearText}>
//                 Clear
//                 </Button>
//               </div>
//             </div>
//         </div>
//       )}
//     </div>
//   </div>
// </>
