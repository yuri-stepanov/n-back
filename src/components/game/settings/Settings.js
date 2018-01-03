import React, { Component } from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  withMobileDialog,
} from 'material-ui/Dialog';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import ModeEditIcon from 'material-ui-icons/ModeEdit';

import './settings.css';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };

    this.openDialog = this.openDialog.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  openDialog() {
    this.setState({ open: true });
  }

  closeDialog() {
    this.setState({ open: false });
  }

  render() {
    const { onChange, settings, fullScreen, classes } = this.props;

    return (
      <div className="settings">
        <Button
          onClick={this.openDialog}
          fab
          color="accent"
          aria-label="edit"
          className={classes.button}
        >
          <ModeEditIcon />
        </Button>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.closeDialog}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">{'N-back settings'}</DialogTitle>
          <DialogContent>
            <form className={classes.container}>
              <FormControl className={classes.formControl}>
                <InputLabel htmlFor="difficulty-native-simple">Difficulty</InputLabel>
                <Select
                  native
                  value={settings.difficulty}
                  onChange={event => onChange({ ...settings, difficulty: event.target.value })}
                  input={<Input id="difficulty-native-simple" />}
                >
                  <option value={2}>1 back</option>
                  <option value={3}>2 back</option>
                  <option value={4}>3 back</option>
                </Select>
              </FormControl>
            </form>
          </DialogContent>
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

export default withMobileDialog()(withStyles(styles)(Settings));
