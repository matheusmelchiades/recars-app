import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Pagination from '../components/Pagination'
import { withStyles, Card, Typography, CardContent } from '@material-ui/core';

export class CardCar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0
    }
  }

  handleChangeIndex = index => {
    this.setState({ index });
  };

  render() {
    const { classes, car } = this.props

    return (
      <Card className={classes.container} elevation={12}>
        <div className={classes.swipContainer}>
          <SwipeableViews className={classes.swip} index={this.state.index} enableMouseEvents onChangeIndex={this.handleChangeIndex}>
            {
              car.images.length && car.images.map((img, index) => (
                <img key={index} src={img.url} height={355} width={550} alt={'imageCar'} />
              ))
            }
          </SwipeableViews>
          <Pagination dots={3} index={this.state.index} onChangeIndex={this.handleChangeIndex} />
        </div>
        <CardContent className={classes.contentCard}>
          <Typography gutterBottom variant="h5" component="h2">
            {car.model}
          </Typography>
          <div className={classes.subtitle}>
            <Typography component="p" variant="h6">
              {car.brand}
            </Typography>
            <Typography component="h6" variant="h5" color="textPrimary">
              R$ {car.priceAverage}
            </Typography>
          </div>
        </CardContent>
      </Card>
    )
  }
}

const styles = theme => ({
  container: {
    margin: theme.spacing.unit,
    minWidth: 550,
    borderRadius: 15
  },
  swip: {
    maxWidth: 550,
  },
  swipContainer: {
    position: 'relative'
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(CardCar)
