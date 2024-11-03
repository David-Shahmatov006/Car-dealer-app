export default function Dropdown({
    label,
    options,
    value,
    onChange,
    placeholder,
}) {
    return (
        <div className="field">
            <label className="label">{label}</label>
            <div className="control">
                <div className="select is-fullwidth">
                    <select
                        value={value}
                        onChange={onChange}
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
            </div>
        </div>
    );
}
