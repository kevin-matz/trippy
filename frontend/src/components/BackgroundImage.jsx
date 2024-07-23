import backgroundMorning from '../assets/bg_morning.png'
import backgroundDay from '../assets/bg_day.png'
import backgroundEvening from '../assets/bg_evening.png'
import backgroundNight from '../assets/bg_night.png'

const BackgroundImage = () => {
    const currentTime = new Date().getHours();

    let backgroundImage;

    if (currentTime >= 6 && currentTime < 11) {
        backgroundImage = backgroundMorning;
    } else if (currentTime >= 11 && currentTime < 17) {
        backgroundImage = backgroundDay;
    } else if (currentTime >= 17 && currentTime < 22) {
        backgroundImage = backgroundEvening;
    } else {
        backgroundImage = backgroundNight;
    }

    return <img src={backgroundImage} className="background" alt="Background"/>;
};

export default BackgroundImage;