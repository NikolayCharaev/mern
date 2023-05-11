import PropTypes from 'prop-types';
const CustomButton = ({ text }) => {
  return (
    <button className="bg-blue-500 text-white rounded cursor-pointer py-2 px-4 hover:bg-blue-400 transition">
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  text: PropTypes.string.isRequired,
};
export default CustomButton;
