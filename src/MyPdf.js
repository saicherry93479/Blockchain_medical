
import QRCode from 'react-qr-code'
import React, { useEffect, useState } from 'react'
import { ThirdwebStorage } from "@thirdweb-dev/storage";
const storage = new ThirdwebStorage();

const MyPdf = () => {
  const [url,setUrl]=useState('')
  useEffect(()=>{
    data().then(result=>{
      setUrl(result)
      console.log("uris are in  useeffect ",result)

    })
    
    
  },[])

  const data=async ()=>{
    const metadata = {
        medicine1:{
        name: "NFT #1",
        description: "This is my first NFT",
        manfracturer:"manufractrer1",
        rate:"100"
        },
        medicine2:{
          name: "NFT #2",
          description: "This is my second NFT",
          manfracturer:"manufractrer1",
          rate:"100"
          
        },
      }
      
    
    const uris = await storage.upload(metadata);
    console.log("uris are ",uris)
    // const metadat = await storage.downloadJSON(uris[0]);
    const metadat=await storage.resolveScheme(uris)
    return metadat
  }
  return (
    <div style={{padding:"40px"}}>
      <QRCode
      size={256}
      style={{ height: "100px", maxWidth: "100%", width: "100px" }}
      // value={"sai charab"}
      value={url}
      viewBox={`0 0 256 256`}
      />
      <span style={{margin:"40px"}}></span>
       <QRCode
      size={256}
      style={{ height: "100px", maxWidth: "100%", width: "100px" }}
      // value={"sai charab"}
      value={'https://gateway.ipfscdn.io/ipfs/QmamvVM5kvsYjQJYs7x8LXKYGFkwtGvuRvqZsuzvpHmQq9/0'}
      viewBox={`0 0 256 256`}
      />
    </div>
  )
}

export default MyPdf



// import React from 'react';
// import { PDFExport } from '@progress/kendo-react-pdf';
// import { toStream } from 'react-dom-stream/server';
// // import MemoryFS from 'memory-fs';
// const MyPdf=()=> {

//   const [file2,setFile2]=useState(null)

//   const [file,setFile]=useState(null)
//   const [pres,setPres]=useState(false)
//   const savePD =async() => {
//     const pdf = document.getElementsByClassName('pdfff')[0];

//     const image =new File(await toPng(pdf),'sample.png');
    
//     console.log("file is ",image)
//     const uri = await storage.upload(image);
//     // saveAs(image, 'my-image-file.png');
//     console.log("uri is ",uri)
//     const uri2=await storage.upload(file2)
//     console.log("uri ",uri2)

//   }
//   useEffect(()=>{
//     // console.log(file.path)
//     console.log(file)
//   },[file])
//   const changeHandler=(e)=>{
//     setPres(true)
//     setFile2(e.target.files[0])
//     setFile(URL.createObjectURL(e.target.files[0]))
    

//   }

//   return (
//     <div>
//     {/* <Document >
//       <Page>
//         // your content here
//         <h1>hiii</h1>
//       </Page>
//     </Document> */}
//     <input type="file" onChange={(e)=>changeHandler(e)}></input>
//     <button onClick={savePD}>Save PDF</button>
//     <div className={"pdfff"} style={{backgroundColor:"green"}}>
//       <h1>Hi this is hh</h1>
//       <p>uyuygyu</p>
//       {pres?<img src={file}></img>:<></>}
//     </div>
//     </div>
    
//   )
// }
// export default MyPdf




// import React, { useEffect, useRef } from 'react'
// import path from 'path-browserify';
// import html2canvas from "html2canvas";
// import axios from 'axios';
// import { saveAs } from 'file-saver';


// const MyPdf = () => {
//   useEffect(()=>{
//     saveAs("https://httpbin.org/", "/image.jpg");
//   })
//   const exportRef = useRef();
//   return (
//     <div>MyPdf

//       <>
//       <div className="parent">
//       <div ref={exportRef}>
//       <p>...=</p>
//       <h1>hgghg </h1>
//       </div>
//       </div>
//       <button onClick={() => exportAsImage(exportRef.current, "test.png")}>
//       Capture Image
//       </button>
// </>
//     </div>
//   )
// }

// export default MyPdf

// const exportAsImage = async (element, imageFileName) => {
// const canvas = await html2canvas(element);
// console.log("dirname is ",__dirname)
// const a=path.join(__dirname, 'src','Images','first.png')
// const iamgPath='C:\\Users\\sthipp005\\Downloads\\Personal\\blockchain\\src\\Images\\first.png'
// console.log(a)
// const image = canvas.toDataURL("image/png", 1.0);
// // download the image
// // try{
// //   axios.post('/', { image }).then(() => {
// //   console.log('Image saved!');
// // });
// // }catch(err){
// //   console.log("in posting data ")
// //   console.log("err is ",err)
// // }
// downloadImage(image, iamgPath);
// };
// const downloadImage = (blob, fileName) => {
//   const fakeLink = window.document.createElement("a");
//   fakeLink.style = "display:none;";
//   fakeLink.download = fileName;
  
//   fakeLink.href = blob;
  
//   document.body.appendChild(fakeLink);
//   fakeLink.click();
//   document.body.removeChild(fakeLink);
  
//   fakeLink.remove();
// };
  

