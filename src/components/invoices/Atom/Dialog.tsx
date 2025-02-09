import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

type CustomDialogProps = {
  isOpen: boolean;
  onSubmit: () => void;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

const CustomDialog: React.FC<CustomDialogProps> = ({
  isOpen = false,
  onSubmit,
  onClose,
  children,
  title,
}) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={onClose}
      aria-labelledby="title"
    >
      <DialogTitle id="title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={onClose}>
          No
        </Button>
        <Button onClick={onSubmit} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CustomDialog;
