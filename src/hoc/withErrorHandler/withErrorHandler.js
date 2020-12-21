import React, { Component } from 'react';

import Modal from '../../components/UI/Modal/Modal';
import Aux from '../AuxMy/AuxMy';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return class extends Component {
        
        state= {
            errorOne: null
        }

        componentDidMount () {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({errorOne: null});
                return req;
            });
            this.resInterceptor =axios.interceptors.response.use(res => res, errorOne => {
                this.setState({errorOne: errorOne});
            });
        }

        componentWillUnmount = () => {
            // console.log('will unmount', this.reqInterceptor, this.resInterceptor);
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }

        errorConfirmedHandler = () => {
            this.setState({errorOne: null});
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        modalClosed={this.errorConfirmedHandler}
                        show={this.state.errorOne}>

                        {this.state.errorOne ? this.state.errorOne.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default withErrorHandler;