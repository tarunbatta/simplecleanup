import React from 'react';

interface CheckboxListProps {
  checkboxes: {
    bh: boolean;
    ca: boolean;
    co: boolean;
    dh: boolean;
    pd: boolean;
  };
  historyCount: number;
  cookieCount: number;
  downloadCount: number;
  handleCheckboxChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckboxList: React.FC<CheckboxListProps> = ({
  checkboxes,
  historyCount,
  cookieCount,
  downloadCount,
  handleCheckboxChange,
}) => {
  const dataTypes = [
    {
      value: 'bh',
      label: 'Browsing History',
      checked: checkboxes.bh,
      badge: historyCount,
    },
    { value: 'ca', label: 'Cache', checked: checkboxes.ca },
    {
      value: 'co',
      label: 'Cookies',
      checked: checkboxes.co,
      badge: cookieCount,
    },
    {
      value: 'dh',
      label: 'Download History',
      checked: checkboxes.dh,
      badge: downloadCount,
    },
    { value: 'pd', label: 'Personal Data', checked: checkboxes.pd },
  ];

  return (
    <form>
      {dataTypes.map((item) => (
        <div className="checkbox" key={item.value}>
          <label>
            <input
              type="checkbox"
              value={item.value}
              checked={item.checked}
              onChange={handleCheckboxChange}
            />
            {item.label}{' '}
            {item.badge !== undefined && (
              <span className="badge">{item.badge}</span>
            )}
          </label>
        </div>
      ))}
    </form>
  );
};

export default CheckboxList;
