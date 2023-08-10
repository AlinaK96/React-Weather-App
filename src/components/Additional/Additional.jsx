import DetailsForToday from './DetailsForToday/DetailsForToday';
import Slider from './Slider/Slider';
import './Additional.css';

const Additional = () => {
  return (
    <section className='additional-info'>
      <div className='additional-info__forecast-panel'>
        <Slider />
        <DetailsForToday />
      </div>
    </section>
  );
};

export default Additional;
