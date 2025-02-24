export default function Input({
  label,
  type,
  name,
  placeholder = "",
}: {
  label: string;
  type: string;
  name: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} placeholder={placeholder} />
    </div>
  );
}
