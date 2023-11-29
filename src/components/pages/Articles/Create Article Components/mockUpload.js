import { readFile } from "@draft-js-plugins/drag-n-drop-upload";
import axios from "axios";
import thekomp from "./../../../../thekomp";

/*
 *
 * @name: mockUpload
 * @desc: Custom file upload function. Simulates a file upload.
 * @param {[File], formData} data: consists of an array of files that have been uploaded and a formData object composed of those same files.
 * @param {function([{name: string, src: string}])} success - function to mark a successfull file upload, it takes an array of successfully uploaded files.
 * @param {function({name: string, src?: string})} failed - function that is called to mark a failure to upload one or more files. Removes the upload placeholders.
 * @param {(function(percent:int, file: {name:string, src:string})} progress - function to mark the progress in percentage points. It updates the progress count on each placeholder.
 */
export default async function mockUpload(data, success, failed, progress) {
  const { url } = await fetch(`${thekomp}/article/uploadurl`).then((res) => res.json());
  console.log(url);
  console.log(data.files);
  await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": "multipart/form-data",
    },
    body: data.files[0],
  });
  const imageUrl = url.split("?")[0];
  console.log(imageUrl);
  data.files[0].src = imageUrl;
  success(data.files, { retainSrc: true });
  // function doProgress(percent) {
  //   progress(percent || 1);
  //   if (percent === 100) {
  //     console.log("hereee");
  //     // Start reading the file
  //     Promise.all(data.files.map(readFile)).then((files) => success(files, { retainSrc: true }));
  //   } else {
  //     setTimeout(doProgress, 250, (percent || 0) + 10);
  //   }
  // }

  // doProgress(100);
}
