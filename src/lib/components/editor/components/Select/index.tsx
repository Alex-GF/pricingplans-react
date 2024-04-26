interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options: Option[];
  label: string;
}

interface Option {
  value: string;
  label: string;
}

export function Select({ label, options, id, ...props }: SelectProps) {
  return (
    <div className="pp-form__group">
      <label htmlFor={id}>{label}</label>
      <select id={id} name={id} {...props} className="pp-form__field">
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
