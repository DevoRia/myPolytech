import * as React from 'react';
import {StyleSheet} from 'react-native';
import { Container } from '../components/Container';
import {View, Text} from "../components/Themed";
import SearchableDropdown from 'react-native-searchable-dropdown';

export default class ChooseGroup extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      serverData: [],
      loading: false
    };
  }

  componentDidMount() {
    fetch('https://aboutreact.herokuapp.com/demosearchables.php')
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          serverData: [...this.state.serverData, ...responseJson.results],
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  onItemSelect(item: any) {
    this.setState({loading: true})
  }

  render() {
    return (
      <Container loading={this.state.loading}>
        <View style={styles.container}>
          <Text style={styles.title}>
            Введіть назву своєї групи:
          </Text>
          <SearchableDropdown
            onTextChange={(text: string) => console.log(text)}
            onItemSelect={(item: any) => this.onItemSelect(item)}
            containerStyle={{ padding: 5 }}
            textInputStyle={styles.textInputStyle}
            itemStyle={styles.itemStyle}
            itemTextStyle={styles.itemTextStyle}
            itemsContainerStyle={styles.itemsContainerStyle}
            items={this.state.serverData}
            defaultIndex={2}
            placeholder="XX-NN"
            resetValue={false}
            underlineColorAndroid="transparent"
          />
        </View>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    marginLeft: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  textInputStyle: {
    textAlign: 'center',
    paddingLeft: 30,
    paddingRight: 30,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 50,
    color: '#ffffff',
    backgroundColor: '#000000',
  },
  itemsContainerStyle: {
    marginTop: 20,
    maxHeight: '50%',
    marginLeft: '20%',
  },
  itemStyle: {
    textAlign: 'center',
    padding: 10,
    marginTop: 2,
    right: 0,
  },
  itemTextStyle: {
    color: '#000000',
  }
});
