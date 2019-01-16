import React from 'react';
import { Text, View, ScrollView, TextInput, Keyboard, TouchableOpacity, Image, Alert } from 'react-native';
import { Loader } from '../../components'
import { GameOver } from './components/GameOver/GameOver'
import styles from './GameScreenStyle';
import { checkWin, shuffle, getCurrentLink } from './utils/utils';
import { Entypo } from '@expo/vector-icons'; // eslint-disable-line


export default class GameScreen extends React.Component {
  static navigationOptions = ({ navigation: { getParam } }) => {
    const startNewGame = getParam('startNewGame', () => { });
    const title = getParam('title');

    return {
      title: `Цель: ${title || ''}`,
      headerRight:
        <TouchableOpacity style={styles.icon} onPress={startNewGame} >
          <Entypo name="ccw" size={25} />
        </TouchableOpacity>,
      headerStyle: styles.headerNav,
    }
  };

  searchInput = React.createRef();

  state = {
    links: null,
    list: null,
    step: 0,
    gameOver: false,
    win: false,
    title: null,
    loading: false,
    imageLoading: false,
    description: '',
    imgUrl: '',
    target: '',
    headerHeight: 0,
    isOpenSearh: false,
    searchValue: '',
    shuffled: false,
  }
  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      startNewGame: () => this.startNewGame(),
    });
  }
  componentDidUpdate() {
    const { target } = this.state;
    const { navigation } = this.props;
    const newTarget = navigation.getParam('target')
    newTarget !== target && this.changedTarget(newTarget)

  }

  changedTarget(target) {
    const { navigation } = this.props;
    this.setState({ target, loading: true, });
    navigation.setParams({ title: '' });
    this.startNewGame();
    this.checkAvailableTarget(target)
  }

  startNewGame() {
    this.setState({ step: 0, loading: true, win: false, isOpenSearh: false, gameOver: false });
    this.getRandomPage()
  }

  checkAvailableTarget(target) {
    const { navigation } = this.props;

    fetch(`https://ru.wikipedia.org/w/api.php?action=query&titles=${target}&format=json`)
      .then(response => response.json())
      .then(item => {
        !item.query.pages[Object.keys(item.query.pages)].pageid ?
          Alert.alert(
            `${target ? 'Такой страницы не существует' : 'Цель не выбрана'}`,
            'Продолжить по умолчанию?',
            [{
              text: 'На главную',
              onPress: () => navigation.navigate('Home'),
            },
            {
              text: 'Продолжить',
              onPress: () => navigation.setParams({ title: `по умолчанию` }),
            }],
            { onDismiss: () => navigation.setParams({ title: `по умолчанию` }) }
          ) : navigation.setParams({ title: target });
      })
      .catch(err => console.error(err, 'checkAvailableTarget_error'))
  }
  getRandomPage() {
    fetch(`https://ru.wikipedia.org/w/api.php?action=query&list=random&rnlimit=10&format=json`)
      .then(response => response.json())
      .then(item => {
        const currentItem = item.query.random.find(i => i.ns === 0 && i.title !== '')
        if (currentItem) {
          this.setState({ title: currentItem.title });
          this.getData(currentItem.title)
        } else this.getRandomPage()
      })
      .catch(err => { this.getRandomPage(); console.error(err, 'getRandomPage_error') })
  }

  getData(link) {
    this.setState({ loading: true })
    fetch(`https://ru.wikipedia.org/w/api.php?action=query&pllimit=max&titles=${link}&prop=links&&format=json`)
      .then(response => response.json())
      .then(item => {
        const links = item.query.pages[Object.keys(item.query.pages)].links
        const linksList = links && links.filter(i => getCurrentLink(i)).map(item => item.title)
        if (linksList) {
          this.setState({ links: linksList });
          this.getList(linksList)
        } else this.setState({ gameOver: true })

      })
      .catch(err => console.error(err, 'getData_1_error'))

    fetch(`https://ru.wikipedia.org/w/api.php?action=query&titles=${link}&prop=description&&format=json`)
      .then(response => response.json())
      .then(item => {
        const description = item.query.pages[Object.keys(item.query.pages)].description
        this.setState({ loading: false, description: description });
      })
      .catch(err => console.error(err, 'getData_2_error'))
    this.getImageName(link)
  }
  getImageName(link) {
    this.setState({ imageLoading: true })
    fetch(`https://ru.wikipedia.org/w/api.php?action=query&titles=${link}&prop=images&&format=json`)
      .then(response => response.json())
      .then(item => {
        const images = item.query.pages[Object.keys(item.query.pages)].images
        const png = images.find(i => i.title.toLowerCase().indexOf('png') != -1)
        const jpg = images.find(i => i.title.toLowerCase().indexOf('jpg') != -1)
        const imgName = png ? png.title : jpg ? jpg.title : ''
        imgName ? this.getImageUrl(imgName) : this.setState({ imgUrl: '', imageLoading: false })
      })
      .catch(err => { this.setState({ imgUrl: '', imageLoading: false }); console.log(err, 'getImageName_error') })
  }
  getImageUrl(name) {
    fetch(`https://ru.wikipedia.org/w/api.php?action=query&titles=${name}&iiprop=url&prop=imageinfo&&format=json`)
      .then(response => response.json())
      .then(item => {
        const images = item.query.pages[Object.keys(item.query.pages)].imageinfo
        const imgUrl = images && images[0].url
        this.setState({ imgUrl, imageLoading: false });
      })
      .catch(err => console.error(err, 'getImageUrl_error'))
  }

  renderHeader() {
    const { description, loading, imageLoading, title, imgUrl } = this.state
    return (
      <View style={styles.headerContainer} onLayout={e => this.setState({ headerHeight: e.nativeEvent.layout.height })}>
        <View style={styles.headerText}>
          <Text style={styles.headerTitle}>{!loading && title}</Text>
          <Text>{!loading && description}</Text>
        </View>
        {imgUrl !== '' && !imageLoading && !loading && <Image source={{ uri: imgUrl }} style={styles.logo} />}
      </View>
    )
  }
  getList(links) {
    const linksList = links.map((i, index) => {
      return (
        <TouchableOpacity key={index} onPress={this.onClick.bind(this, i)} style={styles.item}>
          <Text style={styles.linkText}>{i}</Text>
        </TouchableOpacity>
      )
    })
    this.setState({ list: linksList })
  }

  onClick = title => {
    const { step, target } = this.state
    this.setState({ title: title, isOpenSearh: false, step: step + 1 })
    this.getData(title)
    if (checkWin(title, target)) {
      return this.setState({ win: true })
    }
  }

  renderContent() {
    const { step, win, list, gameOver, searchValue } = this.state

    if (gameOver || win) {

      return (
        <GameOver
          win={win}
          step={step}
          onPress={() => {
            this.startNewGame()
          }}
        />
      )
    }

    if (list) return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.contantContainer}
        onScroll={() => {
          searchValue === '' && this.setState({ isOpenSearh: false })
          Keyboard.dismiss();
        }}
      >
        {list}
      </ScrollView>
    )
  }
  renderLoading() {
    return <View style={styles.loader}><Loader /></View>
  }

  shuffleList() {
    const { list } = this.state;
    const shuffledList = shuffle(list)
    this.setState({ list: shuffledList })
  }
  search = value => {
    const { links } = this.state;
    const currentLinks = value && links.reduce((list, link) => {
      let currentLink = link.toLowerCase().indexOf(value.toLowerCase()) !== -1 && link
      return {
        ...list,
        [currentLink]: currentLink
      }
    }, [])
    const list = value ? Object.keys(currentLinks).map(i => i).filter(i => i != 'false') : links
    this.getList(list)
  }
  searchFocus() {
    this.searchInput.current.focus();
  }

  renderOptions(visible) {
    const { headerHeight, isOpenSearh, searchValue, shuffled } = this.state;
    if (visible)
      return (
        <View style={[styles.optionContainer, { top: headerHeight > 90 ? headerHeight : 80 }]}>
          <View style={styles.searchContainer}>
            <TouchableOpacity
              style={[styles.optionItem, styles.serchItem]}
              onPress={() => {
                this.searchFocus()
                isOpenSearh && Keyboard.dismiss();
                this.setState({ isOpenSearh: !isOpenSearh })
              }}
            >
              <Entypo
                style={styles.optionItemText}
                name="magnifying-glass"
                size={30}
              />
            </TouchableOpacity>
            <TextInput
              value={searchValue}
              ref={this.searchInput}
              style={[styles.inputStyle, { width: isOpenSearh ? 300 : 40 }]}
              placeholder={'Поиск'}
              onChangeText={value => { this.setState({ searchValue: value }); this.search(value) }}
            />
          </View>
          <TouchableOpacity style={styles.optionItem}
            onPress={() => {
              Keyboard.dismiss();
              this.setState({
                shuffled: isOpenSearh ? shuffled : !shuffled,
                searchValue: '', isOpenSearh: false
              });
              shuffled || isOpenSearh ? this.search() : this.shuffleList()
            }}
          >
            <Entypo
              style={styles.optionItemText}
              name={isOpenSearh || shuffled ? 'back' : "shuffle"}
              size={25}
            />
          </TouchableOpacity>
        </View>
      )
  }

  render() {
    const { loading, gameOver, win } = this.state
    return (
      <View style={styles.container}>
        {this.renderHeader()}
        {loading ? this.renderLoading() : this.renderContent()}
        {!gameOver && this.renderOptions(!win)}
      </View>
    );
  }
}


