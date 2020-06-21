import React from 'react';
import { Link } from 'gatsby';
import logo from '../img/logo.svg';

const Navbar = class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false,
            navBarActiveClass: '',
        };
    }

    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                          navBarActiveClass: 'is-active',
                      })
                    : this.setState({
                          navBarActiveClass: '',
                      });
            },
        );
    };

    render() {
        const { navBarActiveClass } = this.state;
        const siteTitle = 'toto';
        return (
            <nav
                onClick={() => {
                    this.toggleHamburger();
                }}
            >
                <div className="nav-logo-burgermenu">
                    <div className="nav-logo">
                        <img src="/img/suur-logo.png"></img>
                    </div>
                    <div className={'burgerMenu ' + navBarActiveClass}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className={'nav-links ' + navBarActiveClass}>
                    <Link to="/">Home</Link>
                    <Link to="/blog">Blog</Link>
                </div>
            </nav>
        );
    }
};

export default Navbar;
