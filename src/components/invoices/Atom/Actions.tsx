import { Box, Menu, MenuItem } from '@mui/material';
import React, { useState } from 'react';
import Button from './Button';
import { UseMutateFunction } from '@tanstack/react-query';
import CustomDialog from './Dialog';

type DropdownProps = {
  onDelete: UseMutateFunction<void, Error, string, unknown>;
  onEdit: () => void;
  id: string;
};

const Dropdown: React.FC<DropdownProps> = ({
  onDelete,
  onEdit,
  id,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDelete = (id: string) => {
    onDelete(id);
    handleClose();
  };
  return (
    <Box>
      <Button onClick={handleClick} icon="/actions.svg" />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        className="rounded-lg shadow-none"
        sx={{
          '& .MuiPopover-paper': {
            borderRadius: '8px',
            boxShadow: 'none',
            border: '1px solid #E2E8F0',
            marginLeft: '8px',
          },
        }}
      >
        <MenuItem className="text-sm" onClick={onEdit}>
          Edit
        </MenuItem>
        <MenuItem
          className="text-sm"
          onClick={() => setShowPopup(true)}
        >
          Delete
        </MenuItem>
      </Menu>

      <CustomDialog
        isOpen={showPopup}
        title="Delete Invoice"
        onClose={() => setShowPopup(false)}
        onSubmit={() => handleDelete(id)}
      >
        Are you sure you want to delete this invoice?
      </CustomDialog>
    </Box>
  );
};

export default Dropdown;
