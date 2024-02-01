export default function Input({ label, id, error, ...props }) {
  return (
    <div className="control">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} {...props} />
      {/* {error && <p>Please enter a valid {label}</p>} */}
    </div>
  );
}
