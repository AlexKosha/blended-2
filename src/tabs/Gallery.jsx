import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: null,
  };

  getImages = async () => {
    const { query, page } = this.state;
    try {
      const dataImages = await ImageService.getImages(query, page);
      this.setState({ photos: dataImages.photos });
    } catch (error) {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.query !== this.state.query ||
      prevState.page !== this.state.page
    ) {
      this.getImages();
    }
  }

  handleFormSubmit = query => {
    this.setState({ query });
  };

  render() {
    const { photos } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.handleFormSubmit} />
        <Grid>
          {photos &&
            photos.map(({ id, avg_color, alt, src }) => {
              return (
                <GridItem key={id}>
                  <CardItem color={avg_color}>
                    <img src={src.large} alt={alt} />
                  </CardItem>
                </GridItem>
              );
            })}
        </Grid>
        {/* <Text textAlign="center">Sorry. There are no images ... 😭</Text> */}
      </>
    );
  }
}
