import { useEffect, useRef, useState } from "react";
import { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { calculateExpression } from "../utils/utils";

export default function FaceExpression() {
  const videoRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);

  const [expression, setExpression] = useState("Initializing...");

  useEffect(() => {
    let stream;

    const init = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm"
      );

      landmarkerRef.current = await FaceLandmarker.createFromOptions(
        vision,
        {
          baseOptions: {
            modelAssetPath:
              "https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/latest/face_landmarker.task",
          },
          outputFaceBlendshapes: true,
          runningMode: "VIDEO",
          numFaces: 1,
        }
      );

      stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      await videoRef.current.play();

      detect();
    };

    const detect = () => {
      if (!landmarkerRef.current || !videoRef.current) return;

      const results = landmarkerRef.current.detectForVideo(
        videoRef.current,
        performance.now()
      );

      if (results.faceBlendshapes?.length > 0) {
        const blendshapes = results.faceBlendshapes[0].categories;

        const detectedExpression = calculateExpression(blendshapes);
        setExpression(detectedExpression);
      }

      animationRef.current = requestAnimationFrame(detect);
    };

    init();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (landmarkerRef.current) landmarkerRef.current.close();
      if (videoRef.current?.srcObject) {
        videoRef.current.srcObject
          .getTracks()
          .forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <video
        ref={videoRef}
        style={{
          width: "400px",
          borderRadius: "12px",
          transform: "scaleX(-1)",
        }}
        playsInline
      />
      <h2>{expression}</h2>
    </div>
  );
}