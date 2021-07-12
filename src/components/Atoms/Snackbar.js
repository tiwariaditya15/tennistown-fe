import "./styles.css";
export function Snackbar({ status }) {
  return (
    <section className="snackbar snackbar-success">
      <span>{status.split("_").join(" ")}</span>
    </section>
  );
}
