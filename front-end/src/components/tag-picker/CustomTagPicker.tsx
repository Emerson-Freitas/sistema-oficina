import React, { useEffect, useState } from 'react';
import { TagPicker } from 'rsuite';
import styles from './CustomTagPicker.module.css'

type RSuiteData = {
  label: string;
  value: string;
};

interface Props {
  data: RSuiteData[];
  defaultData: string[];
  handleChange: React.Dispatch<React.SetStateAction<string[]>>
  title: string;
}

const CustomTagPicker = ({ data, defaultData, handleChange, title }: Props) => {
  const [selectedValues, setSelectedValues] = useState<string[]>(defaultData);

  useEffect(() => {
    setSelectedValues(defaultData);
  }, [defaultData]);

  const handleTagPickerChange = (value: string[]) => {
    setSelectedValues(value);
    handleChange(value);
  };

  return (
    <div>
      <label className={styles.label}>
        {title}
      </label>
      <TagPicker
        value={selectedValues}
        onChange={handleTagPickerChange}
        data={data}
        block
        readOnly={true}
      />
    </div>
  );
};

export default CustomTagPicker;
