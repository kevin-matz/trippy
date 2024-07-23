import { useEffect } from 'react';
import PropTypes from 'prop-types';

const WindyWebcam = (props) => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://webcams.windy.com/webcams/public/embed/script/player.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  return (
    <a
      name="windy-webcam-timelapse-player"
      data-id={props.id}
      data-play="month"
      href={`https://windy.com/webcams/${props.id}`}
      target="_blank"
      rel="noreferrer"
    >
      {props.title}
    </a>
  );
};

WindyWebcam.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};

export default WindyWebcam;