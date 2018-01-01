import React, { Component } from 'react';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ isOpen: true });
  }

  closeDialog() {
    this.setState({ isOpen: false });
  }

  render() {
    const { onChange, settings, fullScreen } = this.props;

    return (
      <div>
        <Button onClick={this.openDialog}>Open settings dialog</Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{'N-back settings'}</DialogTitle>
          <DialogContent>Text</DialogContent>
          <DialogActions>
            <Button onClick={this.closeDialog} color="primary" autoFocus>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withMobileDialog()(Settings);
