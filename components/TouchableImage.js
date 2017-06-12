@inject('store') @observer
class TouchableImage extends Component {
    state = {
        width: null
    }

    onPress(event) {
        const { width } = this.state,
              { store } = this.props,
              X = event.nativeEvent.locationX;

        if (X < width/2) {
            store.prevImage();
        }else{
            store.nextImage();
        }
    }

    onImageLayout(event) {
        this.setState({
            width: event.nativeEvent.layout.width
        });
    }

    get caption() {
        let { caption, image } = this.props;
        return image.title || image.description || caption;
    }

    render() {
        const { image, orientation } = this.props,
                uri = image.link.replace('http://', 'https://');

        return (
            <TouchableHighlight onPress={this.onPress.bind(this)}
                                style={styles.fullscreen}>
                <Image source={{uri: uri}}
                       style={[styles.backgroundImage, styles[orientation.toLowerCase()]]}
                       onLayout={this.onImageLayout.bind(this)}>
                    <Text style={styles.imageLabel}>{this.caption}</Text>
                </Image>
            </TouchableHighlight>
        );
    }
}
