{
  /* <img
    className={styles.icon}
    alt=""
    src="../uploadIcon.svg"
    /> */
}
{
  /* <div className={styles.dRAGDROPYOURRESUMEOrBro}>
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
    </div> */
}

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

{
  /* <div className={styles.jobDescriptionArea}> 
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
                    </div> */
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
