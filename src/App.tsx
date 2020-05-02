import moment from 'moment';
import 'moment/locale/fr'
import * as React from 'react';
import Header from './component/Header';


import Loader from 'react-loader-spinner';

interface Props {
}
interface BetaElement {
  title: string,
  date: Date,
  hash: string,
  url: string

}
class App extends React.Component<Props> {

  state: {
    data: BetaElement[],
    isLoaded: boolean,
    error: any
  } = {
      data: [],
      error: null,
      isLoaded: false
    }

  componentDidMount() {
    this.handleRefresh();
  }

  handleRefresh = () => {
    this.setState({ isLoaded: false });
    fetch("http://localhost:9000/beta")
      .then(res => res.json())
      .then(result => {
        return [...result].map(el => {
          return { ...el, date: Date.parse(el.date) }
        })
      })
      .then(
        (result: BetaElement[]) => {
          this.setState({
            isLoaded: true,
            data: result.sort((a, b) => a.date > b.date ? 1 : -1)
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }
  render() {
    const { isLoaded, data } = this.state;
    // const els = this.state.data.map(el => `<li>${el.title} - ${moment(el.date).fromNow()} <a href="${el.url}"></li>`)
    return (
    
      <div className="content">

        <Header handleRefresh={this.handleRefresh} />
        <div className="container">
          <div className="sweet-loading">
            {!isLoaded ? (
              <div className="loader">
                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
              </div>
            ) : (
                <div className="list">
                  {data.map(el => <div className="num" key={el.hash}>
                    <h3 className="message">{el.title} <i>{moment(el.date).fromNow()}</i> <small><a href={el.url} target="_blank">click here</a></small></h3>

                  </div>)}
                </div>
              )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
