import React from 'react';
import './assesmentItemsstyle.scss';
import Button from '../Button/Button';
import messageIcon from '../../assets/messageIcon.svg';
const ICON_BACKGROUND_TAG_COLOR = {
  Health: 'red',
  Food: 'purple',
  Housing: 'lightblue',
};

function AssessmentItem({ item }) {
  const getIconBackground = (tag) => {
    return ICON_BACKGROUND_TAG_COLOR[tag] || 'blue';
  };
  return (
    <div className='wrapper'>
      <div className='wrapper__left'>
        <div
          className='wrapper__icon'
          style={{
            background: getIconBackground(item.tag),
          }}
        >
          <img style={{ color: 'white' }} src={messageIcon} alt='message' />
        </div>
        <div className='wrapper__desc_section'>
          <div className='wrapper__heading'>{item.title}</div>
          <div className='wrapper__subheading'>{item.author}</div>
        </div>
      </div>
      <div className='wrapper__action'>
        <Button
          text='Get Started >'
          styles={{
            type: 'primary',
            subType: 'right',
            rounded: false,
          }}
          onButtonClick={() => alert(item?.title)}
        />
      </div>
    </div>
  );
}

export default AssessmentItem;
