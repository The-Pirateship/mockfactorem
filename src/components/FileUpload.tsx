'use client'

import { useState, useRef } from 'react'

// Type definition for the component's props.
// It receives the currently selected manufacturing service.
type FileUploadProps = {
  selectedService: string | null;
};

// A map defining the supported file types for each manufacturing service.
const fileTypesByService: { [key: string]: string[] } = {
  "CNC Machining": [".step", ".stp", ".sldprt", ".x_t", ".ai", ".pdf", ".zip"],
  "Sheet Metal Fabrication": [".step", ".stp", ".dxf", ".dwg", ".ai", ".pdf", ".zip"],
  "3D Printing": [".step", ".stp", ".stl", ".3mf", ".ai", ".pdf", ".zip"],
};

export default function FileUpload({ selectedService }: FileUploadProps) {
  // State to track if a file is being dragged over the dropzone.
  const [dragActive, setDragActive] = useState(false)
  // State to store the list of successfully uploaded files.
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  // State to track if an upload is in progress.
  const [isUploading, setIsUploading] = useState(false)
  // State to store any file validation errors.
  const [errors, setErrors] = useState<string[]>([])
  // Ref to the hidden file input element.
  const inputRef = useRef<HTMLInputElement>(null)

  /**
   * Determines the supported file types based on the selected service.
   * @returns An object with a human-readable text and a string for the input's `accept` attribute.
   */
  const getSupportedFileTypes = () => {
    if (!selectedService) return { text: "Supports all file types", accept: "*" };
    const types = fileTypesByService[selectedService];
    if (!types) return { text: "Supports all file types", accept: "*" };
    return { text: `Supports ${types.join(", ")}`, accept: types.join(",") };
  };

  const { text: supportedFileTypesText, accept: acceptString } = getSupportedFileTypes();

  /**
   * Handles drag events on the dropzone.
   */
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  /**
   * Processes and validates the files selected by the user.
   * @param files A FileList object from a drop event or file input.
   */
  const processFiles = async (files: FileList) => {
    setErrors([]);
    const fileArray = Array.from(files);
    const supportedFileTypes = getSupportedFileTypes().accept.split(',');

    const validFiles: File[] = [];
    const newErrors: string[] = [];

    // Validate each file based on its extension.
    for (const file of fileArray) {
      const fileExtension = `.${file.name.split('.').pop()?.toLowerCase()}`;
      if (supportedFileTypes.includes('*') || supportedFileTypes.includes(fileExtension)) {
        validFiles.push(file);
      } else {
        newErrors.push(`this file isn't supported: ${fileExtension}`);
      }
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    }

    // "Upload" the valid files.
    if (validFiles.length > 0) {
      setIsUploading(true)
      await new Promise(resolve => setTimeout(resolve, 1500)) // Simulate upload delay
      setUploadedFiles(prev => [...prev, ...validFiles])
      setIsUploading(false)
    }
  }

  /**
   * Handles the drop event on the dropzone.
   */
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFiles(e.dataTransfer.files)
    }
  }

  /**
   * Handles the change event for the file input.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      processFiles(e.target.files)
    }
  }

  /**
   * Removes a file from the uploaded files list.
   * @param index The index of the file to remove.
   */
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index))
  }

  /**
   * Triggers the hidden file input when the dropzone is clicked.
   */
  const onBoxClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full space-y-6">
      {/* The main dropzone area */}
      <div
        className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer ${ 
          dragActive 
            ? 'border-blue-400 bg-blue-50' 
            : 'border-gray-300 bg-white hover:border-gray-400'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={onBoxClick}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
            <p className="text-lg text-gray-700">Uploading files...</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg 
                  className="w-8 h-8 text-blue-600" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" 
                  />
                </svg>
              </div>
            </div>
            
            <p className="text-lg text-gray-700 mb-2">
              Drop files here or{' '}
              <span className="text-blue-600 hover:underline">
                Browse
              </span>{' '}
              to upload more parts
            </p>
            
            <p className="text-sm text-gray-500 mb-4">
              {supportedFileTypesText}
            </p>
            
            <p className="text-xs text-gray-400">
              Each upload is recognized as a separate part.
            </p>
            {/* Display validation errors */}
            {errors.length > 0 && (
              <div className="text-red-500 text-sm mt-2">
                {errors.map((error, i) => (
                  <p key={i}>{error}</p>
                ))}
              </div>
            )}
          </>
        )}
        
        {/* Hidden file input, controlled by the dropzone click or browse link */}
        <input
          ref={inputRef}
          id="file-upload"
          type="file"
          multiple
          onChange={handleChange}
          accept={acceptString}
          className="hidden"
          disabled={isUploading}
        />
      </div>

      {/* List of uploaded files */}
      {uploadedFiles.length > 0 && (
        <div className="bg-white rounded-lg border p-4">
          <h3 className="font-semibold text-gray-900 mb-3">Uploaded Files ({uploadedFiles.length})</h3>
          <div className="space-y-2">
            {uploadedFiles.map((file, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{file.name}</p>
                    <p className="text-xs text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="text-red-500 hover:text-red-700 p-1"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t">
            <button 
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
              onClick={() => alert('Quote request submitted! (This is a demo)')}
            >
              Get Quote for {uploadedFiles.length} Part{uploadedFiles.length !== 1 ? 's' : ''}
            </button>
          </div>
        </div>
      )}
      
      <div className="text-center">
        <div className="flex items-center justify-center text-sm text-gray-500">
          <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          All your files are secure and confidential.
        </div>
      </div>
    </div>
  )
}