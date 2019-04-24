'use strict';

const createElement = React.createElement;

class LikeButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = { liked: false };
    }

    render() {

        if (this.state.liked) {
            return 'You liked this.';
        }

        return createElement(
            'button',
            { onClick: () => this.setState({ liked: true }) },
            'Like'
        );
    }

}

const containerNode = document.createElement('div');
document.body.appendChild(containerNode);
ReactDOM.render(createElement(LikeButton), containerNode);