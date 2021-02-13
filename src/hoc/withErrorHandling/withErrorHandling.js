import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

const withErrorHandling = ( WrappedComponent, axios ) => {
    /** Anonymous class */
    return class extends Component {

        state = {
            error : null,
            initialized : false,

        }

        componentDidMount() {
            /** Setting interceptor pada componentDidMount untuk post request pasti bekerja
             * Tapi untuk get request bisa aja gak kerja.
             * Jika ada Eror yang muncul pada masa Creation dan error terjadi di WrappedComponent.
             * Tentu saja error pada component itu jalan duluan baru componentDidMount yang disini.
             * Jadi global error handlingnya belum ke-config tapi error sudah ada duluan.
             * 
             * Ada tricknya yaitu pada masa Creation, kita jangan nge-render apapun (render null)
             * lalu pada componentDidMount() kita lakukan setState agar memicu Update lifecycle
             * dan pada Update tersebut baru kita render Componentnya
            */

            // dia menyimpan id dari interceptors.request
            this.interceptorsRequest =  axios.interceptors.request.use( request => {
                this.setState({ error : null})
                return request
            }, error => {
                console.log( 'error dari request' )
                this.setState({ error : error})
                return Promise.reject( error )
            })

            // dia menyimpan id dari interceptors.response
            this.interceptorsResponse = axios.interceptors.response.use( response => response, error => {
                console.log( 'error dari response' )
                this.setState({ error : error})
                return Promise.reject( error )
                /** Error nya direturn biar error tersebut di-forward
                 * menjadi argumen pada callback catch.
                 * Kalo gak di return bakal ada bug yaitu error tidak akan di-catch 
                 * oleh component yang meminta response dan akan selalu masuk ke then block
                */
            } )

            /** Memicu update lifecycle agar global error handling terinitialize dengan benar */ 
            this.setState({ initialized : true })
        }

        /** Boros memori setiap Creation karena selalu membuat interceptors pada instance axios yang sama
         * HOC itu tentu tidak terbatas pada component tertentu dan bisa dipakai component lain
         * Jika component  lain menggunakan HOC ini dan juga instance axiosnya ternyata sama, 
         * maka setiap Lifecycle Creationnya akan terjadi
         * pembuatan INTERCEPTOR (kemungkinan besar axios instance nya sama) dan itu akan boros memori. 
         * Worst casenya bisa menyebabkan error / somehow perubahan state.
         * (video 185).
         * 
        */
        componentWillUnmount() {
            axios.interceptors.request.eject( this.interceptorsRequest )
            axios.interceptors.response.eject( this.interceptorsResponse )
        }
        

        modalClosedHandler = () => {
            this.setState({ error : null })
        }

        render() {
            
            if ( ! this.state.initialized ) return null

            return(
                <>
                    <Modal 
                        show={ this.state.error } 
                        modalClosed={ this.modalClosedHandler }>
                        {/* Harus ada karena intialy state.error itu null
                            Nanti malah error terus-terusan karena mengakses 
                            properti message dari null 
                        */}
                        { this.state.error ? this.state.error.message : null }
                    </Modal>
                    <WrappedComponent {...this.props}  />
                </>
            )
        }
    }
}

export default withErrorHandling
