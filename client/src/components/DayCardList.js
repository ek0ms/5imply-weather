import React from 'react';
import _ from 'lodash';
import DayCard from './DayCard';

const DayCardList = (props) => {
  const dayCards = _.map(props.days, (day) => {
    return (
      <DayCard
        icon={day.icon}
        high={day.roundedHighTemp}
        low={day.roundedLowTemp}
        time={day.timeInMs}
        key={day.timeInMs}
      />
    );
  });
  return (
    <div className="index-body">
      <div className="address">{props.address}</div>
      <ul className="day-card-list">{dayCards}</ul>
    </div>
  );
};

export default DayCardList;
