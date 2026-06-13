function SchedulePanel({ active, data, setData, downloadTemplate }) {
  const update = (field) => (event) => {
    setData({ ...data, [field]: event.target.value });
  };

  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-schedule">
      <div className="section-title">Header</div>
      <div className="field-group">
        <label>Title</label>
        <input value={data.title} onChange={update("title")} />
      </div>

      <div className="section-title">Tuesday</div>
      <div className="field-group">
        <label>Info</label>
        <input value={data.tueInfo} onChange={update("tueInfo")} />
      </div>
      <div className="field-group">
        <label>Time</label>
        <input value={data.tueTime} onChange={update("tueTime")} />
      </div>

      <div className="section-title">Thursday</div>
      <div className="field-group">
        <label>Info</label>
        <input value={data.thuInfo} onChange={update("thuInfo")} />
      </div>
      <div className="field-group">
        <label>Time</label>
        <input value={data.thuTime} onChange={update("thuTime")} />
      </div>

      <div className="section-title">Sunday (Featured)</div>
      <div className="field-group">
        <label>Info</label>
        <input value={data.sunInfo} onChange={update("sunInfo")} />
      </div>
      <div className="field-group">
        <label>Time</label>
        <input value={data.sunTime} onChange={update("sunTime")} />
      </div>

      <div className="section-title">Footer</div>
      <div className="field-group">
        <label>Website</label>
        <input value={data.web} onChange={update("web")} />
      </div>
      <div className="field-group">
        <label>Handle</label>
        <input value={data.handle} onChange={update("handle")} />
      </div>

      <button
        className="btn btn-green"
        type="button"
        onClick={() => downloadTemplate("schedule-tpl", "CCC_Schedule")}
      >
        ⬇ Download PNG
      </button>
    </div>
  );
}

export default SchedulePanel;
