import React, { useState, useRef } from "react";

import ReactCrop, { centerCrop, makeAspectCrop, Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview.ts";
import { useDebounceEffect } from "./useDebounceEffect.js";
import Slider from "@material-ui/core/Slider";
import axios from "axios";
import { useParams } from "react-router-dom";
import thekomp from "../../../thekomp.js";
import { FaCameraRetro } from "react-icons/fa";

import "react-image-crop/dist/ReactCrop.css";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export const CommunityProfilePicUpdater = () => {
  const { id } = useParams();
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({
    unit: "%", // Can be 'px' or '%'
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(5 / 5);
  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      //setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader();
      reader.addEventListener("load", () => setImgSrc(reader.result.toString() || ""));
      reader.readAsDataURL(e.target.files[0]);
      setCrop({
        unit: "%", // Can be 'px' or '%'
        x: 25,
        y: 25,
        width: 50,
        height: 50,
      });
      setScale(scale + 0.001);
    }
  }
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }
  useDebounceEffect(
    async () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale, rotate);
      }
    },
    100,
    [completedCrop, scale, rotate]
  );
  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined);
    } else if (imgRef.current) {
      const { width, height } = imgRef.current;
      setAspect(5 / 5);
      setCrop(centerAspectCrop(width, height, 5 / 5));
    }
  }
  function generateDownload(canvas, crop) {
    if (!crop || !canvas) {
      return;
    }

    canvas.toBlob(
      (blob) => {
        const formData = new FormData();

        formData.append("selectedPic", blob);

        const url = `${thekomp}/community/updateprofilepic/${id}`;

        const config = {
          method: "patch",
          url: url,
          Headers: {
            "Content-type": "multipart/form-data",
          },
          data: formData,
        };
        axios(config)
          .then((res) => {
            console.log(res);
            window.location.reload(false);
          })
          .catch((error) => {
            console.log(error);
          });
        // const previewUrl = window.URL.createObjectURL(blob);

        // const anchor = document.createElement("a");
        // anchor.download = "cropPreview.png";
        // anchor.href = URL.createObjectURL(blob);
        // anchor.click();

        // window.URL.revokeObjectURL(previewUrl);
      },
      "image/png",
      0.5
    );
  }
  return (
    <div>
      {imgSrc && (
        <div className="Crop-Controls">
          <Slider
            disabled={!imgSrc}
            valueLabelDisplay="auto"
            value={scale}
            onChange={(event, newValue) => setScale(Number(newValue))}
            step={0.1}
            min={0.1}
            max={2}
          />

          <Slider
            aria-label="Temperature"
            defaultValue={30}
            min={-180}
            max={180}
            disabled={!imgSrc}
            value={rotate}
            onChange={(event, newValue) => setRotate(Math.min(180, Math.max(-180, Number(newValue))))}
            color="secondary"
          />
        </div>
      )}

      <button onClick={(e) => onSelectFile(e)} class="ui labeled icon red button mb-4">
        <input
          type="file"
          accept="image/*"
          onChange={onSelectFile}
          style={{
            opacity: "0.0",
            position: "absolute",
            " top": " 0",
            left: " 0",
            bottom: " 0",
            right: " 0",
            " width": "100%",
            height: "100%",
            cursor: "pointer",
          }}
        />
        <FaCameraRetro className="icon" />
        {/* <i class="user icon"></i> */}
        Change Profile Picture
      </button>
      {/* <div>
          <label htmlFor="scale-input">Scale: </label>
          <input id="scale-input" type="number" step="0.1" value={scale} disabled={!imgSrc} onChange={(e) => setScale(Number(e.target.value))} />
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) => setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))}
          />
        </div> */}
      {/* <div>
          <button onClick={handleToggleAspectClick}>Toggle aspect {aspect ? "off" : "on"}</button>
        </div> */}

      <div className="row" style={{ maxWidth: "100%" }}>
        <div className="col-md-8">
          {Boolean(imgSrc) && (
            <ReactCrop
              crop={crop}
              className="img-fluid"
              onChange={(_, percentCrop) => {
                // setCrop({
                //   ...crop,
                //   x: percentCrop.x,
                //   y: percentCrop.y,
                // });
                setCrop(percentCrop);
              }}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
            >
              <img
                className="img-fluid"
                ref={imgRef}
                alt="Crop me"
                src={imgSrc}
                style={{ transform: `scale(${scale}) rotate(${rotate}deg)`, height: "20rem", width: "inherit" }}
                onLoad={onImageLoad}
              />
            </ReactCrop>
          )}
        </div>
        <div className="col-md-4">
          {Boolean(completedCrop) && (
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "15rem",
                height: "15rem",
                borderRadius: "50%",
              }}
            />
          )}
        </div>
      </div>
      {imgSrc && (
        <button className="ui primary button" onClick={(e) => generateDownload(previewCanvasRef.current, completedCrop)}>
          Update Profile Picture
        </button>
      )}
    </div>
  );
};
