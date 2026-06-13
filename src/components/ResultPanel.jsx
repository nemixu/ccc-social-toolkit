function ResultPanel({ active, data, setData, downloadTemplate }) {
  const update = (field) => (event) => {
    setData({ ...data, [field]: event.target.value });
  };

  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-result">
      <div className="section-title">Ride Stats</div>

      <div className="field-group">
        <label>Pill Label</label>
        <input value={data.pill} onChange={update("pill")} />
      </div>

      <div className="field-group">
        <label>Distance (km)</label>
        <input value={data.km} onChange={update("km")} />
      </div>

      <div className="field-group">
        <label>Route Name</label>
        <input value={data.route} onChange={update("route")} />
      </div>

      <div className="section-title">Stats</div>

      <div className="field-group">
        <label>Elevation (m)</label>
        <input value={data.elev} onChange={update("elev")} />
      </div>

      <div className="field-group">
        <label>Moving Time</label>
        <input value={data.time} onChange={update("time")} />
      </div>

      <div className="field-group">
        <label>Riders Out</label>
        <input value={data.riders} onChange={update("riders")} />
      </div>

      <div className="field-group">
        <label>Handle</label>
        <input value={data.handle} onChange={update("handle")} />
      </div>

      <button
        className="btn btn-green"
        type="button"
        onClick={() => downloadTemplate("result-tpl", "CCC_Result")}
      >
        ⬇ Download PNG
      </button>
    </div>
  );
}

export default ResultPanel;
