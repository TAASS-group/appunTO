import { uploadImageAndGetURL } from "@/lib/firebase";
import { useState } from "react";

const ImageUploader = () => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e: any) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }
    setIsLoading(true);
    uploadImageAndGetURL(file)
      .then((url) => {
        setUrl(url);
      })
      .catch((error) => {
        alert("Failed to upload file: " + error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={isLoading}>
        {isLoading ? "Uploading..." : "Upload File"}
      </button>
      {url && (
        <div>
          <p>Uploaded File URL:</p>
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
          </a>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
