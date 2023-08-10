import './Switcher.css';

const Switcher = ({ isHourly, setIsHourly }) => (
  <div className='forecast-switcher__inner'>
    <h3 className='forecast-switcher__title'>Прогноз</h3>
    <div className='forecast-switcher__switcher'>
      <button
        id='forecast-switcher__title-week'
        className={isHourly ? 'bolder' : 'bolder active selected'}
        onClick={() => setIsHourly(false)}
      >
        на неделю
      </button>
      <button
        id='forecast-switcher__title-hour'
        className={isHourly ? 'bolder active selected' : 'bolder'}
        onClick={() => setIsHourly(true)}
      >
        почасовой
      </button>
    </div>
  </div>
);

export default Switcher;
