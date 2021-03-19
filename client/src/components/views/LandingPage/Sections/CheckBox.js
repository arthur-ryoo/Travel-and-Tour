import React, { useState } from 'react';
import { Collapse, Checkbox } from 'antd';

const { Panel } = Collapse;

function CheckBox(props) {
  const [checkedValues, setCheckedValues] = useState([]);

  const handleToggle = (value) => {
    const currentIndex = checkedValues.indexOf(value);
    const newCheckedValues = [...checkedValues];

    if (currentIndex === -1) {
      newCheckedValues.push(value);
    } else {
      newCheckedValues.splice(currentIndex, 1);
    }

    setCheckedValues(newCheckedValues);
    props.handleFilters(newCheckedValues);
  };

  const renderCheckBoxLists = () =>
    props.list &&
    props.list.map((item) => (
      <React.Fragment key={item._id}>
        <Checkbox
          onChange={() => handleToggle(item._id)}
          checked={checkedValues.indexOf(item._id) === -1 ? false : true}
        />
        <span>{item.name}</span>
      </React.Fragment>
    ));

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Category" key="1">
          {renderCheckBoxLists()}
        </Panel>
      </Collapse>
    </div>
  );
}

export default CheckBox;
