function SpinPanel({ active, data, setData, downloadTemplate }) {
  const update = (field) => (event) => {
    setData({ ...data, [field]: event.target.value });
  };

  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-spin">
      <div className="section-title">Post Details</div>

      <div className="field-group">
        <label>Day Pill</label>
        <input value={data.day} onChange={update("day")} />
      </div>

      <div className="field-group">
        <label>Heading Line 1</label>
        <input value={data.h1} onChange={update("h1")} />
      </div>

      <div className="field-group">
        <label>Heading Line 2 (green)</label>
        <input value={data.h2} onChange={update("h2")} />
      </div>

      <div className="section-title">Ride Info</div>

      <div className="field-group">
        <label>Time</label>
        <input value={data.time} onChange={update("time")} />
      </div>

      <div className="field-group">
        <label>Meet Point</label>
        <input value={data.loc} onChange={update("loc")} />
      </div>

      <div className="field-group">
        <label>Sub-note</label>
        <input value={data.note} onChange={update("note")} />
      </div>

      <div className="field-group">
        <label>Handle</label>
        <input value={data.handle} onChange={update("handle")} />
      </div>

      <button
        className="btn btn-green"
        type="button"
        onClick={() => downloadTemplate("spin-tpl", "CCC_Spin")}
      >
        ⬇ Download PNG
      </button>
    </div>
  );
}

export default SpinPanel;
