function Toast({ visible, message }) {
  return <div className={`toast${visible ? " show" : ""}`}>{message}</div>;
}

export default Toast;
