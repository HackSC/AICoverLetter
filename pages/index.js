import styles from '../styles/Home.module.css'
import { useEffect, useState } from 'react'
import { getText, ltrim } from '../helperFunctions'
import Footer from '@/components/Footer/Footer'
import { Button } from '@nextui-org/react'
import Header from '@/components/Header/Header'
import Image from 'next/image'
import superHeroResumes from 'public/images/superheroResumes.png'
import uploadIcon from 'public/images/uploadIcon.svg'
import StatBubble from '@/components/StatBubble/StatBubble'
import CompanyDescription from '@/components/CompanyDescription/CompanyDescription'
import CompanyTagLine from '@/components/CompanyTagLine/CompanyTagLine'
import CoverLetterSectionHeader from '@/components/CoverLetterSectionHeader/CoverLetterSectionHeader'

export default function Home() {
  const [selectedFile, setSelectedFile] = useState(null)
  const [coverLetterText, setCoverLetterText] = useState('')
  const [step, setStep] = useState(0)
  const [firstResumeClick, setFirstResumeClick] = useState(true)
  const [mobile, setMobile] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (/Android|iPhone/i.test(navigator.userAgent)) {
      // This checks if the current device is in fact mobile
      setMobile(true)
    }
  }, [mobile])

  const handleUplodResumeNavigationClick = () => {
    if (firstResumeClick == false && step != 0) {
      setStep(0)
    } else {
      handleResumeUpload()
      setFirstResumeClick(false)
    }
  }

  const handleUplodPasteJobDescriptionNavigationClick = () => {
    setFirstResumeClick(false)
    setStep(1)
  }

  const handleUplodGenerateCoverLetterNavigationClick = () => {
    debugger;
    if (step === 1) {
      const jobTitle = document.getElementById('jobTitleTextArea').value
      const jobDescription = document.getElementById('jobDescriptionTextArea')
        .value
      if (jobTitle || jobDescription) {
        generateCoverLetter();
      }
    }
    setFirstResumeClick(false)
    setStep(2)
  }

  //after upload, get file and display some data, remove possible errors
  const handleFileUpload = (event) => {
    //to prevent typescript null value error
    if (!event.target.files) return
    setError(null)
    setSelectedFile(event.target.files[0])
    setStep(1)
  }

  //after submission, set output text and show error element if incorrect file format
  const generateCoverLetter = () => {
    if (!selectedFile) {
      // setError(`Please upload your resume`);
      return
    }
    const jobTitle = document.getElementById('jobTitleTextArea').value
    const jobDescription = document.getElementById('jobDescriptionTextArea')
      .value
    getText(selectedFile).then(
      (text) => {
        callGPT(text, jobDescription, jobTitle)
      },
      (error) => {
        console.error(error)
        setError(`File could not be uploaded due to this error: ${error}`)
      },
    )
  }

  const handleResumeUpload = () => {
    document.getElementById('file-upload').click()
  }

  async function callGPT(extractedResumeText, jobDescription, jobTitle) {
    setStep(2)
    setLoading(true)
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          resume: extractedResumeText,
          jobTitle: jobTitle,
          jobDescription: jobDescription,
        }),
      })
      const data = await response.json()
      const formattedResult = ltrim(data.result)
      setCoverLetterText(formattedResult)
      setStep(3)
      setfirstResumeClick(true)
    } catch (error) {
      console.log(error)
    }
    setLoading(false)
  }

  const scrollDown = () => {
    if (!mobile) {
      window.scrollTo({
        top: 960,
        behavior: 'smooth',
      })
    } else if (mobile) {
      window.scrollTo({
        top: 1520,
        behavior: 'smooth',
      })
    }
  }

  return (
    <>
      <Header />
      <div
        className={
          mobile ? styles.overallContainerMobile : styles.overallContainer
        }
      >
        <div className={styles.topBlock} />
        <div className={styles.heroSection}>
          <div className={mobile ? styles.row1Mobile : styles.row1}>
            <div
              className={
                mobile
                  ? styles.row1leftcontainerMobile
                  : styles.row1leftcontainer
              }
            >
              <div>
                <b className={styles.freeBeta}>FREE in BETA</b>
              </div>
              <CompanyTagLine
                mobile={mobile}
                tagLine={'Welcome to the future of job applications.'}
              />
              <CompanyDescription
                description={
                  'It only takes 30 seconds to get a personalized cover letter highlighting your unique skills and experience using AI.'
                }
              />
              <Button
                variant="outlined"
                color="black"
                className={styles.button}
                onClick={scrollDown}
              >{`CREATE YOUR LETTER ->`}</Button>
            </div>
            {!mobile && (
              <div className={styles.row1rightcontainer}>
                <Image
                  src={superHeroResumes}
                  width={500}
                  height={500}
                  alt="resume icons"
                />
              </div>
            )}
          </div>
        </div>
        <div
          className={mobile ? styles.statsSectionMobile : styles.statsSection}
        >
          <StatBubble
            stat={'of job seekers do not personalize their cover letter'}
            percent={86}
            mobile={mobile}
          />
          <StatBubble
            stat={'of recruiters prefer candidates with cover letters'}
            percent={83}
            mobile={mobile}
          />
          <StatBubble
            stat={'of cover letters have grammatical errors'}
            percent={59}
            mobile={mobile}
          />
          <StatBubble
            stat={'of big tech companies require cover letters'}
            percent={48}
            mobile={mobile}
          />
        </div>
        <div
          className={mobile ? styles.statsSectionMobile : styles.statsSection1}
        >
          <CoverLetterSectionHeader
            mobile={mobile}
            title={'Create your cover letter'}
            subTitle={
              'Upload your resume, paste the job description, and create!'
            }
          />
          <div
            className={step >= 2 ? styles.appSectionLonger : styles.appSection}
          >
            <div
              className={
                mobile ? styles.uploadWrapperMobile : styles.uploadWrapper
              }
            >
              {/*set step to green if completed*/}
              <div
                onClick={(e) => handleUplodResumeNavigationClick()}
                className={
                  selectedFile ? styles.frameDiv14green : styles.frameDiv14
                }
              >
                <div className={styles.uPLOADRESUME}>1. UPLOAD YOUR RESUME</div>
              </div>
              <div
                onClick={(e) => handleUplodPasteJobDescriptionNavigationClick()}
                className={
                  step > 1 ? styles.frameDiv14green : styles.frameDiv14
                }
              >
                <div className={styles.uPLOADRESUME}>
                  2. PASTE JOB DESCRIPTION
                </div>
              </div>
              <div
                onClick={(e) => handleUplodGenerateCoverLetterNavigationClick()}
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
                      style={{ display: 'none' }}
                    />
                  </label>
                  <div
                    onClick={(e) => handleResumeUpload()}
                    className={styles.uploadInner}
                  >
                    {mobile ? (
                      <Image
                        src={uploadIcon}
                        width={50}
                        height={50}
                        alt="resume icons"
                      />
                    ) : (
                      <Image
                        src={uploadIcon}
                        width={100}
                        height={100}
                        alt="resume icons"
                      />
                    )}
                    <div className={styles.dRAGDROPYOURRESUMEOrBro}>
                      <p className={styles.dRAGDROPYOURRESUME}>
                        <span
                          className={styles.dRAGDROP}
                        >{`Browse files on your computer`}</span>
                      </p>
                      <p className={styles.uSsjsd}>
                        <span>
                          {`or `}
                          <span className={styles.browseFiles}>
                            browse files
                          </span>{' '}
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
                <div
                  className={
                    mobile
                      ? styles.enterJobDescriptionMobile
                      : styles.enterJobDescription
                  }
                >
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
                    ></textarea>
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
                        rows={11}
                      ></textarea>
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
                <div
                  className={
                    mobile
                      ? styles.enterJobDescriptionMobile
                      : styles.enterJobDescription
                  }
                >
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
                    ></textarea>
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
            {step >= 2 &&
              (loading ? (
                <div>
                  <div class={styles.loader}></div>
                </div>
              ) : (
                <>
                  <div
                    className={
                      mobile
                        ? styles.resultJobDescriptionMobile
                        : styles.resultJobDescription
                    }
                  >
                    <div>
                      <textarea
                        id="resultTextArea"
                        defaultValue={coverLetterText}
                        placeholder="This is where your cover letter will appear!"
                        // onChange={(e) => setJobDescription(e.target.value)}
                        className={styles.resultJobTextArea}
                        autofocus
                        rows={16}
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
        <Footer mobile={mobile} />
      </div>
    </>
  )
}
