const cardsPerView = () => {
  if (window.innerWidth >= 1440) {
    return 6;
  } else if (window.innerWidth < 1440 && window.innerWidth > 834) {
    return 3;
  } else {
    return 12;
  }
};

export default cardsPerView;
