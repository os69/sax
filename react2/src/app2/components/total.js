import React from "react";

class Total extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        console.log('total');
        const total = this.props.items.reduce((sum, item) => {
            return sum + item.subItems.reduce((sum, subItem) => {
                return sum + subItem.count
            }, 0);
        }, 0);
        return <b>
            total: {total}
        </b>
    }
}

export default Total;