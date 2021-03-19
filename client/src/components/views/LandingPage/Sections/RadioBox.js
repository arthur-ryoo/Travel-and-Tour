import React from 'react';
import { Collapse, Radio } from 'antd';

const { Panel } = Collapse;

function RadioBox(props) {
  const handleChange = (event) => {
    props.onChange(event.target.value);
  };

  return (
    <div>
      <Collapse defaultActiveKey={['0']}>
        <Panel header="Sort By" key="1">
          <Radio.Group onChange={handleChange}>
            <Radio value="-price">Price (highest first)</Radio>
            <Radio value="price">Price (lowest first)</Radio>
            <Radio value="-createdAt">Newest</Radio>
            <Radio value="createdAt">Oldest</Radio>
          </Radio.Group>
        </Panel>
      </Collapse>
    </div>
  );
}

export default RadioBox;
