import React from 'react';

interface CheckboxListItem {
  value: string;
  label: string;
  checked: boolean;
  badge?: number;
}

interface CheckboxListProps {
  dataTypes: CheckboxListItem[];
  onCheckboxChange: (value: string, checked: boolean) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({ dataTypes, onCheckboxChange }) => {
  return (
    <form>
      {dataTypes.map((item) => (
        <div className="checkbox" key={item.value}>
          <label>
            <input
              type="checkbox"
              value={item.value}
              checked={item.checked}
              onChange={(e) => onCheckboxChange(item.value, e.target.checked)}
            />
            {item.label} {item.badge !== undefined && <span className="badge">{item.badge}</span>}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CheckboxList;