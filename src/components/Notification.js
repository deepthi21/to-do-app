import React, { useEffect, useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

export default function Notification(props) {
  const [open, setOpen] = useState(false || props?.notification?.open);  

    useEffect(() => {
        if(props.notification?.open) {
            setOpen(props.notification.open)
        }
    }, [props.notification])
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      open={open}
      autoHideDuration={1000}
      onClose={handleClose}
      message={props.notification ? props.notification.message : "Operation is successful"}
      action={
        <React.Fragment>
          <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </React.Fragment>
      }
     />
//   </div>
//     <div className={classes.notificationWrapper}>
//       <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
//         <Alert onClose={handleClose} severity="success">
//           {props.notification ? props.notification.message : "Operation is successful"}
//         </Alert>
//       </Snackbar>
//     </div>
  );
}
