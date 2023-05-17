import PropTypes from 'prop-types';
const CustomButton = ({ text, styles, onClick }) => {
  return (
    <button onClick={onClick} className={`bg-blue-500 text-white rounded cursor-pointer py-2 px-4 hover:bg-blue-400 transition ${styles}`}>
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
  styles : PropTypes.string
};
export default CustomButton;
