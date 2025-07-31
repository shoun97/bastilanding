import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export default function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <IconButton onClick={onClick}>
      <MenuIcon />
    </IconButton>
  );
}
