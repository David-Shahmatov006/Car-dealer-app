export default function Dropdown({
    label,
    options,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div>
            <label className="block text-gray-700">{label}</label>
            <select
                value={value}
                onChange={onChange}
                className="w-full rounded-md border px-3 py-2"
            >
                <option value="">{placeholder}</option>
                {options.map(option => (
                    <option
                        key={option.value || option}
                        value={option.value || option}
                    >
                        {option.label || option}
                    </option>
                ))}
            </select>
        </div>
    );
}
