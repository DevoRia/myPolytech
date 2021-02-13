import * as React from 'react';
import {StyleSheet} from 'react-native';
import {WebViewMessageEvent} from "react-native-webview/lib/WebViewTypes";
import WebView from "react-native-webview";

export default class Browser extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      uri: props.uri ? props.uri : 'https://cabinet.ztu.edu.ua/site/login',
      loginCallback: props.loginCallback ? props.loginCallback : () => {},
      todayCallback: props.todayCallback ? props.todayCallback : () => {},
      logoutCallback: props.logoutCallback ? props.logoutCallback : () => {},
      loading: props.loading ? props.loading : () => {},
      logout: props.logout,
      login: props.login
    }
  }

  componentDidMount() {
    if (this.state.login) {
      this.state.loading(true)
      this.setState({
        logout: true,
        login: false,
        logoutCallback: () => {
          this.setState({logout: false})
          this.state.loading(false)
        }
      })
    }
  }

  _onMessage = (event: WebViewMessageEvent) => {
    const data = JSON.parse(event.nativeEvent.data);
    switch (data.status) {
      case 'logged':
        return this.state.loginCallback(data)
      case 'today':
        return this.state.todayCallback(data)
      case 'logout':
        return this.state.logoutCallback()
    }
  }

  render() {
     let jsCode = `
    if (window.location.href === 'https://cabinet.ztu.edu.ua/') {
      const infoTable = document.getElementsByClassName('table-bordered')[0];
      const rows = infoTable.getElementsByTagName('tr');
      const name = getTextFromTable(rows[0])
      const faculty = getTextFromTable(rows[1])
      const level = getTextFromTable(rows[2])
      const group = getTextFromTable(rows[4])
      const data = {
        status: 'logged',
        name: name,
        faculty: faculty,
        level: level,
        group: group,
      }
      window.ReactNativeWebView.postMessage(JSON.stringify(data))
    }

    if (window.location.href === 'https://cabinet.ztu.edu.ua/site/schedule') {
      const data = {
        status: 'today'
      };
      const pars = document.getElementsByClassName('pair');

      for (let i = 0; i < pars.length; i++) {
        const par = pars[i];
        const time = getTextFromClass(par, 'time');
        let link = null;
        let textInfo = null;
        let subject = par.innerHTML.match(/<div style="color:gray;">(.*?)<\\/div>/g);
        if (subject && subject[0]) {
          textInfo = subject[0]
            .replace(/<div style="color:gray;">/g, '')
            .replace(/<\\/div>/g, '')
        }
        data[time] = {
          link: link,
          textInfo: textInfo,
        }
      }
      window.ReactNativeWebView.postMessage(JSON.stringify(data))
    }

      function getTextFromTable(row) {
      return row.getElementsByTagName('td')[0].innerHTML.trim();
    }

    function getTextFromClass(row, className) {
      return row.getElementsByClassName(className)[0].innerHTML.trim();
    }
    `
    if (this.state.logout) {
      jsCode = `if (window.location.href === 'https://cabinet.ztu.edu.ua/') {
        const logoutButton = document.getElementsByClassName('logout')[0];
        logoutButton.click();
      }
      const data = {status: 'logout'}
      window.ReactNativeWebView.postMessage(JSON.stringify(data))`
    }

    return (
      <WebView
        originWhitelist={['*']}
        source={{ uri: this.state.uri }}
        injectedJavaScript={jsCode}
        sharedCookiesEnabled={true}
        domStorageEnabled={true}
        javaScriptEnabled={true}
        thirdPartyCookiesEnabled={true}
        onMessage={this._onMessage}
        style={{ marginTop: 0 }}
      />
    );
  }

}

const styles = StyleSheet.create({

});
