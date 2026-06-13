import { useState } from "react";

function Templates({
  activeTab,
  logo,
  logoIsTransparent,
  bannerData,
  spinData,
  resultData,
  scheduleData,
  selectedRoute,
  routeCategories,
  onSelectRoute,
  onCopyRoute,
  copiedRouteId,
}) {
  const [expandedCategories, setExpandedCategories] = useState([]);

  const toggleCategory = (key) => {
    setExpandedCategories((current) =>
      current.includes(key)
        ? current.filter((categoryKey) => categoryKey !== key)
        : [...current, key],
    );
  };

  if (activeTab === "banner") {
    return (
      <div id="banner-tpl" className="tpl banner-tpl visible">
        <div className="stripe stripe-h5"></div>
        <div className="banner">
          <div className="stripe-v stripe">
            <div className="r"></div>
            <div className="w"></div>
            <div className="g"></div>
          </div>
          <div className="banner-wheel"></div>
          <div className="logo-circle">
            <img
              className={`logo-target${logoIsTransparent ? " transparent" : ""}`}
              src={logo}
              alt="Club logo"
            />
          </div>
          <div className="banner-copy">
            <div className="banner-name" id="b-name-out">
              {bannerData.line1}
              <br />
              <span className="accent">{bannerData.line2}</span>
            </div>
            <div className="banner-tagline" id="b-tagline-out">
              {bannerData.tagline}
            </div>
            <div className="banner-handle" id="b-handle-out">
              {bannerData.handle}
            </div>
          </div>
          <div
            className="stripe stripe-h4"
            style={{ position: "absolute", bottom: 0, left: 0, right: 0 }}
          ></div>
        </div>
      </div>
    );
  }

  if (activeTab === "spin") {
    return (
      <div id="spin-tpl" className="tpl sq visible">
        <div
          className="stripe stripe-h5"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        ></div>
        <span
          className="pill pill-red"
          id="s-pill-out"
          style={{ marginTop: 8 }}
        >
          {spinData.day}
        </span>
        <div className="sq-heading">
          <span id="s-h1-out">{spinData.h1}</span>
          <br />
          <span className="col-green" id="s-h2-out">
            {spinData.h2}
          </span>
        </div>
        <div className="sq-divider"></div>
        <div className="sq-detail">
          <strong id="s-time-out">{spinData.time}</strong>&nbsp;·&nbsp;
          <span id="s-loc-out">{spinData.loc}</span>
        </div>
        <div className="sq-sub" id="s-note-out">
          {spinData.note}
        </div>
        <div className="sq-footer">
          <div className="sq-handle" id="s-handle-out">
            {spinData.handle}
          </div>
          <div className="logo-sm">
            <img
              className={`logo-target${logoIsTransparent ? " transparent" : ""}`}
              src={logo}
              alt="Logo"
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "result") {
    return (
      <div id="result-tpl" className="tpl sq visible">
        <div
          className="stripe stripe-h5"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        ></div>
        <span
          className="pill pill-yellow"
          id="r-pill-out"
          style={{ marginTop: 8 }}
        >
          {resultData.pill}
        </span>
        <div className="sq-heading" style={{ fontSize: 100 }}>
          <span className="col-red" id="r-km-out">
            {resultData.km}
          </span>
          <span style={{ color: "rgba(255,255,255,0.22)", fontSize: 58 }}>
            km
          </span>
        </div>
        <div
          id="r-route-out"
          style={{
            fontFamily: "'Barlow Condensed',sans-serif",
            fontSize: 15,
            color: "rgba(255,255,255,0.55)",
            letterSpacing: 1,
            zIndex: 1,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          {resultData.route.toUpperCase()}
        </div>
        <div className="stat-grid">
          <div className="stat-card">
            <div className="stat-val" id="r-elev-out">
              {resultData.elev}
            </div>
            <div className="stat-lbl">Elevation (m)</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" id="r-time-out">
              {resultData.time}
            </div>
            <div className="stat-lbl">Moving Time</div>
          </div>
          <div className="stat-card">
            <div className="stat-val" id="r-riders-out">
              {resultData.riders}
            </div>
            <div className="stat-lbl">Riders Out</div>
          </div>
        </div>
        <div className="sq-footer">
          <div className="sq-handle" id="r-handle-out">
            {resultData.handle}
          </div>
          <div className="logo-sm">
            <img
              className={`logo-target${logoIsTransparent ? " transparent" : ""}`}
              src={logo}
              alt="Logo"
            />
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "schedule") {
    return (
      <div id="schedule-tpl" className="tpl sq visible">
        <div
          className="stripe stripe-h5"
          style={{ position: "absolute", top: 0, left: 0, right: 0 }}
        ></div>
        <div className="sched-header">
          <h2 id="sc-title-out">{scheduleData.title}</h2>
          <div className="sched-divider"></div>
        </div>
        <div className="ride-row regular">
          <div className="ride-accent green"></div>
          <div className="ride-day green">Tuesday</div>
          <div className="ride-info" id="sc-tue-info-out">
            {scheduleData.tueInfo}
          </div>
          <div className="ride-time" id="sc-tue-time-out">
            {scheduleData.tueTime}
          </div>
        </div>
        <div className="ride-row regular">
          <div className="ride-accent green"></div>
          <div className="ride-day green">Thursday</div>
          <div className="ride-info" id="sc-thu-info-out">
            {scheduleData.thuInfo}
          </div>
          <div className="ride-time" id="sc-thu-time-out">
            {scheduleData.thuTime}
          </div>
        </div>
        <div className="ride-row featured">
          <div className="ride-accent red"></div>
          <div className="ride-day red">Sunday</div>
          <div className="ride-info" id="sc-sun-info-out">
            {scheduleData.sunInfo}
          </div>
          <div className="ride-time" id="sc-sun-time-out">
            {scheduleData.sunTime}
          </div>
        </div>
        <div className="sched-footer">
          <div className="logo-sm">
            <img
              className={`logo-target${logoIsTransparent ? " transparent" : ""}`}
              src={logo}
              alt="Logo"
            />
          </div>
          <div className="sched-info">
            <div id="sc-web-out">{scheduleData.web}</div>
            <div id="sc-handle-out">{scheduleData.handle}</div>
          </div>
        </div>
      </div>
    );
  }

  if (activeTab === "spinroutes") {
    return (
      <div id="spinroutes-tpl" className="tpl route-preview visible">
        <div className="route-category-panel">
          {routeCategories.map((category) => {
            const isOpen = expandedCategories.includes(category.key);
            return (
              <div key={category.key} className="route-category-card">
                <button
                  type="button"
                  className="route-category-toggle"
                  onClick={() => toggleCategory(category.key)}
                >
                  <span>{category.label}</span>
                  <span>{category.routes.length} routes</span>
                </button>
                {isOpen && (
                  <div className="route-category-list">
                    {category.routes.length === 0 ? (
                      <div className="route-empty">No routes yet.</div>
                    ) : (
                      category.routes.map((route) => (
                        <button
                          key={route.id}
                          type="button"
                          className={`route-item${selectedRoute?.id === route.id ? " selected" : ""}${copiedRouteId === route.id ? " copied" : ""}`}
                          onClick={() => {
                            onSelectRoute(route);
                            onCopyRoute(route);
                          }}
                        >
                          <div className="route-item-title">{route.title}</div>
                          <div className="route-item-meta">
                            {route.distance}km · {route.elevation}m ·{" "}
                            {route.duration}
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!selectedRoute ? (
          <div className="route-empty route-preview-empty">
            Select a route to see detailed preview.
          </div>
        ) : (
          <div className="route-detail-panel">
            <div className="route-header">
              <div className="route-title">{selectedRoute.title}</div>
              <a
                href={selectedRoute.url}
                target="_blank"
                rel="noreferrer"
                className="route-url"
              >
                View on Strava
              </a>
            </div>
            <div className="route-details-grid">
              <div className="stat-card">
                <div className="stat-val">{selectedRoute.distance}km</div>
                <div className="stat-lbl">Distance</div>
              </div>
              <div className="stat-card">
                <div className="stat-val">{selectedRoute.elevation}m</div>
                <div className="stat-lbl">Elevation</div>
              </div>
              <div className="stat-card">
                <div className="stat-val">{selectedRoute.duration}</div>
                <div className="stat-lbl">Duration</div>
              </div>
            </div>
            <div className="route-map-preview">
              <div className="route-map-title">Open in Strava</div>
              <div className="route-map-embed">
                <a
                  href={selectedRoute.url}
                  target="_blank"
                  rel="noreferrer"
                  className="route-strava-link"
                >
                  <div className="route-strava-icon">🔗</div>
                  <div className="route-strava-text">
                    View detailed route map, elevation profile, and more on
                    Strava
                  </div>
                  <div className="route-strava-arrow">→</div>
                </a>
              </div>
            </div>
            <div className="route-notes">
              {selectedRoute.notes || "No additional notes provided."}
            </div>
          </div>
        )}
      </div>
    );
  }

  return null;
}

export default Templates;
