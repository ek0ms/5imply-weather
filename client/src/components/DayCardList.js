import React from 'react';
import _ from 'lodash';
import DayCard from './DayCard';

const DayCardList = (props) => {
  const dayCards = _.map(props.days, (day) => (
    <DayCard
      icon={day.icon}
      high={day.roundedHighTemp}
      low={day.roundedLowTemp}
      time={day.timeInMs}
      key={day.timeInMs}
    />
  ));

  return <ul className="day-card-list">{dayCards}</ul>;
};

export default DayCardList;
