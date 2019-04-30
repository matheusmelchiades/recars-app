import React, { Component } from 'react'
import SwipeableViews from 'react-swipeable-views'
import Pagination from '../components/Pagination'
import { withStyles, Card, Typography, CardContent, Collapse, Button } from '@material-ui/core';

export class CardCar extends Component {

  constructor(props) {
    super(props)
    this.state = {
      index: 0,
      readMore: false
    }
  }

  handleChangeIndex = index => {
    this.setState({ index });
  };

  handleExpandClick = () => {
    this.setState({ ...this.state, readMore: !this.state.readMore }, () => {
      setTimeout(() => {
        this.setState({ ...this.state, readMore: false })
      }, 6000);
    })
  }

  renderFuels = () => {
    const { car } = this.props
    const gasoline = car.fuels[0] || ''
    const diesel = car.fuels[1] || ''
    const alchool = car.fuels[2] || ''

    return `${gasoline} ${diesel} ${alchool}`;
  }

  render() {
    const { classes, car } = this.props

    return (
      <div>
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
            <Button
              size="small"
              className={classes.buttonReadMore}
              onClick={this.handleExpandClick}
              aria-expanded={this.state.expanded}
              aria-label="Show more">
              ler mais
            </Button>
          </CardContent>

          <Collapse className={classes.teste} in={this.state.readMore} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography gutterBottom variant="h6" component="h5">
                Anos: {car.years}
              </Typography>
              <Typography component="h6" variant="h6" color="textPrimary">
                Combustiveis: {this.renderFuels()}
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
      </div>
    )
  }
}

const styles = theme => ({
  root: {
    position: 'fixed'
  },
  container: {
    margin: theme.spacing.unit,
    minWidth: 550,
    borderRadius: 15,
  },
  swip: {
    maxWidth: 550,
  },
  swipContainer: {
    position: 'relative'
  },
  buttonReadMore: {
    left: theme.spacing.unit * 55
  },
  describre: {
    flexDirection: 'row'
  },
  subtitle: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2
  },
})

export default withStyles(styles)(CardCar)
