import PropTypes from 'prop-types';

const WavyTitle = (props) => {
  const currentTime = new Date().getHours();
  const isEvening = currentTime >= 17 && currentTime < 22;

  const normalStyle = {
    "--r": 227,
    "--g": 61,
    "--b": 148
  };

  /* Normal theme doesn't really fit in the evening background's style */
  const eveningStyle = {
    "--r": 249,
    "--g": 180,
    "--b": 45
  };

  return (
    <div className="title" style={isEvening ? eveningStyle : normalStyle}>
      {/* One index for all "layers" */}
      {[0, 1, 2].map((idx) => {
        const alpha = [0.125, 0.25, 0.5];
        return (
          <h1 key={idx} className={idx === 0 ? 'title-back' : (idx === 1 ? 'title-middle' : '')} style={{ top: props.top }}>
            {
              props.title.split('').map((char, charIdx) => (
                <span
                  key={charIdx}
                  style={{
                    '--index': charIdx,
                    '--alpha-l': alpha[idx],
                    '--alpha-u': alpha[idx] * 2,
                    minWidth: 40 // to make spaces visible
                  }}
                >
                  {char}
                </span>
              ))
            }
          </h1>
        );
      })}
    </div>
  );
};

WavyTitle.propTypes = {
  title: PropTypes.string.isRequired,
  top: PropTypes.string.isRequired
};

export default WavyTitle;