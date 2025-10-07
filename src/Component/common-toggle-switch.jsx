import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';

const StyledSwitch = styled(Switch)(({ theme }) => ({
  padding: 8,
  '& .MuiSwitch-track': {
    borderRadius: 22 / 2,
    backgroundColor: '#E9E9EA',
    opacity: 1,
    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      width: 16,
      height: 16,
    },
    '&::before': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
      left: 12,
    },
    '&::after': {
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
        '#fff',
      )}" d="M19,13H5V11H19V13Z" /></svg>')`,
      right: 12,
    },
    ...theme.applyStyles('dark', {
      backgroundColor: '#39393D',
    }),
  },
  '& .MuiSwitch-switchBase': {
    '&.Mui-checked': {
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#00A1F9',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    boxShadow: 'none',
    width: 16,
    height: 16,
    margin: 2,
  },
}));

const CommonToggleSwitch = ({
  checked = false,
  onChange,
  disabled = false,
  size = 'medium',
  color = 'primary',
  ...otherProps
}) => {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event.target.checked, event);
    }
  };

  return (
    <StyledSwitch
      checked={checked}
      onChange={handleChange}
      disabled={disabled}
      size={size}
      color={color}
      {...otherProps}
    />
  );
};

export default CommonToggleSwitch;