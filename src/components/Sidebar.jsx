import LogoUpload from "./LogoUpload";
import BannerPanel from "./BannerPanel";
import SpinPanel from "./SpinPanel";
import ResultPanel from "./ResultPanel";
import SchedulePanel from "./SchedulePanel";
import SpinRoutesPanel from "./SpinRoutesPanel";
import HashtagsPanel from "./HashtagsPanel";

const navItems = [
  { key: "banner", label: "Banner", isRed: false },
  { key: "spin", label: "Spin", isRed: false },
  { key: "spinroutes", label: "Spin Routes", isRed: false },
  { key: "result", label: "Result", isRed: false },
  { key: "schedule", label: "Schedule", isRed: false },
  { key: "hashtags", label: "#Tags", isRed: true },
];

function Sidebar({
  activeTab,
  setActiveTab,
  logo,
  logoIsTransparent,
  bannerData,
  setBannerData,
  spinData,
  setSpinData,
  resultData,
  setResultData,
  scheduleData,
  setScheduleData,
  onAddRoute,
  hashtags,
  copiedIndex,
  copyHashtags,
  downloadTemplate,
  onLogoUpload,
}) {
  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>
          <span className="red">C</span>
          <span className="green">C</span>C{" "}
          <span className="green">Social</span> Toolkit
        </h1>
        <div className="sidebar-sub">Clondalkin Cycling Club</div>
      </div>

      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item.key}
            className={`nav-btn${activeTab === item.key ? " active" : ""}${item.isRed ? " red-tab" : ""}`}
            type="button"
            onClick={() => setActiveTab(item.key)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="panel-wrap">
        <LogoUpload logo={logo} onUpload={onLogoUpload} />

        <BannerPanel
          active={activeTab === "banner"}
          data={bannerData}
          setData={setBannerData}
          downloadTemplate={downloadTemplate}
        />

        <SpinPanel
          active={activeTab === "spin"}
          data={spinData}
          setData={setSpinData}
          downloadTemplate={downloadTemplate}
        />

        <ResultPanel
          active={activeTab === "result"}
          data={resultData}
          setData={setResultData}
          downloadTemplate={downloadTemplate}
        />

        <SchedulePanel
          active={activeTab === "schedule"}
          data={scheduleData}
          setData={setScheduleData}
          downloadTemplate={downloadTemplate}
        />

        <SpinRoutesPanel
          active={activeTab === "spinroutes"}
          onAddRoute={onAddRoute}
        />

        <HashtagsPanel
          active={activeTab === "hashtags"}
          hashtags={hashtags}
          copiedIndex={copiedIndex}
          onCopy={copyHashtags}
        />
      </div>
    </aside>
  );
}

export default Sidebar;
