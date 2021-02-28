import React, { Component } from 'react';
import './App.css'
import Albums from './Components/Albums';
import ImgPopup from './Components/ImgPopup';
import Loader from './Components/Loader';
import Photos from './Components/Photos';
import Users from './Components/Users';

export default class App extends Component {
  state = {
    loading: true,
    displayUserList: false,
    usersList: [],
    displayAlbumsList: false,
    userAlbumsList: [],
    displayPhotoList: false,
    albumPhotoList: [],
    showPopup: false,
    selectedPhoto: {}
  }

  //получаем список пользователей при открытии страницы
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          usersList: json,
          displayUserList: true,
          loading: false
        });
      });
  };

  //обработка события клика по карточке пользователя и получение списка альбомов
  selectUser = async (id) => {
    this.setState({
      loading: true
    });
    await fetch(`https://jsonplaceholder.typicode.com/albums?userId=${id}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          userAlbumsList: json,
          displayAlbumsList: true,
          displayUserList: false
        });
      });

    let userAlbumsList = [], api, data;
    for (let index = 0; index < this.state.userAlbumsList.length; index++) {
      api = await fetch(`https://jsonplaceholder.typicode.com/photos/?albumId=${this.state.userAlbumsList[index].id}`);
      data = await api.json();
      userAlbumsList.push(this.state.userAlbumsList[index])
      userAlbumsList[index].img = data[0].thumbnailUrl;
      userAlbumsList[index].countPhoto = data.length;
    }
    this.setState({
      userAlbumsList: userAlbumsList,
      loading: false
    });
  };

  //обработка события клика по кнопке возврата к списку пользователей
  bactToUsersList = () => {
    this.setState({
      displayAlbumsList: false,
      displayUserList: true
    });
  };

  //обработка клика по карточке альбома и получение фотографий для него
  selectAlbum = async (id) => {
    this.setState({
      loading: true
    });
    fetch(`https://jsonplaceholder.typicode.com/photos?albumId=${id}`)
      .then((response) => response.json())
      .then((json) => {
        this.setState({
          albumPhotoList: json,
          displayAlbumsList: false,
          displayPhotoList: true,
          loading: false
        });
      });
  };

  //обработка клика по кнопке возврата к списку альбомов
  bactToAlbumsList = () => {
    this.setState({
      displayAlbumsList: true,
      displayPhotoList: false
    });
  };

  //обработка клика по фото, чтобы показать попап
  showPopup = (photo) => {
    this.setState({
      showPopup: true,
      selectedPhoto: photo
    });
  };

  //клик по кнопке закрыть попап
  closePopup = () => {
    this.setState({
      showPopup: false
    });
  };

  //клик по кнопке перехода к следующему фото в попапе
  moveNextPhoto = () => {
    let currentImgPosition = this.state.selectedPhoto.id - this.state.albumPhotoList[0].id;
    let nextImg;
    if (currentImgPosition >= this.state.albumPhotoList.length - 1) {
      this.setState({
        selectedPhoto: this.state.albumPhotoList[0]
      });
      return;
    }
    nextImg = this.state.albumPhotoList[currentImgPosition + 1]
    this.setState({
      selectedPhoto: nextImg
    });
  };

  //клик по кнопке перехода к предыдущему фото в попапе
  movePrevPhoto = () => {
    let currentImgPosition = this.state.selectedPhoto.id - this.state.albumPhotoList[0].id;
    let prevImg;
    if (currentImgPosition === 0) {
      this.setState({
        selectedPhoto: this.state.albumPhotoList[this.state.albumPhotoList.length - 1]
      });
      return;
    }
    prevImg = this.state.albumPhotoList[currentImgPosition - 1]
    this.setState({
      selectedPhoto: prevImg
    });
  };

  render() {
    return (
      <>
        {this.state.showPopup ? <ImgPopup selectedPhoto={this.state.selectedPhoto} moveNextPhoto={this.moveNextPhoto} movePrevPhoto={this.movePrevPhoto} closePopup={this.closePopup} /> : ``}
        <div className='container'>
          {
            this.state.loading ? (
              <Loader />
            ) : (
                this.state.displayUserList ? (
                  <Users usersList={this.state.usersList} selectUser={this.selectUser} />
                ) : (
                    this.state.displayAlbumsList ? (
                      <Albums albumsList={this.state.userAlbumsList} bactToUsersList={this.bactToUsersList} selectAlbum={this.selectAlbum} />
                    ) : (
                        this.state.displayPhotoList ? (
                          <Photos photoList={this.state.albumPhotoList} bactToAlbumsList={this.bactToAlbumsList} showPopup={this.showPopup} />
                        ) : (
                            ''
                          )
                      )
                  )
              )
          }
        </div>
      </>
    )
  }
}
