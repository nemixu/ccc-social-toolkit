function HashtagsPanel({ active, hashtags, onCopy, copiedIndex }) {
  return (
    <div className={`panel${active ? " active" : ""}`} id="panel-hashtags">
      <div className="section-title">Tap to Copy &amp; Paste</div>
      <p className="hint" style={{ marginBottom: "14px" }}>
        Pick a set below — click Copy All, then paste straight into your
        Instagram caption or bio.
      </p>

      <div id="hashtag-container">
        {hashtags.map((set, index) => {
          const tagString = set.tags.join(" ");
          const isCopied = copiedIndex === index;

          return (
            <div key={set.name} className="hashtag-set">
              <div className="hashtag-set-title">
                <span style={{ background: set.color }}></span>
                {set.name}
              </div>

              <div className="hashtag-tags">{tagString}</div>
              <div className="hashtag-count">{set.tags.length} tags</div>
              <button
                className={`copy-btn${isCopied ? " copied" : ""}`}
                type="button"
                onClick={() => onCopy(index, tagString)}
              >
                {isCopied ? "✓  Copied!" : "Copy All"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default HashtagsPanel;
