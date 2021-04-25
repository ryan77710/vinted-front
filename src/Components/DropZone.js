import React from "react";
import Dropzone from "react-dropzone";
const DropZone = (props) => {
  const { handleFileChange, files } = props;
  return (
    <div className="fixed">
      <Dropzone onDrop={(acceptedFiles) => handleFileChange(acceptedFiles)}>
        {({ getRootProps, getInputProps }) => (
          <section
            style={
              files
                ? {
                    backgroundImage: ` url("${URL.createObjectURL(files[0])}")`,
                  }
                : {}
            }
          >
            <div {...getRootProps()}>
              <input multiple {...getInputProps()} />
              {files ? (
                <p>
                  {files.length} {files.length > 1 ? "images " : "image "}
                  selectionné
                </p>
              ) : (
                <p> sélectionner une ou plusieurs images </p>
              )}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};
export default DropZone;
