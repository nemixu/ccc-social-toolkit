function BannerPanel({ active, data, setData, downloadTemplate }) {
  const update = (field) => (event) => {
    setData({ ...data, [field]: event.target.value });
  };

  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-banner">
      <div className="section-title">Club Name</div>

      <div className="field-group">
        <label>Line 1</label>
        <input value={data.line1} onChange={update("line1")} />
      </div>

      <div className="field-group">
        <label>Line 2 (green)</label>
        <input value={data.line2} onChange={update("line2")} />
      </div>

      <div className="field-group">
        <label>Tagline</label>
        <input value={data.tagline} onChange={update("tagline")} />
      </div>

      <div className="field-group">
        <label>Instagram Handle</label>
        <input value={data.handle} onChange={update("handle")} />
      </div>

      <button
        className="btn btn-green"
        type="button"
        onClick={() => downloadTemplate("banner-tpl", "CCC_Banner")}
      >
        ⬇ Download PNG
      </button>
      <p className="hint">
        Ideal size for Facebook cover: 1640×624px. Screenshot at 3× scale for
        best quality.
      </p>
    </div>
  );
}

export default BannerPanel;
