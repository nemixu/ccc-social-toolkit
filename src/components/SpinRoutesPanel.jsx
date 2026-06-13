import { useState } from "react";

function SpinRoutesPanel({ active, onAddRoute }) {
  const [formValues, setFormValues] = useState({
    title: "",
    url: "",
    distance: "",
    elevation: "",
    duration: "",
    notes: "",
    mapLat: "",
    mapLng: "",
    mapZoom: "12",
  });

  const handleChange = (field) => (event) => {
    setFormValues({ ...formValues, [field]: event.target.value });
  };

  const handleAdd = () => {
    if (!formValues.title || !formValues.url) {
      return;
    }

    onAddRoute({
      ...formValues,
    });

    setFormValues({
      title: "",
      url: "",
      distance: "",
      elevation: "",
      duration: "",
      notes: "",
    });
  };

  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-spinroutes">
      <div className="section-title">Spin Routes</div>
      <p className="hint">
        Add a new route here. It will be grouped automatically by elevation and
        notes once added.
      </p>

      <div className="field-group">
        <label>Title</label>
        <input value={formValues.title} onChange={handleChange("title")} />
      </div>
      <div className="field-group">
        <label>Strava URL</label>
        <input value={formValues.url} onChange={handleChange("url")} />
      </div>
      <div className="field-group">
        <label>Distance</label>
        <input
          value={formValues.distance}
          onChange={handleChange("distance")}
        />
      </div>
      <div className="field-group">
        <label>Elevation</label>
        <input
          value={formValues.elevation}
          onChange={handleChange("elevation")}
        />
      </div>
      <div className="field-group">
        <label>Duration</label>
        <input
          value={formValues.duration}
          onChange={handleChange("duration")}
        />
      </div>
      <div className="field-group">
        <label>Map latitude</label>
        <input
          value={formValues.mapLat}
          onChange={handleChange("mapLat")}
          placeholder="53.3"
        />
      </div>
      <div className="field-group">
        <label>Map longitude</label>
        <input
          value={formValues.mapLng}
          onChange={handleChange("mapLng")}
          placeholder="-6.4"
        />
      </div>
      <div className="field-group">
        <label>Map zoom</label>
        <input
          value={formValues.mapZoom}
          onChange={handleChange("mapZoom")}
          placeholder="12"
        />
      </div>
      <div className="field-group">
        <label>Notes</label>
        <input value={formValues.notes} onChange={handleChange("notes")} />
      </div>
      <button className="btn btn-green" type="button" onClick={handleAdd}>
        Add Spin Route
      </button>

      <p className="hint" style={{ marginTop: 12 }}>
        Routes with more than 600m elevation are automatically classified as
        Hilly.
      </p>
    </div>
  );
}

export default SpinRoutesPanel;
