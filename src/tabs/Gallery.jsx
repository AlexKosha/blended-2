import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = {
    query: '',
    page: 1,
    photos: null,
    loading: false,
    isVisibleBtn: false,
  };

  getImages = async () => {
    const { query, page } = this.state;
    this.setState({ loading: true });
    try {
      const dataImages = await ImageService.getImages(query, page);
      this.setState(prevState => ({
        photos: prevState.photos
          ? [...prevState.photos, ...dataImages.photos]
          : dataImages.photos,
        isVisibleBtn:
          page < Math.ceil(dataImages.total_results / dataImages.per_page),
      }));
    } catch (error) {
    } finally {
      this.setState({ loading: false });
    }
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
    this.setState({ query, photos: null, page: 1, isVisibleBtn: false });
  };

  onBtnLoadMoreClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { photos, loading, isVisibleBtn } = this.state;
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
        {isVisibleBtn && (
          <Button type="button" onClick={this.onBtnLoadMoreClick}>
            {loading ? 'Loading...' : 'Load more'}
          </Button>
        )}
      </>
    );
  }
}
