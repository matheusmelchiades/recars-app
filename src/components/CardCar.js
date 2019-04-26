import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import { withStyles, Card, Typography, CardContent } from '@material-ui/core';

export class CardCar extends Component {
  render() {
    const { classes, car } = this.props

    return (
      <Card className={classes.container} elevation={12}>
        <SwipeableViews className={classes.swip} enableMouseEvents>
          {
            car.images.length && car.images.map((img, index) => (
              <img key={index} src={img.url} height={355} width={550} alt={'imageCar'} />
            ))
          }
        </SwipeableViews>
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
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2
  }
})

export default withStyles(styles)(CardCar)
