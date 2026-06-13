function LogoUpload({ logo, onUpload }) {
  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (loadEvent) => {
      const source = loadEvent.target?.result;
      if (typeof source === "string") {
        onUpload(source, file.type === "image/png");
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div id="logo-shared-field" className="field-group">
      <label>Club Logo</label>
      <div className="logo-upload-area">
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <img id="logo-preview" src={logo} alt="Logo preview" />
        <p>Click to upload new logo</p>
        <div className="upload-hint">
          Use a transparent PNG for best results
        </div>
      </div>
    </div>
  );
}

export default LogoUpload;
